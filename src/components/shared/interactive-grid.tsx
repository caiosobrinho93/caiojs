'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only enable on desktop screens where mouse hover is present
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isMobile || prefersReducedMotion) {
      document.body.classList.add('static-grid');
      return;
    } else {
      document.body.classList.remove('static-grid');
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Physics parameters for the gravity warp field
    const GRID_SIZE = 55;
    const RADIUS = 180; // Mouse gravity influence radius
    const FORCE = 40; // Bending force (pixels pulled towards mouse)
    const STIFFNESS = 0.08; // Spring tension pulling points back
    const DAMPING = 0.82; // Friction damping velocity

    let cols = Math.ceil(width / GRID_SIZE) + 1;
    let rows = Math.ceil(height / GRID_SIZE) + 1;

    interface Point {
      x: number;
      y: number;
      ox: number; // original rest X
      oy: number; // original rest Y
      vx: number;
      vy: number;
    }

    let points: Point[] = [];

    function initPoints() {
      cols = Math.ceil(width / GRID_SIZE) + 1;
      rows = Math.ceil(height / GRID_SIZE) + 1;
      points = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * GRID_SIZE;
          const y = r * GRID_SIZE;
          points.push({
            x,
            y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    }

    initPoints();

    const mouse = { x: -1000, y: -1000, active: false, idle: true };
    let lastMouseMove = Date.now();
    let animationFrameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      mouse.idle = false;
      lastMouseMove = Date.now();

      // Awake animation loop if sleeping
      if (!animationFrameId) {
        startLoop();
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initPoints();
      if (!animationFrameId) {
        startLoop();
      }
    };
    window.addEventListener('resize', handleResize);

    function updateAndDraw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      if (now - lastMouseMove > 1500) {
        mouse.idle = true;
      }

      let needsUpdate = false;

      // 1. Calculate spring physics and mouse gravitational displacement
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        let targetX = p.ox;
        let targetY = p.oy;

        if (mouse.active) {
          const dx = mouse.x - p.ox;
          const dy = mouse.y - p.oy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < RADIUS) {
            // Organic gravitational pull towards mouse
            const strength = 1 - dist / RADIUS;
            const pull = strength * FORCE;
            targetX = p.ox + (dx / (dist || 1)) * pull;
            targetY = p.oy + (dy / (dist || 1)) * pull;
          }
        }

        // Bouncy spring dynamics
        const ax = (targetX - p.x) * STIFFNESS;
        const ay = (targetY - p.y) * STIFFNESS;

        p.vx = (p.vx + ax) * DAMPING;
        p.vy = (p.vy + ay) * DAMPING;

        p.x += p.vx;
        p.y += p.vy;

        // Check system kinetic energy to see if we should enter sleep mode
        const dxOrig = p.x - p.ox;
        const dyOrig = p.y - p.oy;
        if (
          Math.abs(p.vx) > 0.005 ||
          Math.abs(p.vy) > 0.005 ||
          Math.abs(dxOrig) > 0.05 ||
          Math.abs(dyOrig) > 0.05
        ) {
          needsUpdate = true;
        }
      }

      // 2. Draw subtle green glow spotlight behind the grid
      if (mouse.active && !mouse.idle) {
        const glow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          RADIUS
        );
        glow.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
        glow.addColorStop(0.5, 'rgba(16, 185, 129, 0.03)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw base grid lines (crisp and visible)
      ctx.beginPath();

      // Horizontal lines
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const p1 = points[r * cols + c];
          const p2 = points[r * cols + (c + 1)];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      }

      // Vertical lines
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const p1 = points[r * cols + c];
          const p2 = points[(r + 1) * cols + c];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      }

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.055)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 4. Draw glowing green lines (spotlight wireframe highlights) near mouse
      if (mouse.active) {
        // Horizontal highlights
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols - 1; c++) {
            const p1 = points[r * cols + c];
            const p2 = points[r * cols + (c + 1)];

            const mx = (p1.x + p2.x) / 2;
            const my = (p1.y + p2.y) / 2;
            const dx = mouse.x - mx;
            const dy = mouse.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < RADIUS) {
              const alpha = (1 - dist / RADIUS) * 0.45;
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
              ctx.lineWidth = 1.3;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // Vertical highlights
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows - 1; r++) {
            const p1 = points[r * cols + c];
            const p2 = points[(r + 1) * cols + c];

            const mx = (p1.x + p2.x) / 2;
            const my = (p1.y + p2.y) / 2;
            const dx = mouse.x - mx;
            const dy = mouse.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < RADIUS) {
              const alpha = (1 - dist / RADIUS) * 0.45;
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
              ctx.lineWidth = 1.3;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Loop control (sleep if no movement or energy)
      if (needsUpdate || (mouse.active && !mouse.idle)) {
        animationFrameId = requestAnimationFrame(updateAndDraw);
      } else {
        animationFrameId = null;
      }
    }

    function startLoop() {
      if (animationFrameId) return;
      animationFrameId = requestAnimationFrame(updateAndDraw);
    }

    startLoop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 pointer-events-none w-full h-full block"
    />
  );
}

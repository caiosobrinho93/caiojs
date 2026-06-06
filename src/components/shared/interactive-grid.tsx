'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check for mobile layout, touch screen, or accessibility preferences
    const isMobile =
      window.innerWidth < 768 ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
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

    // Configuration for grid and gravity pull physics
    const GRID_SIZE = 55;
    const RADIUS = 200; // Radius of mouse gravity field
    const FORCE = 35; // Maximum pull distance (px)
    const STIFFNESS = 0.08; // Spring strength pulling point back to original position
    const DAMPING = 0.82; // Friction damping velocity over time

    let cols = Math.ceil(width / GRID_SIZE) + 1;
    let rows = Math.ceil(height / GRID_SIZE) + 1;

    interface Point {
      x: number;
      y: number;
      ox: number; // original X coordinate
      oy: number; // original Y coordinate
      vx: number; // velocity X
      vy: number; // velocity Y
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

      // Start the animation loop if it's currently sleeping
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

      // 1. Update points positions with spring physics and cursor magnetic pull
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        let targetX = p.ox;
        let targetY = p.oy;

        if (mouse.active) {
          const dx = mouse.x - p.ox;
          const dy = mouse.y - p.oy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < RADIUS) {
            // Calculate pull strength (strongest at center, fading out to radius)
            const strength = 1 - dist / RADIUS;
            const pull = strength * FORCE;
            targetX = p.ox + (dx / (dist || 1)) * pull;
            targetY = p.oy + (dy / (dist || 1)) * pull;
          }
        }

        // Spring feedback loop
        const ax = (targetX - p.x) * STIFFNESS;
        const ay = (targetY - p.y) * STIFFNESS;

        p.vx = (p.vx + ax) * DAMPING;
        p.vy = (p.vy + ay) * DAMPING;

        p.x += p.vx;
        p.y += p.vy;

        // Check if points are still moving/vibrating or out of rest
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

      // 2. Draw base grid lines
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

      ctx.strokeStyle = 'rgba(114, 114, 114, 0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. Draw highlighted green lines near the mouse (spotlight effect)
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
              const alpha = (1 - dist / RADIUS) * 0.2;
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
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
              const alpha = (1 - dist / RADIUS) * 0.2;
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // If active energy remains in the points, keep looping. Otherwise sleep.
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

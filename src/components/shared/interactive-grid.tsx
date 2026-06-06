'use client';

import { useEffect, useState } from 'react';

export default function InteractiveGrid() {
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Only enable effect on desktop screens where hover/mouse movement makes sense
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isMobile || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      setActive(true);
    };

    const handleMouseLeave = () => {
      setActive(false);
      setCoords({ x: -1000, y: -1000 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-40 transition-opacity duration-500"
      style={{
        opacity: active ? 1 : 0,
        ['--mouse-x' as any]: `${coords.x}px`,
        ['--mouse-y' as any]: `${coords.y}px`,
      }}
    >
      {/* 1. Green emerald spotlight glow following the cursor */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle 240px at var(--mouse-x) var(--mouse-y), rgba(16, 185, 129, 0.16) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 100%)',
        }}
      />

      {/* 2. Glassmorphism backdrop-blur lens that distorts/softens the grid lines */}
      <div
        className="absolute inset-0 backdrop-blur-[4px]"
        style={{
          WebkitMaskImage:
            'radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), black 20%, transparent 100%)',
          maskImage:
            'radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), black 20%, transparent 100%)',
        }}
      />
    </div>
  );
}

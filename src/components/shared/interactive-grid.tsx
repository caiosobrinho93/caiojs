'use client';

import { useEffect, useState } from 'react';

export default function InteractiveGrid() {
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Enable only on desktop screens
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      setActive(true);
    };

    const handleMouseLeave = () => {
      setActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none -z-40 overflow-hidden">
      {/* 1. Green emerald spotlight glow following the cursor */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full w-[450px] h-[450px] pointer-events-none mix-blend-screen"
        style={{
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          background:
            'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.04) 50%, transparent 100%)',
        }}
      />

      {/* 2. Glassmorphism backdrop-blur lens following the cursor */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full w-[260px] h-[260px] backdrop-blur-[5px] border border-mint-500/10 pointer-events-none"
        style={{
          left: `${coords.x}px`,
          top: `${coords.y}px`,
        }}
      />
    </div>
  );
}

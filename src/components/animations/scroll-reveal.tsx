'use client';

import { type ReactNode } from 'react';
import { motion, type Variant } from 'framer-motion';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  duration?: number;
}

const directionOffsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 16 },
  down: { x: 0, y: -16 },
  left: { x: 16, y: 0 },
  right: { x: -16, y: 0 },
};

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.4,
}: ScrollRevealProps) {
  const offset = directionOffsets[direction];

  const hidden: any = {
    opacity: 0,
    x: offset.x,
    y: offset.y,
  };

  const visible: any = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: EASE_PREMIUM as any,
    },
  };

  return (
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: '-80px' }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

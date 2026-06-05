'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxWrapperProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export function ParallaxWrapper({
  children,
  className,
  speed = 0.5,
  direction = 'up',
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate pixel offset based on speed — negate for "up" direction
  const factor = direction === 'up' ? -1 : 1;
  const distance = speed * 100;

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [factor * distance, factor * -distance]
  );

  // Smooth spring for premium feel
  const y = useSpring(rawY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

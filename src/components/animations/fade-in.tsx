'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: EASE_PREMIUM as any,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

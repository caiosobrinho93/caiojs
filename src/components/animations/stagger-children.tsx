'use client';

import { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayStart?: number;
}

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  delayStart = 0,
}: StaggerChildrenProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delayStart,
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// Companion component for each staggered child
const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_PREMIUM as any,
    },
  },
};

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={childVariants} className={cn(className)}>
      {children}
    </motion.div>
  );
}

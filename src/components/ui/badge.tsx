import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'outline' | 'muted';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: [
    'bg-gold-500/10',
    'text-gold-400',
    'border border-border-gold',
  ].join(' '),
  outline: 'bg-transparent text-text-secondary border border-border',
  muted: 'bg-bg-hover text-text-muted border border-transparent',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'default', className, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center',
        'px-3 py-1',
        'text-xs font-medium tracking-wide uppercase',
        'rounded-[var(--radius-badge)]',
        'transition-colors duration-200',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
});

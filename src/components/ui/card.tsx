import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'glass' | 'gold';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-bg-card border border-border',
  glass: [
    'bg-[rgba(17,17,17,0.7)]',
    'backdrop-blur-[20px]',
    '-webkit-backdrop-blur-[20px]',
    'border border-border',
  ].join(' '),
  gold: [
    'bg-bg-card',
    'border border-border-gold',
    'shadow-[0_0_30px_rgba(212,175,55,0.08)]',
  ].join(' '),
};

const hoverDefault = [
  'hover:border-border-hover',
  'hover:shadow-[0_0_20px_rgba(212,175,55,0.08)]',
  'hover:translate-y-[-2px]',
];

const hoverGold = [
  'hover:border-border-gold-strong',
  'hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]',
  'hover:translate-y-[-2px]',
];

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'default', hover = true, className, children, ...props },
  ref
) {
  const hoverStyles = hover
    ? variant === 'gold'
      ? hoverGold
      : hoverDefault
    : undefined;

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-[var(--radius-card)]',
        'transition-all duration-300 ease-[var(--ease-premium)]',
        variantStyles[variant],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1.5 p-6 pb-0', className)}
      {...props}
    />
  );
});

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={cn('p-6', className)} {...props} />;
});

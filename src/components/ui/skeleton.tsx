import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Carregando..."
      className={cn(
        'rounded-[var(--radius-input)]',
        'bg-bg-hover',
        'relative overflow-hidden',
        // Shimmer overlay
        'after:absolute after:inset-0',
        'after:bg-gradient-to-r',
        'after:from-transparent after:via-white/[0.03] after:to-transparent',
        'after:bg-[length:200%_100%]',
        'after:animate-[shimmer_2s_ease-in-out_infinite]',
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
}

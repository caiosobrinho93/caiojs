import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-16 max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        align === 'left' && 'text-left',
        className
      )}
    >
      {badge && (
        <Badge variant="default" className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-secondary text-lg md:text-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

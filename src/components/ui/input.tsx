import { forwardRef, type InputHTMLAttributes, useId } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, id: externalId, ...props },
  ref
) {
  const generatedId = useId();
  const id = externalId || generatedId;
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-text-secondary"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'h-11 w-full px-4',
          'bg-bg-input text-text-primary placeholder:text-text-subtle',
          'border rounded-[var(--radius-input)]',
          'font-body text-sm',
          'transition-all duration-200 ease-[var(--ease-premium)]',
          'focus:outline-none focus:ring-1',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-error focus:border-error focus:ring-error/30'
            : 'border-border focus:border-gold-500 focus:ring-gold-500/20',
          className
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

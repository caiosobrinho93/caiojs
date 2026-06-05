import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-gradient-to-r from-mint-600 to-mint-500',
    'text-bg-primary font-semibold',
    'hover:from-mint-500 hover:to-mint-400',
    'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    'hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
    'active:scale-[0.98]',
  ].join(' '),
  secondary: [
    'bg-transparent',
    'border border-border-gold',
    'text-mint-400',
    'hover:bg-mint-500/10',
    'hover:border-border-gold-strong',
    'hover:shadow-[0_0_16px_rgba(16,185,129,0.1)]',
    'active:scale-[0.98]',
  ].join(' '),
  ghost: [
    'bg-transparent',
    'text-text-secondary',
    'hover:text-text-primary',
    'hover:bg-bg-hover',
  ].join(' '),
  accent: [
    'bg-accent text-white font-semibold',
    'hover:bg-accent-hover',
    'hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]',
    'active:scale-[0.98]',
  ].join(' '),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5 rounded-[var(--radius-badge)]',
  md: 'h-11 px-6 text-sm gap-2 rounded-[var(--radius-button)]',
  lg: 'h-13 px-8 text-base gap-2.5 rounded-[var(--radius-button)]',
};

const baseStyles = [
  'inline-flex items-center justify-center',
  'font-body font-medium',
  'transition-all duration-300 ease-[var(--ease-premium)]',
  'focus-visible:outline-2 focus-visible:outline-mint-500 focus-visible:outline-offset-2',
  'disabled:opacity-50 disabled:pointer-events-none',
  'cursor-pointer select-none whitespace-nowrap',
  'hover:scale-[1.02]',
].join(' ');

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    isLoading && 'pointer-events-none opacity-70',
    className
  );

  const content = (
    <>
      {isLoading && (
        <Loader2 className="size-4 animate-spin shrink-0" aria-hidden="true" />
      )}
      {children}
    </>
  );

  // Render as Next.js Link when href is provided
  if ('href' in rest && rest.href !== undefined) {
    const { href, target, rel, ...linkRest } = rest as {
      href: string;
      target?: string;
      rel?: string;
    };
    const isExternal = href.startsWith('http') || target === '_blank';

    return (
      <Link
        href={href}
        target={target}
        rel={isExternal ? rel || 'noopener noreferrer' : rel}
        className={classes}
        {...(linkRest as Record<string, unknown>)}
      >
        {content}
      </Link>
    );
  }

  const buttonProps = rest as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonBaseProps
  >;

  return (
    <button
      ref={ref}
      disabled={isLoading || buttonProps.disabled}
      className={classes}
      {...buttonProps}
    >
      {content}
    </button>
  );
});

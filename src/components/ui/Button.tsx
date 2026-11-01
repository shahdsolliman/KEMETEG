import { cn } from '@/lib/utils';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  /** Icon placed at the start of button (RTL-aware) */
  iconStart?: React.ReactNode;
  /** Icon placed at the end of button */
  iconEnd?: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  as: 'link';
  href: string;
  type?: never;
  onClick?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-2 px-4 text-xs tracking-widest',
  md: 'py-3 px-8 text-sm tracking-widest',
  lg: 'py-4 px-10 text-base tracking-wider',
};

/**
 * Button — primary design system button.
 * Supports button and link variants.
 * All variants have RTL-aware icon placement.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled = false,
  loading = false,
  iconStart,
  iconEnd,
  ...props
}: ButtonProps) {
  const baseClasses = cn(
    variantClasses[variant],
    sizeClasses[size],
    (disabled || loading) && 'opacity-50 pointer-events-none',
    className
  );

  const content = (
    <>
      {iconStart && <span className="inline-flex shrink-0">{iconStart}</span>}
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <LoadingSpinner />
          {children}
        </span>
      ) : (
        children
      )}
      {iconEnd && <span className="inline-flex shrink-0">{iconEnd}</span>}
    </>
  );

  if (props.as === 'link') {
    return (
      <Link href={props.href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={disabled || loading}
      className={baseClasses}
    >
      {content}
    </button>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

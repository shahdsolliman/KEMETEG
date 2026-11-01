import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label?: string;
  headline: string;
  subtext?: string;
  /** Alignment — default is start (RTL-aware via CSS) */
  align?: 'start' | 'center' | 'end';
  /** Light theme (dark background) vs dark theme (light background) */
  theme?: 'dark' | 'light';
  className?: string;
  headlineClassName?: string;
  id?: string;
}

/**
 * SectionHeading — reusable premium heading block.
 * Used at the top of every section.
 * Includes:
 *  - Small gold label with leading line
 *  - Main heading (h2)
 *  - Optional subtitle paragraph
 */
export default function SectionHeading({
  label,
  headline,
  subtext,
  align = 'start',
  theme = 'dark',
  className,
  headlineClassName,
  id,
}: SectionHeadingProps) {
  const textColors = {
    dark: {
      label: 'text-gold',
      headline: 'text-warm-white',
      subtext: 'text-gray-muted',
    },
    light: {
      label: 'text-gold-600',
      headline: 'text-charcoal',
      subtext: 'text-gray-medium',
    },
  };

  const colors = textColors[theme];

  const alignClass = {
    start: 'text-start',
    center: 'text-center',
    end: 'text-end',
  }[align];

  return (
    <div className={cn('space-y-4', alignClass, className)} id={id}>
      {label && (
        <span className="section-label">
          {label}
        </span>
      )}

      <h2
        className={cn(
          'text-heading-xl font-bold leading-tight',
          colors.headline,
          headlineClassName
        )}
      >
        {headline}
      </h2>

      {subtext && (
        <p
          className={cn(
            'text-body-lg max-w-2xl leading-relaxed',
            colors.subtext,
            align === 'center' && 'mx-auto'
          )}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}

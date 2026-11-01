import { cn } from '@/lib/utils';

interface GoldLineProps {
  /** Direction of gradient */
  direction?: 'center' | 'start' | 'end';
  /** Width — default full */
  width?: string;
  className?: string;
}

/** Thin decorative gold line — used as a section separator or accent */
export default function GoldLine({
  direction = 'center',
  width,
  className,
}: GoldLineProps) {
  const gradients = {
    center: 'linear-gradient(90deg, transparent, rgb(var(--gold)) 40%, rgb(var(--gold)) 60%, transparent)',
    start:  'linear-gradient(90deg, rgb(var(--gold)) 60%, transparent)',
    end:    'linear-gradient(90deg, transparent, rgb(var(--gold)) 60%)',
  };

  return (
    <span
      aria-hidden="true"
      className={cn('block h-px', className)}
      style={{
        background: gradients[direction],
        width: width ?? '100%',
      }}
    />
  );
}

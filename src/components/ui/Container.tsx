import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Use a narrower max-width for text-heavy sections */
  narrow?: boolean;
  /** Full-width — no horizontal padding */
  fluid?: boolean;
  as?: React.ElementType;
}

/**
 * Container — responsive width wrapper with consistent horizontal padding.
 * All page content should be wrapped in a Container.
 */
export default function Container({
  children,
  className,
  narrow = false,
  fluid = false,
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'w-full mx-auto',
        !fluid && 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20',
        narrow ? 'max-w-4xl' : 'max-w-site',
        className
      )}
    >
      {children}
    </Tag>
  );
}

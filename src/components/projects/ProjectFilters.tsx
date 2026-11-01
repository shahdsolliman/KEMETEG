'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { projectCategories } from '@/data/navigation';

interface ProjectFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

/**
 * ProjectFilters — smooth category filter bar.
 * Client component — manages filtering state.
 * RTL-aware, fully keyboard accessible.
 */
export default function ProjectFilters({
  activeCategory,
  onCategoryChange,
}: ProjectFiltersProps) {
  const t = useTranslations();

  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className="flex flex-wrap items-center gap-2 sm:gap-1"
    >
      {projectCategories.map(({ value, labelKey }) => {
        const isActive = activeCategory === value;
        return (
          <button
            key={value}
            role="tab"
            aria-selected={isActive}
            aria-controls="projects-grid"
            onClick={() => onCategoryChange(value)}
            className={cn(
              'px-4 py-2 text-xs font-medium tracking-widest uppercase',
              'border transition-all duration-300',
              'focus-visible:outline-gold',
              isActive
                ? 'bg-gold text-black border-gold'
                : 'bg-transparent text-warm-white/60 border-gold-dim hover:border-gold-subtle hover:text-gold'
            )}
          >
            {t(labelKey as string)}
          </button>
        );
      })}
    </div>
  );
}

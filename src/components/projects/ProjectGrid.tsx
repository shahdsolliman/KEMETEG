'use client';

import { useState, useMemo, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';
import FadeIn from '@/components/animations/FadeIn';
import { publishedProjects } from '@/data/projects';
import type { Locale } from '@/types/common';

interface ProjectGridProps {
  locale: Locale;
}

/**
 * ProjectGrid — filterable project grid with smooth transitions.
 * Client component — manages filter state.
 * Uses useTransition for smooth filter switching.
 */
export default function ProjectGrid({ locale }: ProjectGridProps) {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isPending, startTransition] = useTransition();

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return publishedProjects;
    return publishedProjects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  if (publishedProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-body-lg text-gray-muted">{t('projects.contentPending')}</p>
      </div>
    );
  }

  const handleCategoryChange = (category: string) => {
    startTransition(() => {
      setActiveCategory(category);
    });
  };

  return (
    <div>
      {/* ── Filter bar ─────────────────────────────────────────── */}
      <FadeIn direction="up" delay={100}>
        <div className="mb-10">
          <ProjectFilters
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </FadeIn>

      {/* ── Grid ───────────────────────────────────────────────── */}
      <div
        id="projects-grid"
        role="tabpanel"
        aria-live="polite"
        className={cn(
          'transition-opacity duration-300',
          isPending ? 'opacity-40' : 'opacity-100'
        )}
      >
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {filteredProjects.map((project, i) => (
              <FadeIn
                key={`${project.slug}-${activeCategory}`}
                direction="up"
                delay={Math.min(i * 60, 300)}
                threshold={0.05}
              >
                <ProjectCard
                  project={project}
                  locale={locale}
                  priority={i < 3}
                />
              </FadeIn>
            ))}
          </div>
        ) : (
          /* ── Empty state ──────────────────────────────────── */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 border border-gold-dim flex items-center justify-center mb-6">
              <span className="text-2xl text-gold/40">∅</span>
            </div>
            <p className="text-body-lg text-gray-muted">
              {t('projects.noResults')}
            </p>
          </div>
        )}
      </div>

      {/* ── Result count ───────────────────────────────────────── */}
      {filteredProjects.length > 0 && (
        <p className="mt-8 text-caption text-warm-white/30 text-center">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
        </p>
      )}
    </div>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/project';
import type { Locale } from '@/types/common';

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  /** Priority loading for above-the-fold images */
  priority?: boolean;
  /** Size variant */
  size?: 'default' | 'large';
}

/**
 * ProjectCard — editorial architecture card.
 * Image dominates. Minimal text overlay.
 * Custom cursor integration via .project-card class.
 */
export default function ProjectCard({
  project,
  locale,
  priority = false,
  size = 'default',
}: ProjectCardProps) {
  const t = useTranslations();
  const title = locale === 'ar' ? project.title.ar : project.title.en;
  const location = locale === 'ar' ? project.location.ar : project.location.en;

  const categoryKey = `projects.filter${
    project.category.charAt(0).toUpperCase() + project.category.slice(1)
  }`;

  return (
    <article
      className={cn(
        'project-card group relative block overflow-hidden',
        size === 'large' ? 'aspect-[3/4] sm:aspect-[4/5]' : 'aspect-[3/4]',
        'bg-charcoal'
      )}
      aria-labelledby={`project-title-${project.slug}`}
      data-cursor="project"
    >
      <Link
        href={`/${locale}/projects/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`${t('projects.viewProject')}: ${title}`}
        tabIndex={0}
      >
        <span className="sr-only">{title}</span>
      </Link>

      {/* ── Image ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <Image
          src={project.coverImage}
          alt={title}
          fill
          sizes={
            size === 'large'
              ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          }
          className="project-card-image img-cover"
          priority={priority}
          onError={(e) => {
            // Show placeholder gradient if image missing
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />

        {/* Placeholder when no image */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-black flex items-center justify-center -z-10">
          <span className="text-6xl font-bold text-warm-white/5">
            {String(project.slug.split('-').pop()).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── Overlay ───────────────────────────────────────────────── */}
      <div className="project-card-overlay absolute inset-0" aria-hidden="true" />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="project-card-content">
        {/* Gold line */}
        <div className="project-card-gold-line" aria-hidden="true" />

        {/* Category + Year */}
        <div className="flex items-center justify-between mb-2">
          <span className="label-gold text-xs">
            {t(categoryKey as string)}
          </span>
          <span className="text-caption text-warm-white/40">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3
          id={`project-title-${project.slug}`}
          className="text-heading-md font-semibold text-warm-white leading-tight mb-1.5 line-clamp-2"
        >
          {title}
        </h3>

        {/* Location */}
        <p className="text-caption text-warm-white/50">
          {location}
        </p>
      </div>

      {/* ── View indicator ────────────────────────────────────────── */}
      <div
        className="absolute top-4 end-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0"
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-gold bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-gold-subtle">
          {t('featuredProjects.viewProject')}
        </span>
      </div>
    </article>
  );
}

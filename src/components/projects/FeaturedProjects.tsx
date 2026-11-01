import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/animations/FadeIn';
import ProjectCard from './ProjectCard';
import { featuredProjects } from '@/data/projects';
import type { Locale } from '@/types/common';
import { cn } from '@/lib/utils';

interface FeaturedProjectsProps {
  locale: Locale;
}

export default async function FeaturedProjects({ locale }: FeaturedProjectsProps) {
  const t = await getTranslations({ locale });
  const isRtl = locale === 'ar';

  if (featuredProjects.length === 0) return null;

  return (
    <section
      id="featured-projects"
      data-theme="light"
      className="section-pad bg-black relative"
      aria-labelledby="featured-heading"
    >
      <Container>
        {/* ── Header ────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <FadeIn direction="up">
            <SectionHeading
              label={t('featuredProjects.label')}
              headline={t('featuredProjects.headline')}
              subtext={t('featuredProjects.subtext')}
              id="featured-heading"
            />
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <Link
              href={`/${locale}/projects`}
              className={cn(
                'inline-flex items-center gap-2 shrink-0',
                'text-xs font-medium tracking-widest uppercase',
                'text-gold hover:text-gold-400 transition-colors group'
              )}
            >
              {t('featuredProjects.cta')}
              {isRtl ? (
                <ArrowLeft
                  size={14}
                  className="transition-transform group-hover:-translate-x-1"
                />
              ) : (
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </Link>
          </FadeIn>
        </div>

        {/* ── Grid ──────────────────────────────────────────────── */}
        {/* Editorial asymmetric grid — first card is large */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {featuredProjects.slice(0, 4).map((project, i) => {
            // First card spans 7 columns (large)
            // Remaining cards span 5 columns split into 2
            const isFirst = i === 0;
            const colSpan = isFirst
              ? 'lg:col-span-7'
              : i === 1
              ? 'lg:col-span-5'
              : 'lg:col-span-6';

            return (
              <FadeIn
                key={project.slug}
                direction="up"
                delay={i * 80}
                threshold={0.08}
                className={colSpan}
              >
                <ProjectCard
                  project={project}
                  locale={locale}
                  priority={i === 0}
                  size={isFirst ? 'large' : 'default'}
                />
              </FadeIn>
            );
          })}
        </div>

        {/* Mobile: show all projects CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href={`/${locale}/projects`}
            className="btn-secondary text-sm"
          >
            {t('featuredProjects.cta')}
          </Link>
        </div>
      </Container>
    </section>
  );
}

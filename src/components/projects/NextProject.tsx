import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Project } from '@/types/project';
import type { Locale } from '@/types/common';

interface NextProjectProps {
  project: Project | null;
  locale: Locale;
}

/**
 * NextProject — Large end-of-page navigation component.
 * Invites user to continue exploring the portfolio.
 */
export default async function NextProject({ project, locale }: NextProjectProps) {
  const t = await getTranslations({ locale });
  if (!project) return null;

  const isRtl = locale === 'ar';
  const title = isRtl ? project.title.ar : project.title.en;

  return (
    <section className="relative w-full h-[60vh] min-h-[400px] mt-32 flex items-center group overflow-hidden bg-black">
      {/* ── Background Image ────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={project.coverImage}
          alt={title}
          fill
          sizes="100vw"
          className="img-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000 ease-out-expo"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-charcoal/20" />
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full container-site text-center">
        <span className="label-gold mb-6 inline-block">
          {t('projects.nextProject')}
        </span>
        
        <h2 className="text-display-lg font-bold text-warm-white mb-10 tracking-tight leading-tight max-w-4xl mx-auto">
          {title}
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href={`/${locale}/projects/${project.slug}`}
            className="btn-primary"
          >
            {t('projects.viewProject')}
          </Link>

          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-warm-white/60 hover:text-gold transition-colors"
          >
            {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            {t('projects.backToProjects')}
          </Link>
        </div>
      </div>
    </section>
  );
}

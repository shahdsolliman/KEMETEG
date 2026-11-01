import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getProjectBySlug, getAdjacentProject, getAllSlugs } from '@/data/projects';
import Container from '@/components/ui/Container';
import FadeIn from '@/components/animations/FadeIn';
import ProjectGallery from '@/components/projects/ProjectGallery';
import NextProject from '@/components/projects/NextProject';
import type { Locale } from '@/types/common';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

type TranslationFunction = (key: string) => string;

interface InfoRowProps {
  labelKey: string;
  value?: string;
  t: TranslationFunction;
}

interface StorySectionProps {
  labelKey: string;
  value?: string;
  t: TranslationFunction;
}

function InfoRow({ labelKey, value, t }: InfoRowProps) {
  if (!value) return null;

  return (
    <div className="flex flex-col gap-1 py-4 border-b border-gold-dim last:border-0">
      <span className="text-caption text-gold uppercase tracking-widest">{t(labelKey)}</span>
      <span className="text-body-md font-medium text-warm-white">{value}</span>
    </div>
  );
}

function StorySection({ labelKey, value, t }: StorySectionProps) {
  if (!value) return null;

  return (
    <div className="mb-12">
      <h3 className="text-heading-sm font-semibold text-warm-white mb-4 flex items-center gap-3">
        <span className="w-6 h-px bg-gold" />
        {t(labelKey)}
      </h3>
      <p className="text-body-lg text-gray-muted leading-relaxed whitespace-pre-wrap">
        {value}
      </p>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const locales = ['ar', 'en'];
  
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  const title = locale === 'ar' ? project.title.ar : project.title.en;
  const desc = locale === 'ar' ? project.description.ar : project.description.en;

  return {
    title,
    description: desc,
    openGraph: {
      images: [project.coverImage],
    }
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const isRtl = locale === 'ar';
  const title = isRtl ? project.title.ar : project.title.en;
  const description = isRtl ? project.description.ar : project.description.en;
  const location = isRtl ? project.location.ar : project.location.en;
  
  const categoryKey = `projects.filter${
    project.category.charAt(0).toUpperCase() + project.category.slice(1)
  }`;

  const { next } = getAdjacentProject(slug);

  return (
    <article data-theme="dark" className="bg-black pt-20" aria-label={`Project: ${title}`}>
      {/* ── Hero Image ────────────────────────────────────────────────── */}
      <section className="relative w-full h-[70vh] min-h-[500px]">
        <Image
          src={project.coverImage}
          alt={title}
          fill
          sizes="100vw"
          className="img-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-charcoal/20" />
        
        {/* Title Block overlay */}
        <div className="absolute bottom-0 inset-x-0 pb-16 lg:pb-24">
          <Container>
            <FadeIn direction="up">
              <div className="flex items-center gap-4 mb-4">
                <span className="label-gold">{t(categoryKey)}</span>
                <span className="w-1 h-1 rounded-full bg-gold-dim" />
                <span className="label-gold text-warm-white/60">{project.year}</span>
              </div>
              <h1 className="text-display-xl font-bold text-warm-white max-w-5xl leading-[1.1]">
                {title}
              </h1>
              <p className="text-body-lg text-warm-white/70 mt-6 flex items-center gap-2">
                <span className="w-6 h-px bg-gold" />
                {location}
              </p>
            </FadeIn>
          </Container>
        </div>
      </section>

      {/* ── Content Grid ──────────────────────────────────────────────── */}
      <Container className="py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8">
            <FadeIn direction="up">
              <h2 className="text-heading-md font-semibold text-warm-white mb-6">
                {t('projects.overview')}
              </h2>
              <p className="text-body-xl text-gray-muted leading-relaxed mb-16 whitespace-pre-wrap">
                {description}
              </p>

              {/* Optional Story Sections */}
              <StorySection t={t} labelKey="projects.challenge" value={isRtl ? project.challenge?.ar : project.challenge?.en} />
              <StorySection t={t} labelKey="projects.solution" value={isRtl ? project.solution?.ar : project.solution?.en} />
              <StorySection t={t} labelKey="projects.execution" value={isRtl ? project.execution?.ar : project.execution?.en} />
              <StorySection t={t} labelKey="projects.results" value={isRtl ? project.results?.ar : project.results?.en} />
            </FadeIn>
          </div>

          {/* Info Sidebar (Right) */}
          <aside className="lg:col-span-4">
            <FadeIn direction="up" delay={200}>
              <div className="bg-charcoal/30 border border-gold-dim p-8 sticky top-32">
                <h3 className="text-heading-sm font-semibold text-warm-white mb-6">
                  {t('projects.projectInfo')}
                </h3>
                
                <div className="flex flex-col">
                  <InfoRow t={t} labelKey="projects.client" value={project.client} />
                  <InfoRow t={t} labelKey="projects.location" value={location} />
                  <InfoRow t={t} labelKey="projects.year" value={project.year.toString()} />
                  <InfoRow t={t} labelKey="projects.category" value={t(categoryKey)} />
                  <InfoRow t={t} labelKey="projects.area" value={project.area} />
                  <InfoRow t={t} labelKey="projects.status" value={isRtl ? project.status?.ar : project.status?.en} />
                  
                  {project.scope && (
                    <div className="flex flex-col gap-1 py-4 border-b border-gold-dim last:border-0">
                      <span className="text-caption text-gold uppercase tracking-widest">{t('projects.scope')}</span>
                      <ul className="text-body-md font-medium text-warm-white list-disc list-inside space-y-1 mt-1">
                        {project.scope.map((s, i) => (
                          <li key={i}>{isRtl ? s.ar : s.en}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.materials && (
                    <div className="flex flex-col gap-1 py-4 border-b border-gold-dim last:border-0">
                      <span className="text-caption text-gold uppercase tracking-widest">{t('projects.materials')}</span>
                      <ul className="text-body-md font-medium text-warm-white list-disc list-inside space-y-1 mt-1">
                        {project.materials.map((m, i) => (
                          <li key={i}>{isRtl ? m.ar : m.en}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          </aside>
        </div>
        
        {/* Gallery */}
        <ProjectGallery images={project.gallery} title={title} />
      </Container>

      {/* Next Project */}
      <NextProject project={next} locale={locale as Locale} />
    </article>
  );
}

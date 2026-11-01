import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectGrid from '@/components/projects/ProjectGrid';
import FadeIn from '@/components/animations/FadeIn';
import type { Locale } from '@/types/common';
import type { Metadata } from 'next';

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  return {
    title: t('title'),
    description: t('subtext'),
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div data-theme="light" className="bg-black pt-32 pb-24 min-h-screen">
      <Container>
        {/* Header */}
        <FadeIn direction="up" className="mb-16">
          <SectionHeading
            headline={t('projects.headline')}
            subtext={t('projects.subtext')}
          />
        </FadeIn>

        {/* Client-side Grid with Filters */}
        <ProjectGrid locale={locale as Locale} />
      </Container>
    </div>
  );
}

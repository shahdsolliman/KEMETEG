import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';
import Story from '@/components/about/Story';
import Values from '@/components/about/Values';
import Statistics from '@/components/about/Statistics';
import Timeline from '@/components/about/Timeline';
import { isPlaceholderValue } from '@/lib/utils';
import type { Locale } from '@/types/common';
import type { Metadata } from 'next';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const description = t('heroSubtext');
  return {
    title: t('title'),
    ...(!isPlaceholderValue(description) && { description }),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="bg-black">
      
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section data-theme="dark" className="relative w-full h-[60vh] min-h-[400px] pt-20" aria-label="About Hero">
        <Image
          src="/images/projects/project-02/cover.webp"
          alt="About KEMET background"
          fill
          sizes="100vw"
          className="img-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-center">
          <Container>
            <FadeIn direction="up">
              <span className="label-gold mb-6 inline-block">
                {t('about.heroLabel')}
              </span>
              <h1 className="text-display-lg font-bold text-warm-white max-w-4xl leading-[1.1] mb-6">
                {t('about.heroHeadline')}
              </h1>
              {!isPlaceholderValue(t('about.heroSubtext')) && (
                <p className="text-body-xl text-warm-white/70 max-w-2xl">
                  {t('about.heroSubtext')}
                </p>
              )}
            </FadeIn>
          </Container>
        </div>
      </section>

      {/* ── Content Sections ──────────────────────────────────────────── */}
      <Story locale={locale as Locale} />
      <Values locale={locale as Locale} />
      <Statistics locale={locale as Locale} />
      <Timeline locale={locale as Locale} />

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section data-theme="light" className="section-pad bg-black border-t border-gold-dim text-center">
        <Container narrow>
          <FadeIn direction="up">
            <h2 className="text-heading-lg font-bold text-warm-white mb-6">
              {t('about.ctaHeadline')}
            </h2>
            <p className="text-body-lg text-gray-muted mb-10">
              {t('about.ctaSubtext')}
            </p>
            <Button as="link" href={`/${locale}/contact`} variant="primary">
              {t('about.ctaButton')}
            </Button>
          </FadeIn>
        </Container>
      </section>

    </div>
  );
}

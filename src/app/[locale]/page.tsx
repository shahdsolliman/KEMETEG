import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';
import Hero from '@/components/hero/Hero';
import ServicesSection from '@/components/services/ServicesSection';
import FeaturedProjects from '@/components/projects/FeaturedProjects';
import { isPlaceholderValue } from '@/lib/utils';
import type { Locale } from '@/types/common';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const credibilitySubtext = t('credibility.subtext');
  const credibilityStats = [
    { value: t('about.stat1Value'), label: t('credibility.stat1Label') },
    { value: t('about.stat2Value'), label: t('credibility.stat2Label') },
    { value: t('about.stat3Value'), label: t('credibility.stat3Label') },
    { value: t('about.stat4Value'), label: t('credibility.stat4Label') },
  ].filter((stat) => !isPlaceholderValue(stat.value));
  const hasCredibilityContent = !isPlaceholderValue(credibilitySubtext) || credibilityStats.length > 0;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <Hero locale={locale as Locale} />

      {/* ── Intro Section ─────────────────────────────────────────────── */}
      <section id="intro-section" data-theme="light" className="section-pad bg-black relative" aria-labelledby="intro-heading">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="order-2 lg:order-1">
              <FadeIn direction="up">
                <SectionHeading
                  label={t('intro.label')}
                  headline={t('intro.headline')}
                  id="intro-heading"
                  className="mb-8"
                />
                {!isPlaceholderValue(t('intro.body')) && (
                  <p className="text-body-xl text-gray-muted leading-relaxed mb-10 max-w-xl">
                    {t('intro.body')}
                  </p>
                )}
                <Button as="link" href={`/${locale}/about`} variant="secondary">
                  {t('intro.cta')}
                </Button>
              </FadeIn>
            </div>

            <div className="order-1 lg:order-2">
              <FadeIn direction="left" delay={200} className="relative aspect-[4/3] w-full bg-charcoal border border-gold-dim">
                <Image
                  src="/images/projects/project-02/cover.webp"
                  alt="KEMET Introduction"
                  fill
                  className="img-cover opacity-80"
                />
                <div className="absolute inset-0 border border-gold-dim m-4" />
              </FadeIn>
            </div>

          </div>
        </Container>
      </section>

      {/* ── Services Section ──────────────────────────────────────────── */}
      <ServicesSection locale={locale as Locale} />

      {/* ── Featured Projects Section ─────────────────────────────────── */}
      <FeaturedProjects locale={locale as Locale} />

      {/* ── Credibility Section ───────────────────────────────────────── */}
      {hasCredibilityContent && <section data-theme="dark" className="section-pad bg-charcoal relative border-y border-gold-dim" aria-labelledby="credibility-heading">
        <Container>
          <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-20">
            <SectionHeading
              label={t('credibility.label')}
              headline={t('credibility.headline')}
              subtext={isPlaceholderValue(credibilitySubtext) ? undefined : credibilitySubtext}
              align="center"
              id="credibility-heading"
            />
          </FadeIn>

          {credibilityStats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
              {credibilityStats.map((stat, index) => (
                <FadeIn key={stat.label} direction="up" delay={index * 100}>
                  <div className="text-4xl md:text-5xl font-bold text-gold mb-2">{stat.value}</div>
                  <div className="text-body-sm text-warm-white/60 tracking-widest uppercase">{stat.label}</div>
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </section>}

      {/* ── CTA Section ───────────────────────────────────────────────── */}
      <section data-theme="light" className="bg-black py-32 text-center">
        <Container narrow>
          <FadeIn direction="up">
            <h2 className="text-display-lg font-bold text-warm-white mb-6">
              {t('cta.headline')}
            </h2>
            <p className="text-body-xl text-gray-muted mb-12">
              {t('cta.subtext')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Button as="link" href={`/${locale}/contact`} variant="primary" size="lg">
                {t('cta.primary')}
              </Button>
              <Button as="link" href={`/${locale}/projects`} variant="ghost">
                {t('cta.secondary')}
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}

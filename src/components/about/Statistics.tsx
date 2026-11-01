import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import FadeIn from '@/components/animations/FadeIn';
import type { Locale } from '@/types/common';

interface StatisticsProps {
  locale: Locale;
}

export default async function Statistics({ locale }: StatisticsProps) {
  const t = await getTranslations({ locale });

  const stats = [
    { value: t('about.stat1Value'), label: t('about.stat1Label') },
    { value: t('about.stat2Value'), label: t('about.stat2Label') },
    { value: t('about.stat3Value'), label: t('about.stat3Label') },
    { value: t('about.stat4Value'), label: t('about.stat4Label') },
  ].filter((stat) => !/^\s*\[.*\]\s*$/.test(stat.value));

  if (stats.length === 0) return null;

  return (
    <section data-theme="light" className="py-20 bg-black border-y border-gold-dim">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          {stats.map((stat, i) => (
            <FadeIn key={i} direction="up" delay={i * 100}>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">{stat.value}</div>
              <div className="text-body-sm text-warm-white/60 tracking-widest uppercase">{stat.label}</div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

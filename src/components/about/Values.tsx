import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/animations/FadeIn';
import type { Locale } from '@/types/common';
import { Target, ShieldCheck, Lightbulb, Handshake } from 'lucide-react';

interface ValuesProps {
  locale: Locale;
}

export default async function Values({ locale }: ValuesProps) {
  const t = await getTranslations({ locale });

  const values = [
    {
      icon: Target,
      title: t('about.value1Title'),
      body: t('about.value1Body'),
    },
    {
      icon: ShieldCheck,
      title: t('about.value2Title'),
      body: t('about.value2Body'),
    },
    {
      icon: Lightbulb,
      title: t('about.value3Title'),
      body: t('about.value3Body'),
    },
    {
      icon: Handshake,
      title: t('about.value4Title'),
      body: t('about.value4Body'),
    },
  ];

  return (
    <section data-theme="dark" className="section-pad bg-charcoal relative" aria-labelledby="values-heading">
      <Container>
        <FadeIn direction="up" className="mb-16 text-center">
          <SectionHeading
            label={t('about.valuesLabel')}
            headline={t('about.valuesHeadline')}
            id="values-heading"
            align="center"
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <FadeIn key={i} direction="up" delay={i * 100}>
              <div className="bg-black border border-gold-dim p-8 h-full hover:border-gold-subtle transition-colors group">
                <div className="w-12 h-12 bg-charcoal-light flex items-center justify-center mb-6 text-gold group-hover:scale-110 transition-transform">
                  <value.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-warm-white mb-3">{value.title}</h3>
                <p className="text-body-sm text-gray-muted leading-relaxed">{value.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

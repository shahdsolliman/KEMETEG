import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/animations/FadeIn';
import ServiceCard from './ServiceCard';
import { services } from '@/data/services';
import type { Locale } from '@/types/common';

interface ServicesSectionProps {
  locale: Locale;
}

export default async function ServicesSection({ locale }: ServicesSectionProps) {
  const t = await getTranslations({ locale });

  return (
    <section
      id="services"
      data-theme="dark"
      className="section-pad bg-charcoal relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            rgb(var(--gold)),
            rgb(var(--gold)) 1px,
            transparent 1px,
            transparent 60px
          )`,
        }}
        aria-hidden="true"
      />

      <Container className="relative">
        <FadeIn
          direction="up"
          distance={20}
          duration={750}
          threshold={0.1}
          className="max-w-3xl"
        >
          <SectionHeading
            label={t('services.label')}
            headline={t('services.headline')}
            subtext={t('services.subtext')}
            id="services-heading"
            className="space-y-3 sm:space-y-4"
          />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:mt-14 lg:grid-cols-3 lg:gap-5 xl:gap-6">
          {services.map((service, i) => (
            <FadeIn
              key={service.id}
              direction="up"
              distance={18}
              duration={650}
              delay={i * 70}
              threshold={0.08}
              className="h-full"
            >
              <ServiceCard service={service} locale={locale} index={i} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

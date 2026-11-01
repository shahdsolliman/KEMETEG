import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/animations/FadeIn';
import { aboutTimeline } from '@/data/navigation';
import { isPlaceholderValue } from '@/lib/utils';
import type { Locale } from '@/types/common';
import { cn } from '@/lib/utils';

interface TimelineProps {
  locale: Locale;
}

export default async function Timeline({ locale }: TimelineProps) {
  const t = await getTranslations({ locale });
  const isRtl = locale === 'ar';
  const entries = aboutTimeline.filter((item) => {
    const title = isRtl ? item.title.ar : item.title.en;
    const description = isRtl ? item.description.ar : item.description.en;
    return !isPlaceholderValue(item.year)
      && !isPlaceholderValue(title)
      && !isPlaceholderValue(description);
  });

  if (entries.length === 0) return null;

  return (
    <section data-theme="dark" className="section-pad bg-charcoal-light" aria-labelledby="timeline-heading">
      <Container narrow>
        <FadeIn direction="up" className="mb-16">
          <SectionHeading
            label={t('about.timelineLabel')}
            headline={t('about.timelineHeadline')}
            id="timeline-heading"
            align="center"
          />
        </FadeIn>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 start-6 md:start-1/2 w-px bg-gold-dim" aria-hidden="true" />

          <div className="space-y-12 md:space-y-24">
            {entries.map((item, i) => {
              const title = isRtl ? item.title.ar : item.title.en;
              const desc = isRtl ? item.description.ar : item.description.en;
              const isEven = i % 2 === 0;

              return (
                <FadeIn key={i} direction="up" threshold={0.2}>
                  <div className={cn(
                    'relative flex items-center',
                    'md:justify-between'
                  )}>
                    
                    {/* Dot */}
                    <div className="absolute start-6 md:start-1/2 w-3 h-3 bg-gold rounded-full transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(197,162,103,0.5)]" aria-hidden="true" />
                    
                    {/* Content (Left or Right on desktop, always Right on mobile) */}
                    <div className={cn(
                      'w-full ms-16 md:ms-0 md:w-5/12',
                      isEven ? 'md:order-1 md:text-end' : 'md:order-3 md:text-start'
                    )}>
                      <div className="text-gold font-bold text-xl tracking-wider mb-2">{item.year}</div>
                      <h4 className="text-heading-sm font-semibold text-warm-white mb-3">{title}</h4>
                      <p className="text-body-sm text-gray-muted leading-relaxed">{desc}</p>
                    </div>
                    
                    {/* Spacer for the other side */}
                    <div className="hidden md:block md:w-5/12 md:order-2" aria-hidden="true" />

                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

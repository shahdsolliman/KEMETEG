import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/animations/FadeIn';
import type { Locale } from '@/types/common';
import Image from 'next/image';
import { isPlaceholderValue } from '@/lib/utils';

interface StoryProps {
  locale: Locale;
}

export default async function Story({ locale }: StoryProps) {
  const t = await getTranslations({ locale });
  const storyBody = t('about.storyBody');
  const visionBody = t('about.visionBody');
  const missionBody = t('about.missionBody');

  if ([storyBody, visionBody, missionBody].every(isPlaceholderValue)) {
    return null;
  }

  return (
    <section data-theme="light" className="section-pad bg-black" aria-labelledby="story-heading">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="order-2 lg:order-1">
            <FadeIn direction="up">
              <SectionHeading
                label={t('about.storyLabel')}
                headline={t('about.storyHeadline')}
                id="story-heading"
                className="mb-6"
              />
              <div className="text-body-lg text-gray-muted space-y-6 leading-relaxed">
                {!isPlaceholderValue(storyBody) && <p>{storyBody}</p>}
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={200} className="mt-12 space-y-12">
              <div>
                <h3 className="text-heading-sm font-semibold text-warm-white mb-4 flex items-center gap-3">
                  <span className="w-6 h-px bg-gold" />
                  {t('about.visionLabel')}
                </h3>
                <h4 className="text-gold text-lg mb-2">{t('about.visionHeadline')}</h4>
                {!isPlaceholderValue(visionBody) && (
                  <p className="text-gray-muted leading-relaxed">{visionBody}</p>
                )}
              </div>

              <div>
                <h3 className="text-heading-sm font-semibold text-warm-white mb-4 flex items-center gap-3">
                  <span className="w-6 h-px bg-gold" />
                  {t('about.missionLabel')}
                </h3>
                <h4 className="text-gold text-lg mb-2">{t('about.missionHeadline')}</h4>
                {!isPlaceholderValue(missionBody) && (
                  <p className="text-gray-muted leading-relaxed">{missionBody}</p>
                )}
              </div>
            </FadeIn>
          </div>

          <div className="order-1 lg:order-2">
            <FadeIn direction="left" delay={100} className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none">
              <Image
                src="/images/projects/project-01/cover.webp"
                alt="About KEMET"
                fill
                className="img-cover filter grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 border border-gold/20 m-6" />
            </FadeIn>
          </div>

        </div>
      </Container>
    </section>
  );
}

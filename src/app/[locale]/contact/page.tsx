import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import FadeIn from '@/components/animations/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import { configuredSocialLinks } from '@/data/navigation';
import { isPlaceholderValue } from '@/lib/utils';
import type { Locale } from '@/types/common';
import type { Metadata } from 'next';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title'),
    description: t('heroSubtext'),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const hasContactDetails = [
    t('contact.phoneValue'),
    t('contact.emailValue'),
    t('contact.addressValue'),
  ].some((value) => !isPlaceholderValue(value));
  const hasContactSidebar = hasContactDetails || configuredSocialLinks.length > 0;

  return (
    <div className="bg-black min-h-screen">
      
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section data-theme="dark" className="relative w-full pt-40 pb-20 bg-charcoal" aria-label="Contact Hero">
        <Container>
          <FadeIn direction="up">
            <SectionHeading
              label={t('contact.heroLabel')}
              headline={t('contact.heroHeadline')}
              subtext={t('contact.heroSubtext')}
              align="center"
            />
          </FadeIn>
        </Container>
      </section>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <section data-theme="light" className="section-pad relative z-10 -mt-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left: Info */}
            {hasContactSidebar && <div className="lg:col-span-5 order-2 lg:order-1">
              <FadeIn direction="up" delay={100}>
                <ContactInfo locale={locale as Locale} />
              </FadeIn>
            </div>}

            {/* Right: Form */}
            <div className={`${hasContactSidebar ? 'lg:col-span-7' : 'lg:col-span-12'} order-1 lg:order-2`}>
              <FadeIn direction="up" delay={200}>
                <div className="bg-black border border-gold-dim p-8 md:p-12 shadow-2xl">
                  <h2 className="text-heading-md font-bold text-warm-white mb-8">
                    {t('contact.formHeadline')}
                  </h2>
                  <ContactForm />
                </div>
              </FadeIn>
            </div>

          </div>
        </Container>
      </section>

    </div>
  );
}

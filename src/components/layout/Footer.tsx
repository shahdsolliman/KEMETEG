import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import GoldLine from '@/components/ui/GoldLine';
import BrandLogo from '@/components/layout/BrandLogo';
import { configuredSocialLinks, navItems } from '@/data/navigation';
import { services } from '@/data/services';
import { isPlaceholderValue } from '@/lib/utils';
import type { Locale } from '@/types/common';

const Instagram = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Facebook = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Linkedin = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

interface FooterProps {
  locale: Locale;
}

const iconMap: Record<string, React.ElementType> = {
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
};

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();
  const phoneValue = t('contact.phoneValue');
  const phoneHref = phoneValue.replace(/[^\d+]/g, '');
  const emailValue = t('contact.emailValue');
  const addressValue = t('contact.addressValue');
  const hasPhone = !isPlaceholderValue(phoneValue) && phoneHref.length >= 5;
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const hasAddress = !isPlaceholderValue(addressValue);

  return (
    <footer
      data-theme="dark"
      className="bg-black-rich border-t border-gold-dim"
      aria-label="Site footer"
    >
      {/* ── Top gold accent line ─────────────────────────────────────── */}
      <GoldLine direction="center" className="opacity-60" />

      <Container className="py-12 sm:py-16 lg:max-w-[1720px] lg:py-20">
        <div className="grid grid-cols-2 gap-x-5 gap-y-9 text-center sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4">

          {/* ── Column 1: Brand ───────────────────────────────────────── */}
          <div className="col-span-2 space-y-4 sm:col-span-1 sm:space-y-5">
            <Link
              href={`/${locale}`}
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
              className="group mx-auto inline-flex flex-col items-center gap-1.5 transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-gold"
              aria-label="KEMET Home"
            >
              <Image
                src="/images/logo/KemetHORSE-transparent.png"
                alt=""
                width={1402}
                height={1122}
                sizes="(max-width: 640px) 144px, 176px"
                loading="eager"
                unoptimized
                className="h-24 w-32 object-contain brightness-0 invert sm:h-28 sm:w-36"
                style={{ transform: locale === 'en' ? 'scaleX(-1)' : undefined }}
                aria-hidden="true"
              />
              <BrandLogo size={112} layout="stacked" locale={locale} />
            </Link>

            <p className="mx-auto max-w-xs text-center text-sm leading-7 text-gray-muted sm:text-body-sm sm:leading-relaxed">
              {t('footer.tagline')}
            </p>

            {/* Social links */}
            {configuredSocialLinks.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {configuredSocialLinks.map(({ platform, href, icon }) => {
                  const Icon = iconMap[icon];
                  if (!Icon) return null;
                  return (
                    <a
                      key={platform}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform}
                      className="flex h-10 w-10 items-center justify-center border border-gold-dim text-warm-white/50 transition-all duration-300 hover:border-gold hover:text-gold"
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Column 2: Quick Links ─────────────────────────────────── */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="label-gold">{t('footer.navLabel')}</h3>
            <ul className="space-y-2.5 sm:space-y-3" role="list">
              {navItems.map((item) => (
                <li key={item.labelKey}>
                  <Link
                    href={`/${locale}${item.href === '/' ? '' : item.href}`}
                    className="text-body-sm text-warm-white/60 hover:text-gold transition-colors duration-200 inline-flex items-center justify-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-300 shrink-0" />
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Services ────────────────────────────────────── */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="label-gold">{t('footer.servicesLabel')}</h3>
            <ul className="space-y-2.5 sm:space-y-3" role="list">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <span className="text-body-sm text-warm-white/60 hover:text-gold transition-colors duration-200 inline-flex items-center justify-center gap-1.5 group cursor-default">
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-300 shrink-0" />
                    {locale === 'ar' ? service.title.ar : service.title.en}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Contact ─────────────────────────────────────── */}
          <div className="col-span-2 space-y-4 sm:col-span-1 sm:space-y-6">
            <h3 className="label-gold">{t('footer.contactLabel')}</h3>
            {(hasPhone || hasEmail || hasAddress) && (
              <ul className="space-y-3 sm:space-y-4" role="list">
                {hasPhone && (
                  <li className="text-body-sm text-warm-white/60">
                    <span className="block text-xs text-gold mb-1">{t('contact.phone')}</span>
                    <a href={`tel:${phoneHref}`} className="hover:text-gold transition-colors" dir="ltr">
                      {phoneValue}
                    </a>
                  </li>
                )}
                {hasEmail && (
                  <li className="text-body-sm text-warm-white/60">
                    <span className="block text-xs text-gold mb-1">{t('contact.email')}</span>
                    <a href={`mailto:${emailValue}`} className="hover:text-gold transition-colors">
                      {emailValue}
                    </a>
                  </li>
                )}
                {hasAddress && (
                  <li className="text-body-sm text-warm-white/60">
                    <span className="block text-xs text-gold mb-1">{t('contact.address')}</span>
                    {addressValue}
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-gold-dim pt-6 text-center sm:mt-16 sm:pt-8">
          <p className="text-caption leading-6 text-warm-white/40">
            {t('footer.copyright', { year: currentYear })}
          </p>

        </div>
      </Container>
    </footer>
  );
}

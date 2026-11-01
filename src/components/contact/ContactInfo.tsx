import { getTranslations } from 'next-intl/server';
import { MapPin, Phone, Mail } from 'lucide-react';
import { configuredSocialLinks } from '@/data/navigation';
import { isPlaceholderValue } from '@/lib/utils';
import type { Locale } from '@/types/common';

interface ContactInfoProps {
  locale: Locale;
}

export default async function ContactInfo({ locale }: ContactInfoProps) {
  const t = await getTranslations({ locale });
  const phoneValue = t('contact.phoneValue');
  const phoneHref = phoneValue.replace(/[^\d+]/g, '');
  const emailValue = t('contact.emailValue');
  const addressValue = t('contact.addressValue');
  const hasPhone = !isPlaceholderValue(phoneValue) && phoneHref.length >= 5;
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const hasAddress = !isPlaceholderValue(addressValue);

  if (!hasPhone && !hasEmail && !hasAddress && configuredSocialLinks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-heading-sm font-bold text-warm-white mb-8">
          {t('contact.infoLabel')}
        </h2>
        
        <ul className="space-y-6" role="list">
          {hasPhone && <li className="flex items-start gap-4">
            <div className="w-10 h-10 bg-charcoal border border-gold-dim flex items-center justify-center shrink-0 text-gold mt-1">
              <Phone size={18} />
            </div>
            <div>
              <span className="block text-xs font-semibold tracking-widest uppercase text-gray-muted mb-1">
                {t('contact.phone')}
              </span>
              <a href={`tel:${phoneHref}`} className="text-body-lg text-warm-white hover:text-gold transition-colors block" dir="ltr">
                {phoneValue}
              </a>
            </div>
          </li>}

          {hasEmail && <li className="flex items-start gap-4">
            <div className="w-10 h-10 bg-charcoal border border-gold-dim flex items-center justify-center shrink-0 text-gold mt-1">
              <Mail size={18} />
            </div>
            <div>
              <span className="block text-xs font-semibold tracking-widest uppercase text-gray-muted mb-1">
                {t('contact.email')}
              </span>
              <a href={`mailto:${emailValue}`} className="text-body-lg text-warm-white hover:text-gold transition-colors block">
                {emailValue}
              </a>
            </div>
          </li>}

          {hasAddress && <li className="flex items-start gap-4">
            <div className="w-10 h-10 bg-charcoal border border-gold-dim flex items-center justify-center shrink-0 text-gold mt-1">
              <MapPin size={18} />
            </div>
            <div>
              <span className="block text-xs font-semibold tracking-widest uppercase text-gray-muted mb-1">
                {t('contact.address')}
              </span>
              <span className="text-body-lg text-warm-white leading-relaxed block max-w-sm">
                {addressValue}
              </span>
            </div>
          </li>}
        </ul>
      </div>

      {configuredSocialLinks.length > 0 && <div>
        <h3 className="text-heading-sm font-bold text-warm-white mb-6">
          {t('contact.socialLabel')}
        </h3>
        <div className="flex gap-4">
          {configuredSocialLinks.map(({ platform, href }) => (
            <a
              key={platform}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium tracking-widest uppercase text-warm-white/60 hover:text-gold transition-colors border-b border-gold-dim hover:border-gold pb-1"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>}
    </div>
  );
}

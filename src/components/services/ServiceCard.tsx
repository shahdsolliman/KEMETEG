import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Service } from '@/types/service';
import type { Locale } from '@/types/common';

interface ServiceCardProps {
  service: Service;
  locale: Locale;
  index: number;
}

export default function ServiceCard({ service, locale, index }: ServiceCardProps) {
  const title = locale === 'ar' ? service.title.ar : service.title.en;
  const description = locale === 'ar' ? service.description.ar : service.description.en;

  // Dynamically resolve Lucide icon
  const IconComponent = ((LucideIcons as unknown) as Record<string, LucideIcon>)[service.icon] ?? undefined;

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col',
        'border border-gold-dim hover:border-gold-subtle',
        'p-5 transition-all duration-500 ease-premium hover:-translate-y-1 motion-reduce:transform-none sm:p-6 lg:p-7',
        'bg-charcoal/30 hover:bg-charcoal/50',
        'overflow-hidden'
      )}
      aria-labelledby={`service-title-${service.id}`}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 start-0 w-6 h-6 border-t-2 border-s-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 end-0 w-6 h-6 border-b-2 border-e-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      />

      {/* Index number — editorial decoration */}
      <span
        className="absolute top-5 end-5 select-none text-4xl font-bold text-warm-white/5 transition-colors group-hover:text-warm-white/10 sm:top-6 sm:end-6"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      {IconComponent && (
        <div className="mb-5 sm:mb-6">
          <div className="w-12 h-12 flex items-center justify-center border border-gold-dim group-hover:border-gold-subtle bg-black/30 transition-all duration-300">
            <IconComponent
              size={22}
              className="text-gold transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
      )}

      {/* Title */}
      <h3
        id={`service-title-${service.id}`}
        className="text-heading-sm font-semibold text-warm-white mb-3 group-hover:text-gold transition-colors duration-300"
      >
        {title}
      </h3>

      {/* Gold line */}
      <div className="w-6 h-px bg-gold mb-4 transition-all duration-500 group-hover:w-12" aria-hidden="true" />

      {/* Description */}
      <p className="text-body-sm text-gray-muted leading-relaxed flex-1">
        {description}
      </p>
    </article>
  );
}

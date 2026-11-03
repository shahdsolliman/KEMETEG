interface BrandLogoProps {
  /** Height of the wordmark lockup. */
  size?: number | string;
  layout?: 'horizontal' | 'stacked';
  className?: string;
  emblemSrc?: string;
  locale?: 'ar' | 'en';
}

export default function BrandLogo({
  size = 48,
  layout = 'horizontal',
  className = '',
  emblemSrc,
  locale = 'en',
}: BrandLogoProps) {
  const isStacked = layout === 'stacked';
  const wordmarkSize = isStacked ? '0.145em' : '0.32em';
  const stripeHeight = isStacked ? 'max(2px, 0.01305em)' : 'max(2px, 0.0288em)';

  return (
    <span
      className={`inline-flex shrink-0 items-center ${
        isStacked ? 'flex-col' : 'flex-row gap-[0.12em]'
      } ${className}`}
      dir={emblemSrc && !isStacked ? (locale === 'ar' ? 'rtl' : 'ltr') : undefined}
      style={{ fontSize: typeof size === 'number' ? `${size}px` : size }}
      aria-label="KEMET"
      role="img"
    >
      {emblemSrc && (
        <span
          className="h-[0.78em] w-[0.52em] shrink-0 bg-[rgb(var(--logo-text))]"
          style={{
            maskImage: `url("${emblemSrc}")`,
            WebkitMaskImage: `url("${emblemSrc}")`,
            transform: locale === 'en' ? 'scaleX(-1)' : undefined,
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
          }}
          aria-hidden="true"
        />
      )}
      <span className={`flex w-max flex-col ${isStacked ? 'items-center' : 'items-start'}`}>
        <span
          className="inline-block w-max whitespace-nowrap font-english font-medium leading-none tracking-[0.24em] text-[rgb(var(--logo-text))]"
          style={{ fontSize: wordmarkSize }}
          aria-hidden="true"
        >
          KEMET
        </span>
        <span
          className="flex w-full gap-[0.08em] overflow-hidden"
          style={{
            height: stripeHeight,
            marginTop: isStacked ? '0.0174em' : '0.0384em',
          }}
          aria-hidden="true"
        >
          <span className="flex-1 bg-[#000000]" />
          <span className="flex-1 bg-[#FFFFFF] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)]" />
          <span className="flex-1 bg-[#CE1126]" />
        </span>
      </span>
    </span>
  );
}

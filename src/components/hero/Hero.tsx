'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowDown } from 'lucide-react';
import type { Locale } from '@/types/common';
import useReducedMotion from '@/hooks/useReducedMotion';
import HeroMediaCarousel from './HeroMediaCarousel';

interface HeroProps {
  locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);
  const headline = t('hero.headline').split('\n');

  useEffect(() => {
    if (prefersReducedMotion || !contentRef.current) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const init = async () => {
      try {
        const { gsap } = await import('gsap');
        if (cancelled || !contentRef.current) return;

        ctx = gsap.context(() => {
          gsap.from(contentRef.current, {
            y: 28,
            opacity: 0,
            duration: 0.85,
            ease: 'power2.out',
          });
        }, contentRef);
      } catch (error) {
        if (!cancelled) console.error('Failed to initialize hero animation:', error);
      }
    };

    init();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      data-theme="dark"
      className="relative isolate flex min-h-[100svh] min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-black"
      aria-label="Hero section"
    >
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(135deg, rgb(var(--brand-green)) 0%, rgb(var(--brand-deep)) 78%)',
        }}
      />
      <HeroMediaCarousel />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(180deg, rgb(var(--hero-overlay) / 0.38) 0%, rgb(var(--hero-overlay) / 0.08) 28%, rgb(var(--hero-overlay) / 0.2) 53%, rgb(var(--hero-overlay) / 0.88) 100%), linear-gradient(90deg, rgb(var(--hero-overlay) / 0.5), transparent 85%)',
        }}
      />

      <div
        className="relative z-10 mx-auto flex min-h-[100svh] min-h-[100dvh] w-full max-w-7xl items-end px-5 pb-24 pt-32 sm:px-8 sm:pb-28 lg:px-12 lg:pb-32"
      >
        <div ref={contentRef} data-hero-content className="max-w-3xl text-start">
          <div
            className="mb-5 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.12em] text-[rgb(var(--hero-title-accent))] sm:mb-6 sm:text-sm"
          >
            <span className="h-px w-8 bg-[rgb(var(--hero-title-accent))]" />
            <span>{t('hero.tagline')}</span>
          </div>

          <h1
            className="mb-5 text-[clamp(2rem,7.4vw,4.75rem)] font-semibold leading-[1.45] tracking-normal sm:mb-6 sm:leading-[1.2]"
            aria-label={headline.join(' ')}
          >
            {headline.map((line, i) => (
              <span
                key={i}
                className={`block ${i === 0 ? 'text-white' : 'hero-title-accent'}`}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="mb-7 max-w-2xl text-base leading-[1.85] text-white/85 sm:mb-9 sm:text-lg sm:leading-relaxed">
            {t('hero.subtext')}
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <Link
              href={`/${locale}/projects`}
              className="btn-primary min-h-12 justify-center px-7 text-center text-sm shadow-lg shadow-black/20 sm:min-h-14 sm:text-base"
              id="hero-cta-projects"
            >
              {t('hero.ctaProjects')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex min-h-12 items-center justify-center border border-white/60 bg-black/10 px-7 text-center text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10 sm:min-h-14 sm:text-base"
              id="hero-cta-contact"
            >
              {t('hero.ctaContact')}
            </Link>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/65 transition-colors hover:text-white sm:bottom-7"
        aria-hidden="true"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" style={{ animationDuration: '2s' }} />
      </div>
    </section>
  );
}

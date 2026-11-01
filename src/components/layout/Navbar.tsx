'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems } from '@/data/navigation';
import type { Locale } from '@/types/common';
import BrandLogo from '@/components/layout/BrandLogo';

interface NavbarProps {
  locale: Locale;
}

type Theme = 'light' | 'dark';

function subscribeToTheme(onChange: () => void) {
  window.addEventListener('kemet-theme-change', onChange);
  return () => window.removeEventListener('kemet-theme-change', onChange);
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function getServerThemeSnapshot(): Theme {
  return 'dark';
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  // ── Scroll detection ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Close menu on outside click ─────────────────────────────────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [menuOpen]);

  // ── Lock body scroll when menu open ────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const alternateLocale: Locale = locale === 'ar' ? 'en' : 'ar';
  const lightNavbar = theme === 'dark';
  // Build alternate locale path
  const getAlternatePath = () => {
    const segments = pathname.split('/');
    segments[1] = alternateLocale;
    return segments.join('/') || `/${alternateLocale}`;
  };

  // Check if a nav item is active
  const isActive = (href: string) => {
    const localePath = `/${locale}${href === '/' ? '' : href}`;
    return pathname === localePath || (href !== '/' && pathname.startsWith(localePath));
  };

  return (
    <>
      {/* ── Main Navbar ───────────────────────────────────────────────────── */}
      <header
        role="banner"
        className={cn(
          'fixed inset-x-0 top-0 z-[100] w-full border-b backdrop-blur-xl transition-all duration-500',
          lightNavbar
            ? 'navbar-inverse-light border-black/10 text-[#192b22]'
            : 'navbar-inverse-dark border-white/10 text-white',
          scrolled
            ? 'py-2.5 shadow-xl shadow-black/15 sm:py-3'
            : 'py-3 shadow-md shadow-black/10 sm:py-4'
        )}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 min-[400px]:px-4 sm:gap-4 sm:px-6 lg:px-8"
        >
          {/* ── Brand Logo ──────────────────────────────────────────────── */}
          <Link
            href={`/${locale}`}
            className="flex items-center focus-visible:outline-gold transition-transform duration-300 hover:scale-[1.02]"
            aria-label="KEMET — Home"
          >
            <BrandLogo
              size="clamp(42px, 4vw, 56px)"
              emblemSrc="/images/logo/KemetHORSE-transparent.png"
              locale={locale}
              className={lightNavbar ? 'navbar-logo-on-light' : 'navbar-logo-on-dark'}
            />
          </Link>

          {/* ── Desktop Nav Links ───────────────────────────────────────── */}
          <ul className="hidden lg:flex items-center gap-8 xl:gap-10" role="list">
            {navItems.map((item) => {
              const label = t(item.labelKey);
              const href = `/${locale}${item.href === '/' ? '' : item.href}`;
              const active = isActive(item.href);

              return (
                <li key={item.labelKey}>
                  <Link
                    href={href}
                    className={cn(
                      'relative text-sm font-medium tracking-wide transition-colors duration-200 py-1',
                      'after:absolute after:bottom-0 after:inset-x-0 after:h-0.5',
                      'after:bg-gold after:scale-x-0 after:transition-transform after:duration-300 after:origin-start',
                      'hover:text-gold hover:after:scale-x-100',
                      active
                        ? 'text-gold after:scale-x-100 font-semibold'
                        : lightNavbar
                          ? 'text-[#192b22]/80'
                          : 'text-white/80'
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Right Controls (Language & Mobile Toggle) ───────────────── */}
          <div className="flex shrink-0 items-center gap-1.5 min-[400px]:gap-2.5 sm:gap-4">
            {/* Language switcher button */}
            <Link
              href={getAlternatePath()}
              className={cn(
                'inline-flex items-center gap-1.5',
                'text-xs font-semibold tracking-wider uppercase',
                lightNavbar
                  ? 'border-black/15 bg-white/35 text-[#192b22]/85 hover:border-black/30 hover:bg-white/60 hover:text-[#192b22]'
                  : 'border-white/25 bg-black/20 text-white/85 hover:border-white/45 hover:bg-black/35 hover:text-white',
                'whitespace-nowrap rounded-full border px-2 py-1.5 transition-all duration-300 min-[400px]:px-2.5 sm:px-3'
              )}
              aria-label={`Switch to ${alternateLocale === 'ar' ? 'Arabic' : 'English'}`}
            >
              <Globe size={13} className="text-gold" />
              <span>{t('nav.languageSwitcher')}</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className={cn(
                'lg:hidden p-2 rounded-lg',
                lightNavbar
                  ? 'border border-black/15 bg-white/35 text-[#192b22] hover:bg-white/60'
                  : 'border border-white/20 bg-black/20 text-white hover:bg-black/35',
                'flex h-10 w-10 items-center justify-center p-0 transition-colors duration-200 min-[400px]:h-11 min-[400px]:w-11',
                'focus-visible:outline-gold'
              )}
              aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Menu Drawer (100% Fluid & Responsive) ──────────────────── */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={cn(
          'mobile-menu fixed inset-y-0 end-0 w-[85vw] max-w-sm z-modal',
          'bg-black/98 backdrop-blur-2xl',
          'border-s border-gold/25 flex flex-col shadow-2xl',
          menuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'
        )}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {/* Header in mobile drawer */}
        <div className="flex items-center justify-between gap-4 border-b border-gold/15 bg-black/40 p-4 sm:p-6">
          <BrandLogo
            size={48}
            emblemSrc="/images/logo/KemetHORSE-transparent.png"
          />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="shrink-0 rounded-lg border border-gold/20 bg-charcoal/40 p-2 text-warm-white/70 transition-colors hover:text-gold"
            aria-label={t('nav.closeMenu')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav list */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
          <ul className="space-y-1" role="list">
            {navItems.map((item, i) => {
              const label = t(item.labelKey);
              const href = `/${locale}${item.href === '/' ? '' : item.href}`;
              const active = isActive(item.href);

              return (
                <li key={item.labelKey}>
                  <Link
                    href={href}
                    className={cn(
                      'flex items-center rounded-lg px-3 py-3 text-[15px] font-medium sm:py-3.5 sm:text-base',
                      'transition-all duration-200',
                      active
                        ? 'text-gold bg-gold/10 border-s-2 border-gold font-semibold'
                        : 'text-warm-white/80 hover:text-gold hover:bg-white/5'
                    )}
                    style={{ transitionDelay: `${i * 35}ms` }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {active && <span className="inline-block w-2 h-2 rounded-full bg-gold me-3 shrink-0 animate-pulse" />}
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Quick Contact & Action Buttons in Mobile Menu */}
          <div className="mt-6 space-y-3 border-t border-gold/20 pt-5 sm:mt-8 sm:pt-6">
            <Link
              href={`/${locale}/contact`}
              className="btn-primary min-h-12 w-full justify-center px-4 py-3 text-center text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.contact') || 'Contact Us'}
            </Link>

            {/* Language toggle inside drawer */}
            <Link
              href={getAlternatePath()}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-warm-white/10 bg-charcoal/60 px-4 py-2.5 text-xs font-semibold text-warm-white/70 transition-colors hover:text-gold"
              onClick={() => setMenuOpen(false)}
            >
              <Globe size={14} className="text-gold" />
              <span>{t('nav.languageSwitcher')}</span>
            </Link>
          </div>
        </nav>

        {/* Drawer Footer with Egyptian Flag accent */}
        <div className="flex items-center justify-between gap-4 border-t border-gold/10 bg-black/60 p-4 text-[11px] text-warm-white/40">
          <span>KEMET Contracting</span>
          <div className="flex w-12 gap-0.5" aria-label="Egyptian flag" role="img">
            <span className="h-1 flex-1 bg-[#000000]" />
            <span className="h-1 flex-1 bg-[#FFFFFF]" />
            <span className="h-1 flex-1 bg-[#CE1126]" />
          </div>
        </div>
      </div>

      {/* ── Mobile Backdrop ─────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="theme-backdrop fixed inset-0 z-[150] backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

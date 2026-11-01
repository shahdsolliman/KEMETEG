'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SectionThemeSync() {
  const pathname = usePathname();

  useEffect(() => {
    const themedSections = Array.from(
      document.querySelectorAll<HTMLElement>('main [data-theme], footer[data-theme]')
    );
    if (themedSections.length === 0) return;

    let frame = 0;
    const syncTheme = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      const activeSection = themedSections.reduce((closest, section) => {
        const bounds = section.getBoundingClientRect();
        const distance = Math.max(bounds.top - viewportCenter, 0, viewportCenter - bounds.bottom);
        const closestBounds = closest.getBoundingClientRect();
        const closestDistance = Math.max(
          closestBounds.top - viewportCenter,
          0,
          viewportCenter - closestBounds.bottom
        );
        return distance < closestDistance ? section : closest;
      });

      const theme = activeSection.dataset.theme;
      if (
        (theme === 'light' || theme === 'dark') &&
        document.documentElement.dataset.theme !== theme
      ) {
        document.documentElement.dataset.theme = theme;
        window.dispatchEvent(new Event('kemet-theme-change'));
      }
    };

    const scheduleSync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncTheme);
    };

    syncTheme();
    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync, { passive: true });

    return () => {
      window.removeEventListener('scroll', scheduleSync);
      window.removeEventListener('resize', scheduleSync);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}

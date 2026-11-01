'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';

/**
 * CustomCursor — desktop-only bespoke cursor.
 *
 * Default: small gold dot + larger ring
 * On project hover: ring expands, shows "VIEW PROJECT" text
 *
 * Disabled automatically on:
 * - Mobile/touch devices
 * - When CSS pointer: coarse (touchscreen)
 */
export default function CustomCursor() {
  const locale = useLocale();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number>(0);

  useEffect(() => {
    // Only run on pointer-fine devices (desktop) with large screens
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 1024) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.documentElement.classList.add('custom-cursor-active');

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    // Detect project card hover
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isOnProject =
        target.closest('.project-card') !== null ||
        target.closest('[data-cursor="project"]') !== null;
      const isOnLink =
        target.closest('a') !== null ||
        target.closest('button') !== null;

      setIsProject(isOnProject);
      setIsHovering(isOnLink || isOnProject);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    // Smooth ring follow with lerp
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
        ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animFrame.current);
    };
  }, [isVisible]);

  const projectLabel = locale === 'ar' ? 'مشاهدة' : 'VIEW';

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: 'translate(-50%, -50%)',
          width: isHovering ? '4px' : '8px',
          height: isHovering ? '4px' : '8px',
          transition: 'opacity 0.3s, width 0.3s, height 0.3s',
        }}
        aria-hidden="true"
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className={`cursor-ring ${isProject ? 'cursor-project' : isHovering ? 'cursor-hover' : ''}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.3s, width 0.4s, height 0.4s, background 0.4s, border-color 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-hidden="true"
      >
        {/* Project label inside ring */}
        {isProject && (
          <span
            ref={labelRef}
            style={{
              fontSize: '8px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'rgb(var(--gold))',
              textTransform: 'uppercase',
              opacity: isProject ? 1 : 0,
              transition: 'opacity 0.3s',
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {projectLabel}
          </span>
        )}
      </div>
    </>
  );
}

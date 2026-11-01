'use client';

import { useEffect, useRef } from 'react';
import useReducedMotion from '@/hooks/useReducedMotion';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Animation direction */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Distance to travel during reveal */
  distance?: number;
  /** Duration in ms */
  duration?: number;
  /** Intersection threshold 0-1 */
  threshold?: number;
  /** Trigger once or every time element enters */
  once?: boolean;
  as?: React.ElementType;
}

/**
 * FadeIn — Intersection Observer based fade/slide reveal.
 * Used for section content that animates in when scrolled into view.
 * Falls back to visible state if prefers-reduced-motion is on.
 */
export default function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 32,
  duration = 700,
  threshold = 0.15,
  once = true,
  as: Tag = 'div',
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If reduced motion — just show immediately
    if (prefersReducedMotion) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    // Set initial state
    const translateMap = {
      up:    `translateY(${distance}px)`,
      down:  `translateY(-${distance}px)`,
      left:  `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`,
      none:  'none',
    };

    el.style.opacity = '0';
    el.style.transform = translateMap[direction];
    el.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
    el.style.willChange = 'opacity, transform';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            if (once) {
              observer.disconnect();
              // Clean up will-change after animation
              setTimeout(() => {
                el.style.willChange = 'auto';
              }, duration + delay + 100);
            }
          } else if (!once) {
            el.style.opacity = '0';
            el.style.transform = translateMap[direction];
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion, delay, direction, distance, duration, threshold, once]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

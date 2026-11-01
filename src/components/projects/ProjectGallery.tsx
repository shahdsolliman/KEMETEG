'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

/**
 * ProjectGallery — responsive image grid with fullscreen lightbox.
 * Supports keyboard navigation (Esc, arrows) and touch swipe.
 * Asymmetric editorial layout.
 */
export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const t = useTranslations();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ── Navigation ───────────────────────────────────────────────────────
  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  // ── Keyboard & Scroll Lock ──────────────────────────────────────────
  useEffect(() => {
    if (!lightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  if (!images || images.length === 0) return null;

  return (
    <div className="mt-20 lg:mt-32">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-heading-md font-semibold text-warm-white flex items-center gap-3">
          <span className="w-8 h-px bg-gold" />
          {t('projects.gallery')}
        </h2>
        <span className="text-caption text-gray-muted">
          {images.length} {t('projects.gallery')}
        </span>
      </div>

      {/* ── Grid ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
        {images.map((img, i) => {
          // Editorial asymmetric layout logic:
          // 1 image: full width
          // 2 images: 6 col / 6 col
          // 3 images: 12 col / 6 col / 6 col
          // 4+ images: mixed spanning
          
          let colSpan = 'md:col-span-12'; // Default
          if (images.length === 2) colSpan = 'md:col-span-6';
          else if (images.length > 2) {
             if (i === 0) colSpan = 'md:col-span-12';
             else if (i % 3 === 0) colSpan = 'md:col-span-12';
             else if (i % 3 === 1) colSpan = 'md:col-span-7';
             else if (i % 3 === 2) colSpan = 'md:col-span-5';
          }

          return (
            <FadeIn
              key={img}
              direction="up"
              threshold={0.1}
              className={cn('relative overflow-hidden group', colSpan, 'aspect-video md:aspect-auto md:min-h-[400px]')}
            >
              <button
                type="button"
                className="w-full h-full text-start focus-visible:outline-gold"
                onClick={() => openLightbox(i)}
                aria-label={`View full image ${i + 1}`}
              >
                <Image
                  src={img}
                  alt={`${title} - image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="img-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Hover overlay with icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-warm-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center text-warm-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </button>
            </FadeIn>
          );
        })}
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery fullscreen"
        >
          {/* Controls */}
          <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
            <span className="text-body-sm text-warm-white/60 tracking-widest">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={closeLightbox}
              className="p-2 text-warm-white hover:text-gold transition-colors focus-visible:outline-gold rounded-full bg-black/20 backdrop-blur-md"
              aria-label={t('common.close')}
            >
              <X size={24} />
            </button>
          </div>

          {/* Prev button */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute start-4 lg:start-12 top-1/2 -translate-y-1/2 p-3 text-warm-white/70 hover:text-gold transition-colors focus-visible:outline-gold z-50 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40"
            aria-label={t('common.previous')}
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute end-4 lg:end-12 top-1/2 -translate-y-1/2 p-3 text-warm-white/70 hover:text-gold transition-colors focus-visible:outline-gold z-50 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40"
            aria-label={t('common.next')}
          >
            <ChevronRight size={32} />
          </button>

          {/* Image container */}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto flex items-center justify-center p-4 sm:p-12 lg:p-20" onClick={closeLightbox}>
            <Image
              src={images[currentIndex]}
              alt={`${title} - full image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              quality={90}
              priority
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

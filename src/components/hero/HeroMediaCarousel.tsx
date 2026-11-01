'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const slides = [
  '/images/Hero/5.mp4',
  '/images/Hero/6.mp4',
] as const;

export default function HeroMediaCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.paused) return;

    video.muted = true;
    video.defaultMuted = true;
    video.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      console.error('Failed to play hero carousel video:', error);
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    startPlayback();
  }, [activeIndex, startPlayback]);

  const slide = slides[activeIndex];

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <video
        key={slide}
        ref={videoRef}
        src={slide}
        autoPlay
        muted
        controls={false}
        loop
        playsInline
        preload="auto"
        onCanPlay={startPlayback}
        className="hero-background-video absolute inset-0 z-0 h-full w-full animate-fade-in object-cover"
      />
    </div>
  );
}

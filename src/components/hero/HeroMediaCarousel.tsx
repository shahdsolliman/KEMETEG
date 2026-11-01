'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const slides = [
  { video: '/images/Hero/5.mp4', poster: '/images/Hero/5-poster.webp' },
  { video: '/images/Hero/6.mp4', poster: '/images/Hero/6-poster.webp' },
] as const;

export default function HeroMediaCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [blockedVideo, setBlockedVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.paused) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('webkit-playsinline', '');
    video.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setBlockedVideo(video.getAttribute('src'));
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
  const isPlaying = playingVideo === slide.video;
  const playbackBlocked = blockedVideo === slide.video;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {!playbackBlocked && (
        <video
          key={slide.video}
          ref={videoRef}
          src={slide.video}
          poster={slide.poster}
          autoPlay
          muted
          controls={false}
          loop
          playsInline
          webkit-playsinline=""
          preload="auto"
          onCanPlay={startPlayback}
          onPlaying={() => {
            setBlockedVideo((current) =>
              current === slide.video ? null : current
            );
            setPlayingVideo(slide.video);
          }}
          onPause={() =>
            setPlayingVideo((current) =>
              current === slide.video ? null : current
            )
          }
          className={`hero-background-video absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-300 ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      <Image
        src={slide.poster}
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-0 z-0 object-cover"
        aria-hidden="true"
      />
    </div>
  );
}

"use client"; // IntersectionObserver, video control, connection-aware logic

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { analytics } from "@/lib/analytics";

const FALLBACK_TIMEOUT_MS = 4000;

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showUnmute, setShowUnmute] = useState(false);
  const [srcLoaded, setSrcLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [slowConnection] = useState(() => {
    if (typeof navigator === "undefined") return false;
    // @ts-expect-error -- effectiveType is not in all TS libs
    const conn = navigator.connection as { effectiveType?: string } | undefined;
    return !!(conn?.effectiveType && ["slow-2g", "2g", "3g"].includes(conn.effectiveType));
  });
  const playFiredRef = useRef(false);
  const progressFiredRef = useRef(new Set<25 | 50 | 75 | 100>());
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.duration === 0) return;
    const pct = (video.currentTime / video.duration) * 100;
    const thresholds: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100];
    for (const t of thresholds) {
      if (pct >= t && !progressFiredRef.current.has(t)) {
        progressFiredRef.current.add(t);
        analytics.videoProgress(t);
      }
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const ratio = entry.intersectionRatio;

        if (ratio >= 0.4 && !visible) {
          setVisible(true);
          setSrcLoaded(true); // lazy-load the video src
          analytics.videoVisible();

          // Start fallback timer
          fallbackTimerRef.current = setTimeout(() => {
            if (!playFiredRef.current) setError(true);
          }, FALLBACK_TIMEOUT_MS);
        }

        if (ratio >= 0.6 && !playFiredRef.current && !reducedMotion && !slowConnection) {
          playFiredRef.current = true;
          setShowUnmute(true);
          analytics.videoPlay();
          videoRef.current?.play().catch(() => setError(true));
        }
      },
      { threshold: [0, 0.4, 0.6] },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    };
  }, [visible, reducedMotion, slowConnection]);

  function handleUnmute() {
    if (videoRef.current) videoRef.current.muted = false;
    setMuted(false);
    setShowUnmute(false);
    analytics.videoUnmute();
  }

  function handlePlay() {
    if (playFiredRef.current) return;
    playFiredRef.current = true;
    setShowUnmute(true);
    analytics.videoPlay();
  }

  function handleVideoError() {
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    setError(true);
  }

  const canAutoplay = !reducedMotion && !slowConnection;
  const showPlayButton = !playing || reducedMotion || slowConnection || error;

  return (
    <section
      id="tour"
      aria-labelledby="section-tour"
      ref={sectionRef}
      className={`bg-ink text-paper py-section-mobile md:py-section transition-[opacity,transform] duration-[600ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <h2
          id="section-tour"
          className="font-display font-semibold text-h2-mobile md:text-h2 mb-3 text-center"
        >
          A 90-second tour
        </h2>
        <p className="font-body text-body-mobile text-paper/70 text-center mb-10">
          What you get when you subscribe, in less time than it takes to make coffee.
        </p>

        <div className="relative max-w-[960px] mx-auto aspect-video bg-ink/50 overflow-hidden rounded-sm">
          {!error ? (
            <>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                playsInline
                controls={canAutoplay}
                preload="none"
                poster="/poster.jpg"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onError={handleVideoError}
                onTimeUpdate={handleTimeUpdate}
                onCanPlay={() => {
                  if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
                  handlePlay();
                }}
              >
                {srcLoaded && (
                  <>
                    <source src="/intro.webm" type="video/webm" />
                    <source src="/intro.mp4" type="video/mp4" />
                  </>
                )}
                {/* TODO: replace with real captions */}
                <track kind="captions" srcLang="en" label="English" src="/captions.vtt" default />
              </video>

              {/* Play button overlay for reduced-motion / slow connection */}
              {showPlayButton && !playing && (
                <button
                  className="absolute inset-0 flex items-center justify-center bg-ink/30 hover:bg-ink/50 transition-colors"
                  aria-label="Play video"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = muted;
                      videoRef.current.play().catch(() => setError(true));
                    }
                    setSrcLoaded(true);
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-paper/90 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-ink ml-1"
                      aria-hidden="true"
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </button>
              )}

              {/* Unmute pill */}
              {showUnmute && muted && playing && (
                <button
                  className="absolute bottom-3 right-3 px-3 py-1 bg-ink/80 text-paper font-body text-small rounded-full hover:bg-ink transition-colors"
                  onClick={handleUnmute}
                >
                  Unmute
                </button>
              )}
            </>
          ) : (
            /* Fallback: poster + YouTube link */
            <div className="relative w-full h-full">
              <Image src="/poster.jpg" alt="Video preview" fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/30">
                <a
                  href="https://youtube.com/" // TODO: real YouTube URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-paper text-ink font-body text-sm rounded hover:opacity-90 transition-opacity"
                >
                  Watch on YouTube →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

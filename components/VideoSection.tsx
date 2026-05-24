"use client"; // IntersectionObserver for lazy-loading the iframe

import { useEffect, useRef, useState } from "react";
import { analytics } from "@/lib/analytics";

const YOUTUBE_ID = "P90X9xxm1gc";

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.intersectionRatio >= 0.4 && !visible) {
          setVisible(true);
          analytics.videoVisible();
        }
      },
      { threshold: [0, 0.4] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <section
      id="tour"
      aria-labelledby="section-tour"
      ref={sectionRef}
      className={`bg-paper text-ink py-section-mobile md:py-section transition-[opacity,transform] duration-[600ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
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
        <p className="font-body text-body-mobile text-ink/70 text-center mb-10">
          What you get when you subscribe, in less time than it takes to make coffee.
        </p>

        <div className="relative max-w-[960px] mx-auto aspect-video bg-[#1a1a1a] overflow-hidden rounded-sm">
          {visible && (
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1${loaded ? "" : "&autoplay=0"}`}
              title="A 90-second tour of AI Daily"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              onLoad={() => {
                if (!loaded) {
                  setLoaded(true);
                  analytics.videoPlay();
                }
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

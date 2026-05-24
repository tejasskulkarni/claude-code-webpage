"use client"; // IntersectionObserver is a browser API

import { useEffect, useRef, useState, ElementType } from "react";

interface RevealProps {
  children: React.ReactNode;
  threshold?: number;
  as?: ElementType;
  className?: string;
}

export default function Reveal({
  children,
  threshold = 0.4,
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (reducedMotion) return; // no observer needed — show immediately

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, reducedMotion]);

  const isVisible = reducedMotion || visible;

  return (
    <Tag
      ref={ref}
      className={[
        className,
        "transition-[opacity,transform]",
        "duration-[600ms]",
        "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface HeroPortraitProps {
  sizes: string;
  className?: string;
}

export default function HeroPortrait({
  sizes,
  className = "",
}: HeroPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [glitching, setGlitching] = useState(false);
  const settleTimerRef = useRef<number | null>(null);
  const hasLeftViewportRef = useRef(false);

  const triggerGlitch = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
    }
    setGlitching(false);
    requestAnimationFrame(() => {
      setGlitching(true);
      settleTimerRef.current = window.setTimeout(() => {
        setGlitching(false);
      }, 1050);
    });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let loaderSeen = false;
    try {
      loaderSeen = sessionStorage.getItem("pubudu-loader-seen") === "1";
    } catch {
      loaderSeen = false;
    }

    // Initial entrance glitch (delayed slightly if PageLoader curtain is running)
    const startTimer = window.setTimeout(
      () => triggerGlitch(),
      loaderSeen ? 250 : 1250
    );

    // Periodic subtle glitch pulse every 10 seconds
    const intervalId = window.setInterval(() => {
      triggerGlitch();
    }, 10000);

    // Re-trigger glitch when scrolling down and coming back up to the hero
    const el = containerRef.current;
    let observer: IntersectionObserver | null = null;
    if (el) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              hasLeftViewportRef.current = true;
            } else if (hasLeftViewportRef.current) {
              hasLeftViewportRef.current = false;
              triggerGlitch();
            }
          }
        },
        { threshold: 0.25 }
      );
      observer.observe(el);
    }

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(intervalId);
      observer?.disconnect();
      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
      }
    };
  }, [triggerGlitch]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={triggerGlitch}
      className="relative w-full h-full pointer-events-auto"
    >
      {/* Base crisp portrait */}
      <Image
        src="/images/hero-portrait.jpg"
        alt="Pubudu H. editorial portrait"
        fill
        priority
        loading="eager"
        sizes={sizes}
        className={`${className} ${glitching ? "hero-glitch-base" : ""}`}
      />

      {/* Crisp RGB / slice glitch layers */}
      {glitching && (
        <>
          <Image
            src="/images/hero-portrait.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes={sizes}
            className={`${className} hero-glitch-slice-a pointer-events-none`}
          />
          <Image
            src="/images/hero-portrait.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes={sizes}
            className={`${className} hero-glitch-slice-b pointer-events-none`}
          />
        </>
      )}
    </div>
  );
}

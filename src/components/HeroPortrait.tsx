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
  const [glitching, setGlitching] = useState(false);
  const settleTimerRef = useRef<number | null>(null);

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

    // Start right as the PageLoader curtain clears the portrait
    const startTimer = window.setTimeout(() => {
      triggerGlitch();
    }, 1250);

    return () => {
      window.clearTimeout(startTimer);
      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
      }
    };
  }, [triggerGlitch]);

  return (
    <div
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

      {/* Crisp RGB / slice glitch layers on entrance & hover */}
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

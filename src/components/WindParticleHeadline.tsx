"use client";

import { useEffect, useState } from "react";

interface WindParticleHeadlineProps {
  words: readonly string[];
  paused?: boolean;
  holdDurationMs?: number;
  className?: string;
}

const TRANSITION_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function WindParticleHeadline({
  words,
  paused = false,
  holdDurationMs = 3000,
  className = "",
}: WindParticleHeadlineProps) {
  const [indices, setIndices] = useState({ current: 0, previous: -1 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || paused || words.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndices((prev) => ({
        current: (prev.current + 1) % words.length,
        previous: prev.current,
      }));
    }, holdDurationMs);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, paused, holdDurationMs, words.length]);

  const longestWord = words.reduce(
    (longest, current) => (current.length > longest.length ? current : longest),
    words[0] ?? ""
  );

  const visibleIndex = prefersReducedMotion ? 0 : indices.current;
  const exitingIndex = prefersReducedMotion ? -1 : indices.previous;

  return (
    <span
      aria-hidden="true"
      className={`relative inline-grid align-bottom overflow-hidden py-[0.06em] ${className}`}
    >
      {/* Invisible sizer reserving exact width/height for the longest word at every breakpoint */}
      <span className="col-start-1 row-start-1 invisible pointer-events-none select-none">
        {longestWord}
      </span>

      {words.map((word, wIdx) => {
        const isActive = wIdx === visibleIndex;
        const isExiting = wIdx === exitingIndex;
        const shouldAnimate = !prefersReducedMotion && (isActive || isExiting);
        const chars = word.split("");

        return (
          <span
            key={word}
            className={`col-start-1 row-start-1 inline-flex ${
              isActive ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {chars.map((char, cIdx) => {
              const delayMs = isActive ? cIdx * 34 : cIdx * 20;
              const translateY = isActive
                ? "0%"
                : isExiting
                  ? "-108%"
                  : "108%";

              return (
                <span
                  key={`${word}-${cIdx}`}
                  style={{
                    display: "inline-block",
                    transform: `translate3d(0, ${translateY}, 0)`,
                    opacity: isActive ? 1 : 0,
                    filter: isActive ? "blur(0px)" : "blur(6px)",
                    transitionProperty: shouldAnimate
                      ? "transform, opacity, filter"
                      : "none",
                    transitionDuration: shouldAnimate ? "680ms" : "0ms",
                    transitionTimingFunction: TRANSITION_EASE,
                    transitionDelay: shouldAnimate ? `${delayMs}ms` : "0ms",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

"use client";

import { useEffect, useState } from "react";

interface AvailabilityRotatorProps {
  items: readonly string[];
  intervalMs?: number;
}

export default function AvailabilityRotator({
  items,
  intervalMs = 3200,
}: AvailabilityRotatorProps) {
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
    if (prefersReducedMotion || items.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndices((prev) => ({
        current: (prev.current + 1) % items.length,
        previous: prev.current,
      }));
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, intervalMs, items.length]);

  const longestItem = items.reduce(
    (longest, cur) => (cur.length > longest.length ? cur : longest),
    items[0] ?? ""
  );

  const visibleIndex = prefersReducedMotion ? 0 : indices.current;
  const exitingIndex = prefersReducedMotion ? -1 : indices.previous;

  return (
    <span className="relative inline-grid overflow-hidden align-bottom py-0.5">
      {/* Invisible sizer so layout below never shifts */}
      <span
        aria-hidden="true"
        className="col-start-1 row-start-1 invisible pointer-events-none select-none"
      >
        {longestItem}
      </span>

      {items.map((item, idx) => {
        const isActive = idx === visibleIndex;
        const isExiting = idx === exitingIndex;
        const shouldAnimate = !prefersReducedMotion && (isActive || isExiting);
        const translateY = isActive ? "0%" : isExiting ? "-105%" : "105%";

        return (
          <span
            key={item}
            aria-hidden={!isActive}
            className="col-start-1 row-start-1 block"
            style={{
              transform: `translate3d(0, ${translateY}, 0)`,
              opacity: isActive ? 1 : 0,
              filter: isActive ? "blur(0px)" : "blur(4px)",
              transitionProperty: shouldAnimate
                ? "transform, opacity, filter"
                : "none",
              transitionDuration: shouldAnimate ? "620ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {item}
          </span>
        );
      })}
    </span>
  );
}

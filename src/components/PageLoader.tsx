"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("pubudu-loader-seen") === "1";
    } catch {
      alreadySeen = false;
    }

    if (prefersReducedMotion || alreadySeen) {
      const frame = requestAnimationFrame(() => setDone(true));
      return () => cancelAnimationFrame(frame);
    }

    try {
      sessionStorage.setItem("pubudu-loader-seen", "1");
    } catch {
      // Ignore storage errors in restricted browsing modes
    }

    const durationMs = 850;
    const start = performance.now();
    let rafId = 0;
    let exitTimer = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        exitTimer = window.setTimeout(() => setDone(true), 620);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(exitTimer);
    };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#141414] text-white transition-transform duration-[620ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
        exiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Minimal Brand Mark */}
        <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/15">
          <Image
            src="/images/logo.png"
            alt="Pubudu H."
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>

        {/* Hairline Progress Bar + Whisper-Clean Counter */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-44 h-[1.5px] bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#E85D04] to-[#FF7B00] transition-[width] duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-[11px] font-medium tracking-[0.26em] text-white/55 tabular-nums">
            {String(progress).padStart(2, "0")}%
          </span>
        </div>
      </div>
    </div>
  );
}

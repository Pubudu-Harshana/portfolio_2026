"use client";

import { useEffect, useState } from "react";
import { CLIENT_REVIEWS } from "@/data/portfolio";

const ROTATE_MS = 5000;

export default function HeroTestimonialCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || hovered || CLIENT_REVIEWS.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CLIENT_REVIEWS.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, hovered]);

  const currentIndex = prefersReducedMotion ? 0 : activeIndex;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full sm:w-[300px] rounded-2xl bg-[#F6F6F6] border border-[#ECECEC] p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div
          aria-hidden="true"
          className="font-display text-3xl leading-none text-[#E85D04] select-none"
        >
          &ldquo;
        </div>

        {/* Subtle review switcher dots */}
        {CLIENT_REVIEWS.length > 1 && (
          <div className="flex items-center gap-1.5">
            {CLIENT_REVIEWS.map((review, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={review.name}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Show review by ${review.name}`}
                  aria-pressed={active}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04] ${
                    active ? "w-4 bg-[#E85D04]" : "w-1.5 bg-[#D4D4D4] hover:bg-[#A3A3A3]"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Grid stack reserves height for the longest review so the card never jumps */}
      <div className="mt-1 grid">
        {CLIENT_REVIEWS.map((review, idx) => {
          const active = idx === currentIndex;
          return (
            <div
              key={review.name}
              aria-hidden={!active}
              className={`col-start-1 row-start-1 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                active
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-1.5 pointer-events-none"
              }`}
            >
              <p className="text-xs leading-relaxed text-[#3D3D3D] line-clamp-3">
                {review.quote}
              </p>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold tracking-wider uppercase text-[#141414]">
                    {review.name}
                  </div>
                  <div className="text-[10px] font-medium tracking-wider uppercase text-[#8A8A8A]">
                    {review.role}
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  className="w-8 h-8 rounded-full bg-[#E85D04] text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-[#E85D04]/25 shrink-0 select-none"
                >
                  {review.initials}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

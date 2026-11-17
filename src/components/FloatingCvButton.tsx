"use client";

import { useEffect, useState } from "react";
import { FileDown } from "lucide-react";
import { PROFILE } from "@/data/portfolio";

export default function FloatingCvButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      // Appear once the hero (and its bottom-right testimonial card) is mostly scrolled past
      const shouldShow = window.scrollY > window.innerHeight * 0.75;
      setVisible((prev) => (prev === shouldShow ? prev : shouldShow));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <a
      href={PROFILE.cvUrl}
      download="Pubudu_Harshana_CV_2026.pdf"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download CV"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 inline-flex items-center gap-2 rounded-full bg-[#E85D04] hover:bg-[#141414] text-white px-4 py-3 sm:px-5 text-xs font-bold tracking-[0.12em] uppercase shadow-[0_14px_30px_rgba(232,93,4,0.35)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414] print:hidden ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <FileDown className="w-4 h-4" />
      <span className="hidden sm:inline">Download CV</span>
    </a>
  );
}

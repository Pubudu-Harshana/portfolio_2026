"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, Pause, Play, X } from "lucide-react";
import LinkedInIcon from "@/components/LinkedInIcon";
import HeroPortrait from "@/components/HeroPortrait";
import WindParticleHeadline from "@/components/WindParticleHeadline";
import { PROFILE } from "@/data/portfolio";

const NAV_LINKS = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "CONTACT", href: "#contact" },
];

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] lg:min-h-[760px] lg:h-[100svh] lg:max-h-[940px] bg-white overflow-hidden">
      {/* Desktop Split Background: 50% burnt orange left, 50% pure white right */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-1/2 hero-orange-gradient" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-white" />
      </div>

      {/* Centered Editorial Portrait straddling the 50/50 split on desktop */}
      <div className="hidden lg:flex absolute inset-0 items-end justify-center pointer-events-none z-10">
        <div
          className="relative w-[min(74vw,880px)] h-[92%] max-h-[820px]"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          <HeroPortrait
            sizes="(max-width: 1280px) 74vw, 880px"
            className="object-contain object-bottom select-none"
          />
        </div>
      </div>

      {/* Foreground Content Grid */}
      <div className="relative z-20 mx-auto max-w-[1440px] h-full px-6 sm:px-10 lg:px-14 py-7 lg:py-10 flex flex-col justify-between">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between gap-4">
          {/* Brand Mark */}
          <Link
            href="#"
            className="inline-flex items-center gap-2.5 group z-30 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E85D04] lg:focus-visible:outline-white"
            aria-label="Pubudu H. Home"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm ring-1 ring-black/10 lg:ring-white/25 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Pubudu H. Logo"
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#141414] lg:text-white">
              {PROFILE.brandName}
            </span>
          </Link>

          {/* Desktop Nav Links (on the white right side) */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 lg:gap-8"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[11px] font-semibold tracking-[0.16em] text-[#333333] hover:text-[#E85D04] transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E85D04]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Trigger (hidden on md+ where desktop links are visible) */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="md:hidden w-10 h-10 rounded-full bg-[#F3F3F3] hover:bg-[#E85D04] text-[#141414] hover:text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Mobile Hero Portrait Card */}
        <div className="lg:hidden mt-6 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
          <HeroPortrait
            sizes="(max-width: 1024px) 100vw, 880px"
            className="object-cover object-center"
          />
        </div>

        {/* Main Hero Split Body */}
        <div className="my-auto py-8 lg:py-0 grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
          {/* Left Column (Orange Side on Desktop, Warm Card on Mobile) */}
          <div className="min-w-0 lg:col-span-5 rounded-3xl lg:rounded-none hero-mobile-orange p-6 sm:p-9 lg:p-0 text-white">
            <div className="flex items-center gap-2.5">
              <p className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-white/90">
                {PROFILE.heroRoleLabel}
              </p>
              {!prefersReducedMotion && (
                <button
                  type="button"
                  onClick={() => setIsPaused((prev) => !prev)}
                  aria-pressed={isPaused}
                  aria-label={
                    isPaused
                      ? "Resume headline rotation"
                      : "Pause headline rotation"
                  }
                  title={isPaused ? "Resume animation" : "Pause animation"}
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {isPaused ? (
                    <Play className="w-3 h-3 fill-current" />
                  ) : (
                    <Pause className="w-3 h-3 fill-current" />
                  )}
                </button>
              )}
            </div>

            {/* Stable accessible H1 with WindParticleHeadline */}
            <h1
              aria-label="Design, Develop, Launch"
              className="mt-3 font-display text-[clamp(3.6rem,7.5vw,7.75rem)] leading-[0.9] tracking-[0.01em] uppercase drop-shadow-sm select-none"
            >
              <span className="sr-only">Design, Develop, Launch</span>
              <WindParticleHeadline
                words={PROFILE.heroRotatingWords}
                paused={isPaused}
                holdDurationMs={3000}
              />
            </h1>

            <p className="mt-5 text-base sm:text-[17px] leading-relaxed text-white/95 font-medium max-w-md">
              {PROFILE.heroSupportingCopy}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-[#141414] px-6 py-3.5 text-xs font-bold tracking-[0.12em] uppercase shadow-[0_14px_30px_rgba(0,0,0,0.18)] hover:bg-[#141414] hover:text-white transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore My Work
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm text-white px-6 py-3.5 text-xs font-bold tracking-[0.12em] uppercase hover:bg-white hover:text-[#141414] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>

          {/* Center Spacer for Portrait */}
          <div className="hidden lg:block lg:col-span-4" />

          {/* Right Column (White Side) */}
          <div className="lg:col-span-3 flex flex-col items-start lg:pl-8">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-[#6B6B6B] uppercase">
              <span>{PROFILE.availabilityLabel}</span>
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E85D04] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E85D04]" />
              </span>
            </div>

            <h2 className="mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-[#141414] leading-[1.15]">
              Freelance
              <br />
              Projects
            </h2>

            <p className="mt-2.5 text-sm leading-relaxed text-[#6B6B6B] max-w-[230px]">
              {PROFILE.availabilitySubtitle}
            </p>

            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#E85D04] hover:bg-[#FFF5EE] px-4 py-2.5 text-xs font-semibold text-[#141414] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-[#E85D04]" />
              <span>Connect on LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#6B6B6B]" />
            </a>
          </div>
        </div>

        {/* Bottom Row: Trusted Avatars (Left) + Testimonial Card (Right) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          {/* Trusted By Avatar Stack */}
          <div className="flex flex-col gap-2.5 lg:text-white text-[#141414]">
            <div className="flex items-center -space-x-2.5">
              {[
                "/images/about-1.jpg",
                "/images/about-2.jpg",
                "/images/about-3.jpg",
              ].map((src, idx) => (
                <div
                  key={src}
                  className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-white shadow-sm"
                >
                  <Image
                    src={src}
                    alt={`Collaborator ${idx + 1}`}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="w-9 h-9 rounded-full bg-[#F28C38] lg:bg-white/25 backdrop-blur-sm text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white">
                +12
              </div>
            </div>
            <p className="text-xs leading-snug lg:text-white/90 text-[#525252] max-w-[210px]">
              Trusted by forward-thinking teams &amp; founders worldwide.
            </p>
          </div>

          {/* Bottom-Right Testimonial Card */}
          <div className="w-full sm:w-[290px] rounded-2xl bg-[#F6F6F6] border border-[#ECECEC] p-5 shadow-sm">
            <div className="font-display text-3xl leading-none text-[#E85D04] select-none">
              &ldquo;
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[#3D3D3D]">
              {PROFILE.testimonial.quote}
            </p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-bold tracking-wider text-[#141414]">
                  {PROFILE.testimonial.author}
                </div>
                <div className="text-[10px] font-medium tracking-wider text-[#8A8A8A]">
                  {PROFILE.testimonial.role}
                </div>
              </div>
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#E85D04]/30">
                <Image
                  src="/images/hero-portrait.jpg"
                  alt={PROFILE.testimonial.author}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-Over Quick Menu Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="w-full max-w-sm bg-white h-full p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold tracking-wider uppercase text-[#E85D04]">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-9 h-9 rounded-full bg-[#F3F3F3] hover:bg-[#141414] hover:text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-10 flex flex-col gap-5">
                {NAV_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-4xl tracking-wide text-[#141414] hover:text-[#E85D04] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E85D04]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-[#EAEAEA] pt-6 flex flex-col gap-3">
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between rounded-xl bg-[#141414] text-white px-4 py-3 text-sm font-semibold hover:bg-[#E85D04] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]"
              >
                <span className="inline-flex items-center gap-2">
                  <LinkedInIcon className="w-4 h-4" />
                  Connect on LinkedIn
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-[#6B6B6B]">{PROFILE.location}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

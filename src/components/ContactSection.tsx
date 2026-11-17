"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Mail, Send } from "lucide-react";
import LinkedInIcon from "@/components/LinkedInIcon";
import {
  BehanceIcon,
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/SocialIcons";
import Reveal from "@/components/Reveal";
import { PROFILE } from "@/data/portfolio";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // Honeypot
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedMode, setSubmittedMode] = useState<
    "delivered" | "fallback" | null
  >(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim() || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        mode?: "delivered" | "fallback" | "accepted";
        error?: string;
      };

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmittedMode(data.mode === "delivered" ? "delivered" : "fallback");
    } catch {
      setError("Network error. Please use WhatsApp or direct email below.");
    } finally {
      setSubmitting(false);
    }
  };

  const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `Portfolio Enquiry from ${name || "Client"}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  )}`;

  const socialButtons = [
    {
      label: "GitHub",
      href: PROFILE.githubUrl,
      icon: <GitHubIcon className="w-4 h-4" />,
    },
    {
      label: "LinkedIn",
      href: PROFILE.linkedinUrl,
      icon: <LinkedInIcon className="w-4 h-4" />,
    },
    {
      label: "Behance",
      href: PROFILE.behanceUrl,
      icon: <BehanceIcon className="w-4 h-4" />,
    },
    {
      label: "Instagram",
      href: PROFILE.instagramUrl,
      icon: <InstagramIcon className="w-4 h-4" />,
    },
    {
      label: "Facebook",
      href: PROFILE.facebookUrl,
      icon: <FacebookIcon className="w-4 h-4" />,
    },
    {
      label: `WhatsApp (${PROFILE.whatsappDisplay})`,
      href: PROFILE.whatsappUrl,
      icon: <WhatsAppIcon className="w-4 h-4" />,
    },
  ];

  return (
    <footer id="contact" className="bg-white pt-24 pb-12">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal
          direction="up"
          className="rounded-[2rem] overflow-hidden border border-[#EAE6E1] shadow-xl grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left: High-Impact Burnt Orange CTA Panel */}
          <div className="lg:col-span-6 hero-orange-gradient p-8 sm:p-12 lg:p-14 text-white flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-white/85">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Let&apos;s Collaborate
              </span>
              <h2 className="mt-4 font-display text-5xl sm:text-6xl uppercase leading-[0.94]">
                Have an idea worth building?
              </h2>
              <p className="mt-5 text-base text-white/90 leading-relaxed max-w-md">
                Whether you need a standout Next.js web app, a clean brand
                redesign, or a product partner from zero to launch—let&apos;s
                talk.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href={PROFILE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#141414] hover:bg-[#141414] hover:text-white px-6 py-3.5 text-xs font-bold tracking-[0.1em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  WhatsApp · {PROFILE.whatsappDisplay}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 text-xs font-bold tracking-[0.1em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Mail className="w-4 h-4" />
                  {PROFILE.email}
                </a>
              </div>

              {/* Consistent Circular Icon-Only Social Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                {socialButtons.slice(0, 5).map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="w-10 h-10 rounded-full bg-black/20 hover:bg-white text-white hover:text-[#141414] flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Clean Inquiry Form */}
          <div className="lg:col-span-6 bg-[#FAF8F6] p-8 sm:p-12 lg:p-14">
            {submittedMode ? (
              <div className="h-full flex flex-col items-start justify-center py-8">
                <div className="w-12 h-12 rounded-2xl bg-[#E85D04]/15 text-[#E85D04] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-[#141414]">
                  Thanks, {name}!
                </h3>
                <p className="mt-2 text-sm text-[#525252] leading-relaxed max-w-md">
                  {submittedMode === "delivered"
                    ? "Your enquiry has been sent directly to my inbox. I'll reply shortly."
                    : "Your enquiry is ready—click below to send it via your email app or chat on WhatsApp for an instant reply."}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {submittedMode === "fallback" && (
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 rounded-full bg-[#E85D04] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#141414] transition-colors"
                    >
                      Open Email App
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href={PROFILE.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#141414] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#E85D04] transition-colors"
                  >
                    Chat on WhatsApp
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedMode(null);
                      setName("");
                      setEmail("");
                      setMessage("");
                    }}
                    className="rounded-full border border-[#D4D4D4] px-5 py-2.5 text-xs font-semibold text-[#141414] hover:border-[#141414] transition-colors cursor-pointer"
                  >
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <h3 className="text-2xl font-bold text-[#141414]">
                    Quick Project Inquiry
                  </h3>
                  <p className="mt-1 text-sm text-[#6B6B6B]">
                    Share a few details and I&apos;ll get back to you promptly.
                  </p>
                </div>

                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />

                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#525252] mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full rounded-xl bg-white border border-[#E5E0DA] focus:border-[#E85D04] focus:outline-none px-4 py-3 text-sm text-[#141414]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#525252] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full rounded-xl bg-white border border-[#E5E0DA] focus:border-[#E85D04] focus:outline-none px-4 py-3 text-sm text-[#141414]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#525252] mb-2"
                  >
                    Project Brief
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your timeline, goals, and what we're building..."
                    className="w-full rounded-xl bg-white border border-[#E5E0DA] focus:border-[#E85D04] focus:outline-none px-4 py-3 text-sm text-[#141414] resize-none"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-xs font-semibold text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#141414] hover:bg-[#E85D04] disabled:opacity-60 text-white px-6 py-3.5 text-xs font-bold tracking-[0.12em] uppercase transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]"
                >
                  {submitting ? "Sending..." : "Send Message"}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </Reveal>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-[#ECECEC] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#6B6B6B] text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2.5 gap-y-1.5">
            <div className="relative w-6 h-6 rounded-md overflow-hidden shrink-0">
              <Image
                src="/images/logo.png"
                alt="Pubudu H."
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <span className="font-semibold text-[#141414]">
              {PROFILE.brandName}
            </span>
            <span className="w-full sm:w-auto">© 2026 All rights reserved.</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <nav
              aria-label="Footer navigation"
              className="flex items-center justify-center gap-6"
            >
              <a href="#work" className="hover:text-[#E85D04] transition-colors">
                Work
              </a>
              <a href="#about" className="hover:text-[#E85D04] transition-colors">
                About
              </a>
              <a
                href="#services"
                className="hover:text-[#E85D04] transition-colors"
              >
                Services
              </a>
            </nav>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:pl-5 sm:border-l sm:border-[#E5E5E5]">
              {socialButtons.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="w-8 h-8 rounded-full bg-[#F5F5F5] hover:bg-[#E85D04] text-[#141414] hover:text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

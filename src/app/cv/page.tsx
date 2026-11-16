"use client";

import Link from "next/link";
import { ArrowLeft, Printer, ExternalLink } from "lucide-react";
import { PROFILE, PROJECTS, SERVICES } from "@/data/portfolio";

export default function CvPage() {
  const webProjects = PROJECTS.filter((p) => p.discipline === "web");

  return (
    <main className="min-h-screen bg-[#FAF8F6] text-[#141414] py-10 px-4 sm:px-8 print:bg-white print:py-0 print:px-0">
      {/* Top Action Bar (hidden when printing / saving PDF) */}
      <div className="mx-auto max-w-4xl mb-6 flex items-center justify-between gap-4 print:hidden">
        <Link
          href="/#about"
          className="inline-flex items-center gap-2 rounded-full border border-[#E5E0DA] bg-white hover:border-[#141414] px-4 py-2 text-xs font-semibold text-[#141414] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Portfolio
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-[#E85D04] hover:bg-[#141414] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          Save as PDF / Print
        </button>
      </div>

      {/* Printable Resume Sheet */}
      <article className="mx-auto max-w-4xl rounded-3xl bg-white border border-[#EAE6E1] shadow-sm p-8 sm:p-12 print:border-0 print:shadow-none print:rounded-none print:p-6">
        <header className="border-b border-[#ECECEC] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#E85D04]">
              {PROFILE.heroRoleLabel}
            </span>
            <h1 className="mt-1 font-display text-4xl sm:text-5xl uppercase tracking-tight text-[#141414]">
              Pubudu Harshana
            </h1>
            <p className="mt-1 text-sm text-[#525252]">{PROFILE.location}</p>
          </div>

          <div className="text-xs space-y-1 text-[#4A4A4A] sm:text-right">
            <div>{PROFILE.email}</div>
            <div>WhatsApp: {PROFILE.whatsappDisplay}</div>
            <div>github.com/Pubudu-Harshana</div>
            <div>linkedin.com/in/pubuduh</div>
          </div>
        </header>

        <section className="mt-6">
          <h2 className="text-xs font-bold tracking-[0.18em] uppercase text-[#E85D04]">
            Summary
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#3D3D3D]">
            {PROFILE.bioParagraphs[0]}
          </p>
        </section>

        <section className="mt-7">
          <h2 className="text-xs font-bold tracking-[0.18em] uppercase text-[#E85D04]">
            Core Skills &amp; Stack
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {PROFILE.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-[#FAF8F6] border border-[#EAE6E1] px-3 py-1 text-xs font-semibold text-[#141414]"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-xs font-bold tracking-[0.18em] uppercase text-[#E85D04]">
            Selected Full-Stack Projects
          </h2>
          <div className="mt-3 space-y-4">
            {webProjects.map((project) => (
              <div
                key={project.id}
                className="border-b border-[#F2EFEA] pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-[#141414]">
                    {project.title}{" "}
                    <span className="text-xs font-medium text-[#6B6B6B]">
                      · {project.category} ({project.year})
                    </span>
                  </h3>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#E85D04] hover:underline print:text-[#141414]"
                    >
                      {project.liveUrl.replace(/^https?:\/\//, "")}
                      <ExternalLink className="w-3 h-3 print:hidden" />
                    </a>
                  )}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#4A4A4A]">
                  {project.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-xs font-bold tracking-[0.18em] uppercase text-[#E85D04]">
            Capabilities
          </h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.map((service) => (
              <div key={service.number} className="text-xs">
                <div className="font-bold text-[#141414]">
                  {service.number}. {service.title}
                </div>
                <p className="mt-1 text-[#525252] leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

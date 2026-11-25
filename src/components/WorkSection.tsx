"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Sparkles,
  X,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import {
  DESIGN_GALLERY,
  PROJECTS,
  type DesignGalleryItem,
  type ProjectDiscipline,
  type ProjectItem,
} from "@/data/portfolio";

const FILTER_TABS: ReadonlyArray<{
  label: string;
  value: "all" | ProjectDiscipline;
}> = [
  { label: "All Works", value: "all" },
  { label: "Full-Stack Web", value: "web" },
  { label: "Graphic Design", value: "design" },
];

export default function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectDiscipline>(
    "all"
  );
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // In "All Works", show the 4 Full-Stack Web case studies in a balanced 2x2 grid
  // above the Graphic Design Archive strip (zero orphan 7th card).
  const webProjects = PROJECTS.filter((p) => p.discipline === "web");

  const activeLightboxItem: DesignGalleryItem | null =
    lightboxIndex !== null ? DESIGN_GALLERY[lightboxIndex] ?? null : null;

  const stepLightbox = (dir: -1 | 1) => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev + dir + DESIGN_GALLERY.length) % DESIGN_GALLERY.length
    );
  };

  // Keyboard support + body scroll lock for modals & lightbox
  useEffect(() => {
    if (!selectedProject && lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
        setLightboxIndex(null);
      } else if (lightboxIndex !== null && e.key === "ArrowLeft") {
        stepLightbox(-1);
      } else if (lightboxIndex !== null && e.key === "ArrowRight") {
        stepLightbox(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject, lightboxIndex]);

  return (
    <section id="work" className="py-24 sm:py-28 bg-[#FAF8F6]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <Reveal
          direction="up"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#E85D04]">
              <Sparkles className="w-3.5 h-3.5" />
              Selected Web &amp; Design Works
            </span>
            <h2 className="mt-3 font-display text-5xl sm:text-6xl uppercase tracking-tight text-[#141414]">
              Crafted To Perform
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {FILTER_TABS.map((tab) => {
              const active = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04] ${
                    active
                      ? "bg-[#141414] text-white shadow-sm"
                      : "bg-white text-[#525252] border border-[#E5E5E5] hover:border-[#E85D04] hover:text-[#141414]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Graphic Design Masonry Gallery when "Graphic Design" tab is active */}
        {activeFilter === "design" ? (
          <div className="mt-12">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
              {DESIGN_GALLERY.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative block w-full break-inside-avoid rounded-2xl overflow-hidden bg-white border border-[#EAE6E1] shadow-xs hover:shadow-xl transition-all duration-300 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]"
                >
                  <div className="relative w-full overflow-hidden bg-[#141414]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={900}
                      height={900}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                      <div>
                        <span className="inline-block rounded-full bg-[#E85D04] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                          {item.category}
                        </span>
                        <div className="mt-1.5 text-sm font-bold text-white">
                          {item.title}
                        </div>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-white/90 text-[#141414] flex items-center justify-center shrink-0">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Balanced 2x2 Full-Stack Web Case Studies Grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-7">
              {webProjects.map((project, index) => (
                <Reveal
                  key={project.id}
                  direction="up"
                  delay={index * 90}
                  className="h-full"
                >
                  <article
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedProject(project)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedProject(project);
                      }
                    }}
                    className="h-full group cursor-pointer rounded-3xl bg-white border border-[#EAE6E1] p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]"
                  >
                    <div>
                      {/* Minimal Browser-Framed Screenshot (Unobstructed UI Preview) */}
                      <div className="rounded-2xl overflow-hidden border border-[#E6E1DB] bg-[#F5F2EE]">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#FAF8F6] border-b border-[#EAE6E1]">
                          <div className="flex items-center gap-1.5" aria-hidden="true">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD8]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD8]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD8]" />
                          </div>
                          <span className="text-[11px] font-medium text-[#6B6B6B] truncate max-w-[180px]">
                            {project.impact.replace(/^Live at\s+/i, "")}
                          </span>
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 rounded-full bg-[#141414] hover:bg-[#E85D04] text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]"
                            >
                              Visit
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ) : (
                            <span className="w-10" />
                          )}
                        </div>

                        <div
                          className={`relative aspect-[16/10] w-full bg-gradient-to-br ${project.accent} overflow-hidden`}
                        >
                          {project.image && (
                            <Image
                              src={project.image}
                              alt={`${project.title} preview`}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          )}
                        </div>
                      </div>

                      {/* Clean Metadata Row */}
                      <div className="mt-5 flex items-center justify-between gap-2 text-[11px] font-bold tracking-[0.14em] uppercase">
                        <span className="text-[#E85D04]">{project.category}</span>
                        <span className="text-[#8A8A8A]">{project.year}</span>
                      </div>

                      {/* Title & Summary */}
                      <div className="mt-2.5 flex items-start justify-between gap-4">
                        <h3 className="text-2xl font-bold tracking-tight text-[#141414] group-hover:text-[#E85D04] transition-colors">
                          {project.title}
                        </h3>
                        <span className="w-10 h-10 shrink-0 rounded-full bg-[#F5F5F5] group-hover:bg-[#E85D04] text-[#141414] group-hover:text-white flex items-center justify-center transition-colors">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-[#5C5C5C]">
                        {project.summary}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="mt-6 pt-5 border-t border-[#F0ECE7] flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#FAF8F6] border border-[#EAE6E1] px-3 py-1 text-xs font-medium text-[#4A4A4A]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Graphic Design Showcase Strip in "All Works" */}
            {activeFilter === "all" && (
              <div className="mt-14 pt-12 border-t border-[#EAE6E1]">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#E85D04]">
                      Graphic Design Archive
                    </span>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#141414]">
                      Packaging, Print, Branding &amp; Social Visuals
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveFilter("design")}
                    className="inline-flex items-center gap-2 rounded-full bg-[#141414] hover:bg-[#E85D04] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer self-start sm:self-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]"
                  >
                    Explore All Designs
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {DESIGN_GALLERY.slice(0, 6).map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      aria-label={`View ${item.title}`}
                      className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#EAE6E1] shadow-xs hover:shadow-lg transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="w-5 h-5 text-white" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Project Case Study Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-xl rounded-3xl bg-white p-7 sm:p-9 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold tracking-[0.16em] uppercase text-[#E85D04]">
                  {selectedProject.category} · {selectedProject.year}
                </span>
                <h3 className="mt-2 text-3xl font-bold text-[#141414]">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="w-9 h-9 rounded-full bg-[#F3F3F3] hover:bg-[#141414] hover:text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedProject.image ? (
              <div className="mt-6 relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#EAE6E1]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 560px"
                  className="object-cover object-top"
                />
              </div>
            ) : (
              <div
                className={`mt-6 rounded-2xl bg-gradient-to-br ${selectedProject.accent} p-6 text-white`}
              >
                <div className="text-xs uppercase tracking-wider text-white/80">
                  Live Platform
                </div>
                <div className="mt-1 text-2xl font-bold">
                  {selectedProject.impact}
                </div>
              </div>
            )}

            <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#4A4A4A]">
              {selectedProject.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#FAF8F6] border border-[#EAE6E1] px-3 py-1 text-xs font-semibold text-[#141414]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
              {selectedProject.repoUrl && (
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#D4D4D4] hover:border-[#141414] text-[#141414] px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  View Code
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#141414] hover:bg-[#141414] text-[#141414] hover:text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Open Live Site
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center gap-2 rounded-full bg-[#E85D04] hover:bg-[#141414] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Discuss a Similar Project
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Graphic Design Full-Resolution Lightbox */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxItem.title}
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between text-white mb-4">
              <div>
                <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#FF7B00]">
                  {activeLightboxItem.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold">
                  {activeLightboxItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-[#E85D04] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full max-h-[75vh] aspect-[4/3] rounded-2xl overflow-hidden bg-[#141414]">
              <Image
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
            </div>

            <div className="mt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={() => stepLightbox(-1)}
                aria-label="Previous design"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-[#E85D04] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold tracking-widest text-white/75">
                {(lightboxIndex ?? 0) + 1} / {DESIGN_GALLERY.length}
              </span>
              <button
                type="button"
                onClick={() => stepLightbox(1)}
                aria-label="Next design"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-[#E85D04] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

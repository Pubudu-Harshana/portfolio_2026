"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X, Sparkles, ExternalLink } from "lucide-react";
import { PROJECTS, type ProjectItem } from "@/data/portfolio";

const CATEGORIES = ["All", "Automotive", "Travel", "Supply Chain", "Agency"];

export default function WorkSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) =>
          p.category.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <section id="work" className="py-24 sm:py-28 bg-[#FAF8F6]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#E85D04]">
              <Sparkles className="w-3.5 h-3.5" />
              Selected Web Works
            </span>
            <h2 className="mt-3 font-display text-5xl sm:text-6xl uppercase tracking-tight text-[#141414]">
              Crafted To Perform
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const active = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-[#141414] text-white shadow-sm"
                      : "bg-white text-[#525252] border border-[#E5E5E5] hover:border-[#E85D04] hover:text-[#141414]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-3xl bg-white border border-[#EAE6E1] p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Preview Banner */}
                <div
                  className={`relative h-56 sm:h-64 rounded-2xl bg-gradient-to-br ${project.accent} overflow-hidden`}
                >
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/25 p-5 sm:p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-black/55 backdrop-blur-md border border-white/15 px-3 py-1 text-[11px] font-semibold text-white">
                        {project.category}
                      </span>
                      <span className="rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
                        {project.year}
                      </span>
                    </div>

                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-white/75">
                          Deployment
                        </div>
                        <div className="mt-0.5 text-base sm:text-lg font-bold text-white">
                          {project.impact}
                        </div>
                      </div>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#E85D04] hover:bg-white text-white hover:text-[#141414] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors"
                        >
                          Visit
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Title & Summary */}
                <div className="mt-6 flex items-start justify-between gap-4">
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
          ))}
        </div>
      </div>

      {/* Project Case Study Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs"
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
                className="w-9 h-9 rounded-full bg-[#F3F3F3] hover:bg-[#141414] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedProject.image ? (
              <div className="mt-6 relative h-52 rounded-2xl overflow-hidden border border-[#EAE6E1]">
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
    </section>
  );
}

import { CheckCircle2, Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import { CLIENT_REVIEWS, SERVICES } from "@/data/portfolio";

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-28 bg-[#141414] text-white">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#FF7B00]">
              Capabilities
            </span>
            <h2 className="mt-3 font-display text-5xl sm:text-6xl uppercase tracking-tight">
              What I Deliver
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-white/70 leading-relaxed">
            Focused, end-to-end execution—from visual direction and interactive
            prototyping to production Next.js deployment.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <Reveal
              key={service.number}
              direction="up"
              delay={index * 90}
              className="h-full"
            >
            <div
              className="h-full group rounded-3xl bg-[#1E1E1E] border border-white/10 hover:border-[#E85D04] p-7 flex flex-col justify-between transition-colors duration-300"
            >
              <div>
                <div className="font-display text-4xl text-[#FF7B00]">
                  {service.number}
                </div>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {service.description}
                </p>
              </div>

              <ul className="mt-7 pt-5 border-t border-white/10 space-y-2.5">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs font-medium text-white/85"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7B00] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            </Reveal>
          ))}
        </div>

        {/* Verified Google Reviews */}
        <div className="mt-16 pt-14 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#FF7B00]">
                Client Feedback
              </span>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-tight">
                Google Reviews
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/75">
              <div className="flex items-center gap-0.5 text-[#FF7B00]">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span>Verified Client Reviews</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {CLIENT_REVIEWS.map((review, index) => (
              <Reveal key={review.name} direction="up" delay={index * 90}>
                <blockquote className="h-full rounded-3xl bg-[#1E1E1E] border border-white/10 p-7 sm:p-8 flex flex-col justify-between gap-6">
                  <p className="text-sm sm:text-base leading-relaxed text-white/85">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <footer className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E85D04] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {review.initials}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {review.name}
                        </div>
                        <div className="text-xs text-white/60">
                          {review.role}
                        </div>
                      </div>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/75">
                      {review.source}
                    </span>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


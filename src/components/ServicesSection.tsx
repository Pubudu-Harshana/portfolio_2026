import { CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/data/portfolio";

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-28 bg-[#141414] text-white">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
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
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="group rounded-3xl bg-[#1E1E1E] border border-white/10 hover:border-[#E85D04] p-7 flex flex-col justify-between transition-colors duration-300"
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
          ))}
        </div>
      </div>
    </section>
  );
}


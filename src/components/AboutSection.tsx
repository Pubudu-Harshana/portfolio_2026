import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import LinkedInIcon from "@/components/LinkedInIcon";
import { PROFILE } from "@/data/portfolio";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-28 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Editorial Photo Collage using User's Side-Looking Photos */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4">
            <div className="col-span-7 relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/about-1.jpg"
                alt="Pubudu H. in blazer with sunglasses"
                fill
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="col-span-5 flex flex-col gap-4">
              <div className="relative flex-1 min-h-[160px] rounded-3xl overflow-hidden shadow-md">
                <Image
                  src="/images/linkedin-profile.jpg"
                  alt="Pubudu H. LinkedIn profile portrait"
                  fill
                  sizes="(max-width: 1024px) 40vw, 20vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative flex-1 min-h-[160px] rounded-3xl overflow-hidden shadow-md">
                <Image
                  src="/images/about-3.jpg"
                  alt="Pubudu H. outdoors"
                  fill
                  sizes="(max-width: 1024px) 40vw, 20vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right: Story, Stats, Stack & LinkedIn */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#E85D04]">
              <MapPin className="w-3.5 h-3.5" />
              {PROFILE.location}
            </div>

            <h2 className="mt-3 font-display text-4xl sm:text-5xl uppercase tracking-tight text-[#141414] leading-[1.02]">
              {PROFILE.bioTitle}
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#525252]">
              {PROFILE.bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Key Metrics */}
            <div className="mt-8 grid grid-cols-3 gap-4 py-6 border-y border-[#ECECEC]">
              {PROFILE.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-4xl sm:text-5xl text-[#141414]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-[#6B6B6B]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Core Capabilities / Skills */}
            <div className="mt-7 flex flex-wrap gap-2">
              {PROFILE.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[#FAF8F6] border border-[#EAE6E1] px-3.5 py-1.5 text-xs font-semibold text-[#262626]"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* LinkedIn CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#141414] hover:bg-[#E85D04] text-white px-6 py-3.5 text-xs font-bold tracking-[0.12em] uppercase transition-colors"
              >
                <LinkedInIcon className="w-4 h-4" />
                Connect on LinkedIn
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#D4D4D4] hover:border-[#141414] px-6 py-3.5 text-xs font-bold tracking-[0.12em] uppercase text-[#141414] transition-colors"
              >
                Start a Conversation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


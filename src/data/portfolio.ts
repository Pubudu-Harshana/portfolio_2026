export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  impact: string;
  tags: string[];
  accent: string;
  image?: string;
  liveUrl?: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const PROFILE = {
  brandName: "Pubudu H.",
  shortName: "Pubudu",
  heroDisplayWord: "CREATE",
  taglineLine1: "Designs that inspire.",
  taglineLine2: "Products that connect.",
  availabilityLabel: "AVAILABLE FOR",
  availabilityTitle: "Freelance Projects",
  availabilitySubtitle: "Product Design & Full-Stack Next.js",
  linkedinUrl: "https://www.linkedin.com/in/pubuduh/",
  agencyUrl: "https://www.infavour.tech",
  email: "infavoursolutions@gmail.com",
  location: "Colombo, Sri Lanka · Remote Worldwide",
  bioTitle: "Bridging bold visual craft with production-grade engineering.",
  bioParagraphs: [
    "I'm Pubudu — a multidisciplinary designer and full-stack web developer building fast, memorable digital products through INFAVOUR SOLUTIONS (infavour.tech). From automotive marketplaces and travel platforms to supply-chain web apps, I care deeply about clarity, motion, and measurable impact.",
    "Whether partnering with early-stage founders or established businesses, I bring UI/UX craft and Next.js engineering together under one roof so ideas ship faster without losing their edge.",
  ],
  stats: [
    { value: "50+", label: "Projects Shipped" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "3+", label: "Continents Served" },
  ],
  skills: [
    "Next.js & React",
    "TypeScript",
    "Tailwind CSS",
    "UI/UX & Design Systems",
    "Node.js & APIs",
    "Brand Identity",
    "Cloud & Integrations",
    "Performance & SEO",
  ],
  testimonial: {
    quote:
      "Pubudu delivered outstanding work that exceeded our expectations — sharp design instincts paired with rock-solid execution.",
    author: "JAMES CARTER",
    role: "FOUNDER, BRIXO",
  },
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "carvibes-lk",
    title: "CarVibes.lk Platform",
    category: "Automotive Marketplace",
    year: "2026",
    summary:
      "High-performance automotive web platform built for Sri Lankan car enthusiasts and dealers—featuring fast vehicle discovery, clean editorial cards, and mobile-first browsing.",
    impact: "Live at carvibes.lk",
    tags: ["Next.js", "TypeScript", "Marketplace UI", "Responsive Web"],
    accent: "from-[#C84B08] to-[#FF7B00]",
    image: "/images/projects/carvibes.png",
    liveUrl: "https://carvibes.lk",
  },
  {
    id: "ravi-tours",
    title: "Ravi Tours & Travels",
    category: "Travel & Booking Web",
    year: "2025",
    summary:
      "Curated Sri Lanka tourism and private tour experience platform with destination showcases, custom itinerary planning, and streamlined traveler inquiries.",
    impact: "Live at ravitoursandtravels.com",
    tags: ["Web Design", "Next.js", "Travel UX", "SEO"],
    accent: "from-[#1A1A1A] to-[#404040]",
    image: "/images/projects/ravitours.png",
    liveUrl: "https://ravitoursandtravels.com",
  },
  {
    id: "freshlync",
    title: "FreshLync Supply Chain",
    category: "Supply Chain & Commerce",
    year: "2025",
    summary:
      "Modern B2B fresh-produce supply chain web platform connecting producers, logistics, and buyers with clear operational visibility and crisp product presentation.",
    impact: "Live at freshlync.live",
    tags: ["React", "Next.js", "Supply Chain", "Full-Stack"],
    accent: "from-[#D94E0F] to-[#F59E0B]",
    image: "/images/projects/freshlync.png",
    liveUrl: "https://freshlync.live",
  },
  {
    id: "infavour-solutions",
    title: "INFAVOUR SOLUTIONS",
    category: "Digital Agency Platform",
    year: "2026",
    summary:
      "Flagship agency web experience showcasing high-performance web development, brand identity design, and cinematic digital media across 50+ delivered projects.",
    impact: "Live at infavour.tech",
    tags: ["Next.js 16", "Motion UI", "Brand System", "Agency"],
    accent: "from-[#B83B06] to-[#141414]",
    image: "/images/projects/infavour-live.png",
    liveUrl: "https://www.infavour.tech",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Product & UI/UX Design",
    description:
      "Clean, conversion-focused interfaces and user journeys crafted from wireframes to pixel-accurate prototypes.",
    deliverables: ["User Flows & Wireframes", "High-Fidelity UI", "Interactive Prototypes"],
  },
  {
    number: "02",
    title: "Next.js Full-Stack Engineering",
    description:
      "Fast, SEO-ready web applications built with modern React, TypeScript, App Router, and scalable backend APIs.",
    deliverables: ["Next.js App Router", "TypeScript & Tailwind", "API & Database Integration"],
  },
  {
    number: "03",
    title: "Brand & Design Systems",
    description:
      "Cohesive visual languages, custom typography hierarchies, and reusable component libraries that scale with your team.",
    deliverables: ["Visual Identity", "Component Libraries", "Design Tokens"],
  },
  {
    number: "04",
    title: "Cloud & Web Optimization",
    description:
      "High-impact editorial landing pages and scalable cloud integrations engineered for Core Web Vitals and speed.",
    deliverables: ["Editorial Hero Craft", "Core Web Vitals", "Cloud Deployment"],
  },
];

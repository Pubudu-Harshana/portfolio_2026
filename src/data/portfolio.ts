export type ProjectDiscipline = "web" | "design";

export interface ProjectItem {
  id: string;
  discipline: ProjectDiscipline;
  title: string;
  category: string;
  year: string;
  summary: string;
  impact: string;
  tags: string[];
  accent: string;
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface DesignGalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
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
  heroRoleLabel: "FREELANCE WEB DEVELOPER & DESIGNER",
  heroRotatingWords: ["DESIGN", "DEVELOP", "LAUNCH"] as const,
  heroSupportingCopy:
    "I turn business ideas into distinctive websites with thoughtful design and reliable development.",
  availabilityLabel: "OPEN TO WORK",
  availabilityModes: [
    "Full-Time Roles",
    "Freelance Projects",
    "Remote Teams",
  ] as const,
  availabilityTitle: "Full-Time & Freelance",
  availabilitySubtitle: "Website Design & Full-Stack Development",
  linkedinUrl: "https://www.linkedin.com/in/pubuduh/",
  githubUrl: "https://github.com/Pubudu-Harshana",
  behanceUrl: "https://www.behance.net/pubuduharshana",
  cvUrl: "/cv",
  instagramUrl: "https://www.instagram.com/pubudu_.h/",
  facebookUrl: "https://www.facebook.com/harshana.pubu/",
  whatsappUrl: "https://wa.me/94712407273",
  whatsappDisplay: "071 240 7273",
  agencyUrl: "https://www.infavour.tech",
  email: "pubuduhar@gmail.com",
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
      "The Ravi Tours & Travels platform and educational design projects were delivered with exceptional precision.",
    author: "HASHEN DE SILVA",
    role: "OWNER, RAVI TOURS & TRAVELS",
  },
};

export interface ClientReview {
  name: string;
  role: string;
  quote: string;
  source: string;
  initials: string;
}

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    name: "Hashen De Silva",
    role: "Owner, Ravi Tours & Travels",
    quote:
      "I’m really happy with your work, and I truly appreciate the effort and quality. The Ravi Tours & Travels platform and educational design projects were delivered with exceptional precision.",
    source: "Google Review",
    initials: "HD",
  },
  {
    name: "Methmal Balasooriya",
    role: "Owner, CarVibes.lk",
    quote:
      "Completely transformed our automotive detailing online platform. Our ceramic coating appointment bookings surged by 300% within the first month. The mobile speed and UI are top tier.",
    source: "Google Review",
    initials: "MB",
  },
];

/*
 * HOW TO ADD YOUR WORKS:
 * 1. Put your image in: public/images/projects/your-image.jpg (or .png)
 * 2. Copy one object below into PROJECTS:
 *    - Use discipline: "web" for Full-Stack Development
 *    - Use discipline: "design" for Graphic Design & Branding
 */
export const PROJECTS: ProjectItem[] = [
  {
    id: "carvibes-lk",
    discipline: "web",
    title: "CarVibes.lk Platform",
    category: "Automotive Detailing",
    year: "2026",
    summary:
      "Automotive detailing and car care web platform featuring online service booking, showroom packages, steam sanitation scheduling, and ceramic coating experiences.",
    impact: "Live at carvibes.lk",
    tags: ["Next.js", "TypeScript", "Marketplace UI", "Responsive Web"],
    accent: "from-[#C84B08] to-[#FF7B00]",
    image: "/images/projects/carvibes.png",
    liveUrl: "https://carvibes.lk",
  },
  {
    id: "ravi-tours",
    discipline: "web",
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
    discipline: "web",
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
    discipline: "web",
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
  {
    id: "infavour-stationery",
    discipline: "design",
    title: "INFAVOUR Brand Stationery",
    category: "Brand Identity & Print",
    year: "2025",
    summary:
      "Luxury corporate stationery suite featuring custom typography, cohesive brand colors, business cards, and print-ready collateral.",
    impact: "Print & Brand Identity",
    tags: ["Brand Identity", "Print Design", "Typography", "Stationery"],
    accent: "from-[#141414] to-[#E85D04]",
    image: "/images/projects/infavour-stationery.jpg",
    liveUrl: "https://www.infavour.tech",
  },
  {
    id: "editorial-book-cover",
    discipline: "design",
    title: "Editorial Publication Covers",
    category: "Graphic & Print Design",
    year: "2025",
    summary:
      "High-contrast editorial book and tute cover designs crafted with bold visual hierarchy, balanced layouts, and print-grade finishing.",
    impact: "Print Publication Series",
    tags: ["Cover Design", "Editorial Layout", "Graphic Design", "Print"],
    accent: "from-[#B83B06] to-[#FF7B00]",
    image: "/images/projects/tuition-book.jpg",
    liveUrl: "https://www.infavour.tech",
  },
  {
    id: "social-campaign-creative",
    discipline: "design",
    title: "Brand Campaign Creatives",
    category: "Social & Visual Design",
    year: "2025",
    summary:
      "Scroll-stopping digital campaign visuals and promotional graphics designed for high engagement and consistent brand storytelling.",
    impact: "Digital Campaign Visuals",
    tags: ["Campaign Design", "Art Direction", "Social Media", "Visuals"],
    accent: "from-[#292524] to-[#E85D04]",
    image: "/images/projects/social-campaign.jpg",
    liveUrl: "https://www.infavour.tech",
  },
];

export const DESIGN_GALLERY: DesignGalleryItem[] = [
  {
    id: "water-slide-mockup",
    title: "Water Slide 2.0 Packaging",
    category: "Packaging & Mockup",
    image: "/images/Design works/Water Slide 2.0 car shampoo mockup.png",
  },
  {
    id: "infavour-brand-1",
    title: "INFAVOUR Brand Visual I",
    category: "Brand Identity",
    image: "/images/Design works/Infavour Solutions.jpg",
  },
  {
    id: "infavour-brand-2",
    title: "INFAVOUR Brand Visual II",
    category: "Brand Identity",
    image: "/images/Design works/Infavour Solutions (1).jpg",
  },
  {
    id: "infavour-brand-3",
    title: "INFAVOUR Brand Visual III",
    category: "Brand Identity",
    image: "/images/Design works/Infavour Solutions (2).jpg",
  },
  {
    id: "medical-book",
    title: "Medical Publication Cover",
    category: "Book & Print",
    image: "/images/Design works/medical book.jpg",
  },
  {
    id: "final-leaflet",
    title: "Corporate Leaflet Layout",
    category: "Print & Leaflets",
    image: "/images/Design works/final leaflet.jpg",
  },
  {
    id: "hashen-leaflet",
    title: "Promotional Leaflet Design",
    category: "Print & Leaflets",
    image: "/images/Design works/Hashen new leaflet.jpg",
  },
  {
    id: "nisal-banner",
    title: "Promotional Banner Design",
    category: "Banner Design",
    image: "/images/Design works/Nisal Banner.jpg",
  },
  {
    id: "falcon-poster",
    title: "Falcon Visual Poster",
    category: "Poster & Visuals",
    image: "/images/Design works/falcon.jpg",
  },
  {
    id: "editorial-front",
    title: "Editorial Cover Front",
    category: "Book & Print",
    image: "/images/Design works/front.jpg",
  },
  {
    id: "social-post-1",
    title: "Social Media Post Creative",
    category: "Social Media",
    image: "/images/Design works/post 1.png",
  },
  {
    id: "campaign-visual",
    title: "Campaign & Apparel Visual",
    category: "Social Media",
    image: "/images/Design works/for sharee aaaaa.jpg",
  },
  {
    id: "creative-design-3",
    title: "Brand Graphic III",
    category: "Visual Design",
    image: "/images/Design works/design 3.jpg",
  },
  {
    id: "creative-design-2",
    title: "Brand Graphic II",
    category: "Visual Design",
    image: "/images/Design works/2.jpg",
  },
  {
    id: "editorial-poster-a",
    title: "Digital Visual Artwork I",
    category: "Visual Design",
    image: "/images/Design works/Add a heading.png",
  },
  {
    id: "editorial-poster-b",
    title: "Digital Visual Artwork II",
    category: "Visual Design",
    image: "/images/Design works/Untitled design (1).png",
  },
  {
    id: "social-creative-wa",
    title: "Brand Social Creative",
    category: "Social Media",
    image: "/images/Design works/WhatsApp Image 2025-08-22 at 1.49.22 PM (1).jpeg",
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

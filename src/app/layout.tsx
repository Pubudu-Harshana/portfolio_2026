import type { Metadata } from "next";
import { Anton, Plus_Jakarta_Sans } from "next/font/google";
import FloatingCvButton from "@/components/FloatingCvButton";
import PageLoader from "@/components/PageLoader";
import SmoothScroll from "@/components/SmoothScroll";
import { PROFILE } from "@/data/portfolio";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://pubuduh.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Pubudu H. — Freelance Web Developer & Designer",
  description:
    "I turn business ideas into distinctive websites with thoughtful design and reliable full-stack Next.js development.",
  keywords: [
    "Pubudu H",
    "Pubudu Harshana",
    "Freelance Web Developer",
    "Full-Stack Next.js Developer",
    "UI/UX Designer",
    "Graphic Designer",
    "Sri Lanka",
    "Infavour Solutions",
  ],
  authors: [{ name: "Pubudu H.", url: PROFILE.linkedinUrl }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Pubudu H. — Freelance Web Developer & Designer",
    description:
      "I turn business ideas into distinctive websites with thoughtful design and reliable full-stack Next.js development.",
    siteName: "Pubudu H. Portfolio",
    images: [
      {
        url: "/images/hero-portrait.jpg",
        width: 1200,
        height: 900,
        alt: "Pubudu H. — Web Developer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pubudu H. — Freelance Web Developer & Designer",
    description:
      "I turn business ideas into distinctive websites with thoughtful design and reliable full-stack Next.js development.",
    images: ["/images/hero-portrait.jpg"],
  },
};

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pubudu H.",
  url: SITE_URL,
  email: `mailto:${PROFILE.email}`,
  jobTitle: "Freelance Web Developer & Designer",
  sameAs: [
    PROFILE.linkedinUrl,
    PROFILE.behanceUrl,
    PROFILE.instagramUrl,
    PROFILE.facebookUrl,
    PROFILE.agencyUrl,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-[#141414] selection:bg-[#E85D04] selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <PageLoader />
        <SmoothScroll>{children}</SmoothScroll>
        <FloatingCvButton />
      </body>
    </html>
  );
}

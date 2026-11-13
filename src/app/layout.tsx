import type { Metadata } from "next";
import { Anton, Plus_Jakarta_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Pubudu H. — Portfolio | Designer & Full-Stack Developer",
  description:
    "Designs that inspire. Products that connect. Explore selected work, capabilities, and connect with Pubudu H.",
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
        {children}
      </body>
    </html>
  );
}

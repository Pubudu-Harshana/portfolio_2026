import HeroSection from "@/components/HeroSection";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#141414] overflow-x-clip">
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </main>
  );
}

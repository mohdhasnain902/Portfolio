import ParticlesBackground from "@/components/ParticlesBackground";
import InteractiveNodes from "@/components/InteractiveNodes";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import LanguagesSection from "@/components/LanguagesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollAnimations from "@/components/ScrollAnimations";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ScrollProgressBar />
      <ScrollAnimations />
      <ParticlesBackground />
      <InteractiveNodes />
      <Navigation />
      <main>
        <HeroSection />
        <div data-scroll-section style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
          <AboutSection />
        </div>
        <div data-scroll-section style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
          <ServicesSection />
        </div>
        <div data-scroll-section style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
          <ExperienceSection />
        </div>
        <div data-scroll-section style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
          <SkillsSection />
        </div>
        <div data-scroll-section style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
          <EducationSection />
        </div>
        <div data-scroll-section style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
          <CertificationsSection />
        </div>
        <div data-scroll-section style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
          <LanguagesSection />
        </div>
        <div data-scroll-section style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

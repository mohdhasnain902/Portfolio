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

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ParticlesBackground />
      <InteractiveNodes />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <LanguagesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

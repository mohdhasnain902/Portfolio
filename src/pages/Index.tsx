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
import SEO from "@/components/SEO";
import { useIsMobile } from "@/hooks/use-mobile";
import FilmGrain from "@/components/cinematic/FilmGrain";
import Vignette from "@/components/cinematic/Vignette";
import ScrollProgress from "@/components/cinematic/ScrollProgress";
import CinematicReveal from "@/components/cinematic/CinematicReveal";
import SectionMarquee from "@/components/cinematic/SectionMarquee";
// import CursorGlow from "@/components/cinematic/CursorGlow"; // disabled: replaced by ParticleCursor. Uncomment to restore the bright radial glow follower.
import ParticleCursor from "@/components/cinematic/ParticleCursor";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title="Muhammad Ul Hasnain | Python Developer & Trading Bot API Specialist"
        description="Python Developer specializing in trading bot automation, cryptocurrency APIs (Binance, Bybit), web scraping, and full-stack development. Based in Islamabad, serving clients in Australia & USA."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Muhammad Ul Hasnain — Software Development",
            url: "/",
            description:
              "Python trading-bot, cryptocurrency API, web scraping, AI, and full-stack development services for founders and technical teams worldwide.",
            areaServed: ["AU", "US", "PK", "Worldwide"],
            serviceType: [
              "Python Development",
              "Trading Bot Development",
              "API Development",
              "Web Scraping",
              "AI Integration",
              "Full Stack Web Development",
            ],
            provider: {
              "@type": "Person",
              name: "Muhammad Ul Hasnain",
              jobTitle: "Full-Stack Software Engineer",
              email: "muhammadulhasnain@gmail.com",
              knowsAbout: [
                "Python", "Django", "FastAPI", "Trading Bots",
                "Binance API", "Bybit API", "Web Scraping",
                "React", "TypeScript", "Supabase", "AI Integration",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Islamabad",
                addressCountry: "PK",
              },
            },
            audience: {
              "@type": "Audience",
              audienceType: "Founders, startups, and technical teams",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Muhammad Ul Hasnain",
            url: "/",
            inLanguage: "en",
          },
        ]}
      />
      <ParticlesBackground />
      {!isMobile && <InteractiveNodes />}
      {/* {!isMobile && <CursorGlow />} */}
      {!isMobile && <ParticleCursor />}
      <ScrollProgress />
      <Vignette />
      <FilmGrain />
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <CinematicReveal><AboutSection /></CinematicReveal>
        <SectionMarquee words={["Build", "Automate", "Scale", "Ship", "Iterate"]} />
        <CinematicReveal><ServicesSection /></CinematicReveal>
        <CinematicReveal parallax={40}><ExperienceSection /></CinematicReveal>
        <SectionMarquee
          words={["Python", "Trading Bots", "APIs", "AI", "Full Stack", "Web3"]}
          direction="right"
          duration={45}
        />
        <CinematicReveal><SkillsSection /></CinematicReveal>
        <CinematicReveal parallax={30}><EducationSection /></CinematicReveal>
        <CinematicReveal parallax={30}><CertificationsSection /></CinematicReveal>
        <CinematicReveal parallax={20}><LanguagesSection /></CinematicReveal>
        <SectionMarquee words={["Let's", "Create", "Something", "Extraordinary"]} duration={30} />
        <CinematicReveal><ContactSection /></CinematicReveal>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

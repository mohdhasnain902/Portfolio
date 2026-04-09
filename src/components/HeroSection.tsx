import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram, ChevronDown, MapPin, Send } from "lucide-react";
import { useEffect, useState } from "react";
import profileImage from "@/assets/profile.jpg";
import MagneticButton from "@/components/MagneticButton";

const titles = [
  "Full Stack Developer",
  "Python Developer",
  "Trading Bot API Specialist",
  "AI Automation Developer",
  "Software Engineer",
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-ul-hasnain-1b4b951a0/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/MuhammadUlHasnain", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/r_cod3r", label: "Instagram" },
  { icon: Mail, href: "mailto:muhammadulhasnain@gmail.com", label: "Email" },
  { icon: Send, href: "https://t.me/JosephCryll", label: "Telegram" },
];

const secondaryLinks = [
  { label: "Fiverr", href: "https://www.fiverr.com/users/h2zeee" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~01737e30133e047738" },
  { label: "Contra", href: "https://muhammadulhasnain6ttg2wkf.contra.com" },
  { label: "WhatsApp", href: "https://wa.me/923138489149" },
  { label: "Telegram", href: "https://t.me/JosephCryll" },
];

const HeroSection = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayText === currentTitle) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentTitle.slice(0, prev.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient orbs */}
      <div data-parallax-bg="0.3" className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div data-parallax-bg="0.15" className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />

      <div className="container-custom text-center z-10">
        {/* Profile Image */}
        <motion.div
          data-hero-image
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent animate-spin-slow opacity-70 blur-sm" />
            <img
              src={profileImage}
              alt="Muhammad Ul Hasnain"
              className="w-full h-full rounded-full object-cover border-2 border-primary/50 relative z-10"
            />
          </div>
          <span className="code-font text-primary text-sm md:text-base tracking-wider">
            {"// Hello World, I am"}
          </span>
        </motion.div>

        <motion.h1
          data-hero-title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
        >
          <span className="text-foreground">Muhammad Ul</span>{" "}
          <span className="text-gradient glow-text">Hasnain</span>
        </motion.h1>

        <motion.div
          data-hero-subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-12 md:h-16 flex items-center justify-center mb-6"
        >
          <span className="text-xl md:text-3xl text-muted-foreground font-light">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-primary ml-1"
            >
              |
            </motion.span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-2 text-muted-foreground mb-8"
        >
          <MapPin size={18} className="text-primary" />
          <span>Islamabad, Pakistan</span>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card-hover rounded-xl text-muted-foreground hover:text-primary"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={link.label}
            >
              <link.icon size={22} />
            </motion.a>
          ))}
        </motion.div>

        {/* Secondary Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex items-center justify-center gap-3 mb-12 flex-wrap"
        >
          {secondaryLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium glass-card border border-border/50 rounded-full text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            as="a"
            href="#contact"
            className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl btn-glow relative overflow-hidden group inline-block"
            strength={0.4}
          >
            <span className="relative z-10">Get In Touch</span>
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#experience"
            className="px-8 py-4 glass-card border border-primary/30 text-foreground font-semibold rounded-xl hover:border-primary/60 transition-colors inline-block"
            strength={0.4}
          >
            View My Work
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronDown size={32} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

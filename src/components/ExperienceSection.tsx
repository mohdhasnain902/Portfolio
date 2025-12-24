import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Trading Bot API Developer",
    company: "Fiverr",
    period: "May 2023 - Present",
    description:
      "Developed APIs and automated trading strategies for cryptocurrency exchanges (Bybit, Binance, OKX). Specialized in TradingView indicator integration and custom strategy automation.",
    tech: ["Python", "MySQL", "Django", "PostgreSQL", "REST API"],
  },
  {
    title: "Python Developer",
    company: "Lion Software House",
    period: "Dec 2023 - Mar 2024",
    description:
      "Built web scraping solutions using Selenium and Beautiful Soup. Automated data extraction processes with scalability focus and created comprehensive documentation.",
    tech: ["Python", "Selenium", "Beautiful Soup", "Django", "Jupyter Notebook"],
  },
  {
    title: "Software Engineer",
    company: "Final Year Project",
    period: "Sep 2022 - Jun 2023",
    description:
      "Smart Traffic Optimization for Emergency Vehicles - Desktop application using AI to detect emergency vehicles and automated traffic signal control for priority passage.",
    tech: ["Python", "YOLOv5", "Machine Learning", "PyCharm"],
  },
  {
    title: "Computer Hardware Programmer",
    company: "IoT Project",
    period: "Sep 2022 - Feb 2023",
    description:
      "Smart Hand Sanitizer - Automated sanitizer dispenser using proximity detection with Arduino and ultrasonic sensors.",
    tech: ["C++", "Arduino IDE", "Ultrasonic Sensors"],
  },
  {
    title: "Game Developer",
    company: "Self Project",
    period: "May 2022 - Sep 2022",
    description:
      "Created simulation game in Unity with custom characters. Designed multiple game levels with varying difficulty.",
    tech: ["C++", "Unity"],
  },
  {
    title: "Blockchain Developer",
    company: "Project",
    period: "Mar 2022 - Jul 2022",
    description:
      "Built blockchain-based transaction system for secure, transparent transactions using Ethereum technologies.",
    tech: ["Solidity", "Truffle", "Ganache", "Ethereum Remix IDE"],
  },
  {
    title: "Software Architect",
    company: "Semester Project",
    period: "Sep 2021 - Jan 2022",
    description:
      "Designed and developed complete travel management system with full-stack development including backend and frontend.",
    tech: ["Java", "Enterprise Architect", "NetBeans"],
  },
  {
    title: "Programmer",
    company: "Semester Project",
    period: "Mar 2021 - Jun 2021",
    description:
      "Built comprehensive School Management System backend implementing OOP concepts, dependencies, and limitations.",
    tech: ["C++", "Visual Studio"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding relative" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="code-font text-primary text-sm tracking-wider">
            {"// Experience"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Work <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent md:-translate-x-1/2" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full md:-translate-x-1/2 mt-6 z-10 animate-glow-pulse" />

                {/* Content */}
                <div
                  className={`ml-10 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="glass-card-hover p-6"
                  >
                    <div
                      className={`flex items-center gap-2 mb-3 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <Briefcase size={18} className="text-primary" />
                      <span className="text-primary font-medium">
                        {exp.company}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {exp.title}
                    </h3>

                    <div
                      className={`flex items-center gap-2 text-muted-foreground text-sm mb-4 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {exp.description}
                    </p>

                    <div
                      className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

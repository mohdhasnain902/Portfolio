import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

// Staggered entrance animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

const experiences = [
  {
    title: "Trading Bot API Developer",
    company: "Fiverr",
    location: "Islamabad, Pakistan",
    period: "May 2023 - Present",
    description:
      "Developed APIs and automated trading strategies for leading cryptocurrency exchanges, including Bybit, Binance, OKX and many more. Specialized in integrating and automating TradingView indicators and strategies, along with custom strategy implementations.",
    tech: ["Python", "MySQL", "Django", "PyCharm", "SQLite", "PostgreSQL", "REST API"],
  },
  {
    title: "Web Developer",
    company: "Al Nasr",
    location: "Quetta, Pakistan",
    period: "Sep 2025 - Nov 2026",
    description:
      "Implementation of the Frontend Design. Developing a full-fledge responsive website. Implementing features like Google Maps integration and many more.",
    tech: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    title: "Web Developer",
    company: "Joseph",
    location: "Melbourne, Australia",
    period: "Dec 2025 - Jan 2026",
    description:
      "Created a Portfolio Website. Designed the UI/UX. Implemented all the social links and the work experience of the client. Deployed on a server.",
    tech: ["HTML", "CSS", "JavaScript", "React", "Vite"],
  },
  {
    title: "AI Automation and Backend Developer",
    company: "Bocoh",
    location: "Quetta, Pakistan",
    period: "Feb 2025 - Aug 2025",
    description:
      "Development of a fully professional and standard backend structure for the website. Integrating AI with the website. Automating processes and flows. Development of APIs for the AI and frontend integration. Development of database and the whole system architecture. Handling JSON, files, images, user's data and many more.",
    tech: ["Python", "AI Integration", "API Development", "Database Design"],
  },
  {
    title: "Python Developer",
    company: "Lion Software House",
    location: "Islamabad, Pakistan",
    period: "Dec 2023 - Mar 2024",
    description:
      "Developed a web scraping solution utilizing Selenium and Beautiful Soup to extract structured data from a website. Automated the entire process, optimizing efficiency and ensuring scalability for additional sources. Collaborated cross-functionally to align the scraping process with organizational goals. Provided comprehensive documentation. Demonstrated proficiency in Selenium and Beautiful Soup.",
    tech: ["Python", "Selenium", "Beautiful Soup", "requests", "Django", "PyCharm", "Jupyter Notebook"],
  },
  {
    title: "Software Engineer - Final Year Project",
    company: "Smart Traffic Optimization for Emergency Vehicles",
    location: "Islamabad, Pakistan",
    period: "Sep 2022 - Jun 2023",
    description:
      "Created a desktop application to detect emergency vehicles with AI like ambulances, fire brigades etc. Provided them way by changing the signals so they can reach their destination on time.",
    tech: ["Python", "YOLOv5", "Machine Learning", "PyCharm", "Custom Web Scraper"],
  },
  {
    title: "Computer Hardware Programmer - IoT Project",
    company: "Smart Hand Sanitizer",
    location: "Islamabad, Pakistan",
    period: "Sep 2022 - Feb 2023",
    description:
      "Created the system using Arduino board, Ultrasonic sensors, and Arduino motors to automate the sanitizer pouring whenever a hand reaches the specified distance.",
    tech: ["C++", "Arduino IDE"],
  },
  {
    title: "Game Developer (Unity)",
    company: "Self",
    location: "Islamabad, Pakistan",
    period: "May 2022 - Sep 2022",
    description:
      "Created an eye-catching simulation game in Unity. Created custom characters along with game levels with different difficulty.",
    tech: ["C++", "Unity"],
  },
  {
    title: "Blockchain Developer",
    company: "Blockchain Transaction System",
    location: "Islamabad, Pakistan",
    period: "Mar 2022 - Jul 2022",
    description:
      "Built a comprehensive Blockchain-based transaction system using Ganache, Truffle and Remix IDE for secure and transparent transactions.",
    tech: ["Solidity", "Truffle", "Ganache", "Ethereum Remix IDE"],
  },
  {
    title: "Software Architect",
    company: "Travel Management System",
    location: "Islamabad, Pakistan",
    period: "Sep 2021 - Jan 2022",
    description:
      "Designed Software Architecture of a travel management system with proper architecture practices. Developed the whole project including Backend and Frontend.",
    tech: ["Java", "Enterprise Architect", "NetBeans"],
  },
  {
    title: "C++ Developer",
    company: "School Management System",
    location: "Islamabad, Pakistan",
    period: "Mar 2021 - Jun 2021",
    description:
      "Built a comprehensive and fully functional School Management System backend with optimal concepts practiced including dependencies, limitations, OOP, etc.",
    tech: ["C++", "Visual Studio"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Generate organic blob path for the decorative gradient
  const blobPath = useMemo(() => {
    const points = 8;
    const angleStep = (Math.PI * 2) / points;
    const radius = 300;
    
    let path = "";
    for (let i = 0; i <= points; i++) {
      const angle = i * angleStep;
      const variation = 0.7 + Math.random() * 0.6;
      const r = radius * variation;
      const x = 300 + Math.cos(angle) * r;
      const y = 300 + Math.sin(angle) * r;
      
      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        const prevAngle = (i - 1) * angleStep;
        const prevVariation = 0.7 + Math.sin(i * 1.5) * 0.3;
        const prevR = radius * prevVariation;
        const cpx1 = 300 + Math.cos(prevAngle + angleStep * 0.5) * (prevR + r) * 0.5;
        const cpy1 = 300 + Math.sin(prevAngle + angleStep * 0.5) * (prevR + r) * 0.5;
        path += ` Q ${cpx1} ${cpy1} ${x} ${y}`;
      }
    }
    return path + " Z";
  }, []);

  return (
    <section id="experience" className="section-padding relative" ref={ref}>
      {/* Decorative blob gradient in center */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block"
        style={{ zIndex: 0 }}
      >
        <svg 
          width="600" 
          height="600" 
          viewBox="0 0 600 600" 
          className="opacity-[0.15]"
          style={{ filter: "blur(60px)" }}
        >
          <defs>
            <radialGradient id="blobGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path 
            d={blobPath}
            fill="url(#blobGradient)"
          />
        </svg>
      </div>

      <div className="container-custom relative" style={{ zIndex: 1 }}>
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

          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full md:-translate-x-1/2 mt-6 z-10 animate-glow-pulse"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                />

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
                      className={`flex items-center gap-2 mb-2 ${
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
                      className={`flex items-center gap-2 text-muted-foreground text-sm mb-2 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>

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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
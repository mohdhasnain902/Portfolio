import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "C++", "Java", "Solidity", "HTML", "CSS"],
  },
  {
    title: "Frameworks",
    skills: ["Django", "Unity (2D/3D)"],
  },
  {
    title: "Tools",
    skills: [
      "Enterprise Architect",
      "PyCharm",
      "Visual Studio",
      "Cisco Packet Tracer",
      "Arduino IDE",
    ],
  },
  {
    title: "Technologies",
    skills: [
      "REST API",
      "MySQL",
      "PostgreSQL",
      "SQLite",
      "Ganache",
      "Truffle",
      "Remix IDE",
    ],
  },
  {
    title: "Specializations",
    skills: [
      "Data Science",
      "Data Analytics",
      "Data Visualization",
      "Web Scraping",
      "Trading Bot Development",
      "Blockchain",
      "IoT",
      "Machine Learning (YOLOv5)",
    ],
  },
  {
    title: "Other",
    skills: [
      "Linux Terminal",
      "Bash/Shell",
      "Microsoft Office",
      "Git",
      "API Integration",
    ],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="code-font text-primary text-sm tracking-wider">
            {"// Skills"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Tech <span className="text-gradient">Stack</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-primary" />
                {category.title}
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex flex-wrap gap-3"
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      boxShadow: "0 0 20px hsl(var(--primary) / 0.4)",
                    }}
                    transition={{
                      delay: catIndex * 0.1 + skillIndex * 0.05,
                    }}
                    className="skill-tag cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

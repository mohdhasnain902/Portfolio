import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  { title: "Programming Languages", skills: ["Python", "C++", "Java", "Solidity", "HTML", "CSS", "JavaScript"] },
  { title: "Frameworks & Libraries", skills: ["Django", "Flask", "Unity (2D/3D)", "React"] },
  { title: "Tools & Technologies", skills: ["Enterprise Architect", "PyCharm", "Visual Studio", "Cisco Packet Tracer", "Arduino IDE", "Git/GitHub", "nginx", "gunicorn"] },
  { title: "Specializations", skills: ["Trading Bot Development", "API Development (REST API)", "Web Scraping (Selenium, Beautiful Soup)", "Database Management (MySQL, PostgreSQL, SQLite)", "Blockchain Development (Ganache, Truffle, Remix IDE)", "Machine Learning (YOLOv5)", "IoT Development", "Data Science", "Data Analytics", "Data Visualization", "AI Integration & Automation", "System and Software Design", "Development, Testing and Deployment"] },
  { title: "Other", skills: ["Linux (Terminal Commands, Bash/Shell)", "Microsoft Office"] },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div data-parallax-bg="0.15" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span data-char-reveal className="code-font text-primary text-sm tracking-wider">
            {"// Skills"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-gradient">
            Tech Stack
          </h2>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              data-slide-card
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
                      scale: 1.05,
                      y: -3,
                    }}
                    transition={{ duration: 0.2 }}
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

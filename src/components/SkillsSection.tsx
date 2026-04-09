import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Python", "C++", "Java", "Solidity", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["Django", "Flask", "Unity (2D/3D)", "React"],
  },
  {
    title: "Tools & Technologies",
    skills: [
      "Enterprise Architect",
      "PyCharm",
      "Visual Studio",
      "Cisco Packet Tracer",
      "Arduino IDE",
      "Git/GitHub",
      "nginx",
      "gunicorn",
    ],
  },
  {
    title: "Specializations",
    skills: [
      "Trading Bot Development",
      "API Development (REST API)",
      "Web Scraping (Selenium, Beautiful Soup)",
      "Database Management (MySQL, PostgreSQL, SQLite)",
      "Blockchain Development (Ganache, Truffle, Remix IDE)",
      "Machine Learning (YOLOv5)",
      "IoT Development",
      "Data Science",
      "Data Analytics",
      "Data Visualization",
      "AI Integration & Automation",
      "System and Software Design",
      "Development, Testing and Deployment",
    ],
  },
  {
    title: "Other",
    skills: [
      "Linux (Terminal Commands, Bash/Shell)",
      "Microsoft Office",
    ],
  },
];

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

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="code-font text-primary text-sm tracking-wider">
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.8, delay: catIndex * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-primary" />
                {category.title}
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
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
                      delay: catIndex * 0.05 + skillIndex * 0.03,
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

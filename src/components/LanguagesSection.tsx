import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe } from "lucide-react";

const languages = [
  {
    name: "Persian",
    level: "Native / Mother Tongue",
    skills: { listening: 100, speaking: 100, reading: 100, writing: 100 },
  },
  {
    name: "English",
    level: "Proficient",
    skills: { listening: 100, speaking: 80, reading: 80, writing: 95 },
  },
  {
    name: "Urdu",
    level: "Proficient",
    skills: { listening: 95, speaking: 100, reading: 100, writing: 100 },
  },
];

const LanguagesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="code-font text-primary text-sm tracking-wider">
            {"// Languages"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Language <span className="text-gradient">Proficiency</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="glass-card-hover p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="text-primary" size={28} />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1">
                {lang.name}
              </h3>
              <p className="text-primary font-medium text-sm mb-6">
                {lang.level}
              </p>

              <div className="space-y-3">
                {Object.entries(lang.skills).map(([skill, value]) => (
                  <div key={skill}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground capitalize">
                        {skill}
                      </span>
                      <span className="text-foreground">{value}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${value}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: index * 0.15 + 0.5,
                          ease: "easeOut",
                        }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;
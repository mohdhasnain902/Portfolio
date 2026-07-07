import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, ExternalLink } from "lucide-react";

const education = [
  {
    degree: "BS Software Engineering",
    institution: "Capital University of Science and Technology (CUST)",
    location: "Islamabad, Pakistan",
    period: "Sep 2019 - Nov 2023",
    link: "https://cust.edu.pk/",
    grade: null,
  },
  {
    degree: "FSc Pre-Engineering",
    institution: "Punjab Group of Colleges",
    location: "Lahore, Pakistan",
    period: "2017 - 2018",
    link: null,
    grade: "707/1100",
  },
  {
    degree: "Matriculation",
    institution: "Uswa College",
    location: "Chakwal, Dhudlal, Pakistan",
    period: "2016 - 2017",
    link: null,
    grade: "964/1100",
  },
];

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding relative" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="code-font text-primary text-sm tracking-wider">
            {"// Education"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-gradient">
            Academic Background
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="glass-card-hover p-6 relative group"
            >
              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="text-primary" size={24} />
                </div>
                {edu.link && (
                  <motion.a
                    href={edu.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                )}
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2">
                {edu.degree}
              </h3>

              <p className="text-primary font-medium mb-3">{edu.institution}</p>

              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <MapPin size={14} />
                <span>{edu.location}</span>
              </div>


              {edu.grade && (
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">Grade: </span>
                  <span className="text-primary font-semibold">{edu.grade}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
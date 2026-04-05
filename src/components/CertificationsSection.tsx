import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink, Calendar } from "lucide-react";
import TiltCard from "@/components/TiltCard";

const certifications = [
  { title: "Using Python to Interact with the Operating System", issuer: "Google via Coursera", date: "Jan 2024", link: "https://www.coursera.org/account/accomplishments/records/YBWVRMJP6X5Q" },
  { title: "Foundations of Cybersecurity", issuer: "Google via Coursera", date: "Oct 2023", description: "Part of Google Cybersecurity Professional Certificate (Course 1)", link: "https://www.coursera.org/account/accomplishments/certificate/NG3XKA97GDWH" },
  { title: "Play it Safe: Manage Security Risks", issuer: "Google via Coursera", date: "Oct 2023", description: "Part of Google Cybersecurity Professional Certificate (Course 2)", link: "https://www.coursera.org/account/accomplishments/certificate/M339MKDVR7BU" },
  { title: "Crash Course on Python", issuer: "Google via Coursera", date: "Sep 2022", link: "https://www.coursera.org/account/accomplishments/certificate/S9P9QM5KYTS5" },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="section-padding relative" ref={ref}>
      <div data-parallax-bg="0.2" className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span data-char-reveal className="code-font text-primary text-sm tracking-wider">
            {"// Certifications"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-gradient">
            Professional Credentials
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <TiltCard key={index} className="group" maxTilt={5} glare>
              <motion.a
                data-depth-card
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card-hover p-6 cursor-pointer block relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Award className="text-primary" size={28} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{cert.title}</h3>
                      <ExternalLink size={18} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                    </div>
                    <p className="text-primary/80 font-medium mt-1">{cert.issuer}</p>
                    {cert.description && <p className="text-sm text-muted-foreground mt-2">{cert.description}</p>}
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mt-3">
                      <Calendar size={14} />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;

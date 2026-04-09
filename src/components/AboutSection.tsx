import { motion } from "framer-motion";
import { useRef } from "react";
import { Code2, Bot, Database, Zap } from "lucide-react";

const highlights = [
  {
    icon: Bot,
    title: "Trading Bot Expert",
    description: "Specialized in Bybit, Binance, OKX APIs",
  },
  {
    icon: Code2,
    title: "Python Developer",
    description: "Django, Web Scraping, Automation",
  },
  {
    icon: Database,
    title: "Full Stack",
    description: "PostgreSQL, MySQL, REST APIs",
  },
  {
    icon: Zap,
    title: "Quick Learner",
    description: "Blockchain, IoT, Machine Learning",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="code-font text-primary text-sm tracking-wider">
            {"// About Me"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-gradient">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                I'm a passionate{" "}
                <span className="text-primary font-medium">Software Engineer</span>,{" "}
                <span className="text-primary font-medium">Full Stack Developer</span>{" "}
                and{" "}
                <span className="text-primary font-medium">
                  Trading Bot API Specialist
                </span>{" "}
                based in Islamabad, Pakistan. With expertise in cryptocurrency
                exchange automation, I help traders and businesses automate their
                trading strategies on platforms like Bybit, Binance, and OKX.
              </p>
              <p>
                My journey in software development spans across multiple domains
                including web scraping, blockchain development, IoT projects, and
                machine learning. I hold a BS in Software Engineering from Capital
                University of Science and Technology, where I honed my skills in
                building scalable and efficient solutions.
              </p>
              <p>
                I'm constantly exploring new technologies and love taking on
                challenging projects that push the boundaries of what's possible.
                Whether it's building a smart traffic system using AI or creating
                secure blockchain-based transaction systems, I bring dedication
                and innovation to every project.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 1.2,
                  delay: 0.15 * index,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card-hover p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

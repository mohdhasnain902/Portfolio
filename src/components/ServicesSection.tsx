import { motion } from "framer-motion";
import { Bot, Zap, LineChart, Globe, Sparkles, Code2, Rocket, Layers } from "lucide-react";

const services = [
  {
    title: "Crypto Trading Bots",
    subtitle: "Automated Trading Solutions",
    description:
      "Transform your TradingView strategies and indicators into fully automated trading systems. I build custom bots that execute trades 24/7 with precision and speed.",
    features: [
      "TradingView Strategy Automation",
      "Custom Indicator Development",
      "Risk Management Systems",
      "Real-time Alert Processing",
    ],
    exchanges: ["Binance", "Coinbase", "Bybit", "OKX", "KuCoin", "Kraken"],
    icon: Bot,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    bgGlow: "bg-orange-500/20",
  },
  {
    title: "Modern Web Development",
    subtitle: "Blazing Fast Websites",
    description:
      "Create stunning, high-performance web applications using cutting-edge technologies. From sleek portfolios to complex web apps with smooth animations.",
    features: [
      "React + Vite Development",
      "Framer Motion Animations",
      "Responsive Design",
      "SEO Optimization",
    ],
    technologies: ["React", "Vite", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"],
    icon: Globe,
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
    bgGlow: "bg-blue-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="code-font text-primary text-sm md:text-base tracking-wider">
            {"// What I Offer"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4">
            <span className="text-gradient">My Services</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Specialized solutions to help you automate trading and build modern web experiences
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="glass-card rounded-2xl p-8 h-full relative overflow-hidden hover:border-primary/50 transition-all duration-500">
                {/* Background glow effect */}
                <div
                  className={`absolute top-0 right-0 w-64 h-64 ${service.bgGlow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Icon with gradient background */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <service.icon size={32} className="text-white" />
                </motion.div>

                {/* Title and subtitle */}
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className={`text-transparent bg-clip-text bg-gradient-to-r ${service.gradient} font-semibold mb-4`}>
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Sparkles size={16} className="text-primary" />
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Zap size={14} className="text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exchanges or Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    {index === 0 ? (
                      <>
                        <LineChart size={16} className="text-primary" />
                        Supported Exchanges
                      </>
                    ) : (
                      <>
                        <Code2 size={16} className="text-primary" />
                        Technologies
                      </>
                    )}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(service.exchanges || service.technologies)?.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 text-xs font-medium glass-card rounded-full text-primary border border-primary/30 hover:border-primary/60 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  {index === 0 ? (
                    <Bot size={120} className="text-primary" />
                  ) : (
                    <Layers size={120} className="text-primary" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Ready to bring your ideas to life?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl btn-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Rocket size={20} />
            Let's Work Together
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
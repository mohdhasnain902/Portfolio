import { motion } from "framer-motion";
import { 
  Bot, 
  Zap, 
  LineChart, 
  Globe, 
  Sparkles, 
  Code2, 
  Rocket, 
  Layers,
  Brain,
  Database,
  BarChart3,
  Link2,
  Cpu,
  Wrench,
  ChevronRight
} from "lucide-react";

const services = [
  {
    title: "Trading Bot API Development",
    subtitle: "Automated Trading Solutions",
    description:
      "Automated cryptocurrency trading solutions for Bybit, Binance, Coinbase, OKX with TradingView integration.",
    features: [
      "TradingView Strategy Automation",
      "Custom Indicator Development",
      "Risk Management Systems",
      "Real-time Alert Processing",
    ],
    technologies: ["Binance", "Coinbase", "Bybit", "OKX", "KuCoin", "Kraken"],
    icon: Bot,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    bgGlow: "bg-orange-500/20",
  },
  {
    title: "Web Development",
    subtitle: "Blazing Fast Websites",
    description:
      "Full-stack responsive websites using React, Django, and modern frameworks with smooth animations.",
    features: [
      "React + Vite Development",
      "Framer Motion Animations",
      "Responsive Design",
      "SEO Optimization",
    ],
    technologies: ["React", "Vite", "TypeScript", "Tailwind CSS", "Django", "Next.js"],
    icon: Globe,
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
    bgGlow: "bg-blue-500/20",
  },
  {
    title: "AI Integration & Automation",
    subtitle: "Intelligent Business Solutions",
    description:
      "Intelligent automation solutions using Gemini API, ChatGPT, and custom AI models to streamline business processes and workflows.",
    features: [
      "Automated Customer Support",
      "Intelligent Chatbots",
      "Data Processing Automation",
      "Workflow Optimization",
    ],
    technologies: ["Python", "Django", "Gemini API", "OpenAI API", "JWT", "REST APIs"],
    icon: Brain,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    bgGlow: "bg-purple-500/20",
  },
  {
    title: "Web Scraping Solutions",
    subtitle: "Data Extraction Expertise",
    description:
      "Custom data extraction and web scraping services using Selenium and Beautiful Soup for market research, price monitoring, and competitive analysis.",
    features: [
      "E-commerce Price Tracking",
      "Lead Generation",
      "Market Research",
      "Data Aggregation",
    ],
    technologies: ["Python", "Selenium", "Beautiful Soup", "Pandas", "Requests"],
    icon: Database,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bgGlow: "bg-emerald-500/20",
  },
  {
    title: "Backend API Development",
    subtitle: "Robust Server Solutions",
    description:
      "Robust REST API development with Django, JWT authentication, database architecture, and third-party integrations.",
    features: [
      "Mobile App Backends",
      "Microservices Architecture",
      "Payment Gateway Integration",
      "CRM Systems",
    ],
    technologies: ["Django REST", "PostgreSQL", "MySQL", "JWT", "OAuth", "SQLite"],
    icon: Code2,
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    bgGlow: "bg-indigo-500/20",
  },
  {
    title: "Professional Trading Bots",
    subtitle: "24/7 Automated Trading",
    description:
      "Automate your trading strategies with custom-built, intelligent trading bots designed for cryptocurrency markets. Sophisticated automation solutions that execute trades 24/7 with precision and reliability.",
    features: [
      "TradingView Strategy Automation",
      "Grid & Martingale Bots",
      "Real-time Telegram Notifications",
      "Backtesting & Risk Management",
    ],
    technologies: ["Python", "Binance", "Bybit", "OKX", "Telegram API"],
    icon: BarChart3,
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    bgGlow: "bg-yellow-500/20",
  },
  {
    title: "Blockchain Development",
    subtitle: "Decentralized Solutions",
    description:
      "Secure and transparent blockchain solutions using Solidity and Ethereum for decentralized applications and smart contracts.",
    features: [
      "Smart Contracts",
      "DeFi Applications",
      "NFT Platforms",
      "Transparent Transactions",
    ],
    technologies: ["Solidity", "Truffle", "Ganache", "Ethereum", "Remix IDE"],
    icon: Link2,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    bgGlow: "bg-violet-500/20",
  },
  {
    title: "IoT Solutions",
    subtitle: "Smart Device Development",
    description:
      "Arduino-based Internet of Things solutions for automation and smart device development.",
    features: [
      "Home Automation",
      "Smart Devices",
      "Industrial Automation",
      "Sensor Networks",
    ],
    technologies: ["Arduino", "C++", "Sensors", "Motors", "Ultrasonic", "Temperature"],
    icon: Cpu,
    gradient: "from-teal-500 via-green-500 to-lime-500",
    bgGlow: "bg-teal-500/20",
  },
  {
    title: "Custom Software Development",
    subtitle: "Enterprise Applications",
    description:
      "Tailored desktop and enterprise applications with optimal architecture practices and OOP principles.",
    features: [
      "School Management Systems",
      "Inventory Systems",
      "CRM Software",
      "Desktop Applications",
    ],
    technologies: ["Python", "Java", "C++", "Enterprise Architect", "OOP"],
    icon: Wrench,
    gradient: "from-slate-500 via-gray-500 to-zinc-500",
    bgGlow: "bg-slate-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

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
            Comprehensive solutions from trading automation to enterprise software development
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative"
            >
              <div className="glass-card rounded-2xl p-6 h-full relative overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]">
                {/* Background glow effect */}
                <div
                  className={`absolute top-0 right-0 w-48 h-48 ${service.bgGlow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 20px hsl(var(--primary) / 0.08)" }}
                />

                {/* Icon with gradient background */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 shadow-lg`}
                >
                  <service.icon size={28} className="text-foreground" />
                </motion.div>

                {/* Title and subtitle */}
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {service.title}
                </h3>
                <p className={`text-transparent bg-clip-text bg-gradient-to-r ${service.gradient} font-semibold text-sm mb-3`}>
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features with stagger animation */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-primary" />
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 gap-1.5">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <motion.li
                        key={feature}
                        custom={i}
                        variants={featureVariants}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground"
                      >
                        <Zap size={10} className="text-primary flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {service.technologies.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 text-[10px] font-medium glass-card rounded-full text-primary border border-primary/30 transition-colors duration-300 hover:bg-primary/10"
                      >
                        {item}
                      </span>
                    ))}
                    {service.technologies.length > 4 && (
                      <span className="px-2 py-0.5 text-[10px] font-medium glass-card rounded-full text-muted-foreground border border-border/30">
                        +{service.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.a
                  href="#contact"
                  className={`inline-flex items-center gap-1.5 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r ${service.gradient} hover:gap-2.5 transition-all duration-300`}
                  whileHover={{ x: 5 }}
                >
                  Get Quote
                  <ChevronRight size={14} className="text-primary" />
                </motion.a>

                {/* Decorative element */}
                <div className="absolute bottom-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <service.icon size={80} className="text-primary" />
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

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Zap, Globe } from "lucide-react";

const caseStudies = [
  {
    icon: TrendingUp,
    tag: "Trading Automation",
    title: "24/7 Bybit Trading Bot with Risk Management",
    problem: "Client was manually executing TradingView signals — missing opportunities during Asian sessions and taking emotional losses.",
    solution: "Webhook-driven bot on FastAPI, Bybit v5 API, dynamic position sizing, trailing stops, hard drawdown circuit breaker.",
    outcome: "87% net return over 12 months across 2,800+ trades. Max drawdown kept under 19%.",
    stack: ["Python", "FastAPI", "Bybit API", "PostgreSQL"],
  },
  {
    icon: Zap,
    tag: "AI Automation",
    title: "Content Ops Pipeline for a SaaS Team",
    problem: "Marketing team spent 15h/week manually formatting, tagging, and publishing blog content across channels.",
    solution: "LLM-powered pipeline that ingests Notion drafts, generates SEO metadata + social posts, and syncs to CMS + LinkedIn.",
    outcome: "12+ hours saved weekly. Publishing cadence tripled with zero quality drop.",
    stack: ["Python", "OpenAI", "Notion API", "Next.js"],
  },
  {
    icon: Globe,
    tag: "Web Development",
    title: "High-Performance E-commerce Storefront",
    problem: "Legacy Shopify theme scored 34 on Lighthouse mobile; cart abandonment sat at 78%.",
    solution: "Custom React + Vite storefront hitting Shopify Storefront API, edge-cached, image-optimized, PWA-installable.",
    outcome: "Lighthouse 97, LCP under 1.2s, cart abandonment dropped to 51% in 6 weeks.",
    stack: ["React", "Vite", "Shopify API", "Tailwind"],
  },
];

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="section-padding relative">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="code-font text-primary text-sm tracking-wider">
            {"// Case Studies"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-gradient">
            Selected Work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Problem → solution → measurable outcome. A snapshot of what I've shipped for clients.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, index) => (
            <motion.article
              key={cs.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="glass-card-hover p-6 h-full flex flex-col group"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <cs.icon className="text-primary" size={22} />
                </div>
                <span className="text-xs code-font text-primary/80 uppercase tracking-wider">
                  {cs.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {cs.title}
              </h3>

              <div className="space-y-3 text-sm flex-1">
                <div>
                  <p className="code-font text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">Problem</p>
                  <p className="text-muted-foreground leading-relaxed">{cs.problem}</p>
                </div>
                <div>
                  <p className="code-font text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">Solution</p>
                  <p className="text-muted-foreground leading-relaxed">{cs.solution}</p>
                </div>
                <div>
                  <p className="code-font text-[10px] uppercase tracking-widest text-primary/70 mb-1">Outcome</p>
                  <p className="text-foreground font-medium leading-relaxed">{cs.outcome}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-border/50">
                {cs.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] code-font glass-card rounded text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;

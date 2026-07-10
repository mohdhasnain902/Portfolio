import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Crypto Trader, Sydney",
    quote:
      "Muhammad built a Bybit trading bot that has been running flawlessly for 8 months. Clear communication, on-time delivery, and the risk management logic saved me from a nasty drawdown.",
    rating: 5,
    initials: "AT",
  },
  {
    name: "Sarah Kim",
    role: "Founder, E-commerce Startup",
    quote:
      "Our custom scraping pipeline processes 40k product pages a day without breaking. Muhammad is one of the rare devs who actually cares about edge cases and observability.",
    rating: 5,
    initials: "SK",
  },
  {
    name: "David Reyes",
    role: "Product Lead, SaaS",
    quote:
      "Delivered a full React + FastAPI dashboard in three weeks. Clean code, great UX, and he documented everything. Would hire again in a heartbeat.",
    rating: 5,
    initials: "DR",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding relative">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="code-font text-primary text-sm tracking-wider">
            {"// Testimonials"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-gradient">
            What Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A few words from people I've had the pleasure of building with.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="glass-card-hover p-6 h-full flex flex-col"
            >
              <Quote className="text-primary/60 mb-4" size={28} />
              <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-primary fill-primary" />
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

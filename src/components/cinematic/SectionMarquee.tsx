import { motion } from "framer-motion";

interface Props {
  words: string[];
  direction?: "left" | "right";
  duration?: number;
}

const SectionMarquee = ({ words, direction = "left", duration = 35 }: Props) => {
  const track = [...words, ...words, ...words];
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  return (
    <div
      aria-hidden
      className="relative overflow-hidden py-10 border-y border-border/30 bg-background/40 backdrop-blur-sm my-8"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        className="flex whitespace-nowrap gap-16 will-change-transform"
        animate={{ x: [from, to] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {track.map((w, i) => (
          <span
            key={i}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground/10 hover:text-gradient transition-colors"
          >
            {w}
            <span className="text-primary/40 mx-8">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default SectionMarquee;

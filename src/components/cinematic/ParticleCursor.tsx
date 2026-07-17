import { useEffect, useRef } from "react";

/**
 * Keydevs-style particle burst that follows the cursor.
 * Small colorful particles spawn at the cursor and drift outward while fading.
 * Runs only on fine-pointer devices; ignores touch to preserve mobile perf.
 */
const ParticleCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<
    { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; color: string }[]
  >([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // On-brand palette (cyan / green / soft violet accent)
    const palette = ["#00F0FF", "#00D4AA", "#7DF9FF", "#A78BFA", "#22D3EE"];

    let lastSpawn = 0;
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
      const now = performance.now();
      if (now - lastSpawn < 12) return;
      lastSpawn = now;

      const count = 3;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.6 + 0.4;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.3,
          life: 0,
          max: 60 + Math.random() * 40,
          size: Math.random() * 2.2 + 0.6,
          color: palette[Math.floor(Math.random() * palette.length)],
        });
      }
      // Cap for perf
      if (particlesRef.current.length > 400) {
        particlesRef.current.splice(0, particlesRef.current.length - 400);
      }
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      const arr = particlesRef.current;
      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        p.life += 1;
        if (p.life >= p.max) {
          arr.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        const alpha = 1 - p.life / p.max;

        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        g.addColorStop(0, `${p.color}${Math.floor(alpha * 200).toString(16).padStart(2, "0")}`);
        g.addColorStop(1, `${p.color}00`);
        ctx.fillStyle = g;
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 6 }}
    />
  );
};

export default ParticleCursor;

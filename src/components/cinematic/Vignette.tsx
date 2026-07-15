const Vignette = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 z-[55]"
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 55%, hsl(var(--background) / 0.65) 100%)",
    }}
  />
);

export default Vignette;

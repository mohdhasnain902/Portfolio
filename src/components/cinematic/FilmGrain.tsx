const FilmGrain = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 z-[60] opacity-[0.07] mix-blend-overlay"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
      backgroundSize: "200px 200px",
    }}
  />
);

export default FilmGrain;

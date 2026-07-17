import { useEffect, useRef } from "react";

/**
 * Volumetric holographic smoke trail that follows the cursor.
 * Powered by threejs-toys `neonCursor` (WebGL). Additive blend, sits behind
 * page content, cycles cyan → green → yellow → pink → purple.
 */
const SmokeCursor = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = mountRef.current;
    if (!el) return;

    let instance: { dispose?: () => void } | null = null;
    let cancelled = false;

    (async () => {
      try {
        const mod: any = await import(
          /* @vite-ignore */ "threejs-toys/build/threejs-toys.module.cdn.min.js"
        );
        if (cancelled) return;
        instance = mod.neonCursor({
          el,
          shaderPoints: 16,
          curvePoints: 80,
          curveLerp: 0.5,
          radius1: 5,
          radius2: 30,
          sleepRadiusX: 100,
          sleepRadiusY: 100,
          sleepTimeCoefX: 0.0025,
          sleepTimeCoefY: 0.0025,
          colors: [0x00f0ff, 0x00d4aa, 0xa78bfa, 0xff5ea8, 0x22d3ee],
        });
      } catch (e) {
        // graceful no-op if WebGL/library unavailable
      }
    })();

    return () => {
      cancelled = true;
      try {
        instance?.dispose?.();
      } catch {}
      // library appends a canvas child; clean up
      while (el.firstChild) el.removeChild(el.firstChild);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 1, mixBlendMode: "screen" }}
    />
  );
};

export default SmokeCursor;

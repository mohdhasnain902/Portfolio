import { useEffect, useRef } from "react";

/**
 * WebGL fluid smoke cursor (PavelDoGreat's WebGL-Fluid-Simulation via `webgl-fluid`).
 * Produces the exact keydevs.com-style volumetric colored smoke that swirls with mouse.
 * Disabled on touch / coarse-pointer devices.
 */
const SmokeCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    (async () => {
      try {
        const mod: any = await import("webgl-fluid");
        if (disposed) return;
        const WebGLFluid = mod.default || mod;
        WebGLFluid(canvas, {
          IMMEDIATE: true,
          TRIGGER: "hover",
          SIM_RESOLUTION: 128,
          DYE_RESOLUTION: 1024,
          CAPTURE_RESOLUTION: 512,
          DENSITY_DISSIPATION: 3.5,
          VELOCITY_DISSIPATION: 2,
          PRESSURE: 0.1,
          PRESSURE_ITERATIONS: 20,
          CURL: 3,
          SPLAT_RADIUS: 0.2,
          SPLAT_FORCE: 6000,
          SHADING: true,
          COLORFUL: true,
          COLOR_UPDATE_SPEED: 10,
          PAUSED: false,
          BACK_COLOR: { r: 0, g: 0, b: 0 },
          TRANSPARENT: true,
          BLOOM: true,
          BLOOM_ITERATIONS: 8,
          BLOOM_RESOLUTION: 256,
          BLOOM_INTENSITY: 0.8,
          BLOOM_THRESHOLD: 0.6,
          BLOOM_SOFT_KNEE: 0.7,
          SUNRAYS: true,
          SUNRAYS_RESOLUTION: 196,
          SUNRAYS_WEIGHT: 1.0,
        });
      } catch (e) {
        // graceful no-op
      }
    })();

    return () => {
      disposed = true;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 1, mixBlendMode: "screen", opacity: 0.85 }}
    />
  );
};

export default SmokeCursor;

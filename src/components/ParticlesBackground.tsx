import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <Particles
        id="tsparticles"
        options={{
          fullScreen: {
            enable: false,
          },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 30,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 120,
              enable: true,
              opacity: 0.08,
              width: 0.5,
            },
            move: {
              enable: true,
              direction: "none",
              outModes: {
                default: "out",
              },
              random: false,
              speed: 0.3,
              straight: false,
              attract: {
                enable: false,
              },
            },
            number: {
              density: {
                enable: true,
                width: 1920,
                height: 1080,
              },
              value: 50,
            },
            opacity: {
              value: 0.15,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 2 },
            },
          },
          detectRetina: true,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: {
                enable: true,
              },
            },
            modes: {
              repulse: {
                distance: 80,
                duration: 0.8,
                speed: 0.2,
                factor: 50,
              },
            },
          },
        }}
        className="w-full h-full"
      />
    </div>
  );
};

export default ParticlesBackground;

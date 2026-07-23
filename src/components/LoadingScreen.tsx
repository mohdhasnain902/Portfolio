import { useState, useEffect } from "react";

/**
 * Infinity loader: lemniscate curve with a traveling cyan→white→purple light head.
 * Auto-unmounts once the window finishes loading, with a hard fallback timeout.
 */
const LoadingScreen = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onReady = () => setHidden(true);
    window.addEventListener("load", onReady);
    const fallback = setTimeout(onReady, 1.8 * 1000);
    return () => {
      window.removeEventListener("load", onReady);
      clearTimeout(fallback);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <svg
        width="220"
        height="120"
        viewBox="0 0 220 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M45 60 C45 25, 85 25, 110 60 C135 95, 175 95, 175 60 C175 25, 135 25, 110 60 C85 95, 45 95, 45 60 Z"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        <circle r="5.2" fill="#22d3ee">
          <animateMotion
            dur="2.4s"
            repeatCount="indefinite"
            path="M45 60 C45 25, 85 25, 110 60 C135 95, 175 95, 175 60 C175 25, 135 25, 110 60 C135 95, 175 95, 175 60 C175 25, 135 25, 110 60 C85 95, 45 95, 45 60 Z"
          />
          <animate
            attributeName="fill"
            values="#22d3ee;#fff;#a855f7;#22d3ee"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <p className="mt-6 text-sm tracking-widest text-muted-foreground">
        Loading...
      </p>
    </div>
  );
};

export default LoadingScreen;

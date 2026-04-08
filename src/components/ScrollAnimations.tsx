import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimations = () => {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // --- Parallax background orbs ---
      gsap.utils.toArray<HTMLElement>("[data-parallax-bg]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxBg || "0.2");
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // --- Section subtle fade-in reveals (no 3D tilt) ---
      gsap.utils.toArray<HTMLElement>("[data-scroll-section]").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.85, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      });

      // --- Depth emergence for cards (subtle) ---
      gsap.utils.toArray<HTMLElement>("[data-depth-card]").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 60%",
              toggleActions: "play none none none",
            },
            delay: (i % 3) * 0.08,
          }
        );
      });

      // --- Staggered slide-in for cards (subtle) ---
      gsap.utils.toArray<HTMLElement>("[data-slide-card]").forEach((card, i) => {
        const direction = i % 2 === 0 ? -30 : 30;
        gsap.fromTo(
          card,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // --- Counter animations ---
      gsap.utils.toArray<HTMLElement>("[data-count-up]").forEach((el) => {
        const target = parseInt(el.dataset.countUp || "0", 10);
        const suffix = el.dataset.countSuffix || "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      });

      // --- Hero parallax text layers ---
      const heroTitle = document.querySelector("[data-hero-title]");
      const heroSubtitle = document.querySelector("[data-hero-subtitle]");
      const heroImage = document.querySelector("[data-hero-image]");

      if (heroTitle) {
        gsap.to(heroTitle, {
          yPercent: -60,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (heroSubtitle) {
        gsap.to(heroSubtitle, {
          yPercent: -30,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (heroImage) {
        gsap.to(heroImage, {
          yPercent: -15,
          scale: 0.9,
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // --- Floating sine wave for decorative elements ---
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
        gsap.to(el, {
          y: "+=20",
          duration: 2 + i * 0.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      // --- Character-by-character text reveal for code-font headers ---
      gsap.utils.toArray<HTMLElement>("[data-char-reveal]").forEach((el) => {
        const text = el.textContent || "";
        el.textContent = "";
        const chars = text.split("").map((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          span.style.transform = "translateY(20px)";
          el.appendChild(span);
          return span;
        });

        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
};

export default ScrollAnimations;

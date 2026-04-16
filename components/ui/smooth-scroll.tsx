"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize the buttery smooth scroll engine
    const lenis = new Lenis({
      duration: 1.2, // The "weight" of the scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Bridge Lenis scroll events to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Cleanup to prevent memory leaks when navigating between pages
    return () => {
      gsap.ticker.remove(lenis.raf as Parameters<typeof gsap.ticker.remove>[0]);
      lenis.destroy();
    };
  }, []);

  // Returns your exact page content, completely untouched, just wrapped in the scroll engine
  return <>{children}</>;
}
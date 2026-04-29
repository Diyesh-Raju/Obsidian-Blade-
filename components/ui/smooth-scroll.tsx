"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/lenis-instance";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Touch devices use native browser scroll. Lenis on touch can swallow
    // tap events and break the ScrollTrigger update bridge, which kills
    // every scroll-driven animation. Native scroll works perfectly with
    // ScrollTrigger out of the box.
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window);

    if (isTouch) {
      setLenis(null);
      // Make sure ScrollTrigger picks up the page after layout settles —
      // helps measurements when async content (frames, fonts, images)
      // mounts after first paint.
      const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      return () => window.clearTimeout(id);
    }

    // Desktop: cinematic smooth scroll
    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf as Parameters<typeof gsap.ticker.remove>[0]);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}

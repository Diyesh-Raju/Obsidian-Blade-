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
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Lenis caches the page's max scroll in `limit`. Late-loading content —
    // lazy images, video posters swapping in, font reflows, pin spacers —
    // can grow the page after Lenis took its measurement, leaving the user
    // unable to scroll past the old bottom. Force re-measure on every signal
    // we can get.
    const refresh = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    // 1. Body-size ResizeObserver as a backstop to Lenis's internal one.
    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);

    // 2. Once all images/videos finish loading, document height usually grows.
    const onWindowLoad = () => refresh();
    if (document.readyState === "complete") {
      window.setTimeout(refresh, 100);
    } else {
      window.addEventListener("load", onWindowLoad);
    }

    // 3. Image load events bubble — catch anything async.
    const onImageLoad = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "IMG" || t.tagName === "VIDEO")) refresh();
    };
    document.addEventListener("load", onImageLoad, true);

    // 4. Tab regains focus or returns from background — cached limit is suspect.
    const onVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // 5. Window resize / orientation change.
    window.addEventListener("resize", refresh);
    window.addEventListener("orientationchange", refresh);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", onWindowLoad);
      document.removeEventListener("load", onImageLoad, true);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}

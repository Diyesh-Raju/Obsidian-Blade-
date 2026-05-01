"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getLenis } from "@/lib/lenis-instance";

// Force scroll to the top whenever the route changes.
// Next.js' default scroll-to-top can be defeated by Lenis' virtual scroll
// (the "first element" check sees Lenis-controlled positions instead of the
// real window.scrollY), so we drive the reset ourselves on every pathname
// change. We also disable browser scroll restoration so back/forward never
// snaps to a stale offset on a fresh page mount.
export function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Skip the very first render — that's the initial page load and the
    // browser is already at top. Running on first mount can fight against
    // hash anchors or in-page deep-link scrolling.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Respect hash links (e.g. /residential#current-collections from a slug
    // page's "back to all" anchor). The browser handles the deep-scroll;
    // we'd undo it.
    if (typeof window !== "undefined" && window.location.hash) return;

    const reset = () => {
      const lenis = getLenis();
      if (lenis) {
        // Instant jump — no smooth scroll on cross-page nav.
        lenis.scrollTo(0, { immediate: true, force: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    // Run synchronously and again on the next frame to outpace any layout
    // shifts (font loads, image dimensions resolving, ScrollTrigger pinning)
    // that can re-introduce a non-zero scrollY immediately after navigation.
    reset();
    const raf1 = requestAnimationFrame(() => {
      reset();
      const raf2 = requestAnimationFrame(reset);
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [pathname]);

  return null;
}

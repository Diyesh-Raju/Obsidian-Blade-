import type Lenis from "lenis";

// Module-level singleton holding the active Lenis instance.
// SmoothScroll registers it on mount; consumers (e.g. Navbar) can read it
// to drive Lenis-aware scrolls instead of competing with native window.scrollTo.
let _lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  _lenis = instance;
};

export const getLenis = (): Lenis | null => _lenis;

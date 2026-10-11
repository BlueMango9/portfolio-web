import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useScrollProgress — Returns scroll progress (0..1) within a target element.
 * The progress advances as the user scrolls through the sticky scroll container.
 * Uses offsetTop measurement for maximum reliability across all layouts.
 */
export function useScrollProgress(containerRef) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  const update = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;

      // Use scrollY + element offset instead of getBoundingClientRect
      // This is more stable with sticky positioning
      const elTop = el.getBoundingClientRect().top + window.scrollY;
      const elHeight = el.offsetHeight;
      const scrollY = window.scrollY;
      const winH = window.innerHeight;

      const scrollableHeight = elHeight - winH;
      if (scrollableHeight <= 0) return;

      // How far we've scrolled INTO this element
      const scrolled = scrollY - elTop;
      const p = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      setProgress(p);
    });
  }, [containerRef]);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    // Also listen for resize since dimensions change
    window.addEventListener("resize", update, { passive: true });
    update(); // initial call
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  return progress;
}

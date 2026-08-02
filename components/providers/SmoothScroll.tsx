"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll inercial (extremamente suave) via Lenis.
 * Desativado automaticamente para quem prefere menos movimento.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Âncoras internas passam a usar o scroll suave do Lenis.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.6 });
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

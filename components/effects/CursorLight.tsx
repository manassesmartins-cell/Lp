"use client";

import { useEffect, useRef } from "react";

/**
 * Iluminação discreta que acompanha o cursor.
 * Interpolação suave (lerp) via rAF — sem re-render do React.
 * Não é montada em dispositivos de toque nem com reduced-motion.
 */
export default function CursorLight() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const el = glowRef.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const tick = () => {
      // Lerp: o brilho "persegue" o cursor com um leve atraso elegante.
      x += (targetX - x) * 0.075;
      y += (targetY - y) * 0.075;

      el.style.transform = `translate3d(${x - 340}px, ${y - 340}px, 0)`;

      // Exposto em CSS para efeitos de brilho de outros componentes.
      document.documentElement.style.setProperty("--cursor-x", `${x}px`);
      document.documentElement.style.setProperty("--cursor-y", `${y}px`);

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    el.style.opacity = "1";

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden opacity-0 mix-blend-screen transition-opacity duration-1000"
      style={{ contain: "strict" }}
    >
      <div
        ref={glowRef}
        className="h-[680px] w-[680px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.075) 0%, rgba(212,175,55,0.03) 35%, rgba(18,41,79,0.02) 60%, transparent 72%)",
        }}
      />
    </div>
  );
}

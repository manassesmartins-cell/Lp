"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Densidade base — quantidade por milhão de pixels. */
  density?: number;
  className?: string;
};

type Mote = {
  x: number;
  y: number;
  r: number;
  drift: number;
  rise: number;
  alpha: number;
  phase: number;
};

/**
 * Partículas de poeira suspensa iluminada — canvas leve,
 * pausa quando fora da viewport e respeita reduced-motion.
 */
export default function Particles({ density = 26, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let motes: Mote[] = [];
    let frame = 0;
    let visible = true;
    let time = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seed = (count: number) => {
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.35,
        drift: (Math.random() - 0.5) * 0.14,
        rise: Math.random() * 0.22 + 0.05,
        alpha: Math.random() * 0.5 + 0.12,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(((width * height) / 1_000_000) * density);
      seed(Math.max(14, Math.min(count, 90)));
    };

    const draw = () => {
      time += 0.006;
      ctx.clearRect(0, 0, width, height);

      for (const m of motes) {
        m.y -= m.rise;
        m.x += m.drift + Math.sin(time + m.phase) * 0.12;

        if (m.y < -8) {
          m.y = height + 8;
          m.x = Math.random() * width;
        }
        if (m.x < -8) m.x = width + 8;
        if (m.x > width + 8) m.x = -8;

        // Cintilância lenta
        const twinkle = 0.55 + Math.sin(time * 2.2 + m.phase) * 0.45;
        const alpha = m.alpha * twinkle;

        const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 5);
        glow.addColorStop(0, `rgba(242, 220, 149, ${alpha})`);
        glow.addColorStop(0.4, `rgba(212, 175, 55, ${alpha * 0.35})`);
        glow.addColorStop(1, "rgba(212, 175, 55, 0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    frame = requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // Pausa fora da viewport para economizar bateria.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          frame = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting && visible) {
          visible = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

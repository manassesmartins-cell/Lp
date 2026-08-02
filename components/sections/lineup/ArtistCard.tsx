"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { LineupArtist } from "@/lib/site-config";

type Props = {
  artist: LineupArtist;
  index: number;
  /** Largura da coluna — definida pelo grid em `Lineup.tsx`. */
  widthClass: string;
};

const SPRING = { stiffness: 220, damping: 22, mass: 0.5 };

/**
 * Card do line-up com inclinação 3D seguindo o ponteiro
 * e brilho dourado no hover.
 */
export default function ArtistCard({ artist, index, widthClass }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), SPRING);

  /* Reflexo especular que acompanha o ponteiro dentro do card. */
  const shineX = useTransform(px, [-0.5, 0.5], ["12%", "88%"]);
  const shineY = useTransform(py, [-0.5, 0.5], ["10%", "90%"]);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className={widthClass}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full overflow-hidden rounded-2xl glass p-8 transition-[border-color,box-shadow] duration-700 ease-lux hover:border-gold/35 hover:shadow-gold-lg sm:p-9"
      >
        {/* Monograma ao fundo */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-3 -top-7 select-none font-display text-[7.5rem] font-light leading-none text-white/[0.035] transition-all duration-700 ease-lux group-hover:text-gold/[0.09] sm:text-[9rem]"
        >
          {artist.initials}
        </span>

        {/* Reflexo seguindo o ponteiro (via variáveis CSS animadas) */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={
            {
              "--shine-x": shineX,
              "--shine-y": shineY,
              background:
                "radial-gradient(340px circle at var(--shine-x) var(--shine-y), rgba(212,175,55,0.14), transparent 65%)",
            } as React.CSSProperties
          }
        />

        {/* Halo dourado nas bordas */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-700 ease-lux group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(140deg, rgba(212,175,55,0.22), transparent 42%, transparent 62%, rgba(30,64,121,0.22))",
            maskImage:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: 1,
          }}
        />

        <div
          className="relative flex h-full flex-col"
          style={{ transform: "translateZ(38px)" }}
        >
          <span className="text-2xl leading-none" aria-hidden>
            {artist.emoji}
          </span>

          <h3 className="mt-6 font-display text-3xl font-light leading-tight text-white transition-colors duration-500 group-hover:text-gold-light sm:text-[2rem]">
            {artist.name}
          </h3>

          <div className="hairline mt-5 w-10 origin-left transition-transform duration-700 ease-lux group-hover:scale-x-[2.6]" />

          <p className="mt-5 font-sans text-[0.68rem] uppercase tracking-widest text-white/40 transition-colors duration-500 group-hover:text-white/60">
            {artist.role}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
  /** `solid` = dourado preenchido · `ghost` = contorno translúcido. */
  variant?: "solid" | "ghost";
  size?: "md" | "lg";
  className?: string;
  showArrow?: boolean;
};

const SIZES = {
  md: "px-8 py-3.5 text-[0.7rem] sm:text-xs",
  lg: "px-10 py-5 text-xs sm:text-sm",
} as const;

/**
 * Botão de conversão: varredura de brilho contínua,
 * halo dourado no hover e resposta tátil no clique.
 */
export default function GoldButton({
  children,
  href,
  variant = "solid",
  size = "md",
  className = "",
  showArrow = true,
}: Props) {
  const isSolid = variant === "solid";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-sans font-medium uppercase tracking-widest transition-colors duration-500 ease-lux ${
        SIZES[size]
      } ${
        isSolid
          ? "text-void shadow-gold"
          : "glass glass-gold text-gold hover:text-gold-light"
      } ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.975, y: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
    >
      {/* Preenchimento metálico */}
      {isSolid && (
        <span
          aria-hidden
          className="absolute inset-0 bg-gold-sheen bg-[length:250%_100%] animate-sheen-slide"
        />
      )}

      {/* Halo que acende no hover */}
      <span
        aria-hidden
        className={`absolute -inset-6 opacity-0 blur-2xl transition-opacity duration-700 ease-lux group-hover:opacity-100 ${
          isSolid ? "bg-gold/40" : "bg-gold/20"
        }`}
      />

      {/* Varredura de luz atravessando o botão */}
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-[1100ms] ease-lux group-hover:translate-x-full"
      />

      {/* Contorno interno sutil */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full shadow-inset"
      />

      <span className="relative z-10">{children}</span>
      {showArrow && (
        <ArrowUpRight
          className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 ease-lux group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.75}
        />
      )}
    </motion.a>
  );
}

"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Atraso em segundos. */
  delay?: number;
  /** Deslocamento inicial em pixels. */
  y?: number;
  /** Desfoque inicial — reforça a sensação de foco cinematográfico. */
  blur?: boolean;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "p";
  once?: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade + subida suave ao entrar na viewport. */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  blur = true,
  className = "",
  as = "div",
  once = true,
}: Props) {
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
      filter: blur ? "blur(10px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.05, delay, ease: EASE },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </MotionTag>
  );
}

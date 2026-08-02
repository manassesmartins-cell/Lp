"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Filete dourado no topo indicando o progresso da leitura. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-light"
    />
  );
}

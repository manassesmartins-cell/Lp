"use client";

import { motion, type Variants } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  /**
   * Classe aplicada a CADA letra.
   * Necessário para preenchimentos com `background-clip: text`: o recorte
   * só pinta os glifos do próprio elemento, e aqui cada letra é um span.
   */
  letterClassName?: string;
  /** Atraso antes da primeira letra. */
  delay?: number;
  /** Intervalo entre letras. */
  stagger?: number;
  /** Dispara ao entrar na viewport em vez de na montagem. */
  onScroll?: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  visible: {
    transition: { delayChildren: delay, staggerChildren: stagger },
  },
});

const letter: Variants = {
  hidden: { opacity: 0, y: "0.42em", rotateX: -55, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: EASE },
  },
};

/**
 * Texto surgindo letra por letra.
 * Palavras não quebram no meio e o texto completo fica acessível a leitores de tela.
 */
export default function SplitText({
  text,
  className = "",
  letterClassName = "",
  delay = 0,
  stagger = 0.045,
  onScroll = false,
}: Props) {
  const words = text.split(" ");

  const trigger = onScroll
    ? { whileInView: "visible" as const, viewport: { once: true, amount: 0.5 } }
    : { animate: "visible" as const };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container(delay, stagger)}
      initial="hidden"
      aria-label={text}
      style={{ perspective: 700 }}
      {...trigger}
    >
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, charIndex) => (
            <motion.span
              key={`${char}-${charIndex}`}
              className={`inline-block will-change-transform ${letterClassName}`}
              variants={letter}
              aria-hidden
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && (
            <span aria-hidden className="inline-block">
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </motion.span>
  );
}

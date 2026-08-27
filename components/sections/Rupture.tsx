"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { rupture } from "@/lib/site-config";

/**
 * Ruptura — o conceito da edição, encenado em vez de escrito.
 *
 * Duas metades sólidas cobrem a tela. Conforme o scroll avança, elas se
 * afastam e a luz carmim vaza pela fenda: a página literalmente se parte.
 * "Antes" fica preso na metade de cima, "Depois" na de baixo, e a palavra
 * RUPTURA só existe no vão entre as duas.
 */
export default function Rupture() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* A fenda abre na primeira metade do scroll e segue aberta. */
  const topY = useTransform(scrollYProgress, [0.08, 0.62], ["0%", "-62%"]);
  const bottomY = useTransform(scrollYProgress, [0.08, 0.62], ["0%", "62%"]);

  /* A luz da fenda: some no início, estoura no meio, assenta no fim. */
  const seamOpacity = useTransform(scrollYProgress, [0, 0.08, 0.3], [0, 0.5, 1]);
  const seamScale = useTransform(scrollYProgress, [0.08, 0.62], [0.35, 1]);
  const flash = useTransform(
    scrollYProgress,
    [0.08, 0.26, 0.55],
    [0, 0.85, 0.25]
  );

  /* O conteúdo central só aparece depois que há vão suficiente. */
  const wordOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const wordScale = useTransform(scrollYProgress, [0.3, 0.72], [0.94, 1]);
  const linesOpacity = useTransform(scrollYProgress, [0.52, 0.68], [0, 1]);
  const closingOpacity = useTransform(scrollYProgress, [0.72, 0.86], [0, 1]);

  /* Os rótulos ANTES/DEPOIS somem junto com as metades. */
  const labelsOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.3, 0.62, 0.8],
    [0, 1, 1, 0]
  );

  return (
    <section id="ruptura" aria-label="Ruptura">
      <div ref={sectionRef} className="relative h-[320vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-void-deep">
          {/* ── A luz que vaza pela fenda ─────────────────────── */}
          {/* O `y` vai junto no style do motion: ele reescreve o `transform`
              inteiro, e um `-translate-y-1/2` do Tailwind seria descartado —
              a fenda de luz acabaria abaixo do centro. */}
          <motion.div
            aria-hidden
            style={{ opacity: seamOpacity, scaleY: seamScale, y: "-50%" }}
            className="absolute inset-x-0 top-1/2 -z-10 h-[62vh] origin-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,107,125,0.5),rgba(193,18,31,0.28)_38%,transparent_72%)]" />
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-crimson-glow shadow-[0_0_90px_28px_rgba(193,18,31,0.6)]" />
          </motion.div>

          {/* Estouro de luz no instante da quebra */}
          <motion.div
            aria-hidden
            style={{ opacity: flash }}
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_38%_at_50%_50%,rgba(255,154,166,0.32),transparent_70%)]"
          />

          {/* ── Conteúdo dentro do vão ────────────────────────────
              Ancorado na linha da fenda, não centralizado como um bloco só:
              a palavra fica acima dela e o texto abaixo, em qualquer altura
              de tela. Centralizar o conjunto fazia a fenda cortar a primeira
              linha no mobile. */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="absolute inset-x-0 bottom-1/2 flex flex-col items-center justify-end px-6 pb-7 text-center sm:pb-10">
              <motion.h2
                style={{ opacity: wordOpacity, scale: wordScale }}
                className="font-display text-[clamp(2.8rem,13vw,9rem)] font-light leading-none tracking-[0.16em] text-crimson-sheen drop-shadow-[0_0_60px_rgba(193,18,31,0.45)]"
              >
                {rupture.word}
              </motion.h2>
            </div>

            <div className="absolute inset-x-0 top-1/2 flex flex-col items-center px-6 pt-7 text-center sm:pt-10">
              <motion.div
                style={{ opacity: linesOpacity }}
                className="flex max-w-2xl flex-col gap-2.5"
              >
                {rupture.lines.map((line) => (
                  <p
                    key={line}
                    className="font-display text-[clamp(1.05rem,3.2vw,1.75rem)] font-light leading-snug text-ivory-dim"
                  >
                    {line}
                  </p>
                ))}
              </motion.div>

              <motion.p
                style={{ opacity: closingOpacity }}
                className="mt-9 font-sans text-[0.62rem] uppercase tracking-cinematic text-ivory sm:text-xs"
              >
                {rupture.closing}
              </motion.p>
            </div>
          </div>

          {/* ── As duas metades que se afastam ────────────────── */}
          <motion.div
            style={{ y: topY }}
            className="grain absolute inset-x-0 top-0 z-20 h-1/2 bg-void will-change-transform"
          >
            {/* Aresta serrilhada da quebra */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-crimson/70 to-transparent"
            />
            <motion.span
              style={{ opacity: labelsOpacity }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 font-sans text-[0.55rem] uppercase tracking-cinematic text-white/45 sm:text-[0.65rem]"
            >
              {rupture.before}
            </motion.span>
          </motion.div>

          <motion.div
            style={{ y: bottomY }}
            className="grain absolute inset-x-0 bottom-0 z-20 h-1/2 bg-void will-change-transform"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson/70 to-transparent"
            />
            <motion.span
              style={{ opacity: labelsOpacity }}
              className="absolute top-8 left-1/2 -translate-x-1/2 font-sans text-[0.55rem] uppercase tracking-cinematic text-crimson-light/75 sm:text-[0.65rem]"
            >
              {rupture.after}
            </motion.span>
          </motion.div>

          {/* Rótulo da seção, preso ao topo da metade de cima */}
          <motion.span
            style={{ y: topY, opacity: labelsOpacity }}
            className="eyebrow absolute inset-x-0 top-12 z-30 text-center"
          >
            {rupture.eyebrow}
          </motion.span>
        </div>
      </div>
    </section>
  );
}

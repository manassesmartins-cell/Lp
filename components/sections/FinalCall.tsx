"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import CrimsonButton from "@/components/ui/CrimsonButton";
import SplitText from "@/components/ui/SplitText";
import Particles from "@/components/effects/Particles";
import { siteConfig } from "@/lib/site-config";

const LINES = [
  { text: "O relógio marca 22:22.", tone: "muted" },
  { text: "A porta abre às 23:00.", tone: "muted" },
  { text: "A diferença entre quem ouviu falar…", tone: "soft" },
  { text: "…e quem viveu…", tone: "soft" },
] as const;

const TONES = {
  muted: "text-white/70",
  soft: "text-white/40 italic",
} as const;

export default function FinalCall() {
  return (
    <section
      id="acesso"
      aria-label="Chamada final"
      className="grain relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-void-deep py-32"
    >
      {/* Fio de luz por baixo da porta */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/[0.045] blur-[130px]"
      />
      <Particles density={16} />

      {/* Filetes horizontais no topo e na base */}
      <div aria-hidden className="hairline absolute inset-x-0 top-0 opacity-40" />
      <div aria-hidden className="hairline absolute inset-x-0 bottom-0 opacity-40" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="flex flex-col gap-6 sm:gap-7">
          {LINES.map((line, index) => (
            <Reveal key={line.text} delay={index * 0.18} y={20}>
              <p
                className={`font-display text-[clamp(1.3rem,4.4vw,2.35rem)] font-light leading-snug ${TONES[line.tone]}`}
              >
                {line.text}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Fecho */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-9 font-display text-[clamp(2rem,7vw,4rem)] font-light leading-none"
        >
          <SplitText
            text="é um convite."
            className="drop-shadow-[0_0_50px_rgba(193,18,31,0.28)]"
            letterClassName="text-crimson-sheen"
            delay={0.85}
            stagger={0.06}
            onScroll
          />
        </motion.p>

        <Reveal delay={1.15}>
          <div className="mt-16">
            <CrimsonButton href={siteConfig.links.guestList} size="lg">
              Quero meu acesso
            </CrimsonButton>
          </div>
        </Reveal>

        <Reveal delay={1.3}>
          <p className="mt-8 font-sans text-[0.6rem] uppercase tracking-widest text-white/25">
            Vagas limitadas • Confirmação individual
          </p>
        </Reveal>
      </div>
    </section>
  );
}

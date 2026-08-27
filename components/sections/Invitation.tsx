"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Particles from "@/components/effects/Particles";
import { siteConfig } from "@/lib/site-config";

/** `emphasis` marca as linhas que acendem em carmim. */
const LINES: Array<{ text: string; emphasis?: boolean }> = [
  { text: "Algumas festas terminam." },
  { text: "Outras começam quando ninguém mais espera." },
  { text: "Às 23:00, uma porta se abre.", emphasis: true },
  { text: "Quem recebeu o convite sabe exatamente onde ir." },
  { text: siteConfig.promise, emphasis: true },
];

type LineProps = {
  progress: MotionValue<number>;
  text: string;
  start: number;
  emphasis?: boolean;
};

/** Uma linha do convite, revelada conforme o scroll atravessa sua faixa. */
function FadeLine({ progress, text, start, emphasis = false }: LineProps) {
  const opacity = useTransform(
    progress,
    [start, start + 0.13, start + 0.52, start + 0.66],
    [0, 1, 1, 0.18]
  );
  const y = useTransform(progress, [start, start + 0.13], [34, 0]);
  const blur = useTransform(
    progress,
    [start, start + 0.13],
    ["blur(12px)", "blur(0px)"]
  );

  return (
    <motion.p
      style={{ opacity, y, filter: blur }}
      className={`font-display font-light leading-[1.35] ${
        emphasis
          ? "text-[clamp(1.75rem,5.2vw,3.4rem)] text-crimson-sheen"
          : "text-[clamp(1.4rem,4.2vw,2.8rem)] text-white/75"
      }`}
    >
      {text}
    </motion.p>
  );
}

export default function Invitation() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Cada linha ocupa uma faixa do progresso, com leve sobreposição. */
  const step = 0.15;

  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  return (
    <section id="o-convite" aria-label="O Convite">
      <div ref={sectionRef} className="relative h-[280vh]">
        <div className="grain sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
          {/* Brilho baixo, como luz vinda de baixo da porta */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-wine/20 blur-[130px]"
          />
          <Particles density={14} />

          {/* max-w-5xl evita que a última linha quebre deixando "ir." órfã. */}
          <div className="relative mx-auto max-w-5xl px-6">
            <motion.span
              className="eyebrow mb-14 block text-center"
              style={{ opacity: eyebrowOpacity }}
            >
              O Convite
            </motion.span>

            <div className="flex flex-col gap-9 text-center sm:gap-11">
              {LINES.map((line, index) => (
                <FadeLine
                  key={line.text}
                  progress={scrollYProgress}
                  text={line.text}
                  start={0.06 + index * step}
                  emphasis={line.emphasis}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

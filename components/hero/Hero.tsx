"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { MapPin, DoorClosed } from "lucide-react";
import CorridorScene from "./CorridorScene";
import Particles from "@/components/effects/Particles";
import SplitText from "@/components/ui/SplitText";
import GoldButton from "@/components/ui/GoldButton";
import { siteConfig } from "@/lib/site-config";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Parallax de scroll: a câmera avança pelo corredor. */
  const corridorScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const corridorY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  /* Parallax de mouse: deslocamento mínimo, só para dar vida. */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 55, damping: 22, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 55, damping: 22, mass: 0.6 });
  const sceneX = useTransform(smoothX, [-0.5, 0.5], [22, -22]);
  const sceneY = useTransform(smoothY, [-0.5, 0.5], [14, -14]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="grain vignette relative isolate flex h-[100svh] min-h-[640px] w-full items-end justify-center overflow-hidden bg-void"
    >
      {/* ── Corredor ─────────────────────────────────────────── */}
      <motion.div
        style={{ scale: corridorScale, y: corridorY, x: sceneX }}
        className="absolute inset-0 -z-20 will-change-transform"
      >
        <motion.div style={{ y: sceneY }} className="h-full w-full">
          <CorridorScene />
        </motion.div>
      </motion.div>

      {/* Respiração da luz da porta */}
      <motion.div
        aria-hidden
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-[38%] h-[46vmax] w-[46vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-[120px] animate-pulse-soft" />
      </motion.div>

      {/* Poeira suspensa */}
      <Particles className="-z-10" density={30} />

      {/* Escurecimento por trás do texto, para leitura */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[72%] bg-gradient-to-t from-void via-void/90 to-transparent"
      />

      {/* ── Conteúdo ─────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 pb-[13vh] text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
          /* Mais contraste que o `.eyebrow` padrão: aqui o texto cai sobre a
             luz derramada da porta. */
          className="eyebrow text-gold/95 [text-shadow:0_1px_3px_rgba(5,5,5,0.95),0_2px_22px_rgba(5,5,5,0.9)]"
        >
          Convite pessoal e intransferível
        </motion.span>

        {/* `lining-nums`: a Cormorant usa algarismos antigos por padrão e o
            "222" sairia menor que as maiúsculas. */}
        <h1 className="mt-6 font-display text-[clamp(3rem,13vw,8.5rem)] font-light leading-[0.88] tracking-[0.02em] lining-nums">
          <SplitText
            text="AFTER 222"
            className="drop-shadow-[0_0_60px_rgba(212,175,55,0.3)]"
            letterClassName="text-gold-sheen"
            delay={0.45}
            stagger={0.075}
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.4, delay: 1.35, ease: EASE }}
          className="hairline mt-8 w-56 max-w-[70vw]"
          aria-hidden
        />

        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.3, delay: 1.5, ease: EASE }}
          className="mt-8 max-w-xl font-display text-lg font-light italic leading-relaxed text-white/60 sm:text-2xl"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.85, ease: EASE }}
          className="mt-10"
        >
          <GoldButton href={siteConfig.links.guestList} size="lg">
            Entrar na lista
          </GoldButton>
        </motion.div>

        {/* Local e quarto */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 2.15, ease: EASE }}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-10"
        >
          <span className="flex items-center gap-2.5 font-sans text-[0.68rem] uppercase tracking-widest text-white/45 sm:text-xs">
            <MapPin className="h-3.5 w-3.5 text-gold/80" strokeWidth={1.5} />
            {siteConfig.venue}
          </span>
          <span aria-hidden className="hidden h-4 w-px bg-white/10 sm:block" />
          <span className="flex items-center gap-2.5 font-sans text-[0.68rem] uppercase tracking-widest text-white/45 sm:text-xs">
            <DoorClosed className="h-3.5 w-3.5 text-gold/80" strokeWidth={1.5} />
            {siteConfig.room}
          </span>
        </motion.div>
      </motion.div>

      {/* ── Indicador de scroll ──────────────────────────────── */}
      <motion.a
        href="#o-convite"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        style={{ opacity: contentOpacity }}
        /* Oculto no mobile: ali o bloco de conteúdo é mais alto e o
           indicador encostaria na linha do local. */
        className="group absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-label="Rolar para o convite"
      >
        <span className="font-sans text-[0.5rem] uppercase tracking-cinematic text-white/25 transition-colors duration-500 group-hover:text-gold/70">
          Role
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-transparent via-gold to-transparent"
            animate={{ y: ["-100%", "380%"] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}

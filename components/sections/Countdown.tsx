"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import FlipDigit from "./countdown/FlipDigit";
import Particles from "@/components/effects/Particles";
import { useCountdown } from "@/lib/use-countdown";
import { siteConfig } from "@/lib/site-config";

const UNITS = [
  { key: "days", label: "Dias" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Minutos" },
  { key: "seconds", label: "Segundos" },
] as const;

export default function Countdown() {
  const { mounted, finished, timeLeft } = useCountdown(siteConfig.eventDate);

  return (
    <section
      id="contagem"
      aria-label="Contagem regressiva"
      className="grain relative overflow-hidden border-y border-white/[0.04] py-28 sm:py-36"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[28rem] w-[70rem] max-w-[130vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/[0.055] blur-[150px]"
      />
      <Particles density={12} />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <span className="eyebrow">
            {siteConfig.venue} • {siteConfig.room}
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">
            A porta abre em…
          </h2>
        </Reveal>

        {/* ── Contador ─────────────────────────────────────────── */}
        <Reveal delay={0.2}>
          <div
            className="mt-16 flex items-start justify-center gap-1 sm:gap-5"
            role="timer"
            aria-live="off"
          >
            {UNITS.map(({ key, label }, index) => {
              const raw = timeLeft[key];
              const digits = String(raw)
                .padStart(2, "0")
                .split("");

              return (
                <div key={key} className="flex items-start">
                  <div className="group relative flex flex-col items-center">
                    <div className="glass glass-crimson relative overflow-hidden rounded-xl px-2 py-6 transition-shadow duration-700 ease-lux hover:shadow-crimson sm:rounded-2xl sm:px-7 sm:py-9">
                      {/* Brilho superior, como vidro polido */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-crimson-line"
                      />

                      <span className="flex font-display text-[clamp(1.9rem,9vw,6.5rem)] font-light leading-none">
                        {mounted ? (
                          digits.map((digit, digitIndex) => (
                            <FlipDigit key={`${key}-${digitIndex}`} value={digit} />
                          ))
                        ) : (
                          /* Antes da hidratação: mesmo espaço, sem números. */
                          <span className="text-crimson/25">
                            {digits.map((_, i) => (
                              <span
                                key={i}
                                className="inline-block w-[0.62em] text-center"
                              >
                                –
                              </span>
                            ))}
                          </span>
                        )}
                      </span>
                    </div>

                    {/* No mobile o rótulo é mais largo que o bloco e passaria a
                        definir a largura da coluna — daí o tracking menor. */}
                    <span className="mt-4 font-sans text-[0.5rem] uppercase tracking-[0.18em] text-white/35 sm:text-[0.65rem] sm:tracking-cinematic">
                      {label}
                    </span>
                  </div>

                  {/* Dois-pontos pulsando entre os blocos.
                      Repete a fonte e o padding do bloco para que a caixa de
                      linha tenha a mesma altura e o centro coincida com os dígitos. */}
                  {index < UNITS.length - 1 && (
                    <span className="flex items-center px-0 py-6 font-display text-[clamp(1.9rem,9vw,6.5rem)] leading-none sm:px-1.5 sm:py-9">
                      <motion.span
                        aria-hidden
                        animate={{ opacity: [0.55, 0.15, 0.55] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[0.42em] text-crimson"
                      >
                        :
                      </motion.span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-14 font-sans text-[0.62rem] uppercase tracking-widest text-white/30 sm:text-xs">
            {finished ? "A porta está aberta." : siteConfig.eventDateLabel}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

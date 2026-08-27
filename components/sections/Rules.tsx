"use client";

import {
  Lock,
  TicketCheck,
  MapPinOff,
  Sparkles,
  GlassWater,
  WineOff,
  Check,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { rules, type Rule } from "@/lib/site-config";

const ICONS: Record<Rule["icon"], LucideIcon> = {
  Lock,
  TicketCheck,
  MapPinOff,
  Sparkles,
  GlassWater,
  WineOff,
};

export default function Rules() {
  return (
    <section
      id="regras"
      aria-label="Regras"
      className="grain relative overflow-hidden py-28 sm:py-36 lg:py-44"
    >
      <div
        aria-hidden
        className="absolute right-0 top-1/3 h-[26rem] w-[26rem] rounded-full bg-wine/20 blur-[140px]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Regras"
            title="A etiqueta da casa"
            subtitle="Poucos combinados. Simples assim — e é o que mantém a noite do jeito que ela precisa ser."
            align="left"
          />
        </div>

        <ul className="flex flex-col">
          {rules.map((rule, index) => {
            const Icon = ICONS[rule.icon];

            return (
              <motion.li
                key={rule.title}
                initial={{ opacity: 0, x: 26, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.9,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex items-start gap-6 border-b border-white/[0.06] py-7 transition-colors duration-500 first:border-t first:border-white/[0.06] hover:border-crimson/25"
              >
                {/* Brilho que acende na linha inteira */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-[-1.5rem] inset-y-0 -z-10 rounded-xl bg-gradient-to-r from-crimson/[0.055] to-transparent opacity-0 transition-opacity duration-700 ease-lux group-hover:opacity-100"
                />

                {/* Ícone */}
                <span className="relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-crimson/20 bg-crimson/[0.04] transition-all duration-700 ease-lux group-hover:border-crimson/50 group-hover:bg-crimson/[0.1] group-hover:shadow-crimson">
                  <Icon
                    className="h-[1.05rem] w-[1.05rem] text-crimson/80 transition-colors duration-500 group-hover:text-crimson-light"
                    strokeWidth={1.4}
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="flex items-center gap-2.5 font-display text-xl font-light text-white/90 transition-colors duration-500 group-hover:text-crimson-light sm:text-2xl">
                    <Check
                      className="h-4 w-4 shrink-0 text-crimson/60"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {rule.title}
                  </h3>
                  <p className="mt-2 pl-[1.625rem] font-sans text-[0.8rem] font-light leading-relaxed text-white/35 transition-colors duration-500 group-hover:text-white/50">
                    {rule.detail}
                  </p>
                </div>

                {/* Numeração discreta */}
                <span
                  aria-hidden
                  className="mt-1 hidden shrink-0 font-sans text-[0.6rem] tracking-widest text-white/15 transition-colors duration-500 group-hover:text-crimson/40 sm:block"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

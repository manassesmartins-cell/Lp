"use client";

import Reveal from "./Reveal";

type Props = {
  /** Rótulo pequeno acima do título. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

/** Cabeçalho padrão das seções: rótulo, filete carmim, título serifado. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: Props) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col ${
        centered ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {eyebrow && (
        <Reveal delay={0.05}>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}

      <Reveal delay={0.12}>
        <h2 className="mt-5 font-display text-4xl font-light leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>

      <Reveal delay={0.2} className={centered ? "w-full" : ""}>
        <div
          className={`hairline mt-7 w-28 ${centered ? "mx-auto" : ""}`}
          aria-hidden
        />
      </Reveal>

      {subtitle && (
        <Reveal delay={0.28}>
          <p className="mt-7 max-w-xl font-sans text-sm font-light leading-relaxed text-white/45">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

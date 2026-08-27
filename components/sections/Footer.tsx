"use client";

import { Instagram, MessageCircle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";

const SOCIALS = [
  {
    label: "Instagram",
    href: siteConfig.links.instagram,
    Icon: Instagram,
  },
  {
    label: "WhatsApp",
    href: siteConfig.links.whatsapp,
    Icon: MessageCircle,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-void py-16 sm:py-20">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-40 w-[42rem] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/[0.06] blur-[100px]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 text-center">
        {/* Logo */}
        <Reveal>
          <a
            href="#top"
            className="group inline-flex flex-col items-center"
            aria-label="Voltar ao topo"
          >
            <span className="font-display text-3xl font-light tracking-[0.18em] text-crimson-sheen sm:text-4xl">
              AFTER 222
            </span>
            <span className="hairline mt-3 w-0 transition-all duration-700 ease-lux group-hover:w-full" />
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-sans text-[0.65rem] uppercase tracking-widest text-white/35 sm:text-xs">
            Evento exclusivo • {siteConfig.venue} · {siteConfig.city}
          </p>
        </Reveal>

        {/* Redes */}
        <Reveal delay={0.18}>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all duration-500 ease-lux hover:-translate-y-0.5 hover:border-crimson/45 hover:shadow-crimson"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-crimson/0 transition-colors duration-500 group-hover:bg-crimson/[0.07]"
                />
                <Icon
                  className="relative h-[1.05rem] w-[1.05rem] text-white/45 transition-colors duration-500 group-hover:text-crimson"
                  strokeWidth={1.4}
                />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="hairline w-40 opacity-50" />
        </Reveal>

        <Reveal delay={0.32}>
          <p className="font-sans text-[0.58rem] uppercase tracking-widest text-white/20">
            © {year} {siteConfig.name} • {siteConfig.room} • Todos os direitos reservados
          </p>
        </Reveal>
      </div>
    </footer>
  );
}

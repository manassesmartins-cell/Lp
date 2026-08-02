"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ArtistCard from "./lineup/ArtistCard";
import { lineup } from "@/lib/site-config";

/**
 * Três colunas é o padrão. Mas se três deixassem um único card sozinho na
 * última fila (caso de 4 nomes), cai para duas — e o container encolhe junto,
 * para o card manter a mesma largura das outras configurações.
 */
const orphanOnThree = lineup.length > 3 && lineup.length % 3 === 1;
const useTwoColumns = orphanOnThree && lineup.length % 2 === 0;

const CARD_WIDTH = useTwoColumns
  ? "w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(50%-0.75rem)]"
  : "w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]";

const GRID_WIDTH = useTwoColumns ? "lg:max-w-3xl" : "";

export default function Lineup() {
  return (
    <section
      id="line-up"
      aria-label="Line-up Oficial"
      className="grain relative overflow-hidden py-28 sm:py-36 lg:py-44"
    >
      {/* Acento azul Blue Tree ao fundo */}
      <div
        aria-hidden
        className="absolute -left-40 top-1/4 h-[38rem] w-[38rem] rounded-full bg-bluetree/25 blur-[150px]"
      />
      <div
        aria-hidden
        className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gold/[0.05] blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Line-up Oficial"
          title="Quem conduz a noite"
          subtitle="Uma única madrugada. A ordem de entrada ninguém sabe."
        />

        <div
          className={`mx-auto mt-20 flex flex-wrap justify-center gap-6 ${GRID_WIDTH}`}
        >
          {lineup.map((artist, index) => (
            <ArtistCard
              key={artist.name}
              artist={artist}
              index={index}
              widthClass={CARD_WIDTH}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

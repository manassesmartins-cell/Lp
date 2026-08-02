"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ArtistCard from "./lineup/ArtistCard";
import { lineup } from "@/lib/site-config";

export default function Lineup() {
  return (
    <section
      id="line-up"
      aria-label="Line-up Oficial"
      className="grain relative overflow-hidden py-28 sm:py-36 lg:py-44"
    >
      {/* Acento azul Blue Bird ao fundo */}
      <div
        aria-hidden
        className="absolute -left-40 top-1/4 h-[38rem] w-[38rem] rounded-full bg-bluebird/25 blur-[150px]"
      />
      <div
        aria-hidden
        className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gold/[0.05] blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Line-up Oficial"
          title="Quem conduz a noite"
          subtitle="Cinco nomes. Uma única madrugada. A ordem de entrada ninguém sabe."
        />

        <div className="mt-20 flex flex-wrap justify-center gap-6">
          {lineup.map((artist, index) => (
            <ArtistCard key={artist.name} artist={artist} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

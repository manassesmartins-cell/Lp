"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import PlaceholderArt from "./gallery/PlaceholderArt";
import { gallery, siteConfig, type GalleryItem } from "@/lib/site-config";

/** Peso de cada peça no grid editorial (6 colunas no desktop). */
const SPANS: Record<GalleryItem["span"], string> = {
  tall: "lg:col-span-2 lg:row-span-3",
  wide: "lg:col-span-4 lg:row-span-2",
  regular: "lg:col-span-2 lg:row-span-2",
};

export default function Gallery() {
  return (
    <section
      id="galeria"
      aria-label="Galeria"
      className="grain relative overflow-hidden py-28 sm:py-36 lg:py-44"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Galeria"
          title={`Fragmentos do ${siteConfig.predecessor}`}
          subtitle={`O que ficou da edição anterior. É tudo o que podemos mostrar — e é de lá que o ${siteConfig.roomNumber} vem.`}
        />

        <div className="mt-20 grid auto-rows-[8rem] grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6">
          {gallery.map((item, index) => (
            <motion.figure
              key={item.caption}
              initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 1,
                delay: (index % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative row-span-2 overflow-hidden rounded-xl border border-white/[0.06] bg-void-soft transition-colors duration-700 ease-lux hover:border-crimson/30 ${SPANS[item.span]}`}
            >
              {/* Imagem real quando disponível; senão, placeholder gerado. */}
              <div className="absolute inset-0 transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.09]">
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <PlaceholderArt art={item.art} />
                )}
              </div>

              {/* Escurecimento que abre no hover */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-void via-void/25 to-transparent opacity-90 transition-opacity duration-700 ease-lux group-hover:opacity-60"
              />

              {/* Brilho carmim nas bordas */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 shadow-[inset_0_0_60px_-12px_rgba(193,18,31,0.5)] transition-opacity duration-700 ease-lux group-hover:opacity-100"
              />

              {/* Índice */}
              <span
                aria-hidden
                className="absolute right-4 top-3.5 font-sans text-[0.55rem] tracking-widest text-white/25 transition-colors duration-500 group-hover:text-crimson/70"
              >
                {item.index}
              </span>

              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5">
                <span
                  aria-hidden
                  className="h-px w-0 bg-crimson transition-all duration-700 ease-lux group-hover:w-7"
                />
                <span className="translate-y-1 font-sans text-[0.65rem] uppercase tracking-widest text-white/50 transition-all duration-700 ease-lux group-hover:translate-y-0 group-hover:text-crimson-light">
                  {item.caption}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-10 text-center font-sans text-[0.6rem] uppercase tracking-widest text-white/20">
          Registro parcial • Câmeras não são permitidas no {siteConfig.room}
        </p>
      </div>
    </section>
  );
}

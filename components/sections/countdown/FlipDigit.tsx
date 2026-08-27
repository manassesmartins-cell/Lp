"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  value: string;
};

/** Um único dígito: o antigo sobe e sai, o novo entra por baixo. */
export default function FlipDigit({ value }: Props) {
  return (
    /* `lining-nums` acompanha `tabular-nums`: a utilitária de tabular
       redefine font-variant-numeric e descartaria o lining herdado. */
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden lining-nums tabular-nums">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          /* O recorte do gradiente vive em cada dígito: `background-clip: text`
             só pinta os glifos do próprio elemento. */
          className="text-crimson-sheen absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

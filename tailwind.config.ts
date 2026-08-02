import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Preto profundo — base da identidade */
        void: {
          DEFAULT: "#090909",
          soft: "#0D0D0D",
          deep: "#050505",
        },
        /* Dourado metálico */
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F2DC95",
          deep: "#8C6D1F",
          dim: "#6B5416",
        },
        /* Acentos azul escuro — Blue Tree */
        bluetree: {
          DEFAULT: "#12294F",
          light: "#1E4079",
          deep: "#0A1730",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        cinematic: "0.4em",
      },
      boxShadow: {
        gold: "0 0 40px -12px rgba(212, 175, 55, 0.45)",
        "gold-lg": "0 0 90px -20px rgba(212, 175, 55, 0.55)",
        inset: "inset 0 1px 0 0 rgba(255, 255, 255, 0.06)",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(105deg, #8C6D1F 0%, #D4AF37 32%, #F2DC95 50%, #D4AF37 68%, #8C6D1F 100%)",
        "gold-line":
          "linear-gradient(90deg, transparent, rgba(212,175,55,0.6) 50%, transparent)",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "sheen-slide": "sheen-slide 7s ease-in-out infinite",
        flicker: "flicker 6s ease-in-out infinite",
        "float-slow": "float-slow 14s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
      },
      keyframes: {
        "sheen-slide": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "42%": { opacity: "0.94" },
          "45%": { opacity: "0.72" },
          "47%": { opacity: "0.96" },
          "62%": { opacity: "0.85" },
          "64%": { opacity: "1" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.9" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

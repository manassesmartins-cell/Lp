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
        /* Preto levemente quente — base da identidade */
        void: {
          DEFAULT: "#0A0708",
          soft: "#100C0D",
          deep: "#050304",
        },
        /* Carmim — a cor da ruptura */
        crimson: {
          DEFAULT: "#C1121F",
          light: "#FF6B7D",
          glow: "#FF9AA6",
          deep: "#7A0A16",
          dim: "#4A0710",
        },
        /* Vinho profundo — sombra e volume */
        wine: {
          DEFAULT: "#3D0A14",
          light: "#5C1020",
          deep: "#240509",
        },
        /* Marfim — tipografia sobre o preto e sobre o carmim */
        ivory: {
          DEFAULT: "#F7EFEA",
          dim: "#D8C9C4",
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
        crimson: "0 0 40px -12px rgba(193, 18, 31, 0.45)",
        "crimson-lg": "0 0 90px -20px rgba(193, 18, 31, 0.55)",
        inset: "inset 0 1px 0 0 rgba(255, 255, 255, 0.06)",
      },
      backgroundImage: {
        "crimson-sheen":
          "linear-gradient(105deg, #7A0A16 0%, #C1121F 32%, #FF6B7D 50%, #C1121F 68%, #7A0A16 100%)",
        "crimson-line":
          "linear-gradient(90deg, transparent, rgba(193,18,31,0.6) 50%, transparent)",
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

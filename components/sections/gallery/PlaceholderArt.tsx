"use client";

import type { GalleryItem } from "@/lib/site-config";

type Props = {
  art: GalleryItem["art"];
};

/**
 * Placeholders editoriais gerados em SVG — nada de caixas cinzas.
 * Cada variação sugere o enquadramento da foto que entrará no lugar.
 * Para usar a foto real, preencha `src` no item correspondente
 * em `lib/site-config.ts`.
 */
export default function PlaceholderArt({ art }: Props) {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={`bg-${art}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B0B0C" />
          <stop offset="55%" stopColor="#0E0D0B" />
          <stop offset="100%" stopColor="#141109" />
        </linearGradient>
        <radialGradient id={`warm-${art}`}>
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.34" />
          <stop offset="60%" stopColor="#8C6D1F" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`cool-${art}`}>
          <stop offset="0%" stopColor="#1E4079" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#12294F" stopOpacity="0" />
        </radialGradient>
        <filter id={`blur-${art}`}>
          <feGaussianBlur stdDeviation="14" />
        </filter>
        {/* Bokeh: discos de borda macia — nada de círculos chapados. */}
        <radialGradient id={`bokehGold-${art}`}>
          <stop offset="0%" stopColor="#F2DC95" stopOpacity="0.5" />
          <stop offset="45%" stopColor="#D4AF37" stopOpacity="0.26" />
          <stop offset="80%" stopColor="#D4AF37" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`bokehBlue-${art}`}>
          <stop offset="0%" stopColor="#3C6BB5" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#1E4079" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#12294F" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`vignette-${art}`}>
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0.85" />
        </radialGradient>
      </defs>

      <rect width="400" height="400" fill={`url(#bg-${art})`} />

      {art === "corridor" && (
        <g>
          {/* Teto e piso como planos, para ler como corredor e não como um "X" */}
          <polygon points="0,0 400,0 225,158 175,158" fill="#050505" fillOpacity="0.75" />
          <polygon points="0,400 175,252 225,252 400,400" fill="#0A0908" />
          <ellipse cx="200" cy="180" rx="140" ry="120" fill={`url(#warm-${art})`} />
          {/* Arestas convergindo ao ponto de fuga */}
          <path
            d="M0 0 L175 158 M400 0 L225 158 M0 400 L175 252 M400 400 L225 252"
            stroke="#D4AF37"
            strokeOpacity="0.16"
            strokeWidth="1"
            fill="none"
          />
          {/* Porta ao fundo */}
          <rect x="180" y="150" width="40" height="102" fill="#F2DC95" fillOpacity="0.85" />
          <rect
            x="180" y="150" width="40" height="102"
            fill="none" stroke="#D4AF37" strokeOpacity="0.5"
          />
          {/* Luz derramada no piso */}
          <polygon points="180,252 220,252 300,400 100,400" fill={`url(#warm-${art})`} opacity="0.5" />
        </g>
      )}

      {art === "room" && (
        <g>
          <ellipse cx="300" cy="120" rx="140" ry="120" fill={`url(#cool-${art})`} />
          {/* Janela */}
          <rect x="238" y="70" width="120" height="140" fill="#12294F" fillOpacity="0.55" />
          <path d="M298 70 V210 M238 140 H358" stroke="#D4AF37" strokeOpacity="0.3" strokeWidth="1.2" />
          {/* Cama */}
          <rect x="30" y="240" width="230" height="90" rx="6" fill="#0F0E0C" stroke="#D4AF37" strokeOpacity="0.22" />
          <rect x="46" y="250" width="70" height="34" rx="5" fill="#D4AF37" fillOpacity="0.1" />
          {/* Abajur */}
          <circle cx="330" cy="255" r="34" fill={`url(#warm-${art})`} />
          <path d="M316 246 h28 l8 26 h-44 z" fill="#D4AF37" fillOpacity="0.4" />
        </g>
      )}

      {art === "drinks" && (
        <g>
          <ellipse cx="200" cy="300" rx="180" ry="90" fill={`url(#warm-${art})`} />
          {/* Coupe */}
          <path d="M110 150 h80 l-34 46 v66 h-12 v-66 z" fill="none" stroke="#D4AF37" strokeOpacity="0.6" strokeWidth="1.6" />
          <path d="M118 156 h64 l-30 38 h-4 z" fill="#D4AF37" fillOpacity="0.35" />
          <line x1="132" y1="262" x2="168" y2="262" stroke="#D4AF37" strokeOpacity="0.6" strokeWidth="1.6" />
          {/* Tumbler */}
          <path d="M228 176 h58 l-7 86 h-44 z" fill="none" stroke="#D4AF37" strokeOpacity="0.45" strokeWidth="1.6" />
          <path d="M231 216 h52 l-4 46 h-44 z" fill="#D4AF37" fillOpacity="0.28" />
          <circle cx="257" cy="206" r="7" fill="#F2DC95" fillOpacity="0.5" />
        </g>
      )}

      {art === "lights" && (
        <g>
          <ellipse cx="200" cy="210" rx="150" ry="120" fill={`url(#cool-${art})`} opacity="0.55" />
          {/* Bokeh: halos pequenos e contrastados — a peça é recortada
              na horizontal no grid, então os pontos ficam perto do centro. */}
          {[
            [72, 150, 40], [148, 104, 26], [232, 132, 48], [320, 92, 30],
            [104, 252, 32], [196, 216, 56], [288, 262, 38], [354, 198, 24],
            [136, 324, 28], [258, 346, 20],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill={`url(#${i % 4 === 0 ? "bokehBlue" : "bokehGold"}-${art})`}
            />
          ))}
        </g>
      )}

      {art === "dj" && (
        <g>
          <ellipse cx="200" cy="200" rx="160" ry="140" fill={`url(#warm-${art})`} />
          {/* Prato */}
          <circle cx="200" cy="190" r="86" fill="#0A0A0A" stroke="#D4AF37" strokeOpacity="0.45" strokeWidth="1.5" />
          <circle cx="200" cy="190" r="54" fill="none" stroke="#D4AF37" strokeOpacity="0.2" />
          <circle cx="200" cy="190" r="16" fill="#D4AF37" fillOpacity="0.55" />
          <circle cx="200" cy="190" r="3.5" fill="#090909" />
          {/* Onda sonora */}
          {Array.from({ length: 22 }, (_, i) => {
            const h = 8 + Math.abs(Math.sin(i * 1.1)) * 46;
            return (
              <rect key={i} x={22 + i * 17} y={334 - h} width="4" height={h}
                rx="2" fill="#D4AF37" fillOpacity={0.22 + (i % 4) * 0.12} />
            );
          })}
        </g>
      )}

      {art === "guests" && (
        <g>
          <ellipse cx="200" cy="200" rx="180" ry="150" fill={`url(#warm-${art})`} />
          {/* Silhuetas em contraluz.
              A peça é recortada na vertical no grid, então ombros e cabeças
              ficam na faixa central segura — nada de cabeças flutuando. */}
          {[
            [64, 52], [148, 64], [246, 56], [334, 68],
          ].map(([cx, s], i) => {
            const shoulder = 400 - s * 2.6;
            return (
              <g key={i} fill="#050505" fillOpacity={0.92 - i * 0.04}>
                <circle cx={cx} cy={shoulder - s * 0.52} r={s * 0.4} />
                <path
                  d={`M${cx - s * 0.86} 400 q0 -${s * 2.6} ${s * 0.86} -${s * 2.6} q${s * 0.86} 0 ${s * 0.86} ${s * 2.6} z`}
                />
              </g>
            );
          })}
        </g>
      )}

      {art === "goldDetail" && (
        <g>
          <ellipse cx="200" cy="200" rx="150" ry="150" fill={`url(#warm-${art})`} />
          {/* Leque art déco */}
          {Array.from({ length: 7 }, (_, i) => (
            <circle key={i} cx="200" cy="330" r={40 + i * 34}
              fill="none" stroke="#D4AF37" strokeOpacity={0.34 - i * 0.035} strokeWidth="1.4" />
          ))}
          {Array.from({ length: 9 }, (_, i) => {
            const a = (Math.PI * i) / 8;
            return (
              <line key={`r-${i}`} x1="200" y1="330"
                x2={200 - Math.cos(a) * 262} y2={330 - Math.sin(a) * 262}
                stroke="#D4AF37" strokeOpacity="0.14" strokeWidth="1" />
            );
          })}
          <circle cx="200" cy="330" r="13" fill="#D4AF37" fillOpacity="0.6" />
        </g>
      )}

      {/* Vinheta comum a todas as variações */}
      <rect width="400" height="400" fill={`url(#vignette-${art})`} />
    </svg>
  );
}

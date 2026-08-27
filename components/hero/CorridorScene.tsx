"use client";

import { siteConfig } from "@/lib/site-config";

/**
 * Corredor de hotel em perspectiva de um ponto, desenhado em SVG.
 * Nenhuma imagem externa: a cena escala sem perder nitidez e
 * a porta acesa no fundo é a única fonte de luz forte do quadro.
 *
 * Sistema de coordenadas: 1600 × 900, ponto de fuga em (800, 330).
 */

const VB_W = 1600;
const VB_H = 900;

/** Retângulo do fundo do corredor (a parede onde fica a porta acesa). */
const END_L = 690;
const END_R = 910;
const END_T = 150;
const END_B = 390;

/** A porta ao fundo — estreita e distante, para caber o título abaixo dela. */
const DOOR_X = 752;
const DOOR_W = 96;
const DOOR_T = 190;

/* ── Geometria da parede esquerda ─────────────────────────────
   O eixo x vai de 0 (frente, junto ao observador) até END_L (fundo).
   A parede direita é o espelho exato desta — ver <use> abaixo.      */

/** Linha do teto na parede esquerda. */
const ceilingAt = (x: number) => (END_T * x) / END_L;

/** Linha do piso na parede esquerda. */
const floorAt = (x: number) => VB_H - (VB_H - END_B) * (x / END_L);

/** Topo do vão de uma porta lateral. */
const doorTopAt = (x: number) => ceilingAt(x) + 0.26 * (floorAt(x) - ceilingAt(x));

/** Altura das arandelas: pouco acima do meio da parede. */
const sconceAt = (x: number) => ceilingAt(x) + 0.42 * (floorAt(x) - ceilingAt(x));

/** Porta lateral como trapézio em perspectiva. */
const sideDoor = (near: number, far: number) =>
  [
    [near, doorTopAt(near)],
    [far, doorTopAt(far)],
    [far, floorAt(far)],
    [near, floorAt(near)],
  ]
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");

/** Portas laterais — o espaçamento encolhe rumo ao fundo. */
const SIDE_DOORS: Array<[number, number]> = [
  [40, 205],
  [305, 415],
  [490, 558],
  [608, 650],
];

/** Arandelas entre as portas. */
const SCONCES = [250, 451, 582, 665];

export default function CorridorScene() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        {/* Paredes: escuras na frente, levemente lavadas pela luz do fundo */}
        <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#060606" />
          <stop offset="55%" stopColor="#0C0C0D" />
          <stop offset="100%" stopColor="#190709" />
        </linearGradient>

        {/* Teto */}
        <linearGradient id="ceilGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#0D0607" />
          <stop offset="100%" stopColor="#050304" />
        </linearGradient>

        {/* Piso: reflexivo, clareia rumo à porta */}
        <linearGradient id="floorGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#070707" />
          <stop offset="60%" stopColor="#0B0A09" />
          <stop offset="100%" stopColor="#1C0609" />
        </linearGradient>

        {/* A porta — luz quente */}
        <linearGradient id="doorLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE1E5" />
          <stop offset="35%" stopColor="#FF6B7D" />
          <stop offset="100%" stopColor="#C1121F" />
        </linearGradient>

        {/* Luz derramada da porta sobre o piso */}
        <linearGradient id="spill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C1121F" stopOpacity="0.22" />
          <stop offset="45%" stopColor="#C1121F" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#C1121F" stopOpacity="0" />
        </linearGradient>

        {/* Reflexo da porta: opaco junto ao piso, dissolvendo ao se afastar.
            O grupo que o usa é espelhado, então o gradiente vai do
            transparente (topo do rect = extremidade distante) ao opaco
            (base do rect = linha do piso). */}
        <linearGradient id="reflect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C1121F" stopOpacity="0" />
          <stop offset="60%" stopColor="#C1121F" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FF6B7D" stopOpacity="0.6" />
        </linearGradient>

        {/* Vinho profundo nas quinas frontais */}
        <linearGradient id="wineEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5C1020" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3D0A14" stopOpacity="0" />
        </linearGradient>

        {/* Halo das arandelas */}
        <radialGradient id="sconceGlow">
          <stop offset="0%" stopColor="#FF6B7D" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#C1121F" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#C1121F" stopOpacity="0" />
        </radialGradient>

        {/* Névoa atmosférica em torno do ponto de fuga */}
        <radialGradient id="haze">
          <stop offset="0%" stopColor="#C1121F" stopOpacity="0.22" />
          <stop offset="45%" stopColor="#7A0A16" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0A0708" stopOpacity="0" />
        </radialGradient>

        <filter id="softGlow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="26" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="tightGlow" x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Conteúdo da parede esquerda — reaproveitado espelhado à direita */}
        <g id="corridor-wall">
          <polygon
            points={`0,0 ${END_L},${END_T} ${END_L},${END_B} 0,${VB_H}`}
            fill="url(#wallGrad)"
          />

          {/* Rodapé carmim acompanhando a linha do piso */}
          <line
            x1="0"
            y1={floorAt(0)}
            x2={END_L}
            y2={floorAt(END_L)}
            stroke="#C1121F"
            strokeOpacity="0.22"
            strokeWidth="2"
          />
          {/* Sanca no encontro com o teto */}
          <line
            x1="0"
            y1={ceilingAt(0)}
            x2={END_L}
            y2={ceilingAt(END_L)}
            stroke="#C1121F"
            strokeOpacity="0.1"
            strokeWidth="1.5"
          />

          {SIDE_DOORS.map(([near, far]) => (
            <g key={`door-${near}`}>
              {/* Vão da porta */}
              <polygon points={sideDoor(near, far)} fill="#040404" />
              {/* Batente carmim */}
              <polygon
                points={sideDoor(near, far)}
                fill="none"
                stroke="#C1121F"
                strokeOpacity="0.3"
                strokeWidth="1.5"
              />
              {/* Fio de luz vazando por baixo */}
              <line
                x1={near}
                y1={floorAt(near) - 3}
                x2={far}
                y2={floorAt(far) - 2}
                stroke="#C1121F"
                strokeOpacity="0.32"
                strokeWidth="2.5"
                filter="url(#tightGlow)"
              />
            </g>
          ))}

          {SCONCES.map((x) => {
            // O halo encolhe conforme a arandela se afasta.
            const depth = 1 - x / END_L;
            const r = 34 * depth + 9;
            return (
              <g key={`sconce-${x}`}>
                <ellipse
                  cx={x}
                  cy={sconceAt(x)}
                  rx={r * 2.6}
                  ry={r * 3.4}
                  fill="url(#sconceGlow)"
                />
                <ellipse
                  cx={x}
                  cy={sconceAt(x)}
                  rx={Math.max(2.2, r * 0.16)}
                  ry={Math.max(5, r * 0.4)}
                  fill="#FFD6DC"
                  filter="url(#tightGlow)"
                />
              </g>
            );
          })}

          {/* Quina frontal em vinho */}
          <polygon points={`0,0 90,20 90,${VB_H - 30} 0,${VB_H}`} fill="url(#wineEdge)" />
        </g>
      </defs>

      {/* ── Cena ───────────────────────────────────────────── */}

      <rect width={VB_W} height={VB_H} fill="#0A0708" />

      {/* Teto */}
      <polygon
        points={`0,0 ${VB_W},0 ${END_R},${END_T} ${END_L},${END_T}`}
        fill="url(#ceilGrad)"
      />
      {/* Sanca de luz central no teto */}
      <polygon
        points={`720,0 880,0 ${END_R - 18},${END_T} ${END_L + 18},${END_T}`}
        fill="#C1121F"
        fillOpacity="0.035"
      />

      {/* Piso */}
      <polygon
        points={`0,${VB_H} ${END_L},${END_B} ${END_R},${END_B} ${VB_W},${VB_H}`}
        fill="url(#floorGrad)"
      />

      {/* Paredes */}
      <use href="#corridor-wall" />
      <use href="#corridor-wall" transform={`translate(${VB_W},0) scale(-1,1)`} />

      {/* Parede do fundo */}
      <rect
        x={END_L}
        y={END_T}
        width={END_R - END_L}
        height={END_B - END_T}
        fill="#0B0708"
      />

      {/* Névoa quente ao redor da porta */}
      <ellipse cx="800" cy="300" rx="520" ry="380" fill="url(#haze)" />

      {/* Luz derramada no piso */}
      <polygon
        points={`${DOOR_X},${END_B} ${DOOR_X + DOOR_W},${END_B} 1300,${VB_H} 300,${VB_H}`}
        fill="url(#spill)"
      />

      {/* ── A porta ─────────────────────────────────────────── */}
      <g filter="url(#softGlow)">
        <rect
          x={DOOR_X}
          y={DOOR_T}
          width={DOOR_W}
          height={END_B - DOOR_T}
          fill="url(#doorLight)"
        />
      </g>
      {/* Batente */}
      <rect
        x={DOOR_X - 6}
        y={DOOR_T - 6}
        width={DOOR_W + 12}
        height={END_B - DOOR_T + 6}
        fill="none"
        stroke="#C1121F"
        strokeOpacity="0.55"
        strokeWidth="2.5"
      />
      {/* Número gravado na porta */}
      <text
        x={DOOR_X + DOOR_W / 2}
        y={DOOR_T + 42}
        textAnchor="middle"
        fill="#2E0409"
        fillOpacity="0.85"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="30"
        letterSpacing="2.5"
      >
        {siteConfig.roomNumber}
      </text>
      {/* Maçaneta */}
      <circle cx={DOOR_X + DOOR_W - 13} cy={DOOR_T + 118} r="3.2" fill="#3C0810" fillOpacity="0.8" />

      {/* Reflexo da porta no piso: espelhado na linha do piso e esmaecido */}
      <g opacity="0.4" transform={`translate(0, ${2 * END_B}) scale(1,-1)`}>
        <rect
          x={DOOR_X}
          y={DOOR_T + 60}
          width={DOOR_W}
          height={END_B - DOOR_T - 60}
          fill="url(#reflect)"
        />
      </g>
      <rect x={DOOR_X - 10} y={END_B} width={DOOR_W + 20} height="170" fill="url(#spill)" opacity="0.6" />
    </svg>
  );
}

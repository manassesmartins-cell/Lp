/**
 * Configuração central do AFTER 702.
 * Tudo que muda de edição para edição vive aqui.
 */

export const siteConfig = {
  name: "AFTER 702",
  tagline: "Você entra de um jeito. Não sai o mesmo.",

  /**
   * Linhagem: o 702 sucede o 222. É o que dá peso ao número novo —
   * sem isso, "702" é só um quarto diferente.
   */
  lineage: "O filho legítimo do 222",
  /** A promessa da edição, usada como fecho do Convite. */
  promise: "A chance de escrever a eternidade novamente.",
  /** Nome da edição anterior — referenciado na galeria. */
  predecessor: "222",
  description:
    "Um convite secreto. Às 23:00, uma porta se abre no Hotel Boulevard Blue Valley, em Belo Horizonte. Quarto 702.",
  url: "https://after702.com.br",
  venue: "Hotel Boulevard Blue Valley",
  /** Versão curta, para linhas estreitas (hero no mobile, rodapé). */
  venueShort: "Boulevard Blue Valley",
  city: "Belo Horizonte",
  room: "Quarto 702",
  /** Só o número — é o que aparece gravado na porta do corredor. */
  roomNumber: "702",

  /**
   * ─────────────────────────────────────────────────────────────
   *  CONTAGEM REGRESSIVA
   * ─────────────────────────────────────────────────────────────
   *  Basta trocar a data/hora abaixo para reconfigurar o contador.
   *
   *  Formato: ISO 8601 com fuso horário explícito, em relógio de 24 h.
   *  `-03:00` = horário de Brasília.
   *
   *  A porta abre às 23:00 — em 24 h, "T23:00:00".
   *
   *  Exemplos:
   *    "2026-08-27T23:00:00-03:00"  → quinta, 27/ago/2026 às 23:00
   *    "2026-09-04T23:00:00-03:00"  → sexta, 04/set/2026 às 23:00
   */
  eventDate: "2026-08-27T23:00:00-03:00",

  /**
   * Rótulo humano exibido abaixo do contador.
   * Não é derivado de `eventDate` — ao trocar a data, troque aqui também.
   */
  eventDateLabel: "Quinta-feira, 27/08 • 23:00",

  /** Versão compacta, para a linha de informações do hero. */
  eventShort: "Quinta · 23:00",

  links: {
    instagram: "https://instagram.com/after702",
    /** WhatsApp oficial do evento: (11) 99429-4906. */
    whatsapp: "https://wa.me/5511994294906",
    /** Destino dos botões de conversão ("Entrar na lista" / "Quero meu acesso"). */
    guestList:
      "https://wa.me/5511994294906?text=Quero%20entrar%20na%20lista%20do%20AFTER%20702",
  },
} as const;

export type LineupArtist = {
  emoji: string;
  name: string;
  role: string;
  /** Iniciais usadas no retrato tipográfico do card. */
  initials: string;
};

export const lineup: LineupArtist[] = [
  { emoji: "🎤", name: "Ricardinho", role: "Mestre de Cerimônia", initials: "R" },
  { emoji: "🎧", name: "Felipe Braga", role: "Dihh-Jay", initials: "FB" },
  { emoji: "💪", name: "Gabriel Salteiro", role: "Fisioculturismo", initials: "GS" },
  { emoji: "💪", name: "Carlos", role: "Fisioculturismo", initials: "C" },
];

export type Rule = {
  /** Nome do ícone em `lucide-react`. */
  icon:
    | "Lock"
    | "TicketCheck"
    | "MapPinOff"
    | "Sparkles"
    | "GlassWater"
    | "WineOff";
  title: string;
  detail: string;
};

export const rules: Rule[] = [
  {
    icon: "Lock",
    title: "Evento privado",
    detail: "Sem listas públicas. Sem divulgação aberta.",
  },
  {
    icon: "TicketCheck",
    title: "Entrada somente para convidados",
    detail: "Seu nome na porta ou nada acontece.",
  },
  {
    icon: "MapPinOff",
    title: "Local divulgado apenas para participantes",
    detail: "O endereço chega poucas horas antes.",
  },
  {
    icon: "WineOff",
    title: "Não é permitido trazer bebidas de fora",
    detail: "O bar é nosso. A curadoria também.",
  },
  {
    icon: "Sparkles",
    title: "Respeite o ambiente",
    detail: "Discrição é parte do convite.",
  },
  {
    icon: "GlassWater",
    title: "Viva a experiência",
    detail: "Esteja presente. A noite não se repete.",
  },
];

export type GalleryItem = {
  /** Legenda editorial exibida no hover. */
  caption: string;
  /** Rótulo curto de canto. */
  index: string;
  /** Variação visual do placeholder (ver components/gallery/PlaceholderArt.tsx). */
  art:
    | "corridor"
    | "room"
    | "drinks"
    | "lights"
    | "dj"
    | "guests"
    | "crimsonDetail";
  /**
   * Caminho da imagem real. Deixe `null` para exibir o placeholder gerado.
   * Ex.: "/gallery/corredor.jpg" (arquivo em `public/gallery/`).
   */
  src?: string | null;
  /** Peso no grid editorial. */
  span: "tall" | "wide" | "regular";
};

export const gallery: GalleryItem[] = [
  { caption: "O corredor", index: "01", art: "corridor", src: null, span: "tall" },
  { caption: "Quarto elegante", index: "02", art: "room", src: null, span: "regular" },
  { caption: "Drinks premium", index: "03", art: "drinks", src: null, span: "regular" },
  { caption: "Iluminação noturna", index: "04", art: "lights", src: null, span: "wide" },
  { caption: "A cabine", index: "05", art: "dj", src: null, span: "regular" },
  { caption: "Os convidados", index: "06", art: "guests", src: null, span: "regular" },
  { caption: "Detalhes em carmim", index: "07", art: "crimsonDetail", src: null, span: "tall" },
];

/**
 * Seção "Ruptura" — o conceito da edição.
 * A tela se parte em duas e a luz vermelha vaza pela fenda.
 */
export const rupture = {
  eyebrow: "Ruptura",
  before: "Antes",
  after: "Depois",
  word: "RUPTURA",
  lines: [
    "Existe a pessoa que atravessa aquela porta.",
    "E existe a que volta.",
  ],
  closing: "Não são a mesma.",
} as const;

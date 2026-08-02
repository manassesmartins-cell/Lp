/**
 * Configuração central do AFTER 222.
 * Tudo que muda de edição para edição vive aqui.
 */

export const siteConfig = {
  name: "AFTER 222",
  tagline: "Nem todo quarto é igual. Nem toda noite se repete.",
  description:
    "Um convite secreto. Às 02:22, uma porta se abre no Hotel Blue Bird. Quarto 222.",
  url: "https://after222.com.br",
  venue: "Hotel Blue Bird",
  room: "Quarto 222",

  /**
   * ─────────────────────────────────────────────────────────────
   *  CONTAGEM REGRESSIVA
   * ─────────────────────────────────────────────────────────────
   *  Basta trocar a data/hora abaixo para reconfigurar o contador.
   *
   *  Formato: ISO 8601 com fuso horário explícito.
   *  `-03:00` = horário de Brasília.
   *
   *  Exemplos:
   *    "2026-09-12T02:22:00-03:00"  → 12/set/2026 às 02:22 (Brasília)
   *    "2026-12-31T02:22:00-03:00"  → 31/dez/2026 às 02:22 (Brasília)
   */
  eventDate: "2026-09-12T02:22:00-03:00",

  /** Rótulo humano exibido abaixo do contador. */
  eventDateLabel: "12 de setembro • 02:22",

  links: {
    instagram: "https://instagram.com/after222",
    whatsapp: "https://wa.me/5511999999999",
    /** Destino dos botões de conversão ("Entrar na lista" / "Quero meu acesso"). */
    guestList: "https://wa.me/5511999999999?text=Quero%20entrar%20na%20lista%20do%20AFTER%20222",
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
  { emoji: "🦅", name: "FEJESP", role: "Núcleo São Paulo", initials: "F" },
];

export type Rule = {
  /** Nome do ícone em `lucide-react`. */
  icon: "Lock" | "TicketCheck" | "MapPinOff" | "Sparkles" | "GlassWater";
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
    | "goldDetail";
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
  { caption: "Detalhes dourados", index: "07", art: "goldDetail", src: null, span: "tall" },
];

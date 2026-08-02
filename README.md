# AFTER 222

Landing page do **AFTER 222** — evento privado no Hotel Blue Bird, Quarto 222.

Preto profundo, dourado metálico e acentos azuis do Blue Bird. A página foi
construída para parecer um convite secreto, não uma página de evento comum.

## Stack

| Camada    | Escolha                                    |
| --------- | ------------------------------------------ |
| Framework | Next.js 14 (App Router) + React 18          |
| Estilo    | Tailwind CSS 3                              |
| Animação  | Framer Motion + Lenis (scroll inercial)     |
| Ícones    | lucide-react                                |
| Tipografia| Cormorant Garamond (display) + Inter (sans) |

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm run start   # serve o build
```

## Configuração

Praticamente tudo que muda de edição para edição está em
[`lib/site-config.ts`](lib/site-config.ts).

### Data da contagem regressiva

```ts
// lib/site-config.ts
eventDate: "2026-09-12T02:22:00-03:00",   // ISO 8601 com fuso (-03:00 = Brasília)
eventDateLabel: "12 de setembro • 02:22", // rótulo exibido abaixo do contador
```

O contador recalcula a cada segundo, zera sozinho quando a data chega
(passa a exibir "A porta está aberta.") e avisa no console se a data estiver
em formato inválido. Os números só são renderizados após a hidratação, para
não divergir entre servidor e cliente.

### Links de conversão

```ts
links: {
  instagram: "https://instagram.com/after222",
  whatsapp:  "https://wa.me/5511999999999",
  guestList: "https://wa.me/...",  // destino de "Entrar na lista" e "Quero meu acesso"
}
```

### Line-up, regras e galeria

São arrays no mesmo arquivo (`lineup`, `rules`, `gallery`). Para adicionar
alguém ao line-up basta acrescentar um item — o grid se reorganiza sozinho.

Os ícones das regras usam nomes de `lucide-react`, resolvidos pelo mapa
`ICONS` em `components/sections/Rules.tsx`. Ao usar um ícone novo, adicione-o
lá e ao tipo `Rule["icon"]`.

### Trocando os placeholders da galeria por fotos reais

A galeria hoje usa artes SVG geradas em vez de caixas cinzas. Para usar a
foto de verdade, coloque o arquivo em `public/gallery/` e preencha `src`:

```ts
{ caption: "O corredor", index: "01", art: "corridor",
  src: "/gallery/corredor.jpg", span: "tall" },
```

Com `src` preenchido o componente passa a renderizar `next/image`
(`object-cover`); com `src: null` mantém o placeholder gerado.

O campo `span` (`"tall" | "wide" | "regular"`) define o peso da peça no grid
editorial de 6 colunas.

## Estrutura

```
app/
  layout.tsx           fontes, metadata, providers globais
  page.tsx             composição das seções
  globals.css          tokens, vidro, grão, vinheta, filetes
components/
  hero/
    Hero.tsx           tela cheia, parallax de scroll e de mouse
    CorridorScene.tsx  corredor em perspectiva de um ponto (SVG puro)
  sections/            Invitation, Lineup, Countdown, Rules, Gallery,
                       FinalCall, Footer
  effects/
    Particles.tsx      poeira suspensa em canvas
    CursorLight.tsx    iluminação que acompanha o cursor
  providers/
    SmoothScroll.tsx   Lenis
  ui/                  Reveal, SplitText, GoldButton, SectionHeading,
                       ScrollProgress
lib/
  site-config.ts       conteúdo e configuração
  use-countdown.ts     hook da contagem regressiva
```

### O corredor do hero

`CorridorScene.tsx` desenha o corredor em SVG, sem imagem externa: paredes,
piso, teto, portas laterais em perspectiva, arandelas e a porta 222 acesa ao
fundo. A geometria sai de um punhado de constantes no topo do arquivo
(`END_L`, `END_R`, `END_T`, `END_B`, `DOOR_*`) — mexer nelas reposiciona a
cena inteira de forma coerente. A parede direita é a esquerda espelhada via
`<use>`, então qualquer detalhe adicionado à esquerda aparece dos dois lados.

## Acessibilidade e desempenho

- Todo o movimento respeita `prefers-reduced-motion`: Lenis e as partículas
  nem chegam a ser inicializados, e as animações CSS são neutralizadas.
- `CursorLight` só monta em ponteiro fino (não aparece no toque).
- As partículas pausam quando o canvas sai da viewport.
- Textos animados letra a letra expõem a frase inteira via `aria-label`.

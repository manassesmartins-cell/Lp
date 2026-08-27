# AFTER 702

Landing page do **AFTER 702** — evento privado no Hotel Boulevard Blue Valley,
em Belo Horizonte — Quarto 702.

Preto quente, carmim e marfim. A página foi construída para parecer um convite
secreto, não uma página de evento comum, e é atravessada por um conceito:
**ruptura** — você não é o mesmo antes e depois de cruzar aquela porta.

O 702 é o sucessor do 222: a linhagem é parte da narrativa, e aparece no
rótulo do hero, no fecho do Convite e no título da galeria.

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
eventDate: "2026-08-27T23:00:00-03:00",       // ISO 8601 com fuso (-03:00 = Brasília)
eventDateLabel: "Quinta-feira, 27/08 • 23:00", // rótulo abaixo do contador
eventShort: "Quinta · 23:00",                 // versão compacta, no hero
```

A porta abre às **23:00** — em relógio de 24 horas, `T23:00:00`.

Nem `eventDateLabel` nem `eventShort` derivam de `eventDate`: ao trocar a data,
troque os três campos.

O contador recalcula a cada segundo, zera sozinho quando a data chega
(passa a exibir "A porta está aberta.") e avisa no console se a data estiver
em formato inválido. Os números só são renderizados após a hidratação, para
não divergir entre servidor e cliente.

### Links de conversão

```ts
links: {
  instagram: "https://instagram.com/after702",
  whatsapp:  "https://wa.me/5511994294906",
  guestList: "https://wa.me/5511994294906?text=...", // "Entrar na lista" e "Quero meu acesso"
}
```

### Local e quarto

`venue` é o nome completo do hotel e `venueShort` a versão curta — o hero e o
rodapé usam a curta porque o nome inteiro não cabe em uma linha no mobile.
`roomNumber` é só o número, e é ele que aparece gravado na porta do corredor
do hero: mudar o quarto na configuração muda a porta desenhada.

### Linhagem

`lineage`, `promise` e `predecessor` carregam a narrativa de sucessão do 222
para o 702. `lineage` é o rótulo acima do título no hero, `promise` fecha o
Convite e `predecessor` nomeia a galeria. O nome da edição sai de `name` —
o hero e o rodapé leem de lá, então trocar o nome troca a página inteira.

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
  sections/            Invitation, Rupture, Lineup, Countdown, Rules,
                       Gallery, FinalCall, Footer
  effects/
    Particles.tsx      poeira suspensa em canvas
    CursorLight.tsx    iluminação que acompanha o cursor
  providers/
    SmoothScroll.tsx   Lenis
  ui/                  Reveal, SplitText, CrimsonButton, SectionHeading,
                       ScrollProgress
lib/
  site-config.ts       conteúdo e configuração
  use-countdown.ts     hook da contagem regressiva
```

### A seção Ruptura

`Rupture.tsx` encena o conceito em vez de descrevê-lo: duas metades sólidas
cobrem a tela e se afastam conforme o scroll, deixando a luz carmim vazar pela
fenda. "Antes" fica preso na metade de cima, "Depois" na de baixo, e a palavra
RUPTURA só existe no vão. Os textos são ancorados na linha da fenda — um acima,
outro abaixo — para que ela nunca corte uma frase, em nenhuma altura de tela.

O texto vem de `rupture` em `lib/site-config.ts`.

### O corredor do hero

`CorridorScene.tsx` desenha o corredor em SVG, sem imagem externa: paredes,
piso, teto, portas laterais em perspectiva, arandelas e a porta acesa ao
fundo. A geometria sai de um punhado de constantes no topo do arquivo
(`END_L`, `END_R`, `END_T`, `END_B`, `DOOR_*`) — mexer nelas reposiciona a
cena inteira de forma coerente. A parede direita é a esquerda espelhada via
`<use>`, então qualquer detalhe adicionado à esquerda aparece dos dois lados.

## Paleta

| Token     | Uso                                        |
| --------- | ------------------------------------------ |
| `void`    | Preto levemente quente — fundo             |
| `crimson` | Carmim — a cor da ruptura, CTAs, destaques |
| `wine`    | Vinho profundo — sombra e volume           |
| `ivory`   | Marfim — texto sobre preto e sobre carmim  |

Texto sobre o carmim é sempre `ivory`: texto escuro no vermelho não tem
contraste suficiente.

## Acessibilidade e desempenho

- Todo o movimento respeita `prefers-reduced-motion`: Lenis e as partículas
  nem chegam a ser inicializados, e as animações CSS são neutralizadas.
- `CursorLight` só monta em ponteiro fino (não aparece no toque).
- As partículas pausam quando o canvas sai da viewport.
- Textos animados letra a letra expõem a frase inteira via `aria-label`.

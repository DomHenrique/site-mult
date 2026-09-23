## Context

O carrossel de banners do Hero institucional ([`css/style.css`](css/style.css#L332-L422)) utiliza imagens de resolução `1920 × 580 px` com a diretiva CSS `object-fit: cover`. Por omissão de `object-position`, os navegadores utilizam o valor padrão `50% 50%` (centro).

Em telas com larguras entre `1024px` e `1536px` (notebooks e monitores desktop sem formato estendido/ultrawide), o container de 580px de altura corta centenas de pixels nas duas laterais (`(1920 - viewport_width) / 2`).

Nas artes institucionais da Mult (notadamente no banner das especialistas técnicas `uploads/mult_1789930911_98049a37c673.png`), as 3 pessoas estão posicionadas do meio para a borda extrema direita (pixel 1170 ao 1918), enquanto os primeiros 1100 pixels à esquerda são fundo em degradê e espaço negativo para os títulos e CTAs. Com o corte centralizado, a 3ª especialista tem seu braço e metade do corpo cortados.

## Goals / Non-Goals

**Goals:**
- Ancorar a exibição das imagens dos banners no desktop à direita (`object-position: right center`), garantindo que o grupo de especialistas e elementos visuais fiquem 100% visíveis em telas de 1024px a 1920px+.
- Preservar o enquadramento centralizado (`object-position: center center`) nas telas mobile (abaixo de 768px), onde as imagens dedicadas já são quadradas (`1080 × 1080`) com elementos centralizados.
- Assegurar transição e contraste harmoniosos sem regressão visual nos demais banners ativos do site.

**Non-Goals:**
- Não alterar as imagens originais salvas no servidor (`uploads/`).
- Não alterar o schema do banco SQLite nem criar novos campos de controle no admin nesta etapa (mantendo solução rápida, limpa e com zero risco de migração).
- Não alterar o comportamento de autoplay ou lógica de transição JS do carrossel.

## Decisions

### 1. Aplicação de `object-position: right center` no Desktop
- **Decisão:** Configurar explicitamente `.hero-slide img { object-fit: cover; object-position: right center; }`.
- **Alternativas consideradas:**
  - *`object-fit: contain`:* Descartado porque deixaria faixas pretas ou vazias no topo/baixo ou nas laterais, quebrando o design imersivo do Hero.
  - *Alteração manual na arte (Photoshop/Canva):* Descartado por demandar novo upload no painel e não resolver estruturalmente o comportamento de corte para futuros banners compostos à direita.
  - *Criar campo `focal_point` no admin:* Descartado para a solução rápida atual, embora possa ser adicionado futuramente se surgirem banners com foco à esquerda.

### 2. Manutenção do Enquadramento Mobile
- **Decisão:** Adicionar regra específica em `@media (max-width: 768px)` mantendo `.hero-slide img { object-position: center center; }`.
- **Racional:** Os banners mobile cadastrados (`1080 × 1080` ou `4:5`) já têm fotos e elementos centralizados.

## Risks / Trade-offs

- **[Risco] Sobreposição de texto e imagem em larguras intermediárias (~1024px a 1150px):** Em telas estreitas de desktop, o texto longo à esquerda pode encostar na primeira pessoa do trio.
  - **Mitigação:** O degradê `.hero-overlay` já cobre com `rgba(21, 6, 52, 0.94)` a `rgba(21, 6, 52, 0.70)` até 52% da largura da tela, garantindo contraste e legibilidade perfeita das fontes brancas mesmo se houver aproximação visual.

## Why

A seção de equipe atual (`#equipe`) do site institucional da Mult Engenharia possui uma apresentação estática e plana (grid convencional de cards brancos), que não reflete o posicionamento inovador, científico e de alto valor da marca. 

Para elevar substancialmente o impacto visual e a retenção do usuário, adotaremos a arquitetura consagrada no projeto de referência `linktree-gridd360`: um **Carrossel 3D com Perspectiva Infinita** (`perspective: 1200px`, `preserve-3d`), ambientado no **Fundo Dark Imersivo (Opção A)** com as cores oficiais da Mult (*Deep Violet Navy* `#1D0B44`, *Vibrant Violet* `#6600CC` e malha sutil com glow neon), fotos verticais de corpo inteiro e botão/logo oficial do LinkedIn em cada card.

## What Changes

- **Transformação do Layout da Seção `#equipe`**:
  - Implementação de container com perspectiva 3D e track espacial (`#team3DCarouselContainer` e `#carouselTrack`).
  - Ambientação escura cinematográfica (*Opção A*) com degradê profundo de `#1D0B44` para `#150634`, padrão de malha sutil (`brand-bg-grid`) e iluminação suave com gradientes violeta.
- **Redesign dos Cards de Especialistas**:
  - Cards verticais imersivos (`w-72 sm:w-80 h-[420px] sm:h-[460px]`) com cantos arredondados, borda com anel de vidro (`ring-white/10`) e foco com brilho violeta intenso (`ring-purple-500/80 shadow-[0_20px_60px_rgba(102,0,204,0.4)]`).
  - Foto em tela cheia com degradê inferior escuro para legibilidade tipográfica perfeita.
  - Selo superior de destaque ("MULTIPLICADORA MULT" ou pilar técnico).
  - Pílula translúcida com ícone da função/especialidade (`backdrop-blur-md`).
  - Nome em destaque em caixa alta/heading branca e mini-bio explicativa.
  - **Botão Oficial do LinkedIn**: Ícone e link direto estilizado para o perfil profissional (`ri-linkedin-box-fill` com tom azul característico `#0077B5` e efeito hover glassmorphism).
- **Motor Interativo em JavaScript**:
  - Auto-play contínuo a cada 3.5 segundos.
  - Pausa automática no hover do mouse para permitir leitura da bio e clique no LinkedIn.
  - Seleção direta por clique em qualquer card lateral (trazendo-o para a frente).
  - Adaptação responsiva para smartphones (ajuste de escala e deslocamento lateral para não estourar em telas de 375px–420px).
- **Sincronização de Dados e 6 Especialistas Mult**:
  - Atualização dos dados iniciais no SQLite (`data/mult.db` e `api/config.php`) com as 6 especialistas do briefing original da Mult.

## Capabilities

### New Capabilities
- `team-3d-carousel`: Sistema de carrossel 3D com perspectiva infinita, renderização dinâmica a partir do banco de dados local SQLite, cards imersivos com identidade Mult e integração de links oficiais do LinkedIn.

### Modified Capabilities
<!-- Nenhuma especificação anterior teve seus requisitos funcionais invalidados. -->

## Impact

- `index.html`: Atualização da seção `#equipe` com a nova casca 3D, elementos de fundo e container dinâmico.
- `css/style.css`: Novas classes de perspectiva 3D, grid de textura sutil e animações de foco e brilho.
- `js/site.js`: Refatoração da função `initDynamicTeam()` para instanciar e sincronizar o motor 3D com a API REST local.
- `data/mult.db` e `api/config.php`: Seed das 6 especialistas da Mult com suas respectivas áreas de atuação.

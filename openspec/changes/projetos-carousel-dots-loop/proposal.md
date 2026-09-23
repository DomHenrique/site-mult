## Why

Atualmente, os projetos em destaque cadastrados na seção `#projetos` são renderizados como uma lista empilhada verticalmente (`space-y-8`). À medida que novos cases são adicionados pelo painel administrativo, a página torna-se excessivamente longa, prejudicando a escaneabilidade, dispersando a atenção do visitante e reduzindo o impacto de cada case individual.

Para proporcionar uma experiência editorial imersiva, moderna e focada, é necessário transformar a seção de Projetos em Destaque em um carrossel horizontal de alta performance, com barra de navegação/indicadores (dots) posicionada discretamente abaixo do card, navegação fluida em loop infinito contínuo e transições suaves que valorizam a identidade visual da Mult.

## What Changes

- **Estrutura de Carrossel para Projetos (`#projectsCarousel`)**: Substituição da pilha vertical estática por um viewport de carrossel com trilha deslizante (`projects-track`) contendo os cards completos de cada projeto (com suas silhuetas orgânicas e pilares técnicos preservados).
- **Posicionamento de Dots e Controles Abaixo do Card**: Criação de um painel de controles elegante e centralizado logo abaixo do card principal (`projects-nav-bar`), abrigando botões anterior/próximo e pílulas/dots indicadores.
- **Indicadores Modernos com Feedback de Progresso**: Indicadores visuais que expandem suavemente no slide ativo, permitindo salto direto ao case desejado com um clique e feedback numérico ou de estado.
- **Loop com Ciclo Infinito Suave**: Mecânica de rotação circular infinita onde o avanço a partir do último card segue naturalmente para o primeiro sem saltos abruptos ou reversão mecânica.
- **Autoplay Contemplativo & Ergonomia**: Rotação temporizada calma (7 a 8 segundos por case, permitindo leitura técnica confortável) com pausa imediata em hover de mouse e interação de toque (mobile swipe).
- **Graceful Degradation (Card Único)**: Quando houver apenas 1 projeto cadastrado na base, o sistema oculta automaticamente os controles e desativa o autoplay, mantendo o card estático impecável.

## Capabilities

### New Capabilities
- `projetos-carousel`: Carrossel horizontal de alta fidelidade e loop contínuo para a seção de Projetos em Destaque, com barra de controles inferior, dots interativos expansíveis, navegação circular sem fim, autoplay com pausa contextual e suporte responsivo a gestos touch.

### Modified Capabilities

## Impact

- **Front-end / UI**:
  - `index.html`: Adequação do container da seção `#projetos` para comportar o carrossel, trilha de slides e a barra de controles inferior.
  - `js/site.js`: Refatoração da função `initProjects` para renderizar os slides na trilha, gerenciar estados de slide, autoplay, eventos de clique nos dots/setas, gestos swipe e ciclo infinito.
  - `css/style.css`: Novas classes de layout e animação para o carrossel de projetos (`.projects-carousel-wrapper`, `.projects-track`, `.projects-slide`, `.projects-controls`, `.projects-dot`, `.projects-dot.active`, etc.).
- **Compatibilidade**: Totalmente responsivo para mobile, tablet e desktop, sem bibliotecas externas pesadas, preservando o tempo de carregamento e as diretrizes do Google Core Web Vitals.

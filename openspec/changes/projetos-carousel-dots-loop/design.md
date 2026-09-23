## Context

A seção de Projetos em Destaque (`#projetos`) apresenta cases científicos e industriais desenvolvidos pela Mult Engenharia. Atualmente, os cases são inseridos no DOM e dispostos em pilha vertical (`space-y-8`). Quando múltiplos cases estão cadastrados no banco de dados SQLite, a página ganha altura excessiva, sobrecarrega a rolagem e dilui a atenção do visitante.

A decisão aprovada no `/opsx-explore` é unificar a exibição em um **Carrossel Horizontal de Foco Único**, posicionando os **indicadores e controles (dots + setas) abaixo do card** e aplicando uma navegação em **loop com ciclo infinito suave**, com cadência de leitura calma (7.5s) e transições elegantes alinhadas à identidade visual Mult.

## Goals / Non-Goals

**Goals:**
- Implementar carrossel horizontal responsivo na seção `#projetos` que acomode os cards ricos de projetos com suas silhuetas orgânicas e pilares técnicos intactos.
- Posicionar a barra de controle centralizada abaixo do card (`#projectsControls`), combinando botões discretos de navegação (anterior/próximo) e dots indicadores.
- Desenvolver mecânica de loop infinito sem travamento ou rebobinamento brusco (transição contínua entre o último e o primeiro slide).
- Fornecer indicadores visuais (dots que expandem suavemente para pílula quando ativos, com suporte a clique para salto direto).
- Adicionar autoplay com tempo adequado de leitura (7.5s), pausa no mouse hover e pausa no toque mobile.
- Suportar gestos de arrasto (touch swipe) para dispositivos móveis.
- Garantir fallback limpo quando houver apenas 1 projeto (ocultando controles e desativando carrossel).

**Non-Goals:**
- Não alterar os campos cadastrais ou rotas da API no backend (`api/index.php` ou `server.js`).
- Não alterar a estrutura visual interna do card do projeto (mantendo os pilares, silhueta orgânica `shape-mult-organic`, tipografia e badges já homologados).
- Não introduzir dependências externas de JavaScript (ex: Swiper, Slick ou Bootstrap JS); a implementação deve ser feita em JavaScript Vanilla e CSS puro de alta performance.

## Decisions

### 1. Arquitetura do Carrossel (Track Deslizante com Clones para Loop Infinito)
- **Decisão**: Utilizar um container de viewport com `overflow: hidden` e uma trilha flex (`.projects-track`) onde cada slide ocupa `100%` da largura. Para o loop infinito verdadeiro (sem o efeito de "rebobinamento rápido"), criaremos clones virtuais do primeiro e do último slide nas extremidades. Ao atingir o clone, um listener de `transitionend` reposiciona silenciosamente a trilha com `transition: none` para o slide real correspondente, reativando a transição no próximo frame.
- **Alternativas consideradas**:
  - *Reposicionamento por classes de opacidade (fade)*: Embora simples, não transmite a sensação de fluxo direcional horizontal requerida pelo usuário ("ciclo infinito").
  - *Reversão simples (ir do último para o primeiro voltando tudo)*: Quebra a percepção de continuidade contínua.

### 2. Posicionamento Inferior dos Controles (`projects-controls`)
- **Decisão**: Posicionar a barra de controles logo abaixo do card principal (`margin-top: 2rem;`), alinhada ao centro da seção. 
- **Estrutura visual da barra**:
  - Botão Anterior (`projects-nav-btn` com ícone `ri-arrow-left-s-line`).
  - Container de Dots (`projects-dots`): círculos de 8px em tom lavanda/violeta translúcido que se expandem para uma pílula de 28px no slide ativo (`bg-purple-700` com sutil sombra violeta).
  - Botão Próximo (`projects-nav-btn` com ícone `ri-arrow-right-s-line`).
- **Alternativas consideradas**:
  - *Setas flutuantes nas laterais*: Poderiam colidir com a silhueta orgânica do card em telas médias ou tablet.
  - *Setas no cabeçalho da seção*: Deixariam os dots órfãos na base e distanciariam os controles da área de foco do usuário.

### 3. Dinâmica de Autoplay & Easing
- **Decisão**:
  - Duração por slide: **7500ms** (7,5 segundos). Como os cards possuem pilares técnicos (`tag_1`, `tag_2`, `tag_3`) e descrições detalhadas, esse tempo permite leitura confortável.
  - Curva de transição: `transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)`, gerando uma sensação física de deslize suave e desaceleração precisa.
  - Pausa inteligente em `mouseenter` no container ou controles, e em `touchstart`.

### 4. Suporte a Gestos Mobile (Touch Swipe)
- **Decisão**: Implementar detecção de gestos através dos eventos `touchstart` e `touchend` com delta horizontal mínimo de 45px e tolerância a scroll vertical, garantindo navegação natural no smartphone.

## Risks / Trade-offs

- **[Risco] Múltiplos eventos de clique rápido nas setas ou dots causando dessincronização da trilha**
  → *Mitigação*: Implementar flag booleana `isTransitioning` que ignora novos disparos de navegação até que a animação atual termine (`transitionend`).
- **[Risco] Clone de elementos no DOM duplicando IDs acessíveis ou ouvintes de evento**
  → *Mitigação*: Gerar os clones programaticamente limpando atributos `id` dos nós duplicados e adicionando `aria-hidden="true"`.
- **[Risco] Redimensionamento da janela do navegador alterando a largura do slide em tempo real**
  → *Mitigação*: Ouvinte de evento `resize` com `requestAnimationFrame` que recalcula o deslocamento da trilha sem transição visível.
- **[Risco] Apenas 1 projeto retornado pelo banco de dados**
  → *Mitigação*: Verificação condicional de `total <= 1`. Se houver apenas 1 projeto, o carrossel renderiza o card estático padrão, omitindo clones, autoplay e barra de controles.

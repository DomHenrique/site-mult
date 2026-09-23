## Context

O site institucional da Mult Serviços de Engenharia possui atualmente um Hero estático baseado em grid assimétrico (texto na coluna esquerda e imagem com moldura na coluna direita). Inspirando-se no modelo de banners de alta conversão de `moraris` e `kastelo-lite`, o objetivo é evoluir a seção principal para um carrossel de até 3 banners com visual cinematográfico, altura imponente no desktop (~580px) e formato otimizado no mobile (1:1 ou 4:5).

O site opera com uma stack estática/dinâmica híbrida:
- Frontend: HTML5 semântico, Tailwind CSS via CDN, CSS customizado em `css/style.css`, Vanilla JS puro em `js/site.js`.
- Backend/Admin: PHP 8+ no cPanel e Node.js (`server.js`) no ambiente local, persistência em SQLite (`data/mult.db`).
- Imagens: Gestão de uploads em `uploads/` com fallbacks estáticos em `assets/img/`.

## Goals / Non-Goals

**Goals:**
- Implementar um carrossel imponente no Hero com até 3 banners rotativos ativos.
- Suportar **Modo Híbrido** por banner:
  - *Modo Overlay Dinâmico*: Imagem de fundo + máscara gradiente elegante + eyebrow badge, título expressivo, subtítulo e botão CTA configurável.
  - *Modo Arte Gráfica Completa*: Imagem concebida com arte final integrada, com link em todo o slide.
- Suportar **Dual-Image Responsivo**: `<picture>` com imagem panorâmica para Desktop (`1920 × 580 px`) e versão vertical/quadrada para Mobile (`1080 × 1080 px` ou `1080 × 1350 px`).
- Desenvolver motor de carrossel em **Vanilla JS puro e ultraleve** com transição *fade* suave, autoplay (5.5s), pausa no hover/touch, controles de seta elegantes e pílulas indicadoras na base.
- Preservar a **faixa horizontal dos 4 pilares técnicos** (*Qualidade & Inovação*, *SST*, *ESG*, *Social*) posicionada imediatamente abaixo do carrossel.
- Prover módulo completo no **Painel Admin** (`/admin`) para cadastro, ordenação, ativação/desativação e upload inteligente das versões Desktop e Mobile.
- Garantir fallback HTML pré-renderizado resiliente caso a API esteja indisponível.

**Non-Goals:**
- Incluir bibliotecas pesadas externas (como o bundle completo do Bootstrap ou bibliotecas de terceiros que onerem o tempo de carregamento).
- Alterar as seções subsequentes (#quem-somos, #solucoes, #como-atuamos, #projetos).

## Decisions

### 1. Motor de Carrossel Nativo (Vanilla JS) vs Biblioteca de Terceiros
- **Decisão**: Desenvolver o carrossel em Vanilla JS nativo e CSS Transitions puro dentro de `js/site.js` e `css/style.css`.
- **Alternativas consideradas**:
  - *Bootstrap Carousel (como no Kastelo/Moraris)*: Exigiria carregar `bootstrap.bundle.min.js` e resets de CSS que colidem com as classes do Tailwind.
  - *Swiper JS*: Adicionaria ~140KB de dependências desnecessárias para apenas 3 slides de transição fade.
- **Vantagem**: Zero dependências adicionais, pontuação máxima no Core Web Vitals (LCP/INP), controle total sobre o ciclo de vida dos eventos e acessibilidade nativa.

### 2. Altura e Proporções Responsivas
- **Decisão**:
  - **Desktop (min-width: 1025px)**: Altura imponente de `580px` (`min-height: 580px; max-height: 640px`) com `object-fit: cover`.
  - **Tablet (769px - 1024px)**: Altura adaptativa de `480px`.
  - **Mobile (<= 768px)**: `aspect-ratio: 1 / 1` (ou altura mínima de `380px`), permitindo leitura clara do criativo sem cortes indesejados.

### 3. Modelo de Dados da Tabela `banners`
- **Decisão**: Criar tabela dedicada `banners` no SQLite com os campos:
  ```sql
  CREATE TABLE banners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    subtitle TEXT,
    eyebrow TEXT,
    button_text TEXT DEFAULT 'FALE SOBRE SEU PROJETO',
    button_link TEXT DEFAULT '#contato',
    image_url TEXT NOT NULL,
    image_mobile_url TEXT,
    show_text_overlay INTEGER DEFAULT 1,
    text_color TEXT DEFAULT '#FFFFFF',
    display_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  ```
- **Rationale**: Isolamento limpo em relação à tabela `hero_content` legado (que continha apenas dados monorow para a versão estática).

### 4. Banners Padrão Iniciais (Seed/Fallback)
- **Decisão**:
  - **Banner 1 (Institucional & Fundadora)**: Mantém Taiana Franco com texto *"Conhecimento que multiplica resultados"* e CTA para o contato da Mult.
  - **Banner 2 (Engenharia de Alimentos & P&D)**: Visual de laboratório e indústria alimentícia (`assets/img/engenharia-de-alimentos.jpeg`) com copy focado em desenvolvimento de produtos, rotulagem e formulações.
  - **Banner 3 (SST, Meio Ambiente & ESG)**: Imagem técnica com foco em conformidade regulatória, perícias, segurança do trabalho e impacto sustentável.

## Risks / Trade-offs

- **[Risco] LCP (Largest Contentful Paint) afetado pelo carrossel**:
  - *Mitigação*: O primeiro slide recebe `loading="eager"` e `fetchpriority="high"`, enquanto os slides 2 e 3 recebem `loading="lazy"`.
- **[Risco] Quebra visual em dispositivos móveis caso imagem seja muito larga**:
  - *Mitigação*: Uso obrigatório da tag `<picture>` com `<source media="(max-width: 768px)" ...>`, garantindo que o banner mobile quadrado/vertical seja exibido sem distorção.
- **[Risco] Legibilidade de textos sobrepostos em fotos claras**:
  - *Mitigação*: Aplicação de máscara gradiente de alta fidelidade (`linear-gradient(90deg, rgba(21,6,52,0.92) 0%, rgba(21,6,52,0.60) 50%, rgba(21,6,52,0.15) 100%)`) garantindo contraste AA/AAA para qualquer tipografia clara.

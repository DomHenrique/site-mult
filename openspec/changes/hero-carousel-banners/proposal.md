## Why

Atualmente, a seção Hero do site da Mult Serviços de Engenharia exibe uma composição estática (uma única foto da fundadora e um conjunto fixo de textos). Embora transmita autoridade executiva, essa abordagem limita a capacidade de destacar as diferentes frentes técnicas da empresa (como Engenharia de Alimentos/P&D e Segurança do Trabalho/ESG) e impede campanhas sazonais ou direcionadas.

Inspirado no modelo de carrossel de banners de alta performance já validado nos projetos `moraris` e `kastelo-lite`, esta melhoria transforma o Hero em um carrossel dinâmico e imponente de até 3 banners com transições suaves (fade), suporte a imagens responsivas otimizadas para Desktop e Mobile, e suporte a modo híbrido (arte gráfica completa ou fotografia de fundo com textos e CTAs dinâmicos editáveis no painel administrativo).

## What Changes

- **Carrossel Hero Imponente (Desktop ~580px / Mobile Proporcional)**:
  - Substituição da estrutura estática do Hero por um container de carrossel suave e fluido.
  - Suporte a até 3 banners ativos em rotação automática (intervalo de 5-6s, pausa no hover/toque) e gestos de toque (swipe mobile).
  - Controles de navegação: setas laterais elegantes e indicadores circulares/pílulas discretos na base.
- **Modo Híbrido por Slide**:
  - **Modo Arte Gráfica Completa**: Banner já concebido com arte integrada, servindo como link direto clicável.
  - **Modo Overlay Dinâmico**: Fotografia técnica em alta definição com gradiente refinado de contraste, textos editáveis (*eyebrow*, *título*, *subtítulo*) e botão CTA de ação rápida.
- **Dual-Image Responsivo Otimizado**:
  - Renderização via tag `<picture>` com `<source media="(max-width: 768px)" ...>` para versão mobile e `<img>` para desktop.
  - Desktop: formato panorâmico imponente (`1920 × 580 px`).
  - Mobile: formato proporcional (`1080 × 1080 px` 1:1 ou `1080 × 1350 px` 4:5).
- **Conteúdo Inicial dos 3 Banners Padrão**:
  - *Banner 1 (Institucional & Fundadora)*: Preservação da foto de Taiana Franco com assinatura *"Conhecimento que multiplica RESULTADOS"* e posicionamento como Hub de Especialistas.
  - *Banner 2 (Engenharia de Alimentos & Inovação)*: Foco em pesquisa, formulações, rotulagem e processos industriais de alimentos.
  - *Banner 3 (SST, Meio Ambiente & ESG)*: Foco em conformidade com Normas Regulamentadoras, segurança ocupacional e sustentabilidade.
- **Preservação da Faixa de Pilares**:
  - A faixa horizontal dos 4 pilares (*Qualidade & Inovação, SST, ESG e Social*) permanece logo abaixo dos banners, conectando o Hero com o restante da página.
- **Backend & Painel Administrativo**:
  - Criação da tabela `banners` no SQLite (`data/mult.db`) e migração automática no `server.js` e `api/banners.php`.
  - Módulo completo de gerenciamento no Painel Admin (`/admin`), permitindo criar, ordenar, ativar/desativar e fazer upload inteligente das imagens Desktop e Mobile.

## Capabilities

### New Capabilities
- `hero-carousel-banners`: Gerenciamento e renderização do carrossel responsivo de banners da seção Hero no padrão híbrido (arte visual ou overlay dinâmico), com transições suaves, controles de navegação e integração completa com a API e Painel Admin.

### Modified Capabilities
<!-- Sem mudanças de requisitos em specs existentes -->

## Impact

- **Frontend**:
  - Alteração no `index.html` (substituição do bloco do hero pelo container do carrossel híbrido com fallback estático completo).
  - Atualização em `css/style.css` com as classes e animações do carrossel (`.hero-carousel`, `.hero-slide`, `.hero-overlay`, `.hero-indicators`, etc.).
  - Atualização em `js/site.js` para inicializar e gerenciar o carrossel Vanilla JS, eventos de swipe touch, autoplay e busca na API `/api/banners.php`.
- **Backend / API**:
  - Novo endpoint `api/banners.php` e rotas equivalentes no `server.js` (GET, POST, PUT, DELETE).
  - Tabela `banners` criada no SQLite (`data/mult.db`).
- **Painel Admin**:
  - Nova aba/módulo em `admin/index.html` e `admin/js/admin-hero-banners.js` (ou expansão de `admin-hero.js`).
- **Deploy**:
  - Atualização nos scripts de sincronização e deploy via FTP/cPanel.

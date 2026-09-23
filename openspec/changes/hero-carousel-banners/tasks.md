## 1. Banco de Dados e API de Banners

- [x] 1.1 Criar tabela `banners` no SQLite e rotina de auto-migração em `server.js`
- [x] 1.2 Implementar endpoint PHP `api/banners.php` com suporte a GET público e POST/PUT/DELETE autenticados
- [x] 1.3 Implementar espelhamento das rotas de banners no servidor local `server.js`
- [x] 1.4 Inserir seed com os 3 banners iniciais da Mult (Banner 1: Institucional/Taiana, Banner 2: Alimentos/P&D, Banner 3: SST/ESG)

## 2. Estilos e Estrutura CSS do Carrossel Hero

- [x] 2.1 Criar classes `.hero-carousel`, `.hero-slide`, `.hero-overlay` e regras responsivas (altura imponente ~580px desktop, 1:1 mobile) em `css/style.css`
- [x] 2.2 Estilizar controles de navegação (setas circulares com efeito blur/transparência e pílulas indicadoras interativas)
- [x] 2.3 Implementar transição suave de crossfade e animações tipográficas de entrada (`heroFadeIn`)

## 3. Estrutura HTML e Integração Frontend

- [x] 3.1 Atualizar `index.html` substituindo o bloco estático do Hero pelo container de carrossel híbrido com fallback pré-renderizado
- [x] 3.2 Desenvolver motor de carrossel nativo Vanilla JS em `js/site.js` (autoplay 5.5s, pausa ao passar o mouse/toque e navegação por swipe)
- [x] 3.3 Integrar busca dinâmica de banners no `js/site.js` renderizando os slides com base no modo híbrido (`show_text_overlay`)
- [x] 3.4 Adicionar métodos de busca de banners em `js/api-client.js`

## 4. Painel Administrativo (/admin)

- [x] 4.1 Adicionar item "Banners do Hero" na barra lateral e container principal do painel em `admin/index.html`
- [x] 4.2 Criar script de controle `admin/js/admin-banners.js` com tabela de banners, ordenação e botão de ativação
- [x] 4.3 Implementar formulário/modal com toggle de Modo Híbrido e componentes de upload inteligente para Desktop e Mobile
- [x] 4.4 Adicionar métodos de CRUD de banners (`saveBanner`, `deleteBanner`) no `js/api-client.js`

## 5. Validação, Responsividade e Testes

- [x] 5.1 Validar funcionamento do carrossel no Desktop (transições, setas, pílulas e pausa no hover)
- [x] 5.2 Validar responsividade no Mobile (troca da imagem via `<picture>`, proporção quadrada/vertical e gestos de swipe)
- [x] 5.3 Testar criação, edição e exclusão de banners através do painel administrativo


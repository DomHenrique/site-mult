## 1. Dados e Seeds das 6 Especialistas Mult

- [x] 1.1 Atualizar sementes no banco SQLite (`data/mult.db`) com as 6 especialistas oficiais da Mult (Taiana, Cristina, Juliana, Fernanda, Renata, Carla) com cargos, bios e URLs do LinkedIn.
- [x] 1.2 Atualizar script de seed em `api/config.php` para garantir paridade caso o banco seja recriado no cPanel.
- [x] 1.3 Organizar e extrair retratos limpos individuais para as especialistas em `assets/img/`.

## 2. Estrutura HTML e Ambientação Dark (Opção A)

- [x] 2.1 Refatorar a seção `#equipe` em `index.html` para aplicar o tema Dark Imersivo (`bg-[#1D0B44]`, degradê para `#150634`, glow violeta e malha `brand-bg-grid`).
- [x] 2.2 Estruturar o container de perspectiva 3D (`#team3DCarouselContainer` com `perspective: 1200px` e `#carouselTrack` com `preserve-3d`).
- [x] 2.3 Atualizar o cabeçalho da seção com badge estilizado `NOSSAS MULTIPLICADORAS` e tipografia contrastante em tons de branco e lilás.

## 3. Estilização CSS do Carrossel 3D e Cards

- [x] 3.1 Adicionar estilos no `css/style.css` para a malha de textura `brand-bg-grid` e iluminação ambiente violeta.
- [x] 3.2 Definir classes e transições dos cards (`carousel-card`), anéis translúcidos (`ring-white/10`) e anel ativo neon violeta (`ring-purple-500/80 shadow-[0_20px_60px_rgba(102,0,204,0.4)]`).
- [x] 3.3 Estilizar o botão glassmorphism com o logotipo oficial do LinkedIn (`ri-linkedin-box-fill text-[#0077B5]`).

## 4. Motor JavaScript Interativo e Integração Dinâmica

- [x] 4.1 Implementar a função matemática `updateCarousel()` em `js/site.js` com cálculo circular de posições, escala e rotação Y.
- [x] 4.2 Adicionar auto-rotação circular a cada 3.5s com pausa no hover (`mouseenter`/`mouseleave`).
- [x] 4.3 Implementar clique direto nos cards laterais para centralização imediata.
- [x] 4.4 Implementar tratamento responsivo para telas mobile (< 640px).
- [x] 4.5 Integrar com a chamada da API `ApiClient.getTeam()` para renderização 100% dinâmica a partir do SQLite.

## 5. Validação e Testes

- [x] 5.1 Testar renderização no navegador desktop e verificar a perspectiva 3D e rotação contínua.
- [x] 5.2 Testar responsividade em viewport mobile (< 640px).
- [x] 5.3 Testar funcionamento dos links do LinkedIn e interações de hover/clique.
- [x] 5.4 Testar sincronização com o painel `/admin` na aba Equipe.

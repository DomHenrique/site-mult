## 1. Estrutura HTML & Containers

- [x] 1.1 Atualizar a seção `#projetos` em `index.html` para abrigar o viewport `#projectsCarousel` e a trilha deslizante `#projectsTrack`
- [x] 1.2 Adicionar o container da barra de controles inferior `#projectsControls` com botões anterior/próximo e slot para os dots indicadores

## 2. Estilização CSS & Design System

- [x] 2.1 Criar classes do carrossel (`.projects-carousel`, `.projects-track`, `.projects-slide`) com transições suaves e overflow controlado em `css/style.css`
- [x] 2.2 Estilizar a barra de controles inferior `.projects-controls`, botões `.projects-nav-btn` e os dots expansíveis `.projects-dot` com identidade visual Mult
- [x] 2.3 Ajustar regras responsivas de espaçamento, alinhamento e dimensões para mobile, tablet e desktop

## 3. Mecânica do Carrossel em JavaScript

- [x] 3.1 Refatorar a renderização dos cards na função `initProjects` em `js/site.js` para compor os slides da trilha
- [x] 3.2 Implementar mecanismo de loop infinito com clones transparentes e reposicionamento no evento `transitionend`
- [x] 3.3 Implementar controle de slide ativo com sincronização de classes nos dots indicadores e proteção contra múltiplos cliques rápidos (`isTransitioning`)
- [x] 3.4 Conectar ouvintes de evento para cliques nos botões de navegação e salto direto por clique em qualquer dot

## 4. Interatividade, Gestos Touch & Autoplay

- [x] 4.1 Implementar autoplay com cadência de leitura calma (7.5s) e mecanismo de reinicialização
- [x] 4.2 Adicionar ouvintes de pausa automática no hover do mouse (`mouseenter`/`mouseleave`)
- [x] 4.3 Implementar suporte a gestos touch swipe (`touchstart`/`touchend`) para navegação por arrasto no mobile
- [x] 4.4 Configurar degradação graciosa quando houver apenas 1 projeto cadastrado (ocultando controles e desativando autoplay)

## 5. Validação & Verificação

- [x] 5.1 Validar a transição contínua do loop infinito, responsividade mobile e clique nos dots no navegador
- [x] 5.2 Assegurar que os dados vindos da API e a silhueta orgânica de cada case continuem com renderização perfeita

## 1. Banco de Dados e Backend

- [x] 1.1 Implementar migração automática no SQLite (`api/config.php` e `server.js`) adicionando a coluna `image_mobile_url` nas tabelas `hero_content` e `projects`
- [x] 1.2 Atualizar endpoint e rota de Hero (`api/hero.php` e `server.js`) para aceitar, gravar e retornar `image_mobile_url`
- [x] 1.3 Atualizar endpoint e rota de Projetos (`api/projetos.php` e `server.js`) para suportar `image_mobile_url` nas operações de criação, edição e consulta

## 2. Painel Administrativo

- [x] 2.1 Adicionar banner de orientação para telas móveis (`lg:hidden`) em `admin/index.html` e lógica de dismiss em `admin/js/admin-app.js` recomendando o uso de computador
- [x] 2.2 Evoluir o helper de upload em `admin/js/admin-app.js` para suportar validações e presets de proporção mobile
- [x] 2.3 Implementar a interface de Comparação Visual (Grid Duplo) no editor de Hero em `admin/js/admin-hero.js` com slots lado a lado para Desktop (16:9) e Mobile (4:5)
- [x] 2.4 Implementar a interface de Comparação Visual (Grid Duplo) no modal de Projetos em `admin/js/admin-projetos.js` com slots lado a lado para Desktop e Mobile

## 3. Frontend e Renderização Semântica

- [x] 3.1 Atualizar a estrutura HTML do Hero em `index.html` e a hidratação em `js/site.js` para utilizar `<picture>` com `<source media="(max-width: 768px)">` e fallback automático
- [x] 3.2 Atualizar a renderização dinâmica do card de Projetos em Destaque em `js/site.js` com tag `<picture>` para alternância automática de mídias

## 4. Validação e Testes Visuais

- [x] 4.1 Validar a gravação e integridade de uploads duplos através do painel administrativo
- [x] 4.2 Inspecionar visualmente o comportamento e enquadramento das imagens em viewports Desktop (1440px) e Mobile (390px)

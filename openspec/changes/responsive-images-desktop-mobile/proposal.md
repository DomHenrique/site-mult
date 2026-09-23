## Why

Atualmente, o site e o painel administrativo utilizam um único campo de imagem (`image_url`) para as seções Hero e Projetos em Destaque. Como monitores widescreen (16:9) e smartphones (4:5 ou 9:16) possuem proporções diametralmente opostas, forçar uma única imagem via CSS `object-cover` acarreta cortes severos de enquadramento (eliminando textos caligráficos, molduras e partes cruciais da imagem) ou redução a faixas ilegíveis no celular. Além disso, o gerenciamento de conteúdo e uploads pesados no painel administrativo a partir de telas móveis pequenas compromete a precisão e a produtividade do editor.

Esta mudança introduz suporte nativo a mídias duplas (Desktop e Mobile) com renderização semântica via `<picture>`, uma interface no painel administrativo com comparação visual lado a lado (Grid Duplo), migração transparente de banco de dados e aviso no painel orientando o uso de computador em telas móveis.

## What Changes

- **Esquema de Dados SQLite (`data/mult.db`)**: Adição retrocompatível da coluna `image_mobile_url` nas tabelas `hero_content` e `projects`, mantendo os registros atuais intactos.
- **Endpoints de Backend (`api/hero.php`, `api/projetos.php` e `server.js`)**: Atualização dos fluxos de leitura e persistência para receber, gravar e retornar `image_url` e `image_mobile_url`.
- **Renderização no Frontend (`index.html` e `js/site.js`)**: Substituição de tags `<img>` isoladas por elementos semânticos `<picture>` com `<source media="(max-width: 768px)">` e fallback automático para a imagem desktop caso a versão mobile não seja informada.
- **Painel Administrativo (`admin/js/admin-hero.js` e `admin/js/admin-projetos.js`)**: Novo componente de upload com **Comparação Visual (Grid Duplo)**, exibindo slots lado a lado para Desktop (16:9 ou 4:5) e Mobile (4:5 ou 16:9) com miniaturas e badges de dimensão em tempo real.
- **Aviso de Produtividade Mobile no Admin (`admin/index.html` e `admin/js/admin-app.js`)**: Banner informativo exibido exclusivamente em telas de smartphone e tablet recomendando o uso de computador para gerenciamento do site.

## Capabilities

### New Capabilities
- `responsive-media-delivery`: Entrega de imagens responsivas no frontend utilizando o elemento HTML5 `<picture>`, carregando ativos específicos para Desktop e Mobile com fallback elegante e preservação das proporções e do Largest Contentful Paint (LCP).
- `admin-dual-media-manager`: Interface administrativa com comparação visual lado a lado (Grid Duplo) para upload e gerenciamento simultâneo de mídias desktop e mobile, além de banner de orientação em telas móveis.
- `multi-device-storage-schema`: Extensão do banco de dados SQLite local e das rotas de API para armazenar referências de mídias móveis (`image_mobile_url`) de forma desacoplada e retrocompatível.

### Modified Capabilities
<!-- Nenhuma especificação de openspec/specs/ necessita de alteração de requisitos funcionais anteriores -->

## Impact

- **Banco de Dados**: `data/mult.db` recebe migração transparente `ALTER TABLE hero_content ADD COLUMN image_mobile_url TEXT DEFAULT ''` e `ALTER TABLE projects ADD COLUMN image_mobile_url TEXT DEFAULT ''`.
- **APIs**: `api/hero.php`, `api/projetos.php`, `server.js` recebem suporte ao parâmetro `image_mobile_url`.
- **Painel Admin**: `admin/index.html`, `admin/js/admin-app.js`, `admin/js/admin-hero.js`, `admin/js/admin-projetos.js`.
- **Frontend Público**: `index.html`, `js/site.js` e folhas de estilo associadas.

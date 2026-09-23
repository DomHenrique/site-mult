## ADDED Requirements

### Requirement: Organic Biomorphic Showcase Container
O container visual do projeto em destaque na seção `#projetos` SHALL utilizar silhueta orgânica biomórfica com bordas arredondadas assimétricas baseadas na identidade visual da marca Mult, rompendo com molduras retangulares de 90 graus.

#### Scenario: Visualização em desktop da silhueta fluida
- **WHEN** o usuário visualiza a seção `#projetos` em tela desktop (largura >= 1024px)
- **THEN** a imagem do projeto é exibida dentro de uma forma biomórfica orgânica assimétrica com halo de iluminação difusa atrás da imagem e sem bordas retangulares rígidas

#### Scenario: Interação de hover suave sobre a forma orgânica
- **WHEN** o usuário passa o cursor sobre a forma orgânica do projeto
- **THEN** o container realiza uma microtransição suave de curvatura e escala (`scale-105`), transmitindo dinamismo visual sem deslocamento abrupto de layout

### Requirement: Full Visual Clarity and Removal of Dark Overlay
A renderização do projeto em destaque SHALL preservar a luminosidade original da imagem e a visibilidade integral das mãos do cientista e da fita molecular, eliminando gradientes pretos sobrepostos.

#### Scenario: Exibição sem obstrução visual
- **WHEN** a imagem `engenharia-de-alimentos.jpeg` é renderizada na página
- **THEN** nenhuma máscara preta ou gradiente de escurecimento cobre a mão inferior ou a fita de DNA, mantendo os detalhes técnicos e a atmosfera clara de laboratório

### Requirement: Floating Glassmorphism Authority Badge
O visual do projeto em destaque SHALL incluir um badge flutuante translúcido em estilo glassmorphism posicionado na base externa da forma orgânica, sinalizando a autoridade técnica da Mult.

#### Scenario: Exibição do badge flutuante
- **WHEN** o card do projeto é carregado
- **THEN** um badge flutuante com fundo branco translúcido, desfoque de fundo (`backdrop-blur-md`), ícone e o texto "P&D Inovação Mult" é exibido na extremidade inferior da composição visual

### Requirement: Database and Fallback Data Alignment
Os dados do projeto em destaque no banco SQLite local (`data/mult.db`) e o fallback do cliente JavaScript (`js/site.js`) SHALL apontar para o novo ativo `assets/img/engenharia-de-alimentos.jpeg`.

#### Scenario: Carregamento a partir da API local
- **WHEN** `ApiClient.getProjects(true)` retorna o projeto em destaque do banco de dados
- **THEN** o campo `image_url` aponta para `assets/img/engenharia-de-alimentos.jpeg` e a imagem é carregada com sucesso sem erros de fallback 404

#### Scenario: Carregamento do fallback estático
- **WHEN** a requisição da API falha ou opera em modo puramente estático
- **THEN** o objeto `fallbackProject` em `js/site.js` renderiza `assets/img/engenharia-de-alimentos.jpeg` mantendo a mesma estrutura visual orgânica

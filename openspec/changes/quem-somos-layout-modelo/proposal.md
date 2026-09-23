## Why

O cliente solicitou a reestruturação da seção "Quem Somos" (`#quem-somos`) para seguir a composição visual do modelo de referência aprovado (`modelo-site.png`), que apresenta uma organização em 3 blocos horizontais: o manifesto institucional à esquerda, a tríade clássica de Missão, Visão e Valores em cards cápsula verticais ao centro, e um card de fechamento da marca à direita. Ao mesmo tempo, é essencial preservar o texto técnico, maduro e comercial da versão atual (desenvolvido para posicionar a Mult como um hub de inovação e engenharia técnica de ponta a ponta), combinando a força dos argumentos textuais existentes com o ritmo estético do novo layout.

## What Changes

- **Nova Arquitetura de Seção em 3 Blocos**:
  - **Bloco Esquerdo (Manifesto & Apresentação)**: Contém a tag institucional (`QUEM SOMOS · HUB MULT`), headline de impacto (*Conhecimento que se multiplica. Resultados que transformam.*), parágrafo manifesto institucional da Mult, chips de credibilidade (*Rigor Técnico & Compliance*, *Hub Multidisciplinar*) e link de ação para `#solucoes`.
  - **Bloco Central (Tríade Missão, Visão e Valores)**: Três cards verticais em estilo cápsula (`rounded-2xl`, fundo branco, borda sutil e sombra suave), cada um com ícone circular temático no topo, título em caixa alta e texto direto alinhando a identidade da engenharia/P&D da Mult com o modelo do cliente:
    - **MISSÃO**: Soluções técnicas aplicáveis e viabilidade industrial para o seu negócio.
    - **VISÃO**: Da ideia ao mercado com rigor metodológico, conformidade e segurança.
    - **VALORES**: Inovação com propósito, precisão científica e cooperação multidisciplinar.
  - **Bloco Direito (Card Identitário da Marca)**: Card vertical em destaque com fundo lilás suave (`bg-purple-100/60` ou gradiente sutil com borda lilás), destacando o manifesto *"Diferentes especialidades. Um mesmo propósito."* e a assinatura tipográfica *"MULT · UM HUB DE SOLUÇÕES TÉCNICAS"*.
- **Responsividade e Harmonia Visual**:
  - Desktop (`lg:`): Grid de 12 colunas distribuído harmonicamente (ex.: 4 colunas manifesto, 5 colunas para a tríade de cards e 3 colunas para o card da marca).
  - Tablet/Mobile: Quebra elegante com leitura fluida, garantindo legibilidade e espaçamentos consistentes com o design system do site.

## Capabilities

### New Capabilities
- `quem-somos-layout-modelo`: Nova arquitetura e estilização da seção institucional Quem Somos em 3 blocos harmonizando o manifesto textual da Mult com a tríade visual e o card identitário do modelo.

### Modified Capabilities
<!-- None -->

## Impact

- **Código Afetado**: `index.html` (substituição da estrutura interna de `<section id="quem-somos">`).
- **CSS / Estilização**: `css/style.css` e classes utilitárias do Tailwind já presentes no projeto.
- **Assets / Ícones**: Remix Icon (`ri-*`) já importado no projeto.

## Why

A atual seção "Quem Somos" (`#quem-somos`) sofre de fragmentação visual e problemas de legibilidade/UI: divide o espaço em 3 colunas desconexas (texto, 3 cartões tradicionais de Missão/Visão/Valores e um bloco escuro isolado com texto ilegível por falta de contraste). O conteúdo tradicional não reflete o posicionamento dinâmico de um hub moderno de soluções técnicas e engenharia. A reformulação adota um layout balanceado em 2 grandes blocos (Manifesto Institucional + Grid 2x2 com 4 capacidades técnicas práticas), conferindo autoridade, clareza e ritmo visual impecável.

## What Changes

- **Eliminação da Estrutura Fragmentada de 3 Colunas**: Substituição do grid 5/4/3 por uma composição moderna de 2 colunas harmônicas (Lado Esquerdo: Manifesto Institucional + CTA; Lado Direito: Grid 2x2 de Capacidades Técnicas).
- **Substituição dos Clichês de Missão/Visão/Valores**: Transição para 4 pilares de capacidade técnica tangível:
  1. *Engenharia & P&D* (Inovação técnica e desenvolvimento de produtos).
  2. *Conformidade & Regulatório* (Segurança jurídica, normas e compliance).
  3. *Diagnóstico & Perícia* (Solução de gargalos industriais e processos).
  4. *Hub de Especialistas* (Rede multidisciplinar sob demanda).
- **Correção Definitiva de Contraste e Ilegibilidade**: Remoção do bloco escuro apagado em prol de cards refinados em branco/vidro fosco com ícones vibrantes, badges sutis e microinterações de hover.
- **Micro-indicadores de Credibilidade e Ação**: Adição de link/botão contextualizado direcionando para as soluções detalhadas ou diagnóstico.

## Capabilities

### New Capabilities
- `quem-somos-grid-capabilities`: Nova arquitetura da seção institucional "Quem Somos" com manifesto e grid 2x2 de competências técnicas integradas.

### Modified Capabilities
<!-- None -->

## Impact

- **Código Afetado**: `index.html` (linhas ~234 a ~306 da seção `<section id="quem-somos">`).
- **CSS / Estilos**: Utilização do design system existente (Tailwind CSS, Remix Icon, paleta institucional da Mult).

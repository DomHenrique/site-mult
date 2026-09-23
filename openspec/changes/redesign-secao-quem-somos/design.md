## Context

A seção `#quem-somos` no site da Mult Engenharia precisa transmitir a robustez e modernidade do Hub de Soluções Técnicas. Atualmente, a seção utiliza um layout fragmentado de 3 colunas (texto, 3 cards de Missão/Visão/Valores e um cartão escuro isolado com problemas de contraste severos). A solução escolhida (Opção 2) unifica o layout em 2 colunas principais: Coluna Esquerda com o manifesto institucional de valor e Coluna Direita com um Grid 2x2 com as 4 competências técnicas centrais da empresa.

## Goals / Non-Goals

**Goals:**
- Proporcionar clareza, autoridade técnica e equilíbrio visual à seção "Quem Somos".
- Implementar layout de 2 colunas:
  - **Lado Esquerdo**: Eyebrow badge, título marcante (*"Conhecimento que se multiplica. Resultados que também."*), texto institucional enxuto, chips de destaque e botão de ação secundário.
  - **Lado Direito**: Grid 2x2 contendo 4 cards de alta legibilidade (fundo branco, bordas sutis em púrpura/lilás, ícone em destaque e descrição objetiva):
    1. *Engenharia & P&D* (Inovação, formulação e novos produtos).
    2. *Conformidade & Regulatório* (Adequação de processos, normas e compliance).
    3. *Diagnóstico & Perícia* (Solução de gargalos industriais e auditoria técnica).
    4. *Hub de Especialistas* (Conexão multidisciplinar de ponta sob demanda).
- Garantir 100% de contraste e legibilidade em desktop e dispositivos móveis (WCAG AAA).

**Non-Goals:**
- Não alterar as seções adjacentes (`#diagnostico`, `#solucoes`, etc.).
- Não adicionar bibliotecas pesadas de terceiros; utilizar apenas o Tailwind CSS e ícones Remix Icon já carregados na página.

## Decisions

1. **Layout em 2 Colunas (Grid 12 colunas: 5 cols esquerda / 7 cols direita ou 6 / 6)**:
   - *Decisão*: Adotar proporção `lg:grid-cols-12` com `lg:col-span-5` para o manifesto e `lg:col-span-7` para o Grid 2x2, permitindo que os 4 cards tenham espaço generoso para leitura confortável.
   - *Alternativa descartada*: Manter 3 colunas (rejeitada por gerar fragmentação e pouco espaço útil).

2. **Tipografia e Estilo dos 4 Cards 2x2**:
   - *Decisão*: Cada card com fundo branco (`bg-white`), cantos arredondados (`rounded-2xl`), bordas elegantes (`border border-purple-100/90`), sombra leve (`shadow-sm hover:shadow-md hover:border-purple-300 transition-all`), ícone temático em container lilás e micro-descrição focada no valor para a empresa cliente.

## Risks / Trade-offs

- **[Empilhamento em Telas Pequenas]** → Em mobile (< 640px), o grid 2x2 pode ficar apertado se mantiver 2 colunas.
  - *Mitigação*: Utilizar `grid-cols-1 sm:grid-cols-2` para que em telas muito pequenas os cards fiquem empilhados verticalmente com espaçamento agradável e em telas de 640px+ formem o grid 2x2.

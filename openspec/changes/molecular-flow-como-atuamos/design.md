## Context

A seção `#como-atuamos` no site da Mult Engenharia ilustra a metodologia de trabalho da empresa em 5 fases. Atualmente, a seção utiliza uma grade plana de 5 caixas retangulares (`grid-cols-5`) que não refletem dinamismo ou a identidade de engenharia/ciência do negócio. A proposta reimagina a seção como uma **Cadeia Molecular de Inovação**, onde cada etapa é um átomo interligado por ligações químicas de energia, demonstrando visualmente o fluxo do desafio inicial até a solução de mercado estável.

## Goals / Non-Goals

**Goals:**
- Criar uma cadeia molecular contínua com 5 nós atômicos (`01 Diagnóstico`, `02 Conexão`, `03 Desenvolvimento`, `04 Implementação`, `05 Resultados`).
- Em desktop, dispor os 5 nós em zigue-zague molecular suave (nós pares e ímpares levemente defasados em altura) interligados por linhas SVG de ligação covalente com gradiente roxo/lilás.
- Adicionar uma partícula de luz / elétron animado fluindo pelas ligações químicas de forma contínua para guiar a leitura.
- Construir orbes/átomos elegantes com gradientes radiais, anéis de valência sutis e ícones temáticos nítidos.
- Associar a cada átomo um card de valor em glassmorphism/branco com tipografia de alto contraste e micro-descrição focada em entregáveis.
- Garantir comportamento responsivo impecável em telas mobile através de uma coluna molecular vertical conectada.

**Non-Goals:**
- Não alterar as seções adjacentes (`#solucoes`, `#projetos`, `#equipe`).
- Não incluir bibliotecas pesadas de 3D (ex: Three.js); utilizar SVG e CSS puro para máxima performance e velocidade de carregamento (Core Web Vitals).

## Decisions

1. **SVG & CSS puro para a Linha de Conexão Molecular**:
   - *Decisão*: Utilizar um SVG responsivo com `stroke-dasharray` e animação de gradiente/partícula de pulso, permitindo que a linha se ajuste perfeitamente entre os nós em qualquer resolução de tela.
   - *Alternativa descartada*: Imagem estática PNG de fundo (rejeitada por quebrar alinhamento em diferentes tamanhos de monitor).

2. **Hierarquia e Disposição em Zigue-Zague Molecular**:
   - *Decisão*: Em telas desktop (>= 1024px), os nós 01, 03 e 05 ficam alinhados na linha inferior e os nós 02 e 04 ligeiramente elevados (ou vice-versa), criando o clássico padrão de ligação em cadeia carbônica.
   - *Alternativa descartada*: Grade reta horizontal tradicional.

3. **Design dos Nós Atômicos (Orbes)**:
   - *Decisão*: Esferas com diâmetro de 64px a 72px com gradiente `from-purple-600 to-indigo-900`, núcleo com ícone branco e anel orbital com rotação lenta no hover.

## Risks / Trade-offs

- **[Alinhamento de SVG em Mobile]** → Em telas verticais estreitas (< 640px), uma linha horizontal quebra.
  - *Mitigação*: Utilizar uma linha vertical conectora no centro em mobile, com os nós e cards empilhados de cima para baixo com visual de fita molecular contínua.

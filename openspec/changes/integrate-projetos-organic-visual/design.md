## Context

A seção de Projetos em Destaque (`#projetos`) no site institucional da Mult Serviços de Engenharia exibe dinamicamente o case de Biotecnologia & Alimentos Funcionais. No layout anterior, o componente visual era exibido dentro de uma moldura rígida retangular com múltiplas bordas (`border border-purple-100 rounded-2xl shadow-xl`), além de um overlay escuro que escondia detalhes da imagem de alta definição `engenharia-de-alimentos.jpeg`.

Após análise de UX/UI e teste comparativo de 3 abordagens no ambiente local (`test-projetos-preview.html`), a **Opção 3 (Silhueta Orgânica Fluida)** foi selecionada pelo usuário como a solução visual ideal. O design adota curvas biomórficas inspiradas no manual de marca da Mult, harmonizando a imagem científica de estúdio com o ecossistema visual do site sem aprisioná-la em caixas.

## Goals / Non-Goals

**Goals:**
- Integrar `engenharia-de-alimentos.jpeg` na seção `#projetos` utilizando a forma orgânica fluida (`shape-mult-organic`), eliminando contornos retangulares rígidos.
- Preservar a visibilidade total da imagem (incluindo as duas mãos com luvas e a fita de DNA funcional), removendo os gradientes escuros obstrutivos.
- Adicionar ambient lighting glow atrás da silhueta para criar profundidade e transição suave entre a iluminação da foto e o fundo do card/seção.
- Incorporar um selo flutuante de autoridade técnica em glassmorphism (`P&D Inovação Mult`).
- Manter o suporte a edição via Painel Administrativo (`admin/admin.js`) e sincronização com o banco SQLite local (`data/mult.db`).
- Garantir comportamento responsivo perfeito em telas mobile (< 768px), tablet e desktop.

**Non-Goals:**
- Não alterar a lógica de roteamento do backend ou do servidor Node.js/PHP.
- Não alterar a estrutura de outras seções (Hero, Quem Somos, Equipe, Contato).
- Não remover os 3 pilares técnicos de conteúdo (Desenvolvimento, Saúde, Sustentabilidade).

## Decisions

### 1. Curva Biomórfica com `border-radius` em Percentuais Complexos
- **Decisão**: Utilizar `border-radius: 38% 62% 55% 45% / 48% 44% 56% 52%` (com microtransição hover para `46% 54% 48% 52% / 54% 50% 50% 46%`).
- **Justificativa**: Conforme especificado na seção 2.3 de `IDENTIDADE_VISUAL_E_ARQUITETURA.md`, a marca Mult utiliza formas orgânicas/blobs para quebrar a rigidez de blocos corporativos. Isso transforma uma foto estática em um ativo vivo e integrado.
- **Alternativas consideradas**:
  - *Máscara radial alfa pura (Opção 1)*: Excelente fluidez, porém menos proprietária da identidade da marca do que a silhueta orgânica.
  - *Monolítico Bleed lateral (Opção 2)*: Estilo editorial que mantém cantos retos na esquerda, menos dinâmico que a silhueta fluida.

### 2. Halo de Luz Difusa e Gradiente de Fusão
- **Decisão**: Posicionar uma camada absoluta atrás da forma orgânica com `bg-gradient-to-tr from-purple-500/20 via-sky-400/20 to-emerald-400/10` e `blur-2xl scale-105 pointer-events-none`.
- **Justificativa**: A imagem tem fundo de estúdio em cinza-azulado claro. O halo conecta essa tonalidade com o roxo característico da Mult e o verde ESG, eliminando qualquer aresta e conferindo brilho premium.

### 3. Badge Técnico Flutuante em Glassmorphism
- **Decisão**: Posicionar um badge flutuante sutil (`px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md text-xs font-extrabold text-purple-950 shadow-xl border border-purple-100`) na base inferior direita.
- **Justificativa**: Substitui a pesada caixa escura anterior por um elemento aerodinâmico que destaca "P&D Inovação Mult" sem encobrir partes importantes da imagem.

### 4. Sincronização com SQLite e Fallback de Dados
- **Decisão**: Atualizar o registro da tabela `projects` em `data/mult.db` para apontar `image_url` para `assets/img/engenharia-de-alimentos.jpeg` e manter o fallback no `site.js` sincronizado.
- **Justificativa**: Garante consistência em tempo de execução tanto quando os dados vêm da API do SQLite quanto no fallback estático offline.

## Risks / Trade-offs

- **[Risco] Aspect Ratio em Telas Pequenas (< 640px)** → *Mitigação*: No mobile, a forma orgânica adota `max-w-[320px] aspect-square sm:aspect-[4/5] mx-auto` para manter o ponto focal centralizado sobre a fita de DNA sem ocupar espaço vertical excessivo.
- **[Risco] Tamanho da Imagem Original (2.2MB)** → *Mitigação*: Copiar a imagem para `assets/img/` e utilizar renderização otimizada com dimensões controladas e `loading="lazy"`, mantendo a nitidez sem degradar o LCP da página.

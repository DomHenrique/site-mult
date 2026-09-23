## Context

A seção `#equipe` do site institucional da Mult Engenharia precisa apresentar as especialistas técnicas (as "Multiplicadoras") com autoridade, sofisticação e dinamismo. Inspirando-se no modelo de alta performance do projeto `linktree-gridd360`, implementaremos um **Carrossel 3D de Perspectiva Espacial**, utilizando o tema **Dark Imersivo (Opção A)** personalizado com a paleta oficial da Mult (*Deep Violet Navy* `#1D0B44`, *Vibrant Violet* `#6600CC` e reflexos translúcidos), e com o logotipo/link oficial do LinkedIn em cada card.

## Goals / Non-Goals

**Goals:**
- **Carrossel 3D com Perspectiva Espacial**: Implementação nativa via CSS 3D (`perspective: 1200px`, `transform-style: preserve-3d`) e JavaScript leve, sem dependência de bibliotecas externas pesadas (como Swiper ou Three.js).
- **Ambientação Dark Imersiva (Opção A)**: Seção com fundo degradê escuro (`#1D0B44` a `#150634`), malha geométrica sutil (`brand-bg-grid`), e iluminação ambiente violeta.
- **Card Imersivo Vertical de Alto Impacto**: Cards com 420px–460px de altura, foto de corpo/busto em alta definição, degradê inferior para leitura nítida, selo superior de multiplicadora, pílula de especialidade, nome destacado, bio e botão/logo oficial do LinkedIn.
- **Interatividade Completa**: Loop contínuo com auto-rotação a cada 3.5s, pausa inteligente ao passar o mouse (`mouseenter`/`mouseleave`), clique em cards laterais para focar no centro e ajuste responsivo para telas móveis (< 640px).
- **Integração Dinâmica com SQLite & Admin**: O carrossel é alimentado diretamente pela rota `api/equipe.php` e sincronizado com o painel `/admin`, permitindo adicionar, editar ou ordenar membros em tempo real.

**Non-Goals:**
- Alterar o schema da tabela `team_members` (a estrutura existente já possui `name`, `role`, `bio`, `photo_url`, `linkedin_url`, `display_order`, `is_active`).
- Depender de bibliotecas de terceiros externas para o efeito 3D.

## Decisions

### 1. CSS 3D Nativo + Motor Matemático Circular em JS
- **Decisão**: Usar CSS 3D (`transform: translateX(...) scale(...) rotateY(...)`) acionado por uma função `updateCarousel()` em `js/site.js`.
- **Alternativas**: Swiper.js (efeito coverflow padrão com dependência externa) ou Three.js (peso excessivo de bundle).
- **Razão**: Zero dependências adicionais, 60 FPS com aceleração de hardware pela GPU, peso ínfimo (< 2KB de JS) e controle total das cores da Mult.

### 2. Identidade Visual Dark Imersiva (Opção A)
- **Decisão**: Seção com fundo escuro profundo (`#1D0B44` e `#150634`), anéis com brilho neon violeta (`ring-purple-500/80 shadow-[0_20px_60px_rgba(102,0,204,0.4)]`) no card central e malha de pontos suaves.
- **Alternativas**: Fundo claro com cards escuros flutuantes (Opção B).
- **Razão**: Escolha aprovada pelo usuário, gerando forte contraste de prestígio e valor estético premium.

### 3. Integração do Selo Oficial do LinkedIn
- **Decisão**: Cada card terá um botão glassmorphism translúcido com o ícone oficial `ri-linkedin-box-fill` no azul característico `#0077B5`, texto "Ver LinkedIn" e link seguro com `target="_blank" rel="noopener noreferrer"`.
- **Razão**: Atende expressamente ao pedido do usuário ("mantendo a identidade e logo linkedin"), gerando credibilidade profissional instantânea.

### 4. Responsividade Mobile com Delimitação de Deslocamento
- **Decisão**: Em telas `< 640px`, o offset lateral diminui de `±190px` para `±110px`, com escala reduzida para 0.82, garantindo que o card central fique 100% visível e os laterais sirvam como pistas visuais sem causar rolagem horizontal indesejada no smartphone.

## Risks / Trade-offs

- **[Membro sem URL de LinkedIn cadastrada]** → Renderizar botão desabilitado ou omitir de forma elegante sem quebrar o layout do card.
- **[Carregamento de fotos pesadas]** → Usar `loading="lazy"` nas imagens dos cards e fallback `onerror="this.src='assets/logo/mult-icon-color.png'"`.
- **[Poucos membros cadastrados (< 3)]** → O motor matemático circular ajusta os índices e duplica virtualmente ou centraliza sem estourar referências de array.

## Context

A seção "Quem Somos" (`#quem-somos`) foi refatorada para aderência máxima ao modelo de referência visual do projeto. A seção é dividida em **6 colunas**:
1. **Bloco de Texto (2 colunas = 2/6)**: Label limpo "QUEM SOMOS", título impactante com quebra harmoniosa, parágrafo institucional direto e botão pílula sólido `CONHEÇA A MULT ->` ancorando para `#solucoes`.
2. **Bloco de Ícones (4 colunas = 4/6)**: 3 cards sem moldura integrando diretamente o fundo lilás da seção (`bg-[#EFE9F6]`), contendo círculos brancos destacados com borda suave e ícones em roxo profundo, títulos em caixa alta e textos curtos. Divisores verticais sutis separam os elementos no desktop.

O quarto card lateral ("Diferentes especialidades..."), os chips auxiliares e o link de texto secundário foram removidos para proporcionar uma seção extremamente limpa, focada e elegante.

## Goals / Non-Goals

**Goals:**
- Proporção exata de 2/6 para texto e 4/6 para os ícones no grid desktop.
- 3 cards sem moldura (sem fundo retangular branco ou bordas de cartão), integrando perfeitamente a seção.
- Iconografia refinada e temática: Diamante (Geramos Valor), Alvo/Dart (Desenvolvemos Produtos) e Foguete (Impulsionamos Negócios).
- Remover o bloco textual lateral do último card e os chips inferiores para garantir leveza e clareza visual.
- 100% responsivo para mobile, tablet e desktop widescreen.

**Non-Goals:**
- Não alterar outras seções da página.
- Não carregar bibliotecas externas pesadas adicionais.

## Decisions

### 1. Distribuição de Colunas no Grid Desktop
- `grid grid-cols-1 lg:grid-cols-6 gap-10 lg:gap-12 items-center`
- Bloco Esquerdo: `lg:col-span-2 space-y-5 lg:pr-6`
- Bloco Direito: `lg:col-span-4 lg:border-l lg:border-purple-200/80 lg:pl-10` com subgrid `grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-purple-200/70 text-center`

### 2. Tríade de Ícones Integrados
- **GERAMOS VALOR**: Ícone de Diamante/Gema, título em caixa alta e texto "Soluções aplicáveis para o seu negócio."
- **DESENVOLVEMOS PRODUTOS**: Ícone de Alvo/Target, título em caixa alta e texto "Da ideia ao mercado com segurança."
- **IMPULSIONAMOS NEGÓCIOS**: Ícone de Foguete/Rocket, título em caixa alta e texto "Inovação com propósito."
- Estrutura dos ícones: círculos brancos `w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-purple-200/90 shadow-sm`.

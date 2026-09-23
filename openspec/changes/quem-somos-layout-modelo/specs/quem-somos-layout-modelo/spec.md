## ADDED Requirements

### Requirement: Layout Tripartite da Seção Quem Somos
A seção institucional Quem Somos (`#quem-somos`) SHALL ser organizada em 3 blocos horizontais interligados no desktop: Bloco Manifesto (esquerda), Tríade de Cards Institucionais (centro) e Brand Card Identitário (direita).

#### Scenario: Visualização em tela desktop
- **WHEN** o usuário acessa o site em uma tela de desktop (largura igual ou superior a 1024px)
- **THEN** a seção Quem Somos exibe o manifesto à esquerda, a tríade de Missão, Visão e Valores no centro, e o card de propósito da Mult à direita em um grid alinhado e equilibrado.

#### Scenario: Visualização em dispositivos móveis
- **WHEN** o usuário visualiza a seção em uma tela móvel ou tablet
- **THEN** o conteúdo é reorganizado verticalmente de forma legível e sem quebras de layout ou sobreposição de textos.

### Requirement: Tríade de Cards de Missão, Visão e Valores
A seção Quem Somos SHALL conter três cards em formato de cápsula arredondada correspondentes a Missão, Visão e Valores, contendo ícone circular temático no topo, título em caixa alta e texto explicativo com linguagem técnica e assertiva.

#### Scenario: Renderização dos cards de Missão, Visão e Valores
- **WHEN** a seção é renderizada na página
- **THEN** são apresentados o card MISSÃO ("Soluções técnicas aplicáveis e viabilidade industrial para o seu negócio"), o card VISÃO ("Da ideia ao mercado com rigor científico, conformidade e segurança") e o card VALORES ("Inovação com propósito, precisão metodológica e cooperação multidisciplinar").

#### Scenario: Interação com os cards
- **WHEN** o cursor do mouse passa sobre qualquer um dos cards da tríade
- **THEN** o card responde com suave elevação de sombra e sutil realce no container do ícone.

### Requirement: Brand Card Institucional
A seção Quem Somos SHALL exibir no bloco direito um card com identidade visual lilás contendo a declaração de propósito da marca e a assinatura tipográfica da Mult.

#### Scenario: Conteúdo do brand card
- **WHEN** o brand card é renderizado
- **THEN** ele exibe a mensagem "Diferentes especialidades. Um mesmo propósito." acompanhada pelo bloco de destaque "MULT · UM HUB DE SOLUÇÕES TÉCNICAS".

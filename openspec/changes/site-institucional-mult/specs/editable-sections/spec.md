## ADDED Requirements

### Requirement: Seção Hero Dinâmica
O sistema SHALL carregar e exibir os dados da seção Hero dinamicamente a partir do banco de dados local, incluindo: eyebrow/tagline, título principal (H1), subtítulo, texto e link do botão CTA, imagem em destaque, selo caligráfico de efeito e os 4 badges dos pilares técnicos.

#### Scenario: Carregamento do Hero com dados personalizados
- **WHEN** a página inicial é acessada
- **THEN** os textos, imagem da fundadora, selo caligráfico e badges do Hero correspondem aos dados cadastrados no banco local.

#### Scenario: Fallback com dados padrão caso o banco esteja vazio
- **WHEN** não houver registro prévio de Hero no banco
- **THEN** o sistema exibe os dados padrão estabelecidos na identidade visual do projeto sem quebra de layout.

### Requirement: Seção Projetos em Destaque Dinâmica
O sistema SHALL carregar e renderizar os projetos marcados como destaque no banco de dados local, exibindo título, categoria, descrição resumida, imagem do projeto, até 3 tags de pilares e botão de ação.

#### Scenario: Renderização dos projetos ativos
- **WHEN** a seção de projetos em destaque é carregada
- **THEN** o sistema renderiza os projetos ativos ordenados pelo campo de ordem de exibição (`display_order`).

### Requirement: Seção Equipe Mult (Nossas Multiplicadoras) Dinâmica
O sistema SHALL carregar e renderizar os membros da equipe cadastrados no banco local, apresentando foto profissional, nome, cargo ou especialidade técnica, bio breve e link para o perfil do LinkedIn.

#### Scenario: Apresentação da rede de consultoras
- **WHEN** o usuário visualiza a seção Nossas Multiplicadoras
- **THEN** os cards da equipe são exibidos com foto recortada, nome, especialidade e ícone clicável do LinkedIn.

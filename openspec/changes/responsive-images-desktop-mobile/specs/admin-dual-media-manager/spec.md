## ADDED Requirements

### Requirement: Painel de Upload com Comparação Visual Lado a Lado (Grid Duplo)
O painel administrativo SHALL fornecer uma interface de **Comparação Visual (Grid Duplo)** nos módulos de edição da seção Hero e Projetos em Destaque, exibindo dois slots simultâneos e independentes: um para a versão Desktop e outro para a versão Mobile.

#### Scenario: Edição de Mídias do Hero no Painel
- **WHEN** o administrador abre o módulo de edição da Hero
- **THEN** a interface exibe lado a lado o slot Desktop (proporção 16:9, com miniaturas e badge de dimensão) e o slot Mobile (proporção 4:5 ou 1:1, com miniaturas e badge de validação).

#### Scenario: Edição de Mídias de Projeto no Painel
- **WHEN** o administrador abre o modal de criação ou edição de um projeto
- **THEN** a interface exibe os campos de upload e URL para Desktop e Mobile com diretrizes de proporção adequadas a cada visualização.

#### Scenario: Pré-visualização Instantânea e Validação de Dimensões
- **WHEN** o usuário seleciona um arquivo de imagem em qualquer um dos slots ou insere uma URL
- **THEN** a miniatura é atualizada instantaneamente e um badge dinâmico exibe a largura, altura, peso e status de recomendação da proporção.

### Requirement: Banner de Orientação para Acessos Móveis no Painel Administrativo
O painel administrativo SHALL exibir um banner superior informativo quando acessado a partir de dispositivos móveis ou telas estreitas (largura menor que 1024px), orientando o usuário a utilizar um computador para uma melhor experiência de navegação e precisão nos uploads.

#### Scenario: Exibição do Aviso em Dispositivo Móvel
- **WHEN** o painel administrativo (`/admin/index.html`) é carregado em uma tela com largura inferior a 1024px
- **THEN** um banner informativo destacado com ícone de computador e mensagem amigável é exibido no topo da interface.

#### Scenario: Ocultação do Aviso em Monitores Desktop
- **WHEN** o painel administrativo é visualizado em monitores com largura igual ou superior a 1024px
- **THEN** o banner informativo permanece oculto através de classes responsivas (`lg:hidden`).

#### Scenario: Fechamento Voluntário do Banner pelo Usuário
- **WHEN** o usuário clica no botão de fechar (dismiss) do banner informativo
- **THEN** o banner é recolhido da tela durante a sessão atual sem interromper a navegação no painel.

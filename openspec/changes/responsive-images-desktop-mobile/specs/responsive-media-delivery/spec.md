## ADDED Requirements

### Requirement: Renderização Responsiva da Imagem da Seção Hero
O site institucional SHALL renderizar a imagem principal da seção Hero através da tag semântica `<picture>`, servindo a imagem mobile específica (`image_mobile_url`) em telas com largura de até 768px (`media="(max-width: 768px)"`) e a imagem desktop (`image_url`) em resoluções superiores.

#### Scenario: Visualização do Hero em Smartphone
- **WHEN** o usuário acessa o site utilizando um dispositivo com largura de viewport de até 768px
- **THEN** o navegador carrega e renderiza a imagem definida em `image_mobile_url`, preservando a composição vertical (4:5 ou 1:1) sem corte de textos caligráficos ou moldura.

#### Scenario: Visualização do Hero em Desktop
- **WHEN** o usuário acessa o site em um monitor ou tela com largura superior a 768px
- **THEN** o navegador carrega a imagem definida em `image_url`, apresentando a composição widescreen 16:9 harmônica com as colunas de texto.

#### Scenario: Fallback Automático na Ausência de Imagem Mobile no Hero
- **WHEN** a seção Hero for carregada e o campo `image_mobile_url` estiver vazio ou não cadastrado
- **THEN** o elemento `<picture>` utiliza automaticamente a imagem desktop (`image_url`) em ambos os viewports sem apresentar falhas de carregamento.

### Requirement: Renderização Responsiva de Imagens de Projetos em Destaque
O site institucional SHALL renderizar as imagens dos cards de projetos através do elemento `<picture>`, alternando entre a versão mobile (`image_mobile_url`) orientada horizontalmente para cards empilhados e a versão desktop (`image_url`) orientada verticalmente para a coluna lateral do card.

#### Scenario: Visualização de Projeto em Smartphone
- **WHEN** a seção de projetos em destaque é visualizada em um dispositivo com viewport de até 768px
- **THEN** o card renderiza a imagem mobile com proporção horizontal adequada à largura total da coluna empilhada.

#### Scenario: Visualização de Projeto em Desktop
- **WHEN** a seção de projetos em destaque é visualizada em desktop (`lg:grid-cols-12`)
- **THEN** o card renderiza a imagem desktop na coluna lateral (`lg:col-span-5`), mantendo altura mínima e alinhamento visual com o bloco de conteúdo.

#### Scenario: Fallback Automático em Cards de Projeto
- **WHEN** um projeto não possuir valor para `image_mobile_url`
- **THEN** o card exibe a imagem principal cadastrada em `image_url` tanto em desktop quanto em dispositivos móveis.

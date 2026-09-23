## ADDED Requirements

### Requirement: Enquadramento Ancorado à Direita no Desktop
O elemento de imagem do Hero Carousel (`.hero-slide img`) SHALL utilizar `object-position: right center` em visualizações de desktop (viewport > 768px), ancorando os elementos visuais à direita e absorvendo o corte de largura à esquerda em telas com largura inferior a 1920px.

#### Scenario: Visualização em notebooks e telas comuns de desktop
- **WHEN** um usuário acessa o site em um monitor ou notebook com largura entre 1024px e 1536px
- **THEN** a imagem do slide mantém seu alinhamento ancorado na extremidade direita da tela, mantendo as 3 especialistas técnicas e produtos visíveis integralmente sem corte lateral.

#### Scenario: Visualização em monitores estendidos ou ultrawide
- **WHEN** um usuário acessa o site em telas de 1920px ou superiores
- **THEN** a imagem preenche todo o container proporcionalmente sem cortes nos elementos visuais principais.

### Requirement: Preservação do Alinhamento Central no Mobile
Em telas de dispositivos móveis com largura de até 768px (`@media (max-width: 768px)`), o elemento de imagem do Hero Carousel SHALL manter `object-position: center center`.

#### Scenario: Visualização em smartphones
- **WHEN** um usuário acessa o site em dispositivo móvel (largura <= 768px)
- **THEN** a imagem mobile cadastrada (1080×1080) é exibida de forma centralizada mantendo proporção de aspecto e enquadramento das pessoas/produtos.

## ADDED Requirements

### Requirement: Multi-Banner Hero Carousel Rendering
O sistema SHALL renderizar a seção Hero como um carrossel dinâmico composto por até 3 banners ativos, apresentando transição suave do tipo crossfade, rotação automática com intervalo de 5 a 6 segundos e pausa automática quando o cursor estiver sobre o slide ou durante interação por toque.

#### Scenario: Carregamento inicial do carrossel
- **WHEN** o visitante acessa a página inicial do site
- **THEN** o primeiro banner ativo é exibido imediatamente com prioridade de carregamento (`fetchpriority="high"`), com os indicadores de navegação sincronizados e os controles de avanço/retrocesso visíveis.

#### Scenario: Rotação automática e navegação manual
- **WHEN** o visitante aguarda o tempo de intervalo sem interagir ou clica nas setas de navegação / pílulas indicadoras
- **THEN** o carrossel transiciona de forma suave em fade para o próximo banner, atualizando a pílula ativa e mantendo os textos e CTAs totalmente legíveis.

#### Scenario: Navegação por gestos em dispositivos móveis
- **WHEN** o usuário em dispositivo móvel ou tablet realiza um gesto de arrastar para o lado (swipe horizontal)
- **THEN** o carrossel reconhece o movimento e avança para o próximo banner (swipe para a esquerda) ou retorna para o banner anterior (swipe para a direita).

### Requirement: Hybrid Display Modes (Overlay vs Full Creative)
O sistema SHALL suportar dois modos distintos de exibição configuráveis individualmente para cada banner através do parâmetro `show_text_overlay`.

#### Scenario: Banner com modo Overlay Dinâmico
- **WHEN** um banner possui `show_text_overlay = true`
- **THEN** o slide exibe a imagem fotográfica de fundo coberta por uma camada gradiente de contraste e projeta dinamicamente o badge/eyebrow, título principal, subtítulo explicativo e botão de chamada para ação (CTA) com link personalizado.

#### Scenario: Banner com modo Arte Gráfica Completa
- **WHEN** um banner possui `show_text_overlay = false`
- **THEN** o slide omite as caixas de texto sobrepostas e renderiza a imagem criativa em sangria total (full bleed), envelopando todo o slide com link clicável caso uma URL de redirecionamento esteja configurada.

### Requirement: Responsive Multi-Device Images
O sistema SHALL servir imagens otimizadas e diferenciadas para Desktop e Mobile através do elemento HTML semântico `<picture>`.

#### Scenario: Visualização em Desktop (telas > 768px)
- **WHEN** o site é visualizado em monitor ou tela ampla
- **THEN** o navegador carrega a imagem do banner Desktop em formato panorâmico imponente com altura de aproximadamente 580px e proporção widescreen (`1920 × 580 px`).

#### Scenario: Visualização em Mobile (telas <= 768px)
- **WHEN** o site é visualizado em smartphone ou tela estreita
- **THEN** o elemento `<source media="(max-width: 768px)">` aciona a versão Mobile do banner, mantendo proporção quadrada (`1080 × 1080 px` 1:1) ou vertical (`1080 × 1350 px` 4:5), sem deformações ou cortes dos elementos essenciais.

### Requirement: Banners Management API
O backend SHALL prover endpoints REST para listagem pública de banners ativos e operações administrativas autenticadas de criação, atualização, ordenação e exclusão.

#### Scenario: Consulta pública de banners ativos
- **WHEN** uma requisição `GET` é enviada para `/api/banners.php`
- **THEN** o servidor retorna um payload JSON contendo a lista dos banners com `is_active = 1`, ordenados por `display_order ASC`.

#### Scenario: Criação ou atualização de banner por administrador autenticado
- **WHEN** um usuário autenticado envia uma requisição `POST` ou `PUT` para `/api/banners.php` com os dados do banner
- **THEN** o servidor valida os campos obrigatórios (imagem e ordem), persiste os dados no banco SQLite e retorna status de sucesso com o registro atualizado.

### Requirement: Admin Panel Banner Interface
O Painel Administrativo (`/admin`) SHALL disponibilizar uma interface dedicada para gerenciar os banners da seção Hero.

#### Scenario: Administrador configura banners e realiza upload duplo
- **WHEN** o administrador acessa a aba "Banners do Hero" no painel
- **THEN** a interface lista os banners cadastrados com miniaturas Desktop e Mobile, botões de status (ativo/inativo), ordenação, e formulário com upload inteligente de imagens validando peso e dimensões recomendadas.

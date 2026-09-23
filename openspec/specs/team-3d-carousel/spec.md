# team-3d-carousel Specification

## Purpose
TBD - created by archiving change equipe-carrossel-3d. Update Purpose after archive.
## Requirements
### Requirement: Carrossel 3D de Perspectiva com Rotação Espacial
A seção `#equipe` SHALL implementar um viewport com perspectiva 3D (`perspective: 1200px`) e track espacial (`transform-style: preserve-3d`), posicionando os cards em órbita circular contínua.

#### Scenario: Visualização inicial do carrossel 3D
- **WHEN** o usuário rola a página até a seção `#equipe`
- **THEN** o card central fica em escala máxima (`scale: 1.0`, `rotateY: 0deg`), os cards laterais imediatos ficam inclinados a `12deg` com opacidade 0.7 e deslocamento de `±190px`, e os cards externos ficam a `22deg` com deslocamento de `±370px`.

#### Scenario: Transição circular ao auto-rotacionar
- **WHEN** o timer de rotação atinge 3.5 segundos sem interação do usuário
- **THEN** os cards realizam uma transição tridimensional suave com aceleração por hardware GPU (`transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1)`), avançando para o próximo especialista.

### Requirement: Identidade Dark Imersiva e Malha Texturizada Mult
A seção `#equipe` SHALL adotar a ambientação *Dark Imersiva (Opção A)*, utilizando degradê profundo oficial da Mult (`#1D0B44` para `#150634`), malha geométrica sutil (`brand-bg-grid`) e iluminação ambiente violeta.

#### Scenario: Destaque visual do card ativo
- **WHEN** um card está na posição central (ativo)
- **THEN** o card recebe contorno neon violeta (`ring-2 ring-purple-500/80`) e sombra volumétrica profunda (`shadow-[0_20px_60px_rgba(102,0,204,0.4)]`), contrastando intensamente com o fundo escuro da seção.

### Requirement: Cards Imersivos com Botão Oficial do LinkedIn
Cada card de especialista SHALL exibir foto vertical de corpo/busto em alta definição (altura de 420px a 460px), degradê inferior para leitura tipográfica, selo superior, pílula translúcida com a especialidade, nome destacado, mini-bio e o botão oficial do LinkedIn.

#### Scenario: Exibição e clique no selo LinkedIn
- **WHEN** o usuário visualiza o card e clica no botão do LinkedIn
- **THEN** o sistema abre a página de perfil profissional da especialista em nova aba (`target="_blank" rel="noopener noreferrer"`), exibindo o ícone oficial `ri-linkedin-box-fill` e cor azul `#0077B5`.

### Requirement: Controles Interativos e Suporte Mobile
O carrossel SHALL responder a interações de mouse, clique direto nos cards e redimensionamento de janela.

#### Scenario: Pausa no hover do mouse
- **WHEN** o usuário posiciona o cursor do mouse sobre o container do carrossel
- **THEN** a rotação automática é imediatamente pausada para permitir leitura confortável do texto ou clique no link.

#### Scenario: Foco direto por clique
- **WHEN** o usuário clica em qualquer card visível nas laterais
- **THEN** aquele card é rotacionado imediatamente para a posição central de foco, reiniciando o ciclo de rotação.

#### Scenario: Exibição responsiva em smartphone
- **WHEN** a página é carregada em telas menores que 640px de largura
- **THEN** os deslocamentos laterais dos cards vizinhos são ajustados para `±110px` com escala reduzida para 0.82, prevenindo estouro de tela ou scroll horizontal indesejado.

### Requirement: Renderização Dinâmica e Sincronização com SQLite
A lista de especialistas do carrossel 3D SHALL ser carregada dinamicamente via `api/equipe.php` e renderizada pelo cliente JavaScript `js/site.js`.

#### Scenario: Sincronização com o painel administrativo
- **WHEN** um administrador adiciona, altera foto ou atualiza a ordem de uma especialista pelo painel `/admin`
- **THEN** a seção `#equipe` do site carrega imediatamente os novos dados da API e recria o carrossel 3D perfeitamente funcional.


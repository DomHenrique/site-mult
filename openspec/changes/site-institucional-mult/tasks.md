## 1. Estrutura Base e Assets

- [x] 1.1 Criar a árvore de diretórios do projeto (`admin/`, `api/`, `assets/`, `css/`, `data/`, `js/`, `uploads/`)
- [x] 1.2 Organizar os assets de logotipo oficiais (PNGs transparentes, SVGs e Favicons) no diretório `assets/logo/`
- [x] 1.3 Configurar fontes Google Fonts (`Plus Jakarta Sans`, `Inter`, `Caveat`) e base CSS

## 2. Banco de Dados Local e Segurança

- [x] 2.1 Criar script de conexão PDO SQLite (`api/config.php`) com criação automática das tabelas (`users`, `hero_content`, `projects`, `team_members`, `leads_contact`)
- [x] 2.2 Inserir sementes iniciais (seed) com usuário SuperAdmin padrão e dados fiéis ao layout de referência (`modelo-site.png`)
- [x] 2.3 Proteger o diretório `data/` com arquivo `.htaccess` impedindo download direto do banco via HTTP

## 3. Endpoints da API REST Local

- [x] 3.1 Implementar `api/auth.php` (login com verificação bcrypt, geração de token de sessão, verificação e logout)
- [x] 3.2 Implementar `api/hero.php` (GET público e PUT autenticado para administradores)
- [x] 3.3 Implementar `api/projetos.php` (GET público e CRUD autenticado para gestão de projetos em destaque)
- [x] 3.4 Implementar `api/equipe.php` (GET público e CRUD autenticado para gestão das multiplicadoras da equipe)
- [x] 3.5 Implementar `api/usuarios.php` (CRUD restrito exclusivamente a administradores com perfil `superadmin`)
- [x] 3.6 Implementar `api/upload.php` (upload seguro de mídias para a pasta local `uploads/` com validação de tipo e tamanho)
- [x] 3.7 Implementar `api/contato.php` (recepção e armazenamento de leads enviados pelo formulário do site)

## 4. Desenvolvimento da Landing Page Institucional

- [x] 4.1 Construir o Header fixo responsivo com logotipo oficial, links de navegação e botão CTA "FALE COM A MULT" direcionado ao formulário
- [x] 4.2 Estruturar o HTML semântico da seção Hero com slots dinâmicos e os 4 pilares técnicos (Qualidade, SST, ESG, Social)
- [x] 4.3 Desenvolver a seção "Quem Somos" com posicionamento institucional e cards de Missão, Visão e Valores
- [x] 4.4 Desenvolver a seção interativa de diagnóstico "Em que momento está o seu projeto?" com 3 opções de encaminhamento
- [x] 4.5 Desenvolver a seção de Soluções com os 5 cards temáticos escuros e badges personalizadas
- [x] 4.6 Desenvolver a seção "Como a Mult Atua" com o fluxo em 5 etapas sequenciais
- [x] 4.7 Estruturar o container dinâmico para a seção "Projetos em Destaque"
- [x] 4.8 Estruturar o container dinâmico para a seção "Nossas Multiplicadoras" (Equipe Mult)
- [x] 4.9 Desenvolver a seção "Seja um Multiplicador" com chamada para novos consultores
- [x] 4.10 Desenvolver a seção de formulário de contato com campos completos e 3 selos de garantia
- [x] 4.11 Desenvolver o Rodapé completo com dados de contato, redes sociais e notas legais

## 5. Dinamização Frontend e Integração

- [x] 5.1 Criar o cliente JavaScript `js/api-client.js` para consumo padronizado das rotas da API
- [x] 5.2 Implementar `js/site.js` para renderizar dinamicamente o Hero, Projetos e Equipe a partir do banco local
- [x] 5.3 Integrar o envio assíncrono do formulário de contato com validação de campos, feedback visual de envio e scroll suave

## 6. Painel Administrativo SPA (`/admin`)

- [x] 6.1 Desenvolver a tela de autenticação moderna `admin/login.html` com suporte a feedback de erro
- [x] 6.2 Desenvolver a casca da SPA administrativa `admin/index.html` com sidebar expansível e controle de rotas
- [x] 6.3 Implementar controle de permissões por perfil (ocultar menu e bloquear módulo de Usuários para editores comuns)
- [x] 6.4 Implementar módulo de edição da seção Hero (`admin/js/admin-hero.js`) com preview e upload de foto
- [x] 6.5 Implementar módulo de Projetos em Destaque (`admin/js/admin-projetos.js`) com listagem, criação, edição e exclusão
- [x] 6.6 Implementar módulo de Membros da Equipe (`admin/js/admin-equipe.js`) com upload de foto e link do LinkedIn
- [x] 6.7 Implementar módulo de Gestão de Usuários (`admin/js/admin-usuarios.js`) exclusivo para SuperAdmin
- [x] 6.8 Implementar visualização dos leads recebidos no dashboard administrativo

## 7. Verificação e Testes Finais

- [x] 7.1 Testar responsividade em dispositivos móveis, tablets e desktop
- [x] 7.2 Testar fluxo completo de login, troca de perfil e restrição de acesso SuperAdmin vs Usuário
- [x] 7.3 Testar upload de imagens reais e persistência nos diretórios locais
- [x] 7.4 Testar submissão do formulário de contato e verificação da gravação no banco SQLite

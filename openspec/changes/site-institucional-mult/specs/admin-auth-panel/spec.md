## ADDED Requirements

### Requirement: Autenticação Segura de Administradores
O painel administrativo SHALL exigir autenticação via login e senha em `/admin/login.html`, validando as credenciais contra a tabela `users` utilizando verificação de hash bcrypt e gerando token de sessão persistido no storage local do navegador.

#### Scenario: Login com credenciais válidas
- **WHEN** o usuário informa e-mail e senha corretos na tela de login
- **THEN** o sistema autentica a sessão, armazena o token e redireciona para o dashboard em `/admin/index.html`.

#### Scenario: Tentativa de login com senha incorreta
- **WHEN** o usuário informa credenciais incorretas
- **THEN** o sistema recusa o acesso e exibe mensagem amigável de erro sem expor detalhes internos.

### Requirement: Controle de Permissões (SuperAdmin vs Usuário)
O sistema SHALL implementar controle de acesso baseado em papéis (RBAC):
- **SuperAdmin**: possui acesso ao gerenciamento de usuários (criar novos usuários, alterar papéis, redefinir senhas, ativar/desativar) e a todas as seções de conteúdo.
- **Usuário / Editor**: possui acesso apenas à edição de Hero, Projetos e Equipe, sem permissão para acessar o módulo de Usuários.

#### Scenario: Usuário comum tenta acessar gestão de usuários
- **WHEN** um usuário com perfil `user` tenta acessar ou fazer chamadas para o módulo de usuários
- **THEN** a interface oculta a opção no menu e a API recusa a operação com código HTTP 403 Forbidden.

#### Scenario: SuperAdmin cadastra novo usuário
- **WHEN** o SuperAdmin preenche os dados de um novo membro com nome, e-mail, senha e perfil
- **THEN** o novo usuário é inserido no banco com a senha devidamente criptografada.

### Requirement: Módulos de Gestão de Conteúdo no Painel
O painel administrativo SHALL fornecer interfaces visuais amigáveis para:
1. **Editor de Hero**: formulário para edição dos textos, upload da foto da fundadora e dos badges dos pilares;
2. **Gerenciador de Projetos**: listagem, criação, edição, exclusão e reordenação de projetos com upload de imagem;
3. **Gerenciador de Equipe**: listagem, criação, edição, exclusão e reordenação de membros da equipe com upload de foto de perfil.

#### Scenario: Atualização dos dados do Hero
- **WHEN** o administrador edita os campos do Hero e clica em salvar
- **THEN** o sistema grava as alterações no banco de dados e exibe notificação visual de sucesso.

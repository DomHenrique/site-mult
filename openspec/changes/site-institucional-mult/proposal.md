## Why

A Mult Serviços de Engenharia necessita de um site institucional de alto padrão visual e autoridade técnica para apresentar seu posicionamento como hub de especialistas multidisciplinares (qualidade, SST, ESG e química/alimentos). O projeto adota a arquitetura modular e performática do projeto Kastelo Lite, substituindo o backend de nuvem proprietária (Supabase) por um banco de dados simples e storage local no próprio servidor, com painel administrativo seguro para atualização autônoma das seções vitais do site.

## What Changes

- **Landing Page Institucional Completa**: Desenvolvimento de página de alta conversão estruturada conforme o layout oficial (`modelo-site.png`) e identidade visual extraída do logotipo (`Mult _LOGO.pdf`), eliminando seções marcadas para exclusão ("Nossas Soluções Digitais").
- **Header Fixo com Ação Direta**: Menu de navegação completo com logotipo em alta definição e botão CTA "Fale com a Mult" direcionando com scroll suave ao formulário de contato.
- **Seções Dinâmicas Editáveis**:
  - **Section Hero**: Textos, badges, botão CTA, imagem/destaque e selo caligráfico editáveis via admin.
  - **Projetos em Destaque**: Gestão completa de casos de sucesso com imagens, pilares científicos e links de ação.
  - **Equipe Mult (Nossas Multiplicadoras)**: Gestão de especialistas com foto, nome, cargo/especialidade e perfil do LinkedIn.
- **Backend Local com SQLite e Storage de Arquivos**:
  - API REST leve e autônoma em PHP/PDO ou Node.js com banco de dados SQLite local (`data/mult.db`).
  - Upload e armazenamento de imagens diretamente no diretório do servidor (`uploads/`), sem necessidade de provedores externos de bucket.
- **Painel Administrativo com Controle de Acesso**:
  - Ambiente administrativo SPA moderno em `/admin`.
  - Perfis de acesso diferenciados: **SuperAdmin** (gestão de usuários, senhas e configurações) e **Usuário/Editor** (gestão operacional de conteúdo).
  - Autenticação nativa com criptografia de senhas (bcrypt) e tokens de sessão.
- **Captação de Contato e Leads**:
  - Formulário com campos estruturados (Nome, E-mail, Telefone/WhatsApp, Empresa, Momento do Projeto, Mensagem).
  - Armazenamento local de contatos para acompanhamento comercial.

## Capabilities

### New Capabilities
- `institucional-landing`: Interface visual completa e responsiva do site institucional, incluindo header, hero, quem somos, diagnóstico interativo, soluções técnicas, fluxo de atuação, seja multiplicador e rodapé.
- `editable-sections`: Mecanismo de carregamento e sincronização dinâmica das seções Hero, Projetos em Destaque e Equipe Mult.
- `local-backend-storage`: Camada de API REST local, banco SQLite e gestão de uploads de arquivos no servidor.
- `admin-auth-panel`: Painel administrativo SPA com controle de acesso baseado em cargos (SuperAdmin vs Usuário) e módulos de edição.
- `contact-leads`: Sistema de captura, validação e registro de leads de contato originados do site.

### Modified Capabilities
<!-- Sem capacidades anteriores para modificar (novo projeto) -->

## Impact

- **Arquitetura**: Sistema 100% autônomo e portátil, compatível com servidores web tradicionais (Apache/cPanel com PHP e SQLite) e VPS.
- **Segurança**: Proteção de diretórios sensíveis (`data/`), hash seguro de credenciais e sanitização de uploads.
- **Performance**: Carregamento instantâneo por ser Vanilla HTML/CSS/JS otimizado, sem dependências pesadas de frontend.

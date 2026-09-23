## Context

O projeto do site institucional da Mult Serviços de Engenharia precisa combinar alta autoridade técnica, design premium contemporâneo e extrema facilidade de manutenção. Inspirado na estrutura modular e no dinamismo do projeto Kastelo Lite, este projeto substitui qualquer dependência de serviços pagos em nuvem (como Supabase) por uma arquitetura local leve e autônoma, armazenando dados em SQLite e mídias no próprio sistema de arquivos do servidor.

## Goals / Non-Goals

**Goals:**
- Implementar a Landing Page Institucional 100% responsiva seguindo fielmente a identidade visual e o layout de referência (`modelo-site.png`).
- Integrar os logotipos oficiais vetoriais e de alta definição gerados a partir do `Mult _LOGO.pdf`.
- Prover um cabeçalho fixo com navegação suave e botão de chamada ("Fale com a Mult") direcionado ao formulário de conversão.
- Desenvolver um backend REST leve em PHP com SQLite PDO (`data/mult.db`) e upload local (`uploads/`), sem necessidade de containers complexos ou serviços de nuvem.
- Desenvolver um painel administrativo SPA em `/admin` com autenticação local segura e suporte a perfis **SuperAdmin** e **Usuário/Editor**.
- Permitir edição dinâmica no painel para as 3 seções especificadas: **Hero**, **Projetos em Destaque** e **Equipe Mult**.
- Fornecer sistema de captura de leads via formulário com validação e armazenamento no banco local.

**Non-Goals:**
- Desenvolver área pública de blog ou notícias (fora do escopo inicial).
- Integrar gateway de pagamento ou e-commerce (o foco é serviços consultivos de engenharia).
- Incluir a seção "Nossas Soluções Digitais" (marcada explicitamente como excluída no mockup original).

## Decisions

### 1. Stack do Frontend: HTML5 Semântico + Tailwind CSS + Vanilla JS
- **Decisão:** Manter a mesma abordagem do Kastelo Lite (Tailwind CSS moderno para estilização ágil e consistente, combinado com Vanilla JavaScript modular e sem overhead de frameworks pesados).
- **Justificativa:** Carregamento ultra-rápido, excelente pontuação em Core Web Vitals (LCP/INP), compatibilidade total com cPanel/Apache e facilidade de manutenção.
- **Alternativas consideradas:** React/Next.js (descartado por adicionar complexidade de build, servidor Node persistente e dependências desnecessárias para uma landing page).

### 2. Backend Local: PHP 8 + SQLite PDO
- **Decisão:** Desenvolver endpoints REST leves em PHP 8 utilizando SQLite nativo via PDO (`data/mult.db`).
- **Justificativa:** Funciona imediatamente no cPanel da Gridd (`griddmkt360.com.br`) e em servidores Apache/Nginx convencionais sem necessidade de banco MySQL remoto, portas adicionais ou containers. O SQLite mantém a base em um único arquivo portátil com alta velocidade e confiabilidade para o tráfego institucional.
- **Alternativas consideradas:** Supabase (descartado a pedido expresso do cliente por custos e dependência de nuvem); MySQL tradicional (viável, mas requer configuração prévia de base e usuário via cPanel, enquanto o SQLite auto-inicializa a base na primeira execução).

### 3. Armazenamento Local de Mídias (`uploads/`)
- **Decisão:** Upload de fotos (hero, projetos, equipe) gravadas no diretório local `uploads/` com nomes únicos baseados em hash/timestamp e sanitização de extensão.
- **Justificativa:** Independência total de buckets S3/Supabase Storage, permitindo backups completos do site via FTP.
- **Alternativas consideradas:** Cloudinary / Supabase Storage (descartados para manter autonomia local).

### 4. Modelo de Autenticação e Perfis: SuperAdmin vs Usuário
- **Decisão:** Autenticação baseada em sessão/token JWT com senhas criptografadas com `password_hash(..., PASSWORD_BCRYPT)`.
  - **SuperAdmin:** Acesso total (criação, edição, desativação de usuários do painel e gestão de todo o conteúdo).
  - **Usuário / Editor:** Acesso restrito aos módulos de conteúdo (Hero, Projetos em Destaque, Equipe Mult), sem permissão para acessar o módulo de Usuários.
- **Justificativa:** Atende perfeitamente ao requisito de delegação segura de tarefas de edição para a equipe Mult sem comprometer as credenciais mestras do sistema.

### 5. Seções Dinâmicas x Seções Estáticas
- **Decisão:** As seções **Hero**, **Projetos em Destaque** e **Equipe Mult** são alimentadas via API REST e editáveis pelo painel. Seções como Quem Somos, Diagnóstico do Momento, Como Atuamos e Seja um Multiplicador mantêm seu conteúdo base no HTML para máxima performance de SEO, podendo ser atualizadas estruturalmente quando necessário.
- **Justificativa:** Evita queries e requisições desnecessárias para conteúdos que são estáticos por natureza, focando o dinamismo no que a empresa precisa alterar com frequência (campanhas, projetos e consultores).

## Risks / Trade-offs

- **[Risco] Permissão de escrita nas pastas `data/` e `uploads/` no cPanel** → **Mitigação:** O script de inicialização e a documentação garantirão que as pastas tenham permissões corretas (`755` ou `775`), e o diretório `data/` será blindado com `.htaccess` contra acesso público via browser.
- **[Risco] Upload de arquivos maliciosos** → **Mitigação:** Endpoint de upload valida tipo MIME real do arquivo (`image/jpeg`, `image/png`, `image/webp`, `image/svg+xml`), limita tamanho máximo (5MB) e renomeia o arquivo com hash aleatório.
- **[Risco] Exclusão acidental de registros pelo editor** → **Mitigação:** Confirmação por modal antes de exclusões e soft-delete / status ativo nas tabelas principais.

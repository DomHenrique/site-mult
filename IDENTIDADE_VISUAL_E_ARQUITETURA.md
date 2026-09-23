# Documento de Identidade Visual e Arquitetura do Projeto
## Site Institucional Mult Serviços de Engenharia

---

## 1. Visão Geral do Projeto

O projeto consiste no desenvolvimento do **Site Institucional de Alta Conversão da Mult Serviços de Engenharia** (`Mult`), inspirado na arquitetura SPA / modular do projeto **Kastelo Lite**, porém com uma evolução essencial solicitada:
* **Banco de dados local e independente** (sem dependência de serviços externos de nuvem paga como Supabase/Firebase);
* **Storage local** para upload de imagens e mídias diretamente no sistema de arquivos do servidor (pasta `uploads/`);
* **Painel Administrativo Completo** com controle de permissões por perfil (**SuperAdmin** e **Usuário/Editor**);
* **Seções dinâmicas e editáveis em tempo real**:
  1. **Section Hero** (textos, badges, botão CTA, imagem/destaque);
  2. **Projetos em Destaque** (título, categoria, descrição, imagens, tags de pilares e links de ação);
  3. **Equipe Mult / Nossas Multiplicadoras** (nome, cargo/especialidade, bio, foto, LinkedIn e ordem de exibição).
* **Header fixo/moderno com navegação fluida e botão direto para o formulário de contato**.

---

## 2. Identidade Visual da Marca

Os padrões visuais foram rigorosamente extraídos do arquivo vetorial `Mult _LOGO.pdf` e do layout de referência `modelo-site.png`.

### 2.1 Paleta de Cores Oficial

| Aplicação | Cor | Hex | RGB / HSL | Uso no Layout |
| :--- | :--- | :--- | :--- | :--- |
| **Mult Primary Dark (Deep Violet / Navy)** | ![#1D0B44](https://via.placeholder.com/15/1D0B44/000000?text=+) | `#1D0B44` | `rgb(29, 11, 68)` | Títulos principais (H1, H2), backgrounds escuros, botões primários |
| **Mult Brand Violet (Logo Principal)** | ![#6600CC](https://via.placeholder.com/15/6600CC/000000?text=+) | `#6600CC` | `rgb(102, 0, 204)` | Destaque do logo (letra "M"), gradientes, ícones e estados de foco |
| **Mult Secondary Violet / Indigo** | ![#4C1D95](https://via.placeholder.com/15/4C1D95/000000?text=+) | `#4C1D95` | `rgb(76, 29, 149)` | Gradiente de botões, cards de soluções, destaques secundários |
| **Mult Soft Lilac (Backgrounds Claras)** | ![#F7F5FC](https://via.placeholder.com/15/F7F5FC/000000?text=+) | `#F7F5FC` | `rgb(247, 245, 252)` | Fundo de seções alternadas (Quem Somos, Formulário) |
| **Mult Tint Border** | ![#E5DEFF](https://via.placeholder.com/15/E5DEFF/000000?text=+) | `#E5DEFF` | `rgba(102, 0, 204, 0.12)` | Linhas divisórias, bordas de cards e inputs |
| **ESG & Sustentabilidade (Acento Verde)** | ![#10B981](https://via.placeholder.com/15/10B981/000000?text=+) | `#10B981` | `rgb(16, 185, 129)` | Ícone e detalhes do pilar Meio Ambiente & ESG |
| **Texto Base / Neutro Escuro** | ![#1E293B](https://via.placeholder.com/15/1E293B/000000?text=+) | `#1E293B` | `rgb(30, 41, 59)` | Textos longos, parágrafos |
| **Texto Secundário / Slate** | ![#64748B](https://via.placeholder.com/15/64748B/000000?text=+) | `#64748B` | `rgb(100, 116, 139)` | Legendas, metadados, breadcrumbs |
| **Branco Puro** | ![#FFFFFF](https://via.placeholder.com/15/FFFFFF/000000?text=+) | `#FFFFFF` | `rgb(255, 255, 255)` | Fundo de cards, texto sobre roxo |

### 2.2 Tipografia

* **Títulos & Headlines:** `Plus Jakarta Sans` ou `Outfit` (Pesos: 700 Bold, 800 ExtraBold).
  * Expressa sofisticação técnica, precisão e autoridade corporativa em engenharia.
* **Corpo & Parágrafos:** `Inter` (Pesos: 400 Regular, 500 Medium, 600 SemiBold).
  * Excelente legibilidade em telas e interfaces administrativas.
* **Tipografia Caligráfica / Destaques Emocionais (Watermarks & Selos):** `Caveat` ou `Dancing Script` (Itálico cursivo moderno).
  * Utilizado para as frases de efeito: *"Conhecimento que multiplica"*, *"Do conhecimento a um futuro mais saudável."*, *"Seja muito bem-vinda à sua nova jornada!"*.

### 2.3 Estilo Visual e Elementos Gráficos

* **Formas Orgânicas (Blobs / Curvas):** O design utiliza contornos curvos suaves e orgânicos em degradê roxo/violeta atrás das fotos dos especialistas, rompendo a rigidez dos blocos tradicionais.
* **Botões Pill (Arredondados):** Botões com bordas 100% arredondadas (`rounded-full`), fundo roxo escuro com gradiente sutil, texto branco em caixa alta e ícone de seta (`→`).
* **Microinterações:** Hover com leve elevação (`translate-y-[-2px]`), brilho sutil e sombras suaves (`shadow-lg shadow-purple-900/10`).

---

## 3. Logotipos Extraídos (`Mult _LOGO.pdf`)

Os vetores e imagens de alta definição foram extraídos do arquivo PDF da marca e organizados no diretório `assets/logo/`:

| Arquivo | Formato | Dimensões | Descrição |
| :--- | :--- | :--- | :--- |
| `assets/logo/mult-logo-color.png` | PNG Transparente | 3600 x 1299 px | Logotipo completo oficial colorido (Letra M roxa gradiente + 'ult' azul marinho + slogan "Serviços de Engenharia") |
| `assets/logo/mult-logo-horizontal.png` | PNG Transparente | 3604 x 722 px | Versão horizontal para headers compactos |
| `assets/logo/mult-logo-white.png` | PNG Transparente | 3600 x 1299 px | Versão negativa branca para fundos escuros e rodapé |
| `assets/logo/mult-icon-color.png` | PNG Transparente | 1760 x 1658 px | Símbolo isolado (M gradiente) para ícone de app e favicon |
| `assets/logo/mult-icon-white.png` | PNG Transparente | 1760 x 1658 px | Símbolo isolado monocromático branco |
| `assets/logo/favicon.png` | PNG | 64 x 64 px | Favicon para navegadores |
| `assets/logo/favicon-32x32.png` | PNG | 32 x 32 px | Favicon padrão 32px |
| `assets/logo/page_1.svg` a `page_10.svg` | SVG Vetorial | Vetorial Puro | Vetores de todas as 10 variações do manual |

---

## 4. Mapeamento Estrutural das Seções do Site

Com base no estudo do layout `modelo-site.png`:

```
┌────────────────────────────────────────────────────────────────────────┐
│ [HEADER / NAVBAR]                                                      │
│ Logo Mult  │  Quem Somos · Soluções · Como Atuamos · Especialistas...  │  [FALE COM A MULT →]
├────────────────────────────────────────────────────────────────────────┤
│ [SECTION 1: HERO] (EDITÁVEL NO ADMIN)                                  │
│ Tagline: ENGENHARIA · CIÊNCIA · INOVAÇÃO · SUSTENTABILIDADE            │  [Foto Taiana Franco]
│ H1: Soluções técnicas para um futuro mais saudável.                    │  "Conhecimento que
│ Subtítulo + Botão [FALE SOBRE SEU PROJETO →]                          │   multiplica RESULTADOS"
│ ────────────────────────────────────────────────────────────────────── │
│ Badges: ⚗️ Qualidade & Inovação | 👷 Segurança | 🍃 ESG | 👥 Social    │
├────────────────────────────────────────────────────────────────────────┤
│ [SECTION 2: QUEM SOMOS] (ESTÁTICO / INSTITUCIONAL)                    │
│ "Conhecimento que se multiplica. Resultados que também."               │
│ 3 Cards Centrais: MISSÃO · VISÃO · VALORES                             │
│ Card Lateral: "Diferentes especialidades. Um mesmo propósito."         │
├────────────────────────────────────────────────────────────────────────┤
│ [SECTION 3: DIAGNÓSTICO / MOMENTO DO CLIENTE]                          │
│ "Em que momento está o seu projeto? A Mult pode te ajudar."            │
│ 3 Cards Interativos: [Quero Criar] · [Preciso Melhorar] · [Adequar]   │
├────────────────────────────────────────────────────────────────────────┤
│ [SECTION 4: SOLUÇÕES E ESPECIALISTAS]                                  │
│ "Da estratégia à implementação"                                        │
│ 5 Cards Temáticos Escuros:                                             │
│ 1. Qualidade & Inovação  2. Segurança do Trabalho  3. Meio Ambiente    │
│ 4. Responsabilidade Social  5. Diagnóstico & Soluções Complexas        │
├────────────────────────────────────────────────────────────────────────┤
│ [SECTION 5: COMO A MULT ATUA - FLUXO]                                  │
│ "Você traz o desafio. Nós conectamos o conhecimento."                  │
│ 5 Etapas: 01 Diagnóstico → 02 Conexão → 03 Desenv. → 04 Impl. → 05 Res │
├────────────────────────────────────────────────────────────────────────┤
│ [SECTION 6: PROJETOS EM DESTAQUE] (EDITÁVEL NO ADMIN)                  │
│ "Conheça uma nova categoria de alimento funcional"                     │
│ Imagem do projeto + 3 pilares (Desenvolvimento, Saúde, Sustentabilidade│
│ Botão [SAIBA MAIS SOBRE O PROJETO →]                                   │
├────────────────────────────────────────────────────────────────────────┤
│ [SECTION 7: EXCLUÍDA CONFORME INDICAÇÃO DO LAYOUT]                     │
│ ❌ "Nossas Soluções Digitais" (Marcada explicitamente para remoção)    │
├────────────────────────────────────────────────────────────────────────┤
│ [SECTION 8: NOSSAS MULTIPLICADORAS / EQUIPE] (EDITÁVEL NO ADMIN)       │
│ "Mulheres que multiplicam conhecimento."                               │
│ Grid de cards: Foto, Nome, Especialidade/Cargo, LinkedIn               │
├────────────────────────────────────────────────────────────────────────┤
│ [SECTION 9: SEJA UM MULTIPLICADOR]                                     │
│ "Seu conhecimento pode multiplicar resultados."                        │
│ Banner de recrutamento de especialistas + Botão [QUERO SER MULT. →]    │
├────────────────────────────────────────────────────────────────────────┤
│ [SECTION 10: FORMULÁRIO DE CONTATO / CONVERSÃO]                        │
│ "Vamos impulsionar o seu negócio?"                                     │
│ Form: Nome, E-mail, WhatsApp, Segmento, Momento do Projeto, Mensagem   │
│ 3 Selos de Confiança: Atendimento · Confidencialidade · Resultados     │
├────────────────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                               │
│ Logo Mult + Links rápidos + Contatos: contato@mult.eng.br / WhatsApp   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Arquitetura Técnica: Comparativo Kastelo Lite vs Mult Engenharia

| Componente | Projeto Referência (Kastelo Lite) | Projeto Mult Engenharia (Novo) | Benefício para a Mult |
| :--- | :--- | :--- | :--- |
| **Front-end** | HTML5 + Tailwind CSS + Vanilla JS | HTML5 + Tailwind CSS + Vanilla JS | Carregamento ultrarrápido, compatibilidade universal e visual premium |
| **Banco de Dados** | Supabase (PostgreSQL em Nuvem) | **SQLite Local (`data/mult.db`)** | 100% autônomo, sem custos de API, zero dependências de nuvem externa |
| **Uploads de Mídia** | Supabase Storage Bucket | **Storage Local no Servidor (`uploads/`)** | Imagens salvas diretamente no servidor, backup direto via FTP |
| **Controle de Usuários** | Supabase Auth (Admin/Editor) | **Auth Nativo (SuperAdmin + Usuário)** | Autenticação com senhas criptografadas (bcrypt) e tokens de sessão/JWT |
| **Módulos do Admin** | Produtos, Categorias, Banners, Depoimentos | **Hero, Projetos, Equipe Mult, Usuários** | Painel focado 100% nas necessidades reais da engenharia consultiva |
| **Hospedagem** | cPanel (Hospedagem Web Estática / FTP) | **cPanel (Apache + PHP 8 + SQLite)** | Funciona nativamente no cPanel do cliente sem necessidade de container ou daemon |

---

## 6. Modelo do Banco de Dados Local (SQLite)

```sql
-- Tabela de Usuários Administrativos
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('superadmin', 'user')),
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela da Seção Hero (Configuração Dinâmica)
CREATE TABLE hero_content (
    id INTEGER PRIMARY KEY DEFAULT 1,
    eyebrow TEXT DEFAULT 'ENGENHARIA • CIÊNCIA • INOVAÇÃO • SUSTENTABILIDADE',
    title TEXT NOT NULL,
    subtitle TEXT,
    button_text TEXT DEFAULT 'FALE SOBRE SEU PROJETO',
    button_link TEXT DEFAULT '#contato',
    image_url TEXT,
    script_accent TEXT DEFAULT 'Conhecimento que multiplica RESULTADOS',
    author_name TEXT DEFAULT 'Taiana Franco',
    author_role TEXT DEFAULT 'Fundadora da Mult',
    badge_1_text TEXT DEFAULT 'QUALIDADE & INOVAÇÃO',
    badge_2_text TEXT DEFAULT 'SEGURANÇA DO TRABALHO',
    badge_3_text TEXT DEFAULT 'MEIO AMBIENTE & ESG',
    badge_4_text TEXT DEFAULT 'RESPONSABILIDADE SOCIAL',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Projetos em Destaque
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT,
    description TEXT NOT NULL,
    image_url TEXT,
    tag_1_title TEXT,
    tag_1_desc TEXT,
    tag_2_title TEXT,
    tag_2_desc TEXT,
    tag_3_title TEXT,
    tag_3_desc TEXT,
    action_button_text TEXT DEFAULT 'SAIBA MAIS SOBRE O PROJETO',
    action_button_link TEXT,
    is_featured INTEGER DEFAULT 1,
    display_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Membros da Equipe / Multiplicadoras
CREATE TABLE team_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    photo_url TEXT,
    linkedin_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Leads / Mensagens do Formulário de Contato
CREATE TABLE leads_contact (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    project_moment TEXT,
    message TEXT,
    status TEXT DEFAULT 'novo' CHECK(status IN ('novo', 'em_atendimento', 'concluido')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 7. Estrutura de Diretórios Recomendada

```
site-mult-engenharia/
├── admin/                         # Painel de Gestão Administrativo (SPA)
│   ├── index.html                 # Dashboard administrativo com sidebar moderna
│   ├── login.html                 # Tela de login segura
│   ├── css/
│   │   └── admin.css              # Estilos do painel (tema dark glassmorphism)
│   └── js/
│       ├── admin-app.js           # Gerenciamento de rotas e modais SPA
│       ├── admin-auth.js          # Sessão, login, verificação de SuperAdmin
│       ├── admin-hero.js          # Editor da seção Hero
│       ├── admin-projetos.js      # CRUD e reordenação de Projetos
│       ├── admin-equipe.js        # CRUD e reordenação de Especialistas
│       └── admin-usuarios.js      # Gestão de SuperAdmin e Usuários comuns
├── api/                           # API REST leve em PHP com SQLite
│   ├── config.php                 # Conexão PDO SQLite e inicialização das tabelas
│   ├── auth.php                   # Endpoints de login, logout e verificação
│   ├── hero.php                   # GET público / PUT admin
│   ├── projetos.php               # GET público / CRUD admin
│   ├── equipe.php                 # GET público / CRUD admin
│   ├── usuarios.php               # CRUD restrito para SuperAdmin
│   ├── upload.php                 # Upload seguro de imagens para /uploads/
│   └── contato.php                # Recepção e registro dos leads do formulário
├── assets/
│   ├── logo/                      # Logotipos SVG, PNG e Favicons extraídos
│   ├── img/                       # Imagens institucionais (mockup, vetores)
│   └── icons/                     # Ícones vetoriais dos pilares
├── css/
│   └── style.css                  # Estilos complementares e animações
├── data/
│   └── mult.db                    # Banco de dados SQLite local protegido (.htaccess)
├── js/
│   ├── site.js                    # Script principal do site (carregamento dinâmico, animações)
│   └── api-client.js              # Cliente JS para consumo da API local
├── uploads/                       # Armazenamento local de mídias enviadas pelo painel
├── index.html                     # Landing Page Principal completa
├── modelo-site.png                # Referência visual original aprovada
└── Mult _LOGO.pdf                 # Manual de identidade visual original
```

---

## 8. Considerações de Segurança e Boas Práticas

1. **Proteção do Banco de Dados (`data/`):** Arquivo `.htaccess` na pasta `data/` bloqueando download direto do arquivo `mult.db`.
2. **Hash de Senhas:** Utilização de `password_hash()` com algoritmo padrão `PASSWORD_BCRYPT`.
3. **Validação de Uploads:** Validação de MIME types permitidos (JPEG, PNG, WEBP, SVG) e limite máximo de tamanho de arquivo.
4. **Hierarquia de Permissões:**
   * **SuperAdmin:** Pode gerenciar usuários do sistema (criar, redefinir senhas, ativar/desativar), além de editar Hero, Projetos e Equipe.
   * **Usuário / Editor:** Pode editar Hero, Projetos em Destaque e Equipe, sem acesso ao módulo de Usuários.

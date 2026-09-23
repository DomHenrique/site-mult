## Context

Atualmente, o site institucional da Mult e o painel de administração operam com um único campo de mídia (`image_url`) nas seções Hero e Projetos em Destaque. Monitores desktop widescreen (16:9 ou 21:9) e smartphones (4:5 ou 9:16) exigem composições visuais opostas. O uso de uma única imagem resulta em:
1. **Hero**: No desktop, a imagem precisa ser panorâmica (16:9) com espaço para texto e grafismos. No mobile, essa mesma imagem fica ilegível ou tem suas bordas e moldura cortadas ao se aplicar `object-cover`.
2. **Projetos**: No desktop, a imagem compõe uma coluna lateral vertical (`col-span-5` com proporção ~4:5). No mobile, o card empilha verticalmente e a imagem torna-se um banner horizontal panorâmico (`w-full` com proporção ~16:9).
3. **Painel Admin**: Editores que acessam o painel em celulares encontram limitações de visualização para manipular proporções e conferir recortes, o que demanda uma recomendação explícita de uso de desktop.

## Goals / Non-Goals

**Goals:**
- Permitir upload e armazenamento independente de imagem Desktop (`image_url`) e imagem Mobile (`image_mobile_url`) para as seções Hero e Projetos.
- Renderizar as imagens no frontend utilizando a tag semântica `<picture>` com `<source media="(max-width: 768px)">`.
- Garantir fallback automático e transparente: caso a versão mobile não seja informada, a versão desktop é usada sem quebras de layout.
- Implementar no painel administrativo uma interface de **Comparação Visual (Grid Duplo Lado a Lado)** com pré-visualização proporcional e badges em tempo real.
- Exibir um aviso amigável no topo do painel administrativo para usuários acessando via dispositivos móveis recomendando o uso de computador para edição de mídias.
- Manter 100% de compatibilidade com os dados e banco SQLite existentes (`data/mult.db`).

**Non-Goals:**
- Criação de ferramenta interna de corte/crop manual via canvas no navegador (o administrador faz o upload dos arquivos já ajustados nas proporções indicadas).
- Bloqueio forçado ou redirecionamento do acesso mobile ao painel admin (o aviso orienta, mas não impede ações pontuais).
- Modificação no fluxo de fotos dos membros da equipe (os cards de consultoras já utilizam a proporção portrait 3:4 tanto em desktop quanto mobile).

## Decisions

### 1. Renderização no Frontend: Tag Semântica `<picture>` vs JavaScript Resize Listener
- **Decisão**: Utilizar `<picture>` com `<source media="(max-width: 768px)" srcset="...">` e fallback `<img>`.
- **Alternativas consideradas**:
  - *JS resize listener*: Adiciona overhead de processamento, causa Cumulative Layout Shift (CLS) e atrasa o Largest Contentful Paint (LCP).
  - *CSS classes condicionais (`hidden md:block` e `block md:hidden` com duas tags `<img>`)*: Faz com que alguns navegadores façam o download de ambas as imagens simultaneamente, gastando o dobro de dados no celular.
- **Vantagem**: O elemento `<picture>` é processado no parser HTML primário do navegador, que baixa estritamente a imagem do viewport correto antes mesmo da execução de scripts.

### 2. Interface de Upload no Admin: Grid Duplo Lado a Lado vs Abas (Tabs)
- **Decisão**: Adotar **Grid Duplo Lado a Lado** (Comparação Visual direta).
- **Alternativas consideradas**:
  - *Tabs alternáveis*: Economizariam espaço vertical, mas esconderiam a discrepância visual entre as duas proporções, induzindo o editor a erros de composição.
- **Vantagem**: Ao visualizar os dois slots simultaneamente, o usuário compreende de imediato a diferença de enquadramento (ex: Hero 16:9 widescreen vs 4:5 vertical).

### 3. Migração do Schema SQLite: Adição de Coluna com Detecção Automática
- **Decisão**: Executar migração incremental segura via PHP PDO e Node.js (`ALTER TABLE ... ADD COLUMN image_mobile_url TEXT DEFAULT ''`).
- **Alternativas consideradas**:
  - *Recriação de tabelas*: Exigiria dump e restore com risco de perda de registros já cadastrados.
- **Vantagem**: Operação instantânea no SQLite, mantendo os registros já existentes intactos com valor padrão vazio.

### 4. Banner de Orientação Mobile no Painel Admin
- **Decisão**: Banner de topo informativo (`lg:hidden`) com ícone de computador e mensagem de recomendação de produtividade, permitindo fechamento (dismiss) por sessão.
- **Alternativas consideradas**:
  - *Modal bloqueante*: Frustraria o usuário que só precisa alterar uma senha ou um texto urgente pelo celular.
- **Vantagem**: Conscientiza sobre a melhor experiência sem limitar a acessibilidade.

## Architecture & Diagrams

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FLUXO DE DADOS RESPONSIVO                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ [ PAINEL ADMIN ]                                                            │
│ ┌─────────────────────────────┐    ┌─────────────────────────────┐          │
│ │ Slot Desktop (16:9 ou 4:5)  │    │ Slot Mobile (4:5 ou 16:9)   │          │
│ └──────────────┬──────────────┘    └──────────────┬──────────────┘          │
│                │                                  │                         │
│                ▼                                  ▼                         │
│         /api/upload.php                    /api/upload.php                  │
│                │                                  │                         │
│                ▼                                  ▼                         │
│         uploads/hero_desk.webp             uploads/hero_mob.webp            │
│                │                                  │                         │
│                └────────────────┬─────────────────┘                         │
│                                 ▼                                           │
│                [ POST/PUT /api/hero.php | /api/projetos.php ]               │
│                                 │                                           │
│                                 ▼                                           │
│                 SQLite DB (hero_content / projects)                         │
│                 • image_url                                                 │
│                 • image_mobile_url                                          │
│                                 │                                           │
│ ┌───────────────────────────────┴───────────────────────────────┐           │
│ │ [ FRONTEND SITE INSTITUCIONAL ]                               │           │
│ │                                                               │           │
│ │ <picture>                                                     │           │
│ │   <source media="(max-width: 768px)" srcset="hero_mob.webp">  │           │
│ │   <img src="hero_desk.webp" class="object-cover ...">         │           │
│ │ </picture>                                                    │           │
│ └───────────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Risks / Trade-offs

- **[Risco]** Editor esquecer de enviar a imagem mobile e a seção ficar vazia.  
  → **Mitigação**: Fallback automático a nível de API e de renderização no template (`p.image_mobile_url || p.image_url`).

- **[Risco]** Falha na execução do `ALTER TABLE` em bases existentes se o script rodar múltiplas vezes.  
  → **Mitigação**: Checagem de colunas existentes via `PRAGMA table_info` antes de emitir a instrução de alteração no SQLite.

- **[Risco]** Invasão visual do banner mobile no admin atrapalhar a leitura em telas pequenas.  
  → **Mitigação**: Design compacto, botão sutil de fechar (*dismiss*) e exibição estrita a telas menores que 1024px (`lg:hidden`).

## Migration Plan

1. Executar migração automática do banco SQLite via `api/config.php` e `server.js` adicionando `image_mobile_url`.
2. Atualizar endpoints `api/hero.php`, `api/projetos.php` e `server.js` para persistência e retorno do novo campo.
3. Atualizar scripts do painel (`admin-hero.js`, `admin-projetos.js`, `admin-app.js`) com o grid duplo e o banner mobile em `admin/index.html`.
4. Atualizar o frontend (`index.html` e `js/site.js`) para utilizar `<picture>`.
5. Validação cruzada em emulação móvel (390px) e desktop (1440px).

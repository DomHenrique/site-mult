## ADDED Requirements

### Requirement: Esquema de Banco de Dados com Suporte a Mídias Multi-Dispositivo
O banco de dados SQLite local (`data/mult.db`) SHALL possuir as colunas `image_mobile_url` nas tabelas `hero_content` e `projects`, garantindo persistência isolada das imagens para desktop e mobile sem perda de retrocompatibilidade.

#### Scenario: Migração Automática e Segura de Tabelas Existentes
- **WHEN** o backend da aplicação (seja PHP PDO ou Node.js) é inicializado
- **THEN** o sistema verifica a estrutura das tabelas `hero_content` e `projects` e adiciona a coluna `image_mobile_url` caso ainda não esteja presente, sem apagar nenhum dado existente.

#### Scenario: Criação de Nova Base de Dados a Partir do Zero
- **WHEN** a aplicação é implantada em um ambiente sem banco de dados prévio
- **THEN** as tabelas `hero_content` e `projects` são criadas com as colunas `image_url` e `image_mobile_url` desde sua definição inicial.

### Requirement: Endpoints de API para Persistência e Recuperação de Mídias Móveis
Os endpoints de API para Hero (`api/hero.php`) e Projetos (`api/projetos.php`, bem como o servidor Node de desenvolvimento `server.js`) SHALL aceitar, validar, persistir e retornar o campo `image_mobile_url` em suas operações de leitura e escrita.

#### Scenario: Consulta aos Dados do Hero
- **WHEN** uma requisição GET é realizada para `api/hero.php`
- **THEN** o JSON de resposta inclui as propriedades `image_url` e `image_mobile_url`.

#### Scenario: Atualização dos Dados do Hero
- **WHEN** uma requisição POST ou PUT é submetida a `api/hero.php` com o campo `image_mobile_url`
- **THEN** o valor é gravado no registro da tabela `hero_content` e confirmado com código HTTP 200.

#### Scenario: Gestão Completa de Projetos com Mídia Mobile
- **WHEN** um projeto é criado ou atualizado via `api/projetos.php` informando `image_url` e `image_mobile_url`
- **THEN** ambos os caminhos de imagem são persistidos e retornados corretamente nas listagens e consultas individuais.

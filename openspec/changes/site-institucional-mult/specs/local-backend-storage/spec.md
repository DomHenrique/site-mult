## ADDED Requirements

### Requirement: Banco de Dados SQLite Local
O backend SHALL utilizar um banco de dados SQLite local localizado em `data/mult.db` via PDO PHP, inicializando automaticamente o esquema de tabelas (`users`, `hero_content`, `projects`, `team_members`, `leads_contact`) e inserindo um SuperAdmin inicial e os dados padrão do layout se o banco não existir.

#### Scenario: Inicialização automática do banco
- **WHEN** a aplicação ou endpoint da API é executado pela primeira vez
- **THEN** o arquivo `data/mult.db` é criado com todas as tabelas, índices e sementes iniciais sem intervenção manual.

### Requirement: Proteção de Acesso ao Banco Local
O sistema SHALL impedir acesso direto e download do arquivo de banco `data/mult.db` a partir do navegador web via arquivo de configuração de segurança `.htaccess`.

#### Scenario: Tentativa de acesso direto via HTTP
- **WHEN** um usuário tenta acessar `http://dominio/data/mult.db` via navegador
- **THEN** o servidor web retorna código de erro HTTP 403 Forbidden.

### Requirement: Armazenamento Local de Mídias
O endpoint de upload SHALL permitir o envio de arquivos de imagem (JPEG, PNG, WEBP, SVG) de até 5MB, salvando-os no diretório local `uploads/` com nome único e seguro gerado pelo servidor, retornando o caminho público da imagem salva.

#### Scenario: Upload bem-sucedido de imagem
- **WHEN** um administrador autenticado envia um arquivo de imagem válido via formulário multipart
- **THEN** o arquivo é salvo no diretório `uploads/` e a API retorna status 200 com a URL relativa da imagem.

#### Scenario: Rejeição de arquivo inválido ou malicioso
- **WHEN** é submetido um arquivo com extensão ou MIME type não permitido (ex: .php, .exe, .sh)
- **THEN** o sistema rejeita o upload retornando código de erro HTTP 400 e nenhuma gravação em disco é efetuada.

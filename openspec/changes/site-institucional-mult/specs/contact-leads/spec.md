## ADDED Requirements

### Requirement: Formulário de Contato e Captação de Leads
O site institucional SHALL fornecer um formulário de contato contendo os campos: Nome Completo, E-mail corporativo, Telefone/WhatsApp com máscara, Nome da Empresa, Momento do Projeto (seleção entre "Quero Criar", "Preciso Melhorar", "Preciso Adequar", "Outro") e Mensagem/Desafio técnico.

#### Scenario: Envio com sucesso do formulário
- **WHEN** o visitante preenche todos os campos obrigatórios e clica em enviar
- **THEN** a requisição é validada, o lead é registrado na tabela `leads_contact` com status `novo` e o visitante recebe confirmação visual de envio bem-sucedido.

#### Scenario: Submissão com campos obrigatórios vazios
- **WHEN** o visitante tenta submeter o formulário sem preencher nome, e-mail ou mensagem
- **THEN** o sistema exibe alertas visuais nos campos inválidos e não envia a requisição.

### Requirement: Consulta de Leads no Painel Administrativo
O painel administrativo SHALL listar os leads capturados através do formulário de contato com filtros básicos e ordenação por data de envio (mais recente primeiro).

#### Scenario: Administrador consulta novos contatos
- **WHEN** o administrador acessa a visualização de leads no painel
- **THEN** os contatos recebidos são exibidos em formato de tabela com dados completos para contato comercial rápido.

## Why

Em telas de desktop e notebooks convencionais (como 1366×768, 1440×900 ou 1536×864), a foto da equipe técnica do Hero (`uploads/mult_1789930911_98049a37c673.png`) tem a última pessoa cortada pelo enquadramento central padrão (`object-fit: cover` com `object-position: center`). Como todas as artes panorâmicas (1920×580) foram concebidas com espaço negativo à esquerda para os textos e os elementos visuais focados à direita, fixar o alinhamento na direita no desktop garante visualização integral das especialistas sem depender de alterações manuais na arte.

## What Changes

- Configuração de `object-position: right center;` para a imagem desktop dos slides do Hero Carousel em [`css/style.css`](css/style.css).
- Preservação da visualização responsiva em mobile (`@media (max-width: 768px)`), onde a imagem mobile já é 1080×1080 centralizada e mantém `object-position: center`.
- Adição de salvaguarda de legibilidade para telas intermediárias (~1024px a 1280px), garantindo contraste suave do gradiente overlay sobre o fundo lilás à esquerda.

## Capabilities

### New Capabilities
- `hero-responsive-positioning`: Regras de enquadramento e ponto focal responsivo (`object-position`) das imagens dos banners do Hero Carousel.

### Modified Capabilities
<!-- Nenhuma especificação existente teve seus requisitos de negócio alterados. -->

## Impact

- **Código afetado**: [`css/style.css`](css/style.css) (classes `.hero-slide img` e media queries responsivas).
- **APIs e Banco**: Sem impacto no banco de dados SQLite ou endpoints da API.
- **Retrocompatibilidade**: 100% compatível com os outros banners existentes (Mix Mult, Taiana Franco), que também possuem elementos visuais posicionados à direita.

## Context

A seção `#multiplicador` no `index.html` exibia informações sobre o programa interno de "Multiplicadoras", com menção a kit de boas-vindas (caneca, crachá, botom), textos no pretérito/presente interno ("Você agora faz parte da Mult...") e uma imagem em um card/quadrado flutuante que contrastava bruscamente com o restante da página.

Como a Mult Engenharia é uma empresa com foco em serviços B2B de engenharia e consultoria técnica, esta seção deve funcionar apenas como um banner secundário elegante para o banco de talentos e rede de especialistas, convidando profissionais técnicas (engenheiras, peritas, cientistas) a se cadastrarem para oportunidades e parcerias em projetos.

## Goals / Non-Goals

**Goals:**
- Eliminar completamente menções a kit de boas-vindas, brindes, canecas e crachás.
- Transformar a narrativa para atração e convite externo ("Faça parte da nossa rede de especialistas parceiras").
- Adicionar cabeçalho estruturado com eyebrow ("REDE DE ESPECIALISTAS & BANCO DE TALENTOS") e título de alto impacto ("Conecte seu conhecimento técnico a projetos inovadores").
- Integrar a imagem das 3 especialistas (`assets/img/multiplicadoras-banner-clean.jpg`) diretamente ao background da seção via máscara de gradiente CSS ou composição fluida lado a lado sem bordas/quadrados destacados.
- Manter o banner conciso (altura balanceada ~420-500px em desktop).
- Vincular o botão de CTA ao formulário `#contato`, pré-selecionando o assunto correspondente quando clicado.

**Non-Goals:**
- Não criar páginas secundárias ou fluxos complexos de autenticação para multiplicadores.
- Não alterar a estrutura geral de navegação do site institucional.
- Não reintroduzir ilustrações ou fotos com texto embutido.

## Decisions

1. **Imagem de Fundo Integrada com Gradiente Suave**:
   - *Decisão*: Utilizar `assets/img/multiplicadoras-banner-clean.jpg` posicionada à direita no container ou como background-image com sobreposição gradiente `from-[#FAF5FF] via-[#F3E8FF] to-transparent` (ou classes Tailwind `bg-gradient-to-r`).
   - *Alternativa descartada*: Usar card branco com cantos arredondados contendo a imagem (rejeitada pelo usuário por parecer pesado e desconectado).

2. **Cópia e Tom de Voz voltados a Parcerias Técnicas**:
   - *Decisão*: Redigir texto institucional sóbrio e profissional:
     - Badge: `REDE DE TALENTOS MULT`
     - Título: `Conecte seu conhecimento técnico a projetos de alto impacto`
     - Descrição: `Buscamos engenheiras, cientistas e consultoras especializadas para atuar em projetos estratégicos em todo o Brasil. Una sua experiência à nossa metodologia.`
     - CTA: `CANDIDATE-SE À REDE MULT ➔`
   - *Alternativa descartada*: Textos de boas-vindas e checklist de onboarding interno.

3. **Integração com Formulário de Contato**:
   - *Decisão*: Ao clicar no botão, disparar scroll suave para `#contato` e preencher o campo de assunto ou motivo com "Rede de Especialistas".

## Risks / Trade-offs

- **[Responsividade Mobile]** → Em telas menores (< 768px), o fundo com a foto das especialistas pode colidir com o texto se for apenas background lateral.
  - *Mitigação*: Em mobile, utilizar empilhamento vertical suave ou aplicar overlay gradiente com opacidade reforçada para garantir contraste e legibilidade impecáveis (WCAG AAA).

# Change Proposal: Hero Banner Canva 100% Responsivo & Git Setup

## Why
A section Hero apresentava cortes laterais (perda de textos) em resoluções desktop menores que 1920px (como notebooks de 1366px e 1440px) devido a uma altura fixa de 580px com `object-fit: cover` ancorado à direita. Além disso, no mobile a exibição precisa acomodar o layout com texto no topo e foto abaixo. O projeto também precisa ser conectado ao novo repositório Git no GitHub.

## What Changes
1. **Aspect-Ratio Dinâmico 1920 / 580 no Desktop:** O container do Hero passa a escalar proporcionalmente à largura da tela sem cortar nenhuma informação da arte feita no Canva.
2. **Layout Responsivo Mobile (4:5 / 1080x1350):** O container no mobile adota proporção vertical para exibir perfeitamente artes verticais (texto no topo e foto abaixo).
3. **Carrossel Dinâmico:** Rotação automática suave, setas laterais com posicionamento ergonômico, dots inferiores e links clicáveis funcionais.
4. **Painel Admin:** Modal com guia explícito de dimensões recomendadas (Desktop 1920x580 e Mobile 1080x1350) e pré-visualizações.
5. **Git Repository Setup:** Inicialização e primeiro commit no repositório `https://github.com/DomHenrique/site-mult.git`.

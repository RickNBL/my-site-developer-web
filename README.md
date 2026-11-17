# Henrique Silva — Portfólio Bilíngue (PT / EN)

Site profissional para apresentar serviços de desenvolvimento web, portfólio real e pacotes, com identidade visual HS, vídeo silencioso e WhatsApp como contato exclusivo.

## Como publicar

1. Extraia o ZIP.
2. Envie **todo o conteúdo da pasta** `henrique-silva-reformulado` para `public_html` (ou publique no Netlify / Vercel).
3. Mantenha `index.html`, `styles.css`, `script.js` e a pasta `assets/` juntos.
4. Acesse o domínio com HTTPS. O site não exige backend.

Use o arquivo de prévia HTML separado para visualizar a versão completa sem hospedagem ou outros arquivos.

## Português e inglês

O visitante usa os botões **PT** e **EN** do cabeçalho para alternar imediatamente. A escolha permanece salva no navegador (`localStorage`). Na primeira visita, o padrão é português. A troca também ajusta títulos, recursos, descrições, acessibilidade, SEO básico, os preços e os textos das mensagens do WhatsApp.

| Plano no Brasil | Preço BRL | Plano em inglês | Preço EUR |
|---|---:|---|---:|
| Site Básico | R$ 1.499 | Basic Website | €399 |
| Site Profissional | R$ 2.999 | Professional Website | €699 |
| Site Empresarial | R$ 4.999 | Business Website | €999 |

**Atenção:** os valores em euro são preços fixos definidos para a versão em inglês, não uma conversão cambial automática.

Os recursos do antigo plano Empresarial (4–8 páginas) permanecem no atual **Site Profissional**, e os recursos do antigo Profissional (sob medida) permanecem no atual **Site Empresarial**.

## Personalizar

- O conteúdo em português fica no `index.html`.
- As traduções em inglês e os preços PT/EN ficam na seção `Bilingual content` de `script.js`.
- Os botões de contato geram mensagens para WhatsApp **+55 (11) 99638-8468**, com idioma, nome do plano e preço corretos.
- Projetos ficam na seção `id="portfolio"` de `index.html`, e prints em `assets/projeto-*.webp`.
- Cores, fontes, responsividade e opções do seletor ficam em `styles.css`.
- O vídeo `assets/henrique-identidade.mp4` foi preparado sem faixa de áudio e toca automaticamente, sem controles; a reprodução pode depender de permissões do navegador.
- Não há formulário de contato.

## Arquivos

- `index.html`: conteúdo original em português, imagens e navegação.
- `styles.css`: visual, animações e estilo do seletor.
- `script.js`: efeitos, vídeo e sistema bilíngue.
- `assets/`: logo, vídeo e capturas reais do portfólio.


## Atualização: experiência profissional e TI

- Seção de experiência em desenvolvimento web com contador animado **9 anos** e órbitas 3D em CSS.
- Número completamente visível e centralizado em computadores e celulares.
- Apresentação profissional inclui também experiência em Tecnologia da Informação (TI), nas versões Português e English.
- O prazo de 9 anos refere-se ao desenvolvimento web; não foi atribuído prazo à experiência em TI.
- Foi corrigida a estrutura HTML da seção de experiência.


## Projetos adicionados ao portfólio
- **Studio Pina Pilates** — https://pina-pilates.vercel.app/ — `assets/projeto-pina.webp`
- **SUEESSOR** — https://sueessor-2026.vercel.app/ — `assets/projeto-sueessor.webp`

Os dois cards são bilíngues (PT / EN), seguindo o comportamento dos demais projetos. Para atualizar suas imagens futuramente, substitua os arquivos `.webp` pelos novos prints mantendo os nomes.


## Portfólio atualizado
O projeto Indigestos Moto Clube aparece como primeiro card do portfólio. Print em `assets/projeto-indigestos.webp` e endereço `https://indigestosmc.vercel.app/`. As descrições funcionam em português e inglês.


## Redesign 2026: cromo e órbita

Nova identidade visual construída a partir do monograma HS (letras prateadas + órbita + esfera):

- **Paleta:** alumínio `#E3E5E8`, névoa `#EEF0F2`, grafite aço `#1D2024`, aço `#5B626B` e um único acento cobalto `#2C3BEA`.
- **Tipografia:** Bricolage Grotesque (títulos condensados e pesados, texto corrido na mesma família).
- **Hero:** nome em tipografia cromada com brilho animado e um anel orbital 3D que passa por trás e pela frente das letras; a esfera gira e o anel reage ao mouse e à rolagem.
- **Projetos em órbita:** os prints dos 7 sites giram no anel do hero, passando por trás e pela frente do nome; ao passar o mouse a órbita desacelera, e o clique leva ao projeto no portfólio.
- **Letras vivas:** a fonte variável alarga as letras do nome perto do cursor (sem mouse, uma onda percorre o nome sozinha).
- **Experiência:** contador de anos e régua 2017–2026 preenchida pela rolagem, mais a lista do que é entregue em cada projeto.
- **Portfólio:** lista de projetos + janela de navegador fixa que troca o print com efeito de cortina (no celular, o print aparece em cada item).
- **Outras animações:** sequência de entrada, cursor personalizado, botões magnéticos, faixa de projetos que acelera com a rolagem, manifesto que se acende palavra por palavra, linha do processo com a esfera percorrendo e destaque de luz nos planos.
- Respeita `prefers-reduced-motion`; funciona sem JavaScript (conteúdo visível).
- Traduções em inglês ficam no objeto `english` de `script.js`, com chaves iguais ao atributo `data-i18n` do HTML.

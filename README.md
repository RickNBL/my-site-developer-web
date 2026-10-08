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

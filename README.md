# Henrique Silva — Portfólio (PT / EN)

Site estático (HTML, CSS e JS puros, sem build) para apresentar 9 anos de experiência em desenvolvimento web, os sites publicados e os planos, com contato pelo WhatsApp.

## Direção visual

- **Paleta** tirada do monograma HS: prata `#e4e7ea`, papel `#f4f5f6`, grafite `#19212b`, aço `#5b6570` e um único acento cobalto `#2c3fd6`.
- **Tipografia**: Archivo variável. A largura da fonte é o motivo de animação — os títulos "se expandem" ao entrar na tela.
- **Órbita**: a elipse com a bolinha do logo aparece animada no topo e no contato.

## Animações

- Topo: um navegador "monta" cada site real (wireframe → print) e troca de projeto a cada 5 s; o endereço é digitado na barra. Pausa ao passar o mouse; os traços abaixo permitem escolher o projeto.
- Experiência: régua 2017 → hoje que preenche conforme a rolagem.
- Camadas do site: pilha 3D interativa; as camadas em azul são as que a experiência em TI cobre.
- Trabalhos: lista com prévia ao lado que troca ao passar o mouse (no celular, cada item mostra o print).
- Processo: linha que se desenha com a rolagem.
- Tudo respeita a opção "reduzir movimento" do sistema.

## Personalizar

- Textos em português: `index.html`. Traduções em inglês, preços PT/EN e mensagens do WhatsApp: objeto `english`, `prices` e `copy` em `script.js`.
- Ano de início da régua (2017) e a contagem "7 sites" estão escritos no `index.html` e no `script.js` — ajuste se mudar.
- Novo projeto: copie um `<li>` dentro de `#work-list` (com `data-img` e `data-host`) e adicione as chaves `pX.sector` / `pX.desc` em `script.js`. O topo passa a exibi-lo automaticamente.
- Prints em `assets/projeto-*.webp`.

| Plano | BRL | EUR (versão EN) |
|---|---:|---:|
| Site Básico | R$ 1.499 | €399 |
| Site Profissional | R$ 2.999 | €699 |
| Site Empresarial | R$ 4.999 | €999 |

Os valores em euro são fixos, não conversão cambial.

## Publicar

Envie `index.html`, `styles.css`, `script.js` e `assets/` juntos (Vercel, Netlify ou `public_html`).

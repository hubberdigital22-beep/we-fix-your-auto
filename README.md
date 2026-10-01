# wefixyourauto.com · Collision Auto Pros

Site em três idiomas (espanhol, inglês e português) com duas páginas:

- a página inicial é o Kit de Emergência, uma LP de captação com formulário: a copy e a ordem das seções vêm do wireframe do Figma, e o visual é minimalista e claro (60% branco, 30% preto, 10% dourado), com fotos de alta resolução, efeitos de vidro, Inter, GSAP, parallax e microinterações;
- a LP do WhatsApp, que leva o visitante ao WhatsApp da oficina, está em standby em `/whatsapp/`: fora dos buscadores, com o visual escuro anterior e sem mudanças até nova decisão.

O plano, a copy de referência e os briefings ficam em `docs/`, só na máquina do projeto: a pasta está fora do Git porque o repositório é público.

## Rodar

Precisa de Node 22 ou mais novo.

```bash
npm install
npm run dev
```

Abre em `http://localhost:4321`.

```bash
npm run build     # gera a versão final em dist/
npm run preview   # serve dist/ para conferir
npm run og        # gera as imagens de compartilhamento do Kit (precisa do Chrome)
```

O `npm run og` usa o Chrome instalado. Em outro caminho, defina `CHROME_PATH`.

## Páginas

| Página | ES | EN | PT |
|---|---|---|---|
| Kit de Emergência (página inicial) | `/` | `/en/` | `/pt/` |
| Obrigado do Kit (noindex) | `/gracias/` | `/en/thanks/` | `/pt/obrigado/` |
| LP do WhatsApp (noindex) | `/whatsapp/` | `/en/whatsapp/` | `/pt/whatsapp/` |

Também saem `/robots.txt`, `/sitemap.xml` e `/llms.txt`. Todos os endereços ficam em `src/config/routes.ts`.

## Onde mexer

| Para… | Edite |
|---|---|
| Trocar um texto do Kit | `src/i18n/kit/es.ts`, `en.ts` ou `pt.ts` |
| Trocar um texto da LP do WhatsApp | `src/i18n/whatsapp/es.ts`, `en.ts` ou `pt.ts` |
| Trocar um texto da página 404 | `src/i18n/kit/not-found.ts`, com as três línguas; a língua mostrada vem do endereço (`/en/…`, `/pt/…`) ou da página de onde a pessoa veio. O desenho do "404" de vidro fica em `src/components/kit/glass-404.ts`, gerado a partir do contorno da Inter |
| Trocar uma foto do Kit | Salve o JPG (3600 px de largura) em `src/assets/photos/` com um nome novo, troque o import do componente da seção e ajuste o texto alternativo em `images` nos arquivos de `src/i18n/kit/` |
| Mudar um endereço ou criar uma página | `src/config/routes.ts` |
| Ligar o formulário do Kit | `PUBLIC_KIT_ENDPOINT` em `.env` |
| Link da política de privacidade | `kit.privacyUrl` em `src/config/site.ts` |
| Número do WhatsApp, endereço, horário, perfis sociais | `src/config/site.ts` |
| Colocar o logo oficial | Salve o SVG em `src/assets/logo.svg` e preencha `logo` em `src/config/site.ts` |
| Ligar ou desligar blocos da LP do WhatsApp que dependem de aprovação | `flags` em `src/config/site.ts` |
| Publicar para os buscadores | `indexable: true` em `src/config/site.ts` |
| Cores, raios, vidro e tipografia do Kit | Variáveis no topo de `src/styles/base.css` |
| Seções do Kit | `src/styles/kit.css` e `src/components/kit/` |
| Visual da LP do WhatsApp (sistema escuro antigo, completo) | `src/styles/whatsapp.css` e `src/components/whatsapp/` |
| Animações do Kit | `src/scripts/kit/motion.ts` (hero, parallax e zoom das fotos, imagens que se expandem até a tela cheia, rodapé) sobre `src/scripts/motion/core.ts` (rolagem suave, cabeçalho, revelações, parallax, acordeão) |
| Animações e luz da LP do WhatsApp | `src/scripts/whatsapp/motion.ts` e `light.ts` |
| Tag Manager e pixel | `PUBLIC_GTM_ID` e `PUBLIC_META_PIXEL_ID` em `.env` (modelo em `.env.example`) |

## Estrutura

```
src/
  config/       site.ts (dados e chaves) e routes.ts (endereços por idioma)
  i18n/         locales.ts; kit/ e whatsapp/ têm os textos de cada página
  layouts/      Base.astro (cabeça, SEO, cabeçalho, botão fixo e cortina; recebe estilos, camadas de fundo e scripts de cada página)
  components/   Header, Lockup, Button e Photo compartilhados; kit/ e whatsapp/ têm as seções de cada página; seo/ tem o cabeçalho de SEO e o rastreamento
  pages/        um arquivo por endereço, mais robots.txt, sitemap.xml e llms.txt
  lib/          dados estruturados (schema.ts), endereços absolutos, larguras das fotos e data do build
  scripts/      main.ts (comportamentos comuns), motion/core.ts (animações compartilhadas); kit/ tem o formulário, a medição e as animações do Kit; whatsapp/ tem as animações e a luz da LP
  styles/       base.css (sistema claro do Kit), kit.css (seções do Kit), whatsapp.css (sistema escuro completo da LP do WhatsApp)
  assets/       fontes; photos/ tem as fotos do Kit, do obrigado e da 404; whatsapp/ tem o selo I-CAR
public/         favicon e imagens de compartilhamento em og/
scripts/        gerador das imagens de compartilhamento
```

Cada página carrega só o seu sistema visual: o Kit usa `base.css` + `kit.css`, a LP do WhatsApp usa `whatsapp.css`. As animações compartilhadas ficam em `scripts/motion/core.ts` e cada página acrescenta as suas.

## Fotos

As fotos do Kit vêm do Unsplash (licença Unsplash, uso comercial sem atribuição obrigatória) e ficam em `src/assets/photos/`, com 2560 a 3600 px de largura. O Astro gera só WebP (qualidade 80, ou 90 no obrigado e na 404) em várias larguras, e o navegador baixa a menor que serve para a área que a foto realmente cobre: o atributo `sizes` de cada foto considera o recorte de preenchimento em blocos altos, não só a largura da tela. Em telas estreitas, o hero e a autoridade usam recortes verticais próprios (`*-tall.jpg`) servidos por `<picture>`, que ficam nítidos no celular sem baixar a foto inteira; a do hero é pré-carregada por ser o maior elemento da tela, com uma versão para celular e outra para desktop. No servidor de desenvolvimento cada tamanho é gerado na primeira visita, por isso a primeira abertura é mais lenta que no site publicado. Use sempre um nome de arquivo novo ao trocar uma foto: com o mesmo nome, o navegador pode continuar mostrando a versão antiga no modo de desenvolvimento.

| Arquivo | Uso | Tratamento | Foto no Unsplash |
|---|---|---|---|
| `headlight-soft.jpg`, `headlight-tall.jpg` | Fundo do hero e imagem de compartilhamento (o recorte vertical é usado em telas estreitas) | Espelhada; contraste menor, preto levemente levantado e reflexo lateral do carro suavizado | `photo-1532268116505-8c59cc37d2e6` |
| `highway-gold.jpg` | Faixa da rodovia na seção do problema | Tons de preto, bronze e creme dourado, com vinheta | `photo-1516319915504-015b432d407c` |
| `polishing-hd.jpg`, `polishing-tall.jpg` | Faixa escura da autoridade (o recorte vertical é usado em telas estreitas em pé) | Espelhada; tons de preto, bronze e creme dourado, com vinheta; versão de 3600 px | `photo-1780558852671-e47265577239` |
| `sedan-gold.jpg` | Bloco do CTA final | Só a luz do piso tingida de dourado; carro e fundo neutros | `photo-1485291571150-772bcfc10da5` |
| `ioniq-gold.jpg` | Página de obrigado | Convertida de Adobe RGB para sRGB; faróis de LED passados para o dourado da marca com núcleo claro e brilho suave, detalhes azuis da frente (aba central e friso) em dourado, grão fino | `photo-1708582884245-b0de089d75c0` (Hyundai Motor Group) |
| `fog-mono.jpg` | Página 404 | Tratada a partir da original de 3600 px: cinza neutro montado dos canais verde e azul (o brilho vermelho das lanternas fica fora), redução de ruído, neblina clareada, grão fino | `photo-1720556405511-a83593e516c6` |
| `scene/fog-mono-car.png`, `scene/neon-fog-line.png` | Página 404 | Recorte do carro (alfa) e a linha de neon das lanternas, gerados da mesma imagem tratada | derivados |

Para trocar por fotos da oficina, salve o JPG (3600 px de largura, proporção parecida) com um nome novo, troque o import no componente da seção e ajuste o texto alternativo em `images` nos arquivos de `src/i18n/kit/`.

## SEO, GEO e busca por IA

- **Indexação:** a chave `indexable` controla tudo de uma vez. Desligada, as páginas saem com noindex, o `robots.txt` bloqueia o site e o sitemap fica vazio. Ligada, o Kit fica indexável nos três idiomas, o `robots.txt` libera o site e aponta para o sitemap. As páginas de obrigado e a LP do WhatsApp são sempre noindex e ficam fora do sitemap.
- **Metadados:** título, descrição, canonical, hreflang e Open Graph por idioma.
- **Dados estruturados:** JSON-LD com AutoBodyShop, WebSite, WebPage, DigitalDocument e FAQPage em cada página do Kit.
- **Busca por IA:** `llms.txt` com resumo, conteúdo do guia e perguntas e respostas. HTML estático completo e títulos em forma de pergunta.
- **Sitemap:** gerado da tabela de rotas, com os links de idioma entre páginas equivalentes.

## Formulário do Kit

O formulário envia por POST (`application/x-www-form-urlencoded`) os campos `name`, `email`, `whatsapp`, `language` (idioma do PDF: es, en ou pt), `page_language`, `ref` (ex.: `KIT-ES`), `source` (G para Google, M para Meta ou o `utm_source`), `website` (campo-armadilha, sempre vazio para pessoas) e `_redirect` (endereço completo da página de obrigado). O endpoint precisa aceitar CORS de wefixyourauto.com. Serve para Formspree, Basin, um webhook do Make ou Zapier ou um endpoint próprio.

Sem `PUBLIC_KIT_ENDPOINT`, o formulário valida e abre a página de obrigado, mas não guarda o lead.

Eventos no `dataLayer`: `kit_submit` (com `mode` live ou demo) no envio e `kit_lead` na página de obrigado, uma vez por envio.

## Antes de publicar

Ligar `indexable`, preencher os identificadores de rastreamento, definir o endpoint do formulário (`PUBLIC_KIT_ENDPOINT`) e o link da política de privacidade. A lista completa, com as pendências do cliente, está no plano em `docs/`.

## Deploy

O projeto está ligado à Vercel pelo repositório do GitHub: cada push na `main` publica a versão de produção e cada branch ganha uma prévia. As variáveis do `.env.example` são configuradas no painel da Vercel.

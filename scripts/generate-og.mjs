import { mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';
import { kitEn } from '../src/i18n/kit/en.ts';
import { kitEs } from '../src/i18n/kit/es.ts';
import { kitPt } from '../src/i18n/kit/pt.ts';

const CHROME_PATH = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ASSETS = fileURLToPath(new URL('../src/assets/', import.meta.url));
const OUTPUT = fileURLToPath(new URL('../public/og/', import.meta.url));
const BRAND = 'Collision Auto Pros';
const SLOGAN = 'We fix your auto.';
const CITY = 'Tampa, FL';

const assetUrl = (file) => pathToFileURL(join(ASSETS, file)).href;

const template = (copy) => `<!doctype html>
<html lang="${copy.htmlLang}">
<head>
<meta charset="utf-8">
<style>
@font-face { font-family: 'Inter'; src: url('${assetUrl('fonts/inter-latin-wght-normal.woff2')}') format('woff2'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
body { display: grid; grid-template-columns: 1fr 400px; gap: 48px; width: 1200px; height: 630px; padding: 52px 56px; background: #f5f5f2; color: #0d0d0e; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
.left { display: flex; flex-direction: column; justify-content: space-between; min-width: 0; }
.lockup { display: flex; align-items: center; gap: 14px; font-size: 17px; }
.name { font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
.div { width: 2px; height: 18px; border-radius: 2px; background: #c9a24a; }
.slogan { font-weight: 500; opacity: 0.72; }
.label { display: inline-flex; align-items: center; gap: 12px; font-size: 15px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #7f7f87; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: #c9a24a; }
.main { display: grid; gap: 26px; }
h1 { font-size: 74px; font-weight: 600; line-height: 1.02; letter-spacing: -0.04em; font-feature-settings: 'cv11'; }
h1 .q { display: block; font-weight: 400; color: #7f7f87; }
.pills { display: flex; gap: 10px; }
.pill { display: inline-flex; align-items: center; gap: 10px; height: 40px; padding: 0 18px; border: 1px solid rgb(13 13 14 / 0.12); border-radius: 999px; font-size: 17px; font-weight: 500; }
.photo { position: relative; overflow: hidden; border-radius: 28px; background: #0d0d0e; }
.photo img { width: 100%; height: 100%; object-fit: cover; object-position: 64% 50%; }
.photo::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgb(13 13 14 / 0.1), rgb(13 13 14 / 0.55)); }
.city { position: absolute; left: 24px; bottom: 22px; z-index: 1; display: inline-flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: rgb(255 255 255 / 0.8); }
</style>
</head>
<body>
<div class="left">
<div class="lockup"><span class="name">${BRAND}</span><span class="div"></span><span class="slogan">${SLOGAN}</span></div>
<div class="main"><span class="label"><span class="dot"></span>${copy.hero.eyebrow}</span><h1><span class="q">${copy.hero.title[0]}</span>${copy.hero.title[1]}</h1></div>
<div class="pills">${copy.hero.highlights.map((item) => `<span class="pill"><span class="dot"></span>${item}</span>`).join('')}</div>
</div>
<div class="photo"><img src="${assetUrl('photos/headlight-soft.jpg')}" alt=""><span class="city"><span class="dot"></span>${CITY}</span></div>
</body>
</html>`;

await mkdir(OUTPUT, { recursive: true });

const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });

try {
	const page = await browser.newPage();
	await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

	for (const copy of [kitEs, kitEn, kitPt]) {
		const file = join(tmpdir(), `og-${copy.locale}.html`);
		await writeFile(file, template(copy));
		await page.goto(pathToFileURL(file).href, { waitUntil: 'networkidle0' });
		await page.evaluate(() => document.fonts.ready);
		await page.screenshot({ path: join(OUTPUT, `kit-${copy.locale}.jpg`), type: 'jpeg', quality: 86 });
	}
} finally {
	await browser.close();
}

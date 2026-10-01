import type { APIRoute } from 'astro';
import { routes } from '../config/routes';
import { site } from '../config/site';
import { getKitCopy } from '../i18n/kit';
import { languageNames } from '../i18n/locales';
import { absoluteUrl } from '../lib/url';

const en = getKitCopy('en');
const kitLanguages = ['es', 'en', 'pt'] as const;

const bullet = (label: string, path: string, note: string): string => `- [${label}](${absoluteUrl(path)}): ${note}`;

export const GET: APIRoute = () => {
	const body = [
		`# ${site.name}`,
		'',
		`> ${site.name} is an auto body shop in ${site.area}. Slogan: "${site.slogan}" This site offers the ${en.seo.documentName}, a free 8-page PDF guide on what to do after a car accident and how an insurance claim works in Florida, available in Spanish, English and Portuguese.`,
		'',
		`## ${en.seo.documentName} (free PDF guide)`,
		'',
		...kitLanguages.map((locale) => {
			const copy = getKitCopy(locale);
			return bullet(`${copy.seo.documentName} (${languageNames[locale]})`, routes.home[locale], copy.seo.description);
		}),
		'',
		`## What the ${en.seo.documentName} covers`,
		'',
		...en.includes.items.map((item) => `- ${item.title}: ${item.description}`),
		'',
		'## Who it is for',
		'',
		...en.audience.items.map((item) => `- ${item}`),
		'',
		'## Frequently asked questions',
		'',
		...en.faq.items.flatMap((item) => [`### ${item.question}`, '', item.answer, '']),
		'## Business',
		'',
		`- Name: ${site.name}`,
		`- Location: ${site.area}`,
		'- Languages: Spanish, English, Portuguese',
		`- Instagram: ${site.social.instagram}`,
		`- Facebook: ${site.social.facebook}`,
		'',
	].join('\n');

	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

import type { APIRoute } from 'astro';
import { indexableRoutes, type LocalizedPaths } from '../config/routes';
import { site } from '../config/site';
import { defaultLocale, locales, type Locale } from '../i18n/locales';
import { builtAt } from '../lib/build';
import { absoluteUrl } from '../lib/url';

const lastmod = builtAt.slice(0, 10);

const alternates = (group: LocalizedPaths): string[] => [
	...locales.map((locale) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${absoluteUrl(group[locale])}" />`),
	`    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(group[defaultLocale])}" />`,
];

const entry = (group: LocalizedPaths, locale: Locale): string =>
	['  <url>', `    <loc>${absoluteUrl(group[locale])}</loc>`, `    <lastmod>${lastmod}</lastmod>`, ...alternates(group), '  </url>'].join('\n');

export const GET: APIRoute = () => {
	const entries = site.indexable
		? indexableRoutes.flatMap((group) => locales.map((locale) => entry(group, locale)))
		: [];

	const xml = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
		...entries,
		'</urlset>',
		'',
	].join('\n');

	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

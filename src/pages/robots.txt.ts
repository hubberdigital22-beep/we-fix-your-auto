import type { APIRoute } from 'astro';
import { site } from '../config/site';
import { absoluteUrl } from '../lib/url';

export const GET: APIRoute = () => {
	const lines = site.indexable
		? ['User-agent: *', 'Allow: /', '', `Sitemap: ${absoluteUrl('/sitemap.xml')}`]
		: ['User-agent: *', 'Disallow: /'];

	return new Response(`${lines.join('\n')}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};

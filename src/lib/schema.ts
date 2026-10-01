import { routes } from '../config/routes';
import { site } from '../config/site';
import type { KitCopy } from '../i18n/kit';
import { htmlLangs, locales } from '../i18n/locales';
import type { Copy } from '../i18n/whatsapp';
import { absoluteUrl } from './url';

const businessId = `${site.url}/#business`;
const websiteId = `${site.url}/#website`;

const postalAddress = {
	'@type': 'PostalAddress',
	addressLocality: 'Tampa',
	addressRegion: 'FL',
	addressCountry: 'US',
};

const business = {
	'@type': 'AutoBodyShop',
	'@id': businessId,
	name: site.name,
	slogan: site.slogan,
	url: site.url,
	areaServed: { '@type': 'City', name: 'Tampa' },
	address: postalAddress,
	knowsLanguage: [...locales],
	sameAs: Object.values(site.social),
};

const website = {
	'@type': 'WebSite',
	'@id': websiteId,
	url: site.url,
	name: site.name,
	inLanguage: locales.map((locale) => htmlLangs[locale]),
	publisher: { '@id': businessId },
};

export const serializeSchema = (data: object): string => JSON.stringify(data).replace(/</g, '\\u003c');

export const whatsappSchema = (copy: Copy) => ({
	'@context': 'https://schema.org',
	'@type': 'AutoBodyShop',
	name: site.name,
	slogan: site.slogan,
	url: absoluteUrl(routes.whatsapp[copy.locale]),
	telephone: `+${site.whatsapp.number}`,
	areaServed: { '@type': 'City', name: 'Tampa' },
	address: {
		'@type': 'PostalAddress',
		...(site.address
			? {
					streetAddress: site.address.street,
					addressLocality: site.address.city,
					addressRegion: site.address.region,
					postalCode: site.address.postalCode,
				}
			: { addressLocality: 'Tampa', addressRegion: 'FL' }),
		addressCountry: 'US',
	},
	knowsLanguage: ['es', 'en', 'pt'],
});

interface KitSchemaOptions {
	copy: KitCopy;
	path: string;
	image: { path: string; width: number; height: number };
	modifiedAt: string;
}

export const kitSchema = ({ copy, path, image, modifiedAt }: KitSchemaOptions) => {
	const url = absoluteUrl(path);
	const pageId = `${url}#webpage`;
	const guideId = `${url}#guide`;

	return {
		'@context': 'https://schema.org',
		'@graph': [
			business,
			website,
			{
				'@type': 'WebPage',
				'@id': pageId,
				url,
				name: copy.seo.title,
				description: copy.seo.description,
				inLanguage: copy.htmlLang,
				isPartOf: { '@id': websiteId },
				about: { '@id': guideId },
				mainEntity: { '@id': guideId },
				dateModified: modifiedAt,
				primaryImageOfPage: {
					'@type': 'ImageObject',
					url: absoluteUrl(image.path),
					width: image.width,
					height: image.height,
					caption: copy.seo.imageAlt,
				},
			},
			{
				'@type': 'DigitalDocument',
				'@id': guideId,
				url,
				name: copy.seo.documentName,
				description: copy.hero.subtitle,
				inLanguage: locales.map((locale) => htmlLangs[locale]),
				encodingFormat: 'application/pdf',
				isAccessibleForFree: true,
				author: { '@id': businessId },
				publisher: { '@id': businessId },
				offers: {
					'@type': 'Offer',
					price: 0,
					priceCurrency: 'USD',
					availability: 'https://schema.org/InStock',
					url,
				},
				hasPart: copy.includes.items.map((item, index) => ({
					'@type': 'CreativeWork',
					position: index + 1,
					name: item.title,
					description: item.description,
				})),
			},
			{
				'@type': 'FAQPage',
				'@id': `${url}#faq`,
				url,
				inLanguage: copy.htmlLang,
				isPartOf: { '@id': pageId },
				mainEntity: copy.faq.items.map((item) => ({
					'@type': 'Question',
					name: item.question,
					acceptedAnswer: { '@type': 'Answer', text: item.answer },
				})),
			},
		],
	};
};

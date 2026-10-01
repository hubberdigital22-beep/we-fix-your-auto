import type { Locale } from '../locales';

export interface Field {
	label: string;
	placeholder: string;
}

export interface KitCopy {
	locale: Locale;
	htmlLang: string;
	seo: {
		title: string;
		description: string;
		imageAlt: string;
		documentName: string;
	};
	a11y: {
		skipToContent: string;
		languageNav: string;
	};
	hero: {
		eyebrow: string;
		title: [string, string];
		subtitle: string;
		highlights: string[];
	};
	form: {
		title: string;
		name: Field;
		email: Field;
		whatsapp: Field;
		language: { label: string };
		submit: string;
		sending: string;
		error: string;
		note: string;
	};
	images: {
		hero: string;
		problem: string;
		authority: string;
		final: string;
		thanks: string;
	};
	problem: {
		title: [string, string];
		paragraphs: string[];
		conclusion: string;
	};
	includes: {
		eyebrow: string;
		title: [string, string];
		items: { title: string; description: string }[];
	};
	authority: {
		title: [string, string];
		paragraphs: string[];
		seal: string;
	};
	audience: {
		title: string;
		items: string[];
	};
	finalCta: {
		title: [string, string];
		button: string;
	};
	faq: {
		title: string;
		items: { question: string; answer: string }[];
	};
	footer: {
		consent: string;
		privacy: string;
	};
	thanks: {
		seo: { title: string; description: string };
		title: [string, string];
		subtitle: string;
		back: string;
		cards: { eyebrow: string; title: string; text: string }[];
	};
}

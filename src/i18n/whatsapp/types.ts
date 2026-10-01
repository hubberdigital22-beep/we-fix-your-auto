import type { SiteFlags } from '../../config/site';
import type { Locale } from '../locales';

type Flagged = { flag?: keyof SiteFlags };

export interface Step {
	title: string;
	text: string;
}

export interface Reason extends Flagged {
	title: string;
	text: string;
}

export interface Question extends Flagged {
	q: string;
	a: string;
}

export interface Copy {
	locale: Locale;
	htmlLang: string;
	meta: { title: string; description: string };
	a11y: { skip: string; nav: string; lang: string; whatsappNew: string };
	nav: { how: string; why: string; faq: string };
	cta: {
		whatsapp: string;
		message: string;
	};
	towCondition: string;
	hero: {
		eyebrow: string;
		title: [string, string];
		sub: string;
		checks: { text: string; flag?: keyof SiteFlags }[];
		cue: string;
	};
	journey: { label: string; title: string; steps: Step[] };
	speed: [string, string];
	why: { label: string; title: string; items: Reason[]; sealAlt: string };
	renew: { text: string; caption: string };
	faq: { label: string; title: string; items: Question[] };
	final: { label: string; title: [string, string] };
	footer: {
		contact: string;
		where: string;
		languages: string;
		spoken: string;
		rights: string;
		top: string;
	};
}

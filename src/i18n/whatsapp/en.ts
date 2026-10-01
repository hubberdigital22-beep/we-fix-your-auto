import type { Copy } from './types';

export const en: Copy = {
	locale: 'en',
	htmlLang: 'en-US',

	meta: {
		title: 'Body Shop in Tampa · Collision Repair | Collision Auto Pros',
		description:
			'Accident? Tow, claim and repair in one message. I-CAR Gold Class shop in Tampa. English, español, português.',
	},

	a11y: {
		skip: 'Skip to content',
		nav: 'Sections',
		lang: 'Language',
		whatsappNew: 'opens WhatsApp',
	},

	nav: { how: 'How it works', why: 'Why us', faq: 'FAQ' },

	cta: {
		whatsapp: 'Message us on WhatsApp',
		message: 'Hi, I had an accident and need help with my car.',
	},

	towCondition: 'Free tow when we do the repair.',

	hero: {
		eyebrow: 'Body shop · Collision repair',
		title: ['You handle the accident.', 'We handle the rest.'],
		sub: 'Tow, claim and repair. One message.{*}',
		checks: [
			{ text: 'I-CAR Gold Class shop', flag: 'certifications' },
			{ text: 'The claim? We handle it' },
			{ text: 'English · Español · Português' },
		],
		cue: 'Accident? Start here.',
	},

	journey: {
		label: 'How it works',
		title: 'Accident? Start here.',
		steps: [
			{ title: 'Message us', text: 'On WhatsApp, in your language.' },
			{ title: 'We tow your car{*}', text: "Car won't drive? We'll come get it." },
			{ title: 'We handle the claim', text: 'We deal with your insurance.' },
			{ title: 'We assess the damage', text: 'At the shop, with computerized measuring.' },
			{ title: 'We repair it', text: 'With certified technicians and factory paint.' },
			{ title: 'We keep you updated', text: 'You know where your car stands at every step.' },
			{ title: 'Back on the road', text: 'We hand back the keys. And your peace of mind.' },
		],
	},

	speed: ['No car, no work.', "That's why we move fast."],

	why: {
		label: 'Why us',
		title: 'Certified, we speak your language and we handle your insurance for you.',
		items: [
			{
				flag: 'certifications',
				title: 'Certified. Equipped. Trusted.',
				text: "I-CAR Gold Class shop and ASE-certified technicians. Computerized measuring and factory paint: what you can't see gets fixed right too.",
			},
			{
				title: 'We deal with your insurance.',
				text: 'We open the claim for you and handle all the paperwork.',
			},
			{
				title: 'In your language.',
				text: 'English, español or português. You choose.',
			},
			{
				title: 'Back on the road, fast.',
				text: 'Towing, constant updates and a quick return to work.',
			},
			{
				flag: 'fleetProof',
				title: 'Trusted by those who protect Tampa.',
				text: "The same standard Tampa's fleets trust.",
			},
		],
		sealAlt: 'I-CAR Gold Class Collision Repair seal',
	},

	renew: {
		text: 'Like it never happened.',
		caption: 'From the crash… to like new.',
	},

	faq: {
		label: 'FAQ',
		title: 'Frequently asked questions',
		items: [
			{
				q: 'How do I start?',
				a: "Send us a WhatsApp, we'll pick up your car{*} and handle the claim. You get on with your day.",
			},
			{
				q: 'Do I have to bring my car to the shop?',
				a: "No. If your car won't drive, we'll come get it.{*}",
			},
			{
				q: 'What is a claim?',
				a: 'It is the request you open with the insurance company to cover the repair. We open it for you and handle the paperwork.',
			},
			{
				flag: 'notYourFault',
				q: "What if the accident wasn't my fault?",
				a: "The other driver's insurance may cover your repair. Most people don't know that. We help you with all the paperwork.",
			},
			{
				flag: 'costFaq',
				q: 'How much does the repair cost?',
				a: 'Every accident is different. That is why we assess the damage at the shop first.',
			},
			{
				q: 'What languages do you speak?',
				a: 'English, español and português. You choose.',
			},
		],
	},

	final: {
		label: 'Accident? Start here.',
		title: ['We hand back the keys.', 'And your peace of mind.'],
	},

	footer: {
		contact: 'Contact',
		where: 'Where',
		languages: 'Languages',
		spoken: 'Se habla español · Fala-se português',
		rights: 'All rights reserved.',
		top: 'Back to top',
	},
};

import type { KitCopy } from './types';

export const kitEn: KitCopy = {
	locale: 'en',
	htmlLang: 'en-US',
	seo: {
		title: 'Emergency Kit if you crash: free PDF guide | Collision Auto Pros',
		description:
			'Free PDF guide with the steps, photos and details you need to open your insurance claim in Florida without losing workdays.',
		imageAlt: 'Collision Auto Pros Emergency Kit: free PDF guide on what to do if you crash',
		documentName: 'Emergency Kit',
	},
	a11y: {
		skipToContent: 'Skip to content',
		languageNav: 'Language',
	},
	hero: {
		eyebrow: 'Free guide · Downloadable PDF',
		title: ['If you crash tomorrow,', 'do you know exactly what to do?'],
		subtitle:
			'Your car is your tool for work. Download the free Emergency Kit and keep the steps, photos and details you need to open your claim with your insurance without losing workdays.',
		highlights: ['100% free', '8 pages', 'ES · EN · PT'],
	},
	form: {
		title: 'Download your Emergency Kit',
		name: { label: 'Name', placeholder: 'Your name' },
		email: { label: 'Email', placeholder: 'youremail@email.com' },
		whatsapp: { label: 'WhatsApp (optional)', placeholder: '+1 (813) 000-0000' },
		language: { label: 'I prefer to receive my guide in' },
		submit: 'Get my Emergency Kit',
		sending: 'Sending…',
		error: "We couldn't send the form. Please try again in a moment.",
		note: 'No cost. No spam. It arrives in 2 minutes and you can unsubscribe anytime.',
	},
	images: {
		hero: 'Headlight of a bluish-white car in a dark workshop',
		problem: 'Light trails of cars on a highway at night',
		authority: 'Technician polishing the body of a dark car in the shop',
		final: 'Black sedan in profile under studio light',
		thanks: 'Graphite sports car facing forward in a dark studio, with blue headlights on',
	},
	problem: {
		title: ["A crash doesn't just cost you the car.", 'It costs you the week.'],
		paragraphs: [
			'Here you get paid by the week. Missing a day or two of work can cost you your job. And in Tampa there is no bus or train: no car, no income.',
			'The worst part is that most people learn how a claim works when they are already stranded on the side of the road, stressed and out of time. That is where the costly mistakes happen.',
		],
		conclusion: 'Knowing it beforehand changes everything.',
	},
	includes: {
		eyebrow: 'The Emergency Kit',
		title: ['Everything you need,', 'in 8 pages you will actually read'],
		items: [
			{ title: 'The first 10 minutes', description: 'What to do and what NOT to say at the scene.' },
			{
				title: 'Photo and info checklist',
				description: 'What your insurance will ask for, ready to copy from your phone.',
			},
			{ title: 'How a claim works in Florida', description: 'Step by step, no fine print.' },
			{ title: 'How to choose where to repair your car', description: 'You decide. Nobody decides for you.' },
			{ title: 'Glovebox card', description: 'Printable version to keep in your car.' },
			{
				title: 'Common mistakes',
				description: 'The ones that delay repairs and leave you without a car longer.',
			},
		],
	},
	authority: {
		title: ['Written by', 'the people who fix cars every day'],
		paragraphs: [
			'At Collision Auto Pros, wrecked cars come in every week, including essential-service vehicles. We know where time gets lost, where money gets lost and what makes a claim move fast.',
			'This guide is what we wish every customer knew before walking through our door.',
		],
		seal: 'We fix your auto.',
	},
	audience: {
		title: 'This guide is for you if...',
		items: [
			'You drive every day to get to work',
			"You recently arrived and don't know how car insurance works here",
			'You want to know what to do before you need it',
			'You prefer clear information, in your language',
		],
	},
	finalCta: {
		title: ['Save it today.', 'Use it the day you need it.'],
		button: 'Download for free',
	},
	faq: {
		title: 'Frequently asked questions',
		items: [
			{ question: 'Is it really free?', answer: 'Yes. We only ask for your email to send it to you.' },
			{
				question: 'Will you call me or flood me with messages?',
				answer: 'No. We send you the guide and, once in a while, useful tips. You can cancel with one click.',
			},
			{
				question: 'Do I need to be a Collision customer?',
				answer: 'No. The guide works no matter where you repair your car.',
			},
			{
				question: 'Is it available in English?',
				answer: 'Yes, and also in Spanish and Portuguese. Choose your language in the form.',
			},
		],
	},
	footer: {
		consent:
			'By submitting this form you agree to receive our guide and periodic emails from Collision Auto Pros. You can unsubscribe at any time.',
		privacy: 'Privacy policy',
	},
	thanks: {
		seo: {
			title: 'Done! Check your inbox | Collision Auto Pros',
			description: "We sent you the Emergency Kit. If it doesn't arrive in 5 minutes, check Promotions or Spam.",
		},
		title: ['Done!', 'Check your inbox.'],
		subtitle: "We sent you the Emergency Kit. If it doesn't arrive in 5 minutes, check Promotions or Spam.",
		back: 'Back to the website',
		cards: [
			{
				eyebrow: 'One more step',
				title: 'Save the glovebox card',
				text: "Take a screenshot of the card and keep it on your phone. When you need it, you won't want to dig through your inbox.",
			},
			{
				eyebrow: 'Newsletter',
				title: 'You are now on The Tool newsletter',
				text: 'Every two weeks we send short tips to look after your car and your wallet.',
			},
		],
	},
};

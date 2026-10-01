export const site = {
	name: 'Collision Auto Pros',
	slogan: 'We fix your auto.',
	domain: 'wefixyourauto.com',
	url: 'https://wefixyourauto.com',
	city: 'Tampa, FL',
	area: 'West Tampa, FL',
	timeZone: 'America/New_York',
	year: 2026,

	logo: null as null | { src: string; width: number; height: number },

	whatsapp: {
		number: '18135439898',
		display: '+1 (813) 543-9898',
	},

	address: null as null | { street: string; city: string; region: string; postalCode: string },
	hours: null as null | string,

	social: {
		instagram: 'https://www.instagram.com/collision_auto_pros/',
		facebook: 'https://www.facebook.com/profile.php?id=61586003647780',
	},

	indexable: false,

	tracking: {
		gtmId: import.meta.env.PUBLIC_GTM_ID ?? '',
		metaPixelId: import.meta.env.PUBLIC_META_PIXEL_ID ?? '',
	},

	kit: {
		endpoint: import.meta.env.PUBLIC_KIT_ENDPOINT ?? '',
		privacyUrl: null as null | string,
	},

	flags: {
		freeTow: true,
		certifications: true,
		icarSeal: true,
		notYourFault: true,
		costFaq: true,
		fleetProof: false,
	},
} as const;

export type SiteFlags = typeof site.flags;

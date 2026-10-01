import type { Copy } from './types';

export const es: Copy = {
	locale: 'es',
	htmlLang: 'es-US',

	meta: {
		title: 'Body shop en Tampa · Collision repair | Collision Auto Pros',
		description:
			'¿Chocaste? Grúa, claim y reparación en un solo mensaje. Taller I-CAR Gold Class en Tampa. Te atendemos en español.',
	},

	a11y: {
		skip: 'Saltar al contenido',
		nav: 'Secciones',
		lang: 'Idioma',
		whatsappNew: 'abre WhatsApp',
	},

	nav: { how: 'Cómo funciona', why: 'Por qué nosotros', faq: 'Preguntas' },

	cta: {
		whatsapp: 'Escríbenos por WhatsApp',
		message: 'Hola, tuve un choque y necesito ayuda con mi carro.',
	},

	towCondition: 'Grúa gratis al hacer la reparación con nosotros.',

	hero: {
		eyebrow: 'Body shop · Collision repair',
		title: ['El accidente ya pasó.', 'Del resto nos encargamos nosotros.'],
		sub: 'Grúa, claim y reparación. Un solo mensaje.{*}',
		checks: [
			{ text: 'Taller I-CAR Gold Class', flag: 'certifications' },
			{ text: 'El claim lo hacemos nosotros' },
			{ text: 'Te atendemos en español' },
		],
		cue: '¿Accidente? Empieza aquí.',
	},

	journey: {
		label: 'Cómo funciona',
		title: '¿Accidente? Empieza aquí.',
		steps: [
			{ title: 'Escríbenos', text: 'Por WhatsApp, en tu idioma.' },
			{ title: 'Buscamos tu carro{*}', text: '¿No arranca? Nosotros lo buscamos.' },
			{ title: 'Hacemos el claim', text: 'Nosotros hablamos con el seguro.' },
			{ title: 'Evaluamos el daño', text: 'En el taller, con medición computarizada.' },
			{ title: 'Lo reparamos', text: 'Con técnicos certificados y pintura de fábrica.' },
			{ title: 'Te mantenemos informado', text: 'Sabes cómo va tu carro en cada etapa.' },
			{ title: 'De vuelta al camino', text: 'Te devolvemos las llaves. Y la tranquilidad.' },
		],
	},

	speed: ['Sin carro no hay trabajo.', 'Por eso vamos rápido.'],

	why: {
		label: 'Por qué nosotros',
		title: 'Certificados, hablamos tu idioma y resolvemos el seguro por ti.',
		items: [
			{
				flag: 'certifications',
				title: 'Certificados. Equipados. De confianza.',
				text: 'Taller I-CAR Gold Class y técnicos certificados ASE. Medición computarizada y pintura de fábrica: lo que no se ve también se repara bien.',
			},
			{
				title: 'Nosotros hablamos con el seguro.',
				text: 'Abrimos el claim por ti y nos encargamos de todo el papeleo.',
			},
			{
				title: 'Te atendemos en español.',
				text: 'También en inglés y portugués. Tú eliges el idioma.',
			},
			{
				title: 'De vuelta al camino, rápido.',
				text: 'Grúa, actualizaciones constantes y una vuelta rápida al trabajo.',
			},
			{
				flag: 'fleetProof',
				title: 'La confianza de quienes cuidan Tampa.',
				text: 'El mismo estándar de las flotas que cuidan Tampa.',
			},
		],
		sealAlt: 'Sello I-CAR Gold Class Collision Repair',
	},

	renew: {
		text: 'Como si nunca hubiera pasado.',
		caption: 'Del choque… a como nuevo.',
	},

	faq: {
		label: 'Preguntas',
		title: 'Preguntas frecuentes',
		items: [
			{
				q: '¿Cómo empiezo?',
				a: 'Nos mandas un WhatsApp, nosotros buscamos tu carro{*} y nos encargamos del claim. Tú sigues con tu día.',
			},
			{
				q: '¿Tengo que llevar mi carro al taller?',
				a: 'No. Si tu carro no arranca, nosotros lo buscamos.{*}',
			},
			{
				q: '¿Qué es un claim?',
				a: 'Es el reclamo que se abre con el seguro para cubrir la reparación. Nosotros lo abrimos por ti y nos encargamos del papeleo.',
			},
			{
				flag: 'notYourFault',
				q: '¿Y si el choque no fue mi culpa?',
				a: 'El seguro del otro conductor puede cubrir tu reparación. Mucha gente no lo sabe. Nosotros te ayudamos con todo el papeleo.',
			},
			{
				flag: 'costFaq',
				q: '¿Cuánto cuesta la reparación?',
				a: 'Cada choque es distinto. Por eso primero evaluamos el daño en el taller.',
			},
			{
				q: '¿En qué idiomas atienden?',
				a: 'Español, inglés y portugués. Tú eliges.',
			},
		],
	},

	final: {
		label: '¿Chocaste? Empieza aquí.',
		title: ['Te devolvemos las llaves.', 'Y la tranquilidad.'],
	},

	footer: {
		contact: 'Contacto',
		where: 'Dónde',
		languages: 'Idiomas',
		spoken: 'Se habla español',
		rights: 'Todos los derechos reservados.',
		top: 'Volver arriba',
	},
};

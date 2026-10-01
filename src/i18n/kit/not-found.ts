import type { Locale } from '../locales';

export interface NotFoundCopy {
	seoTitle: string;
	description: string;
	title: [string, string];
	subtitle: string;
	back: string;
	imageAlt: string;
}

export const notFoundCopy: Record<Locale, NotFoundCopy> = {
	es: {
		seoTitle: 'Página no encontrada | Collision Auto Pros',
		description: 'Esta página no existe. Revisa la dirección o vuelve a la página anterior.',
		title: ['Esta página', 'no existe.'],
		subtitle: 'Revisa la dirección o vuelve a la página anterior.',
		back: 'Volver',
		imageAlt: 'Luces traseras de un carro en una carretera con niebla',
	},
	en: {
		seoTitle: 'Page not found | Collision Auto Pros',
		description: "This page doesn't exist. Check the address or go back to the previous page.",
		title: ['This page', "doesn't exist."],
		subtitle: 'Check the address or go back to the previous page.',
		back: 'Go back',
		imageAlt: 'Taillights of a car on a foggy road',
	},
	pt: {
		seoTitle: 'Página não encontrada | Collision Auto Pros',
		description: 'Esta página não existe. Confira o endereço ou volte para a página anterior.',
		title: ['Esta página', 'não existe.'],
		subtitle: 'Confira o endereço ou volte para a página anterior.',
		back: 'Voltar',
		imageAlt: 'Lanternas de um carro em uma estrada com neblina',
	},
};

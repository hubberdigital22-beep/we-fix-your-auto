import type { Locale } from '../i18n/locales';

export type LocalizedPaths = Record<Locale, string>;

export const routes = {
	home: { es: '/', en: '/en/', pt: '/pt/' },
	thanks: { es: '/gracias/', en: '/en/thanks/', pt: '/pt/obrigado/' },
	whatsapp: { es: '/whatsapp/', en: '/en/whatsapp/', pt: '/pt/whatsapp/' },
} satisfies Record<string, LocalizedPaths>;

export const indexableRoutes: LocalizedPaths[] = [routes.home];

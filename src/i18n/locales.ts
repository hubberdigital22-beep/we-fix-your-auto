export const locales = ['es', 'en', 'pt'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

export const htmlLangs: Record<Locale, string> = {
	es: 'es-US',
	en: 'en-US',
	pt: 'pt-BR',
};

export const languageNames: Record<Locale, string> = {
	es: 'Español',
	en: 'English',
	pt: 'Português',
};

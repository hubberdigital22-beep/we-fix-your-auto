import { routes } from '../../config/routes';
import { site } from '../../config/site';
import { en } from './en';
import { es } from './es';
import { defaultLocale, locales, type Locale } from '../locales';
import { pt } from './pt';
import type { Copy } from './types';

export { defaultLocale, locales };
export type { Copy, Locale };

const dictionaries: Record<Locale, Copy> = { es, en, pt };

export const getCopy = (locale: Locale): Copy => dictionaries[locale];

export const localePath = (locale: Locale): string => routes.whatsapp[locale];

const TOW_MARK = '{*}';

export const star = (text: string): string => text.replaceAll(TOW_MARK, site.flags.freeTow ? '*' : '');

export const hasStar = (text: string): boolean => site.flags.freeTow && text.includes(TOW_MARK);

export const enabled = <T extends { flag?: keyof typeof site.flags }>(items: readonly T[]): T[] =>
	items.filter((item) => !item.flag || site.flags[item.flag]);

export const whatsappUrl = (copy: Copy, placement: string): string => {
	const ref = `LP-${copy.locale.toUpperCase()}-${placement.toUpperCase()}`;
	const text = `${copy.cta.message} (Ref: ${ref})`;
	return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(text)}`;
};

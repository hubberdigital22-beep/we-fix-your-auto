import type { Locale } from '../locales';
import { kitEn } from './en';
import { kitEs } from './es';
import { kitPt } from './pt';
import type { KitCopy } from './types';

export type { KitCopy } from './types';

const dictionaries: Record<Locale, KitCopy> = { es: kitEs, en: kitEn, pt: kitPt };

export const getKitCopy = (locale: Locale): KitCopy => dictionaries[locale];

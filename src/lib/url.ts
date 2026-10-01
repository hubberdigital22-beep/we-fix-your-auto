import { site } from '../config/site';

export const absoluteUrl = (path: string): string => new URL(path, site.url).href;

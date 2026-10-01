import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

export const photoWidths = [640, 960, 1280, 1600, 2000, 2560];
export const hdWidths = [...photoWidths, 3200];
export const tallWidths = [720, 1080, 1440];
export const photoQuality = 80;

export const narrow = '(max-width: 63.99em)';
export const heroSizes = 'max(100vw, 179vh)';
export const heroTallSizes = 'max(100vw, 72vh)';

export const tallImage = (src: ImageMetadata, quality = photoQuality) =>
	getImage({
		src,
		width: src.width,
		widths: tallWidths.filter((width) => width <= src.width),
		format: 'webp',
		quality,
	});

import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://wefixyourauto.com',
	trailingSlash: 'ignore',
	devToolbar: { enabled: false },
	build: { inlineStylesheets: 'always' },
});

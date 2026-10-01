import { storage } from './storage';

const SOURCE_KEY = 'src';

const detectSource = (params: URLSearchParams): string => {
	const utm = (params.get('utm_source') ?? '').toLowerCase();
	if (params.has('gclid') || params.has('gbraid') || params.has('wbraid') || utm.includes('google')) return 'G';
	if (params.has('fbclid') || /facebook|instagram|meta|fb|ig/.test(utm)) return 'M';
	return utm.replace(/[^a-z0-9]/g, '').slice(0, 8).toUpperCase();
};

export const campaignSource = (): string => {
	const detected = detectSource(new URLSearchParams(window.location.search));
	if (detected) {
		storage.write(SOURCE_KEY, detected);
		return detected;
	}
	return storage.read(SOURCE_KEY) ?? '';
};

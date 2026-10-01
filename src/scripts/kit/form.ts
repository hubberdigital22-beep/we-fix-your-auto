import { campaignSource } from '../source';
import { storage } from '../storage';
import { track } from '../tracking';
import { LEAD_STORAGE_KEY, type LeadSummary } from './lead';

const SUBMIT_TIMEOUT_MS = 10_000;

const toParams = (data: FormData): URLSearchParams =>
	new URLSearchParams(Array.from(data, ([key, value]) => [key, String(value)]));

const setBusy = (form: HTMLFormElement, busy: boolean): void => {
	form.toggleAttribute('data-busy', busy);
	form.setAttribute('aria-busy', String(busy));
	form.querySelectorAll('button').forEach((button) => {
		button.disabled = busy;
	});
};

const sendLead = async (endpoint: string, data: FormData): Promise<void> => {
	const response = await fetch(endpoint, {
		method: 'POST',
		body: toParams(data),
		headers: { Accept: 'application/json' },
		signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
	});
	if (!response.ok) throw new Error(`Lead endpoint answered ${response.status}`);
};

const init = (form: HTMLFormElement): void => {
	const source = campaignSource();
	const endpoint = form.getAttribute('action');
	const thanksPath = form.dataset.thanks ?? '/';
	const error = form.querySelector<HTMLElement>('[role="alert"]');
	const sourceField = form.elements.namedItem('source');

	if (sourceField instanceof HTMLInputElement) sourceField.value = source;

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		if (form.hasAttribute('data-busy')) return;

		const data = new FormData(form);
		if (data.get('website')) {
			window.location.assign(thanksPath);
			return;
		}

		const lead: LeadSummary = {
			placement: 'kit',
			language: document.documentElement.lang,
			guideLanguage: String(data.get('language') ?? ''),
			source: source || 'direct',
		};

		if (error) error.hidden = true;
		setBusy(form, true);

		try {
			if (endpoint) await sendLead(endpoint, data);
			track({ event: 'kit_submit', mode: endpoint ? 'live' : 'demo', ...lead });
			storage.write(LEAD_STORAGE_KEY, JSON.stringify(lead));
			window.location.assign(thanksPath);
		} catch {
			setBusy(form, false);
			if (error) error.hidden = false;
		}
	});

	window.addEventListener('pageshow', (event) => {
		if (event.persisted) setBusy(form, false);
	});
};

const form = document.querySelector<HTMLFormElement>('[data-lead-form]');

if (form) init(form);

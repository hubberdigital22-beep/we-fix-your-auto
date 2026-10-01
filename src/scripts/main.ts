import { campaignSource } from './source';

const root = document.documentElement;
const reduced = root.classList.contains('reduced');

const $ = <T extends HTMLElement = HTMLElement>(selector: string, scope: ParentNode = document) =>
	scope.querySelector<T>(selector);
const $$ = <T extends HTMLElement = HTMLElement>(selector: string, scope: ParentNode = document) =>
	Array.from(scope.querySelectorAll<T>(selector));

function whatsapp() {
	const source = campaignSource();
	$$<HTMLAnchorElement>('a[data-wa]').forEach((link) => {
		if (source) {
			const url = new URL(link.href);
			const text = (url.searchParams.get('text') ?? '').replace(/\(Ref: ([^)]+)\)/, `(Ref: $1-${source})`);
			link.href = `${url.origin}${url.pathname}?text=${encodeURIComponent(text)}`;
		}
		link.addEventListener('click', () => {
			window.dataLayer = window.dataLayer ?? [];
			window.dataLayer.push({
				event: 'whatsapp_click',
				placement: link.dataset.wa,
				language: root.lang,
				source: source || 'direct',
			});
		});
	});
}

function clock() {
	const slots = $$<HTMLTimeElement>('[data-clock]');
	if (!slots.length) return;
	const format = new Intl.DateTimeFormat(root.lang || 'es-US', {
		hour: 'numeric',
		minute: '2-digit',
		timeZone: slots[0].dataset.clock || 'America/New_York',
	});
	const tick = () => {
		const now = new Date();
		slots.forEach((slot) => {
			slot.textContent = format.format(now);
			slot.dateTime = now.toISOString();
		});
	};
	tick();
	setInterval(tick, 20_000);
}

function dock() {
	const bar = $('.dock');
	const anchors = $$('.hero__cta, .final__cta, .ftr, [data-dock-anchor]');
	if (!bar || !anchors.length) return;

	const seen = new Set<Element>();
	let passedTop = false;
	const update = () => {
		const on = seen.size === 0 && passedTop;
		bar.classList.toggle('is-on', on);
		bar.toggleAttribute('inert', !on);
	};
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => (entry.isIntersecting ? seen.add(entry.target) : seen.delete(entry.target)));
		passedTop = window.scrollY > 240;
		update();
	});
	anchors.forEach((anchor) => observer.observe(anchor));
}

function languageMenu() {
	const menu = $<HTMLDetailsElement>('[data-lang-menu]');
	const button = menu && $('summary', menu);
	if (!menu || !button) return;

	const items = $$<HTMLAnchorElement>('.lm__item', menu);
	let closing = 0;

	const close = (restoreFocus = false) => {
		if (!menu.open || closing) return;
		const finish = () => {
			closing = 0;
			menu.open = false;
			menu.classList.remove('is-closing');
		};
		if (reduced) finish();
		else {
			menu.classList.add('is-closing');
			closing = window.setTimeout(finish, 240);
		}
		if (restoreFocus) button.focus();
	};

	button.addEventListener('click', (event) => {
		if (!menu.open) return;
		event.preventDefault();
		close();
	});

	document.addEventListener('pointerdown', (event) => {
		if (!menu.contains(event.target as Node)) close();
	});

	items.forEach((item) => {
		if (item.getAttribute('aria-current') === 'true') item.addEventListener('click', () => close());
	});

	menu.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			close(true);
			return;
		}
		if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
		event.preventDefault();
		if (!menu.open) {
			menu.open = true;
			items[0]?.focus();
			return;
		}
		const index = items.indexOf(document.activeElement as HTMLAnchorElement);
		const step = event.key === 'ArrowDown' ? 1 : -1;
		items[(index + step + items.length) % items.length]?.focus();
	});
}

const WIPE_EASE = 'cubic-bezier(0.77, 0, 0.18, 1)';

function languageSwitch() {
	const wipe = $('.wipe');
	if (!wipe) return;

	if (root.classList.contains('from-wipe')) {
		try {
			sessionStorage.removeItem('wipe');
		} catch {
		}
		wipe
			.animate([{ transform: 'none' }, { transform: 'translateY(-101%)' }], {
				duration: 850,
				easing: WIPE_EASE,
				fill: 'forwards',
			})
			.finished.then((animation) => {
				root.classList.remove('from-wipe');
				animation.cancel();
			});
	}

	if (reduced) return;

	$$<HTMLAnchorElement>('.lang a, .lm a, .ftr a[hreflang]').forEach((link) => {
		link.addEventListener('click', (event) => {
			if (link.getAttribute('aria-current') === 'true') {
				event.preventDefault();
				return;
			}
			if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
			event.preventDefault();
			try {
				sessionStorage.setItem('wipe', '1');
			} catch {
			}
			wipe
				.animate([{ transform: 'translateY(101%)' }, { transform: 'none' }], {
					duration: 600,
					easing: WIPE_EASE,
					fill: 'forwards',
				})
				.finished.then(() => {
					location.href = link.href;
				});
		});
	});

	window.addEventListener('pageshow', (event) => {
		if (event.persisted) wipe.getAnimations().forEach((animation) => animation.cancel());
	});
}

whatsapp();
clock();
dock();
languageSwitch();
languageMenu();

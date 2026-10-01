import {
	$,
	$$,
	DESKTOP,
	ScrollTrigger,
	SplitText,
	breathe,
	crumple,
	finePointer,
	fontsReady,
	gsap,
	header,
	parallax,
	questions,
	reduced,
	refreshOnLoad,
	reveals,
	root,
	settle,
	smoothScroll,
} from '../motion/core';
import { createLight, type Light, type LightState } from './light';

function grain() {
	const size = 128;
	const canvas = document.createElement('canvas');
	canvas.width = canvas.height = size;
	const context = canvas.getContext('2d');
	if (!context) return;
	const image = context.createImageData(size, size);
	for (let i = 0; i < image.data.length; i += 4) {
		const value = Math.random() * 255;
		image.data[i] = image.data[i + 1] = image.data[i + 2] = value;
		image.data[i + 3] = 255;
	}
	context.putImageData(image, 0, 0);
	root.style.setProperty('--grain', `url(${canvas.toDataURL('image/png')})`);
}

type Preset = LightState & { sweep: number };

const PRESETS: Record<string, Preset> = {
	hero: { pos: 0.34, angle: -0.62, width: 0.36, power: 1, warm: 0.06, sweep: -0.5 },
	journey: { pos: -0.1, angle: -0.42, width: 0.26, power: 0.85, warm: 0.12, sweep: 0.9 },
	speed: { pos: 0, angle: -0.95, width: 0.2, power: 1.1, warm: 0.3, sweep: 1.7 },
	why: { pos: 0.52, angle: -0.3, width: 0.3, power: 0.8, warm: 0.22, sweep: -0.35 },
	renew: { pos: 0, angle: -0.62, width: 0.52, power: 1.15, warm: 0.1, sweep: 0.5 },
	faq: { pos: -0.5, angle: -0.62, width: 0.3, power: 0.4, warm: 0.2, sweep: 0.2 },
	final: { pos: 0.12, angle: -0.7, width: 0.42, power: 1.1, warm: 0.55, sweep: 0.4 },
};

interface Zone {
	preset: Preset;
	top: number;
	height: number;
	opaque: boolean;
}

function lighting(): Light | null {
	const holder = $('.light');
	const canvas = $<HTMLCanvasElement>('.light canvas');
	if (!holder || !canvas) return null;

	const light = createLight(canvas, {
		animate: true,
		onGiveUp: () => holder.classList.remove('is-live'),
	});
	if (!light) return null;
	holder.classList.add('is-live');

	const sections = $$('[data-light]');
	let zones: Zone[] = [];
	const measure = () => {
		const scroll = window.scrollY;
		zones = sections.map((section) => {
			const spacer = section.querySelector<HTMLElement>(':scope > .pin-spacer');
			const box = section.getBoundingClientRect();
			return {
				preset: PRESETS[section.dataset.light ?? 'hero'] ?? PRESETS.hero,
				top: box.top + scroll,
				height: Math.max(box.height, spacer?.offsetHeight ?? 0),
				opaque: section.hasAttribute('data-opaque'),
			};
		});
	};
	measure();
	ScrollTrigger.addEventListener('refresh', measure);

	const pointerTarget = { x: 0, y: 0, on: 0 };
	let covered = false;

	let free = false;
	gsap.fromTo(
		light.state,
		{ pos: -1.35, power: 0.2, width: 0.18, angle: PRESETS.hero.angle, warm: PRESETS.hero.warm },
		{
			pos: PRESETS.hero.pos + 0.25,
			power: 1,
			width: PRESETS.hero.width,
			duration: 2.2,
			ease: 'power3.out',
			onComplete: () => (free = true),
		},
	);

	gsap.ticker.add((_time, delta) => {
		const viewport = window.innerHeight;
		const middle = window.scrollY + viewport * 0.5;
		let preset = PRESETS.hero;
		let progress = 0;
		let hidden = false;

		for (const zone of zones) {
			if (zone.top <= middle && zone.top + zone.height > middle) {
				preset = zone.preset;
				progress = (middle - zone.top) / zone.height;
				hidden = zone.opaque && zone.top <= window.scrollY && zone.top + zone.height >= window.scrollY + viewport;
				break;
			}
		}

		if (hidden !== covered) {
			covered = hidden;
			if (covered) light.stop();
			else if (!document.hidden) light.start();
		}

		const ease = 1 - Math.exp(-delta / 260);
		if (free) {
			const state = light.state;
			state.pos += (preset.pos + (progress - 0.5) * preset.sweep - state.pos) * ease;
			state.angle += (preset.angle - state.angle) * ease;
			state.width += (preset.width - state.width) * ease;
			state.power += (preset.power - state.power) * ease;
			state.warm += (preset.warm - state.warm) * ease;
		}
		light.pointer.x += (pointerTarget.x - light.pointer.x) * ease;
		light.pointer.y += (pointerTarget.y - light.pointer.y) * ease;
		light.pointer.on += (pointerTarget.on - light.pointer.on) * ease;
	});

	if (finePointer) {
		window.addEventListener(
			'pointermove',
			(event) => {
				pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
				pointerTarget.y = (event.clientY / window.innerHeight) * 2 - 1;
				pointerTarget.on = 1;
			},
			{ passive: true },
		);
		document.addEventListener('pointerleave', () => (pointerTarget.on = 0));
	}

	document.addEventListener('visibilitychange', () => {
		if (document.hidden) light.stop();
		else if (!covered) light.start();
	});

	light.start();
	return light;
}

function lightOnDemand() {
	const events = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'scroll', 'keydown'] as const;
	const wake = () => {
		events.forEach((name) => window.removeEventListener(name, wake));
		lighting();
	};
	events.forEach((name) => window.addEventListener(name, wake, { passive: true }));
}

function heroExit() {
	gsap.to('.hero__body', {
		yPercent: -14,
		opacity: 0.12,
		ease: 'none',
		scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 12%', scrub: true },
	});
	gsap.to('.hero__meta', {
		opacity: 0,
		ease: 'none',
		scrollTrigger: { trigger: '.hero', start: 'top top', end: '30% top', scrub: true },
	});
}

function marquee(scroll: ScrollTrigger) {
	const band = $('.mq');
	const track = $('.mq__track');
	if (!band || !track) return;

	const unit = Array.from(track.children) as HTMLElement[];
	const unitWidth = () => unit.reduce((sum, item) => sum + item.offsetWidth, 0);
	let width = unitWidth();
	if (!width) return;
	const copies = Math.ceil((window.innerWidth * 2) / width) + 1;
	const clones = document.createDocumentFragment();
	for (let i = 0; i < copies; i += 1) unit.forEach((item) => clones.appendChild(item.cloneNode(true)));
	track.appendChild(clones);

	const setX = gsap.quickSetter(track, 'x', 'px');
	const setSkew = gsap.quickSetter(track, 'skewX', 'deg');
	let x = 0;
	let skew = 0;
	let visible = false;

	new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(band);
	ScrollTrigger.addEventListener('refresh', () => (width = unitWidth() || width));

	gsap.ticker.add((_time, delta) => {
		if (!visible) return;
		const velocity = scroll.getVelocity();
		const speed = 0.06 + Math.min(Math.abs(velocity) / 2600, 1.4);
		x -= speed * delta * (velocity < -40 ? -1 : 1);
		if (x <= -width) x += width;
		if (x > 0) x -= width;
		skew += (gsap.utils.clamp(-9, 9, velocity / 320) - skew) * 0.12;
		setX(x);
		setSkew(-skew);
	});
}

function journey(media: gsap.MatchMedia) {
	const pin = $('.jr__pin');
	const track = $('.jr__track');
	const steps = $$('.step');
	const count = $('.jr__count b');
	const bar = $('.jr__bar span');
	if (!pin || !track || !steps.length) return;

	const mark = (index: number) => {
		steps.forEach((step, i) => step.classList.toggle('is-on', i <= index));
		if (count) count.textContent = String(Math.max(index, 0) + 1).padStart(2, '0');
	};

	media.add(DESKTOP, () => {
		const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

		const slide = gsap.to(track, {
			x: () => -distance(),
			ease: 'none',
			scrollTrigger: {
				trigger: pin,
				pin: true,
				start: 'top top',
				end: () => `+=${distance()}`,
				scrub: 0.7,
				anticipatePin: 1,
				invalidateOnRefresh: true,
				onUpdate(self) {
					if (bar) gsap.set(bar, { scaleX: self.progress });
				},
			},
		});

		steps.forEach((step, index) => {
			ScrollTrigger.create({
				trigger: step,
				containerAnimation: slide,
				start: 'left 58%',
				onEnter: () => mark(index),
				onLeaveBack: () => mark(index - 1),
			});

			const numeral = $('.step__num', step);
			if (numeral) {
				gsap.fromTo(
					numeral,
					{ xPercent: 14 },
					{
						xPercent: -14,
						ease: 'none',
						scrollTrigger: {
							trigger: step,
							containerAnimation: slide,
							start: 'left right',
							end: 'right left',
							scrub: true,
						},
					},
				);
			}
		});

		mark(0);
		return () => {
			gsap.set(track, { clearProps: 'transform' });
			steps.forEach((step) => step.classList.remove('is-on'));
		};
	});

	media.add(`not ${DESKTOP}`, () => {
		steps.forEach((step, index) => {
			ScrollTrigger.create({
				trigger: step,
				start: 'top 62%',
				onEnter: () => mark(index),
				onLeaveBack: () => mark(index - 1),
			});
		});
		return () => steps.forEach((step) => step.classList.remove('is-on'));
	});
}

function speed(scroll: ScrollTrigger) {
	const section = $('.st--speed');
	if (!section) return;
	const [lead, punch] = $$('.st__text > span', section);
	if (!lead || !punch) return;

	const options = { type: 'words', wordsClass: 'wd', aria: 'none' } as const;
	const leadWords = SplitText.create(lead, options).words;
	const punchWords = SplitText.create(punch, options).words;
	const total = leadWords.length + punchWords.length;
	gsap.set($('.st__text', section), { opacity: 1 });

	gsap
		.timeline({
			scrollTrigger: { trigger: section, start: 'top 78%', end: 'center 45%', scrub: 0.6 },
		})
		.fromTo(leadWords, { opacity: 0.36 }, { opacity: 1, stagger: 0.12, ease: 'none' }, 0)
		.fromTo(punchWords, { opacity: 0.58 }, { opacity: 1, stagger: 0.12, ease: 'none' }, leadWords.length * 0.12)
		.fromTo(lead, { xPercent: -7 }, { xPercent: 0, ease: 'none', duration: total * 0.12 }, 0)
		.fromTo(punch, { xPercent: 9 }, { xPercent: 0, ease: 'none', duration: total * 0.12 }, 0);

	gsap.fromTo(
		$$('.st__lanes i', section),
		{ xPercent: 60 },
		{
			xPercent: -160,
			ease: 'none',
			stagger: { each: 0.05, from: 'random' },
			scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.4 },
		},
	);

	const setSkew = gsap.quickSetter(punch, 'skewX', 'deg');
	let skew = 0;
	let visible = false;
	new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(section);
	gsap.ticker.add(() => {
		if (!visible) return;
		skew += (gsap.utils.clamp(-14, 14, scroll.getVelocity() / 190) - skew) * 0.1;
		setSkew(-Math.abs(skew));
	});
}

function renew() {
	const section = $('.st--renew');
	const text = $('.st--renew .st__text');
	if (section && text) settle(text, section, 'top 85%', 'center 52%');
}

function reasons() {
	const seal = $('.why__seal');
	if (!seal) return;
	gsap.fromTo(
		seal.parentElement,
		{ '--seal-y': '36px' },
		{
			'--seal-y': '0px',
			ease: 'none',
			scrollTrigger: { trigger: '.why', start: 'top 80%', end: 'top 20%', scrub: 0.8 },
		},
	);
}

function paper() {
	const section = $('.faq');
	if (!section) return;
	gsap.fromTo(
		section,
		{ '--tilt-in': 1 },
		{
			'--tilt-in': 0.25,
			ease: 'none',
			scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 30%', scrub: true },
		},
	);
	gsap.fromTo(
		section,
		{ '--tilt-out': 0.25 },
		{
			'--tilt-out': 1,
			ease: 'none',
			scrollTrigger: { trigger: section, start: 'bottom 80%', end: 'bottom top', scrub: true },
		},
	);
}

function closing() {
	const mark = $('.ftr__mark');
	if (!mark) return;
	gsap.fromTo(
		mark,
		{ xPercent: 9 },
		{
			xPercent: 0,
			ease: 'none',
			scrollTrigger: { trigger: '.ftr', start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
		},
	);
}

export async function start() {
	const late = root.classList.contains('fallback');
	clearTimeout(window.__failsafe);

	grain();

	if (reduced) {
		$$('.step').forEach((step) => step.classList.add('is-on'));
		return;
	}

	lightOnDemand();

	smoothScroll();
	header();
	questions();
	await breathe();

	const scroll = ScrollTrigger.create({ start: 0, end: 'max' });
	const media = gsap.matchMedia();

	await fontsReady();

	heroExit();
	marquee(scroll);
	await breathe();

	journey(media);
	await breathe();

	if (!late) {
		speed(scroll);
		renew();
		crumple();
		await breathe();
		reveals();
		parallax();
	}

	reasons();
	paper();
	closing();

	refreshOnLoad();
}

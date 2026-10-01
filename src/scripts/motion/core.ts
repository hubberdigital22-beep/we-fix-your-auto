import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const root = document.documentElement;
export const reduced = root.classList.contains('reduced');
export const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
export const DESKTOP = '(min-width: 56.25em)';

export const $ = <T extends HTMLElement = HTMLElement>(selector: string, scope: ParentNode = document) =>
	scope.querySelector<T>(selector);
export const $$ = <T extends HTMLElement = HTMLElement>(selector: string, scope: ParentNode = document) =>
	Array.from(scope.querySelectorAll<T>(selector));

export const breathe = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

export const fontsReady = () =>
	Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 900))]);

export function smoothScroll() {
	if (!finePointer) return;
	const lenis = new Lenis({
		lerp: 0.1,
		anchors: true,
		stopInertiaOnNavigate: true,
	});
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => lenis.raf(time * 1000));
	gsap.ticker.lagSmoothing(0);
}

export function header() {
	const bar = $('.hdr');
	if (!bar) return;
	ScrollTrigger.create({
		start: 0,
		end: 'max',
		onUpdate(self) {
			bar.classList.toggle('is-stuck', self.scroll() > 24);
		},
	});
}

export function riseLines(element: HTMLElement) {
	const split = SplitText.create(element, { type: 'lines', mask: 'lines', linesClass: 'ln', aria: 'none' });
	gsap.set(element, { opacity: 1 });
	gsap.from(split.lines, {
		yPercent: 118,
		rotate: 1.5,
		duration: 1.25,
		ease: 'expo.out',
		stagger: 0.09,
		onComplete: () => split.revert(),
	});
}

export function reveals() {
	$$('[data-lines]').forEach((element) => {
		ScrollTrigger.create({
			trigger: element,
			start: 'top 86%',
			once: true,
			onEnter: () => riseLines(element),
		});
	});

	ScrollTrigger.batch('[data-rise]', {
		start: 'top 90%',
		once: true,
		onEnter: (batch) =>
			gsap.fromTo(
				batch,
				{ opacity: 0, y: 28 },
				{ opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true },
			),
	});

	$$('[data-draw]').forEach((line) => {
		gsap.fromTo(
			line,
			{ scaleX: 0 },
			{
				scaleX: 1,
				duration: 1.4,
				ease: 'expo.out',
				scrollTrigger: { trigger: line, start: 'top 92%', once: true },
			},
		);
	});
}

export function settle(text: HTMLElement, trigger: Element, start: string, end: string) {
	const split = SplitText.create(text, { type: 'words,chars', charsClass: 'ch', aria: 'none' });
	const random = gsap.utils.random;
	gsap.set(text, { opacity: 1 });

	gsap
		.timeline({
			scrollTrigger: { trigger, start, end, scrub: 0.8 },
		})
		.fromTo(
			split.chars,
			{
				rotate: () => random(-26, 26),
				yPercent: () => random(-34, 34),
				xPercent: () => random(-22, 22),
				scaleY: () => random(0.72, 1.12),
				skewX: () => random(-18, 18),
				opacity: 0.4,
			},
			{
				rotate: 0,
				yPercent: 0,
				xPercent: 0,
				scaleY: 1,
				skewX: 0,
				opacity: 1,
				ease: 'power2.out',
				stagger: { each: 0.012, from: 'start' },
			},
		);
}

export function crumple() {
	$$('[data-crumple]').forEach((text) => settle(text, text, 'top 96%', 'top 58%'));
}

export function parallax() {
	$$('[data-parallax]').forEach((element) => {
		const distance = Number(element.dataset.parallax) || 0;
		gsap.fromTo(
			element,
			{ y: distance },
			{
				y: -distance,
				ease: 'none',
				scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: true },
			},
		);
	});
}

export function questions() {
	$$<HTMLDetailsElement>('details.qa').forEach((item) => {
		const summary = $('summary', item);
		const body = $('.qa__body', item);
		if (!summary || !body) return;

		summary.addEventListener('click', (event) => {
			event.preventDefault();
			gsap.killTweensOf(body);

			if (item.open && !item.classList.contains('is-closing')) {
				item.classList.add('is-closing');
				gsap.to(body, {
					height: 0,
					duration: 0.55,
					ease: 'power3.inOut',
					onComplete() {
						item.open = false;
						item.classList.remove('is-closing');
						gsap.set(body, { clearProps: 'height' });
						ScrollTrigger.refresh();
					},
				});
				return;
			}

			const from = item.classList.contains('is-closing') ? body.offsetHeight : 0;
			item.classList.remove('is-closing');
			item.open = true;
			gsap.fromTo(
				body,
				{ height: from },
				{
					height: 'auto',
					duration: 0.7,
					ease: 'expo.out',
					onComplete() {
						gsap.set(body, { clearProps: 'height' });
						ScrollTrigger.refresh();
					},
				},
			);
		});
	});
}

export function refreshOnLoad() {
	if (document.readyState === 'complete') ScrollTrigger.refresh();
	else window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

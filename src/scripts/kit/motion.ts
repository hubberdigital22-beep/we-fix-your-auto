import {
	$,
	$$,
	breathe,
	crumple,
	fontsReady,
	gsap,
	parallax,
	questions,
	reduced,
	refreshOnLoad,
	reveals,
	root,
	smoothScroll,
} from '../motion/core';

function hero() {
	const section = $('.hero');
	if (!section) return;

	const photo = $('.hero__photo img', section);
	if (photo) {
		gsap.fromTo(
			photo,
			{ yPercent: 0, scale: 1 },
			{
				yPercent: 16,
				scale: 1.06,
				ease: 'none',
				scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
			},
		);
	}

	const exit = { trigger: section, start: 'top top', end: 'bottom 24%', scrub: true };
	const body = $('.hero__body', section);
	if (body) {
		gsap.fromTo(body, { yPercent: 0 }, { yPercent: -8, ease: 'none', scrollTrigger: { ...exit } });
		gsap.fromTo(
			$$(':scope > :not(.pills), .pill', body),
			{ opacity: 1 },
			{ opacity: 0.2, ease: 'none', scrollTrigger: { ...exit } },
		);
	}

	const form = $('.hero__form', section);
	if (form) {
		gsap.fromTo(
			form,
			{ yPercent: 0 },
			{
				yPercent: -6,
				ease: 'none',
				scrollTrigger: { ...exit },
			},
		);
	}
}

function photos() {
	$$('[data-photo]').forEach((frame) => {
		const image = $('img', frame);
		if (!image) return;
		gsap.fromTo(
			image,
			{ yPercent: -8 },
			{
				yPercent: 8,
				ease: 'none',
				scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
			},
		);
	});
}

function expand() {
	$$('[data-expand]').forEach((media) => {
		const gutter = () => parseFloat(getComputedStyle(media.parentElement ?? media).paddingLeft) || 20;
		const scroll = { trigger: media, start: 'top 92%', end: 'top 18%', scrub: true, invalidateOnRefresh: true };

		gsap.fromTo(
			media,
			{ clipPath: () => `inset(0px ${gutter()}px 0px ${gutter()}px round 28px)` },
			{ clipPath: 'inset(0px 0px 0px 0px round 0px)', ease: 'none', scrollTrigger: scroll },
		);

		const image = $('.photo', media);
		if (image) gsap.fromTo(image, { scale: 1.14 }, { scale: 1, ease: 'none', scrollTrigger: { ...scroll } });
	});
}

function zoom() {
	$$('[data-zoom]').forEach((media) => {
		const image = $('.photo', media);
		if (!image) return;
		gsap.fromTo(
			image,
			{ scale: 1.18 },
			{
				scale: 1,
				ease: 'none',
				scrollTrigger: { trigger: media, start: 'top bottom', end: 'top 10%', scrub: true },
			},
		);
	});
}

function closing() {
	const mark = $('.ftr__mark');
	if (!mark) return;
	gsap.fromTo(
		mark,
		{ yPercent: 34 },
		{
			yPercent: 0,
			ease: 'none',
			scrollTrigger: { trigger: '.ftr', start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
		},
	);
}

export async function start() {
	const late = root.classList.contains('fallback');
	clearTimeout(window.__failsafe);

	if (reduced) return;

	smoothScroll();
	questions();
	await breathe();

	await fontsReady();

	hero();
	photos();
	expand();
	zoom();
	await breathe();

	if (!late) {
		crumple();
		reveals();
		parallax();
	}

	closing();

	refreshOnLoad();
}

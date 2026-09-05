import { cubicInOut } from 'svelte/easing';

const durationMs = 700;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

let animationFrame = 0;

document.documentElement.classList.add('js-anchor-scroll');

export function cancelProgrammaticScroll() {
	if (animationFrame === 0) return;
	cancelAnimationFrame(animationFrame);
	animationFrame = 0;
}

export function scrollToAnchor(hash: string, options: { instant?: boolean } = {}) {
	const id = normalizeHash(hash);
	if (id && location.hash !== id) {
		history.pushState(null, '', id);
	} else if (!id && location.hash) {
		history.pushState(null, '', location.pathname + location.search);
	}

	animateTo(targetY(id), options.instant === true);
}

export function onAnchorClick(event: MouseEvent) {
	if (
		event.defaultPrevented ||
		event.button !== 0 ||
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey
	) {
		return;
	}

	const link = (event.target as Element | null)?.closest('a[href]');
	if (!(link instanceof HTMLAnchorElement)) return;

	const url = new URL(link.href, location.href);
	if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) {
		return;
	}

	const id = normalizeHash(url.hash);
	if (id !== '' && id !== '#top' && !document.getElementById(id.slice(1))) {
		return;
	}

	event.preventDefault();
	scrollToAnchor(id);
}

export function onPopState() {
	animateTo(targetY(normalizeHash(location.hash)), reducedMotion.matches);
}

export function syncInitialAnchor() {
	if (location.hash) {
		history.scrollRestoration = 'manual';
		animateTo(targetY(normalizeHash(location.hash)), true);
	}
}

function normalizeHash(hash: string) {
	if (!hash || hash === '#') return '';
	return hash.startsWith('#') ? hash : `#${hash}`;
}

function targetY(hash: string) {
	if (hash === '' || hash === '#top') return 0;

	const el = document.getElementById(decodeURIComponent(hash.slice(1)));
	if (!el) return window.scrollY;

	const landmark =
		el.classList.contains('section') || el.classList.contains('hero')
			? (el.querySelector('.section-number, .hero-kicker') ?? el)
			: el;

	const y = landmark.getBoundingClientRect().top + window.scrollY - clearance();
	const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
	return Math.min(max, Math.max(0, y));
}

function clearance() {
	const header = document.querySelector('.site-header');
	const headerHeight = header instanceof HTMLElement ? header.getBoundingClientRect().height : 0;
	return headerHeight + readRootPx('--anchor-gap');
}

function readRootPx(variable: string) {
	const probe = document.createElement('div');
	probe.style.height = `var(${variable})`;
	probe.style.position = 'absolute';
	probe.style.visibility = 'hidden';
	document.documentElement.append(probe);
	const px = probe.getBoundingClientRect().height;
	probe.remove();
	return px;
}

function animateTo(to: number, instant: boolean) {
	cancelProgrammaticScroll();

	const from = window.scrollY;
	if (instant || reducedMotion.matches || Math.abs(to - from) < 1) {
		window.scrollTo(0, to);
		return;
	}

	const start = performance.now();

	const frame = (now: number) => {
		const t = Math.min(1, (now - start) / durationMs);
		window.scrollTo(0, from + (to - from) * cubicInOut(t));
		if (t < 1) {
			animationFrame = requestAnimationFrame(frame);
			return;
		}
		animationFrame = 0;
	};

	animationFrame = requestAnimationFrame(frame);
}

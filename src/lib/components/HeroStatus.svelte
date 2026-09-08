<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import { heroFacts } from '../data/content';

	const reducedMotion = new MediaQuery('prefers-reduced-motion: reduce');
	const cruiseSpeed = 38;
	const pauseMs = 2800;
	const easeMs = 900;

	let viewportEl: HTMLElement | undefined = $state();
	let measureEl: HTMLElement | undefined = $state();
	let overflowing = $state(false);
	let offset = $state(0);
	let dragging = $state(false);

	let copyWidth = 0;
	let pauseUntil = 0;
	let dragOrigin = 0;
	let dragStartOffset = 0;

	const marquee = $derived(overflowing && !reducedMotion.current);

	function wrapOffset(value: number) {
		if (copyWidth <= 0) return 0;

		let next = value % copyWidth;
		if (next > 0) next -= copyWidth;
		return next;
	}

	function pauseThenEase(now = performance.now()) {
		pauseUntil = now + pauseMs;
	}

	$effect(() => {
		const viewport = viewportEl;
		const measure = measureEl;
		const reduceMotion = reducedMotion.current;
		if (!viewport || !measure) return;

		const update = () => {
			copyWidth = measure.scrollWidth;
			overflowing = copyWidth > viewport.clientWidth + 1;
			if (!overflowing || reduceMotion) offset = 0;
		};

		const observer = new ResizeObserver(update);
		observer.observe(viewport);
		observer.observe(measure);
		update();

		return () => observer.disconnect();
	});

	$effect(() => {
		if (!marquee) return;

		let frame = 0;
		let last = performance.now();

		const tick = (now: number) => {
			const dt = Math.min(0.05, (now - last) / 1000);
			last = now;

			if (!dragging && now >= pauseUntil) {
				const eased = Math.min(1, (now - pauseUntil) / easeMs);
				offset = wrapOffset(offset - cruiseSpeed * eased * eased * dt);
			}

			frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	});

	function onPointerDown(event: PointerEvent) {
		if (!marquee) return;

		const target = event.currentTarget;
		if (!(target instanceof HTMLElement)) return;

		dragging = true;
		dragOrigin = event.clientX;
		dragStartOffset = offset;
		pauseUntil = Number.POSITIVE_INFINITY;
		target.setPointerCapture(event.pointerId);
	}

	function onPointerMove(event: PointerEvent) {
		if (!dragging) return;

		offset = wrapOffset(dragStartOffset + (event.clientX - dragOrigin));
	}

	function onPointerUp(event: PointerEvent) {
		if (!dragging) return;

		const target = event.currentTarget;
		dragging = false;
		if (target instanceof HTMLElement && target.hasPointerCapture(event.pointerId)) {
			target.releasePointerCapture(event.pointerId);
		}
		pauseThenEase();
	}
</script>

<div
	bind:this={viewportEl}
	class={[
		'hero-status',
		overflowing && 'is-overflowing',
		marquee && 'is-marquee',
		dragging && 'is-dragging'
	]}
	aria-label="Role, status, and background"
>
	<div class="hero-status-measure" bind:this={measureEl} aria-hidden="true">
		{#each heroFacts as fact (fact.label)}
			<div>
				<dt>{fact.label}</dt>
				<dd>{fact.value}</dd>
			</div>
		{/each}
	</div>

	<dl
		class="hero-status-track"
		style:transform={marquee ? `translate3d(${offset}px, 0, 0)` : undefined}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
	>
		{#each heroFacts as fact (fact.label)}
			<div>
				<dt>{fact.label}</dt>
				<dd>{fact.value}</dd>
			</div>
		{/each}
		{#if marquee}
			{#each heroFacts as fact (`dup-${fact.label}`)}
				<div aria-hidden="true">
					<dt>{fact.label}</dt>
					<dd>{fact.value}</dd>
				</div>
			{/each}
		{/if}
	</dl>
</div>

<style>
  .hero-status {
    position: relative;
    overflow: hidden;
    grid-column: 1 / -1;
    align-self: end;
    width: 100vw;
    max-width: 100vw;
    min-width: 0;
    min-height: 4.75rem;
    margin-left: calc(50% - 50vw);
    color: var(--paper-muted);
    font-family: var(--mono);
    font-size: 0.72rem;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .hero-status.is-overflowing:not(.is-marquee) {
    overflow-x: auto;
  }

  .hero-status::before,
  .hero-status::after {
    position: absolute;
    right: calc(50% - 50vw);
    left: calc(50% - 50vw);
    z-index: 1;
    border-top: 1px solid var(--line);
    content: "";
    pointer-events: none;
  }

  .hero-status::before {
    top: 0;
  }

  .hero-status::after {
    bottom: 0;
  }

  .hero-status-measure,
  .hero-status-track {
    display: flex;
    align-items: stretch;
    min-height: 4.75rem;
    margin: 0;
  }

  .hero-status-measure {
    position: absolute;
    visibility: hidden;
    pointer-events: none;
    white-space: nowrap;
  }

  .hero-status-track {
    width: max-content;
    min-width: 100%;
    user-select: none;
    touch-action: pan-y;
  }

  .hero-status:not(.is-overflowing) .hero-status-track {
    justify-content: center;
  }

  .hero-status.is-marquee .hero-status-track {
    cursor: grab;
    touch-action: pan-x;
  }

  .hero-status.is-dragging .hero-status-track {
    cursor: grabbing;
  }

  .hero-status-measure div,
  .hero-status-track div {
    position: relative;
    display: grid;
    flex: 0 0 auto;
    gap: 0.22rem;
    align-content: center;
    justify-items: start;
    padding-inline: 2.35rem;
    text-align: left;
    white-space: nowrap;
  }

  .hero-status-measure div:not(:last-child)::after,
  .hero-status:not(.is-overflowing) .hero-status-track div:not(:last-child)::after,
  .hero-status.is-overflowing .hero-status-track div::after {
    position: absolute;
    top: 50%;
    right: 0;
    width: 0.28rem;
    height: 0.28rem;
    border-radius: 50%;
    background: var(--signal);
    content: "";
    transform: translate(50%, -50%);
  }

  .hero-status dt,
  .hero-status dd {
    margin: 0;
  }

  .hero-status dt {
    font-size: 0.52rem;
    letter-spacing: 0.14em;
    opacity: 0.58;
  }
</style>

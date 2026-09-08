<script lang="ts">
	import { tick } from 'svelte';
	import type { ExperienceRole } from '../data/content';
	import { createAnchorSlug } from '../format';
	import PhotoWall from './PhotoWall.svelte';

	let { roles }: { roles: ExperienceRole[] } = $props();
	let expandedRoles = $state<Record<string, boolean>>({});

	const motionDuration = 320;
	const motionEasing = 'cubic-bezier(0.22, 1, 0.36, 1)';

	async function toggleRole(event: MouseEvent, company: string) {
		const button = event.currentTarget;
		if (!(button instanceof HTMLButtonElement)) return;

		const entry = button.closest<HTMLElement>('.timeline-entry');
		if (!entry) return;

		const photoItems = Array.from(entry.querySelectorAll<HTMLElement>('.photo-wall-item'));
		const startHeight = entry.getBoundingClientRect().height;
		const startPhotoRects = photoItems.map((item) => item.getBoundingClientRect());
		const opening = !(expandedRoles[company] ?? false);

		expandedRoles[company] = opening;
		await tick();

		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const endHeight = entry.getBoundingClientRect().height;
		entry.style.height = `${startHeight}px`;
		entry.style.overflow = 'clip';

		const animations = photoItems.map((item, index) => {
			const start = startPhotoRects[index];
			const end = item.getBoundingClientRect();
			const translateX = start.left + start.width / 2 - (end.left + end.width / 2);
			const translateY = start.top + start.height / 2 - (end.top + end.height / 2);
			const finalTransform = getComputedStyle(item).transform;
			const baseTransform = finalTransform === 'none' ? '' : finalTransform;

			return item.animate(
				[
					{
						transform: `translate(${translateX}px, ${translateY}px) scale(${start.width / end.width}, ${start.height / end.height}) ${baseTransform}`
					},
					{ transform: baseTransform || 'none' }
				],
				{ duration: motionDuration, easing: motionEasing }
			);
		});

		const heightAnimation = entry.animate(
			[{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
			{ duration: motionDuration, easing: motionEasing }
		);

		await Promise.allSettled([heightAnimation.finished, ...animations.map(({ finished }) => finished)]);
		entry.style.removeProperty('height');
		entry.style.removeProperty('overflow');
	}
</script>

<div class="timeline">
	{#each roles as role (role.company)}
		{@const entryId = `experience-${createAnchorSlug(role.company)}`}
		{@const expanded = expandedRoles[role.company] ?? false}
		<article
			id={entryId}
			class={{ 'timeline-entry': true, 'is-open': expanded }}
			data-disclosure
		>
			<button
				class="timeline-summary"
				type="button"
				aria-expanded={expanded}
				aria-controls={`${entryId}-content`}
				onclick={(event) => toggleRole(event, role.company)}
			>
				<p class="timeline-dates">{role.dates}</p>
				<span class="timeline-marker" aria-hidden="true"></span>
				<div class="timeline-heading">
					<p class="timeline-role">{role.role}</p>
					<h3>{role.company}</h3>
				</div>
				<p class="timeline-summary-copy">{role.summary}</p>
				<p class="timeline-toggle">
					<span class="when-closed">Read the details · {role.highlights.length}</span>
					<span class="when-open">Hide the details</span>
					<span class="timeline-arrow" aria-hidden="true">↓</span>
				</p>
			</button>

			<div class="timeline-details">
				<div
					id={`${entryId}-content`}
					class="timeline-copy"
					aria-hidden={!expanded}
					inert={!expanded}
				>
					<ul class="timeline-highlights">
						{#each role.highlights as highlight (`${role.company}-${highlight}`)}
							<li>{highlight}</li>
						{/each}
					</ul>

					<div class="timeline-footer">
						<ul class="timeline-tools" aria-label={`${role.company} tools`}>
							{#each role.tools as tool (`${role.company}-${tool}`)}
								<li>{tool}</li>
							{/each}
						</ul>

						<a class="text-link" href={role.website} target="_blank" rel="noreferrer">
							Live site <span aria-hidden="true">↗</span>
						</a>
					</div>
				</div>

				<div class="timeline-wall">
					<PhotoWall
						layout="stack"
						collapsed={!expanded}
						items={role.images.map((image) => ({ ...image, href: role.website }))}
						ariaLabel={`${role.company} gallery`}
					/>
				</div>

				{#if !expanded}
					<button
						class="timeline-preview-button"
						type="button"
						tabindex="-1"
						aria-hidden="true"
						onclick={(event) => toggleRole(event, role.company)}
					></button>
				{/if}
			</div>
		</article>
	{/each}
</div>

<style>
	.timeline {
		--timeline-gap: clamp(0.75rem, 2vw, 2rem);
		position: relative;
	}

	.timeline::before {
		position: absolute;
		top: clamp(1.85rem, 3vw, 2.6rem);
		bottom: clamp(1.85rem, 3vw, 2.6rem);
		left: calc(12.5rem + var(--timeline-gap) + 0.75rem);
		width: 1px;
		background: var(--line);
		content: '';
	}

	.timeline-entry {
		position: relative;
	}

	.timeline-entry + .timeline-entry {
		margin-top: 0.5rem;
	}

	.timeline-summary {
		display: grid;
		width: 100%;
		padding: clamp(1.5rem, 3vw, 2.25rem) 0;
		border: 0;
		color: inherit;
		background: transparent;
		text-align: left;
		cursor: pointer;
		grid-template-columns: 12.5rem 1.5rem max-content minmax(16rem, 1fr) minmax(11rem, 13rem);
		grid-template-areas:
			'dates marker heading summary preview'
			'dates marker heading toggle preview';
		gap: 0.75rem var(--timeline-gap);
	}

	.timeline-marker {
		position: relative;
		z-index: 1;
		width: 0.75rem;
		height: 0.75rem;
		margin-top: 0.1rem;
		border: 1px solid var(--signal);
		border-radius: 50%;
		background: var(--ink);
		grid-area: marker;
		justify-self: center;
		transition:
			background-color 180ms ease,
			box-shadow 180ms ease;
	}

	.timeline-entry.is-open .timeline-marker,
	.timeline-summary:hover .timeline-marker {
		background: var(--signal);
		box-shadow: 0 0 0 5px rgb(241 91 64 / 12%);
	}

	.timeline-heading {
		display: grid;
		align-content: start;
		grid-area: heading;
		gap: 0.45rem;
	}

	.timeline-role,
	.timeline-dates,
	.timeline-toggle {
		font-family: var(--mono);
		text-transform: uppercase;
	}

	.timeline-role {
		color: var(--signal);
		font-size: 0.72rem;
		letter-spacing: 0.1em;
	}

	.timeline-dates {
		padding-top: 0.05rem;
		color: var(--paper-muted);
		font-size: 0.65rem;
		letter-spacing: 0.05em;
		line-height: 1.45;
		text-align: right;
		white-space: nowrap;
		grid-area: dates;
	}

	.timeline-heading h3 {
		font-family: var(--serif);
		font-size: clamp(1.7rem, 2.4vw, 2.35rem);
		font-weight: 400;
		letter-spacing: -0.035em;
	}

	.timeline-summary-copy {
		grid-area: summary;
		font-size: 1.05rem;
		line-height: 1.6;
	}

	.timeline-toggle {
		display: flex;
		align-items: center;
		align-self: end;
		width: fit-content;
		min-height: 2rem;
		color: var(--paper-muted);
		font-size: 0.65rem;
		letter-spacing: 0.07em;
		grid-area: toggle;
		gap: 0.55rem;
	}

	.timeline-toggle > span:not(.timeline-arrow) {
		text-decoration: underline;
		text-decoration-color: transparent;
		text-underline-offset: 5px;
		transition: text-decoration-color 180ms ease;
	}

	.timeline-summary:hover .timeline-toggle > span:not(.timeline-arrow),
	.timeline-summary:focus-visible .timeline-toggle > span:not(.timeline-arrow),
	.timeline-entry:has(.timeline-preview-button:hover) .timeline-toggle > span:not(.timeline-arrow) {
		text-decoration-color: var(--signal);
	}

	.when-open {
		display: none;
	}

	.timeline-arrow {
		color: var(--signal);
		font-size: 0.9rem;
		transition: transform 180ms ease;
	}

	.timeline-entry.is-open .when-closed {
		display: none;
	}

	.timeline-entry.is-open .when-open {
		display: inline;
	}

	.timeline-entry.is-open .timeline-arrow {
		transform: rotate(180deg);
	}

	.timeline-details {
		display: grid;
		padding: 0 0 clamp(2rem, 4vw, 3rem)
			calc(14rem + var(--timeline-gap) + var(--timeline-gap));
		grid-template-columns: minmax(0, 1fr) minmax(0, 19rem);
		grid-template-areas:
			'copy wall';
		gap: 1.5rem clamp(1.5rem, 4vw, 3rem);
	}

	.timeline-entry:not(.is-open) .timeline-details {
		position: absolute;
		top: clamp(1.5rem, 3vw, 2.25rem);
		right: 0;
		display: block;
		width: min(14.25rem, 19vw);
		height: 8.25rem;
		padding: 0;
	}

	.timeline-entry:not(.is-open) .timeline-wall {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.timeline-preview-button {
		position: absolute;
		z-index: 2;
		inset: 0;
		border: 0;
		border-radius: 0;
		background: transparent;
		cursor: pointer;
	}

	.timeline-copy {
		display: grid;
		align-content: start;
		grid-area: copy;
		gap: 1.5rem;
	}

	.timeline-entry:not(.is-open) .timeline-copy {
		display: none;
	}

	.timeline-entry.is-open .timeline-copy {
		animation: reveal-copy 240ms ease 60ms both;
	}

	@keyframes reveal-copy {
		from {
			opacity: 0;
			transform: translateY(-0.5rem);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.timeline-highlights {
		display: grid;
		color: var(--paper-muted);
		line-height: 1.6;
		gap: 0.8rem;
	}

	.timeline-highlights li {
		position: relative;
		padding-left: 1.4rem;
	}

	.timeline-highlights li::before {
		position: absolute;
		top: 0.72em;
		left: 0;
		width: 0.55rem;
		height: 1px;
		background: var(--signal);
		content: '';
	}

	.timeline-wall {
		min-width: 0;
		grid-area: wall;
	}

	.timeline-footer {
		display: grid;
		align-content: start;
		gap: 1rem;
	}

	.timeline-footer .text-link {
		width: fit-content;
		justify-self: start;
	}

	.timeline-tools {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.timeline-tools li {
		padding: 0.4rem 0.55rem;
		border: 1px solid var(--line);
		color: var(--paper-muted);
		font-family: var(--mono);
		font-size: 0.6rem;
		letter-spacing: 0.04em;
	}

	@media (max-width: 1050px) {
		.timeline::before {
			left: calc(12.5rem + var(--timeline-gap) + 0.75rem);
		}

		.timeline-summary {
			grid-template-columns: 12.5rem 1.5rem minmax(0, 1fr) minmax(10rem, 12rem);
			grid-template-areas:
				'dates marker heading preview'
				'dates marker summary preview'
				'dates marker toggle preview';
		}

		.timeline-details {
			padding-left: calc(14rem + var(--timeline-gap) + var(--timeline-gap));
			grid-template-columns: minmax(0, 1fr);
			grid-template-areas:
				'copy'
				'wall';
		}

		.timeline-wall {
			width: min(100%, 24rem);
			justify-self: center;
		}

		.timeline-entry:not(.is-open) .timeline-details {
			width: min(13rem, 21vw);
			padding: 0;
		}
	}

	@media (max-width: 680px) {
		.timeline::before {
			left: 0.35rem;
		}

		.timeline-summary {
			padding-left: 1.6rem;
			grid-template-columns: minmax(0, 1fr);
			grid-template-areas:
				'dates'
				'heading'
				'summary'
				'toggle';
		}

		.timeline-marker {
			position: absolute;
			top: clamp(1.75rem, 3vw, 2.5rem);
			left: 0;
		}

		.timeline-dates {
			text-align: left;
		}

		.timeline-details {
			padding-left: 1.6rem;
		}

		.timeline-entry:not(.is-open) .timeline-details {
			position: relative;
			top: auto;
			right: auto;
			width: min(calc(100% - 3.2rem), 22rem);
			height: 11rem;
			margin: -0.75rem auto 0.5rem;
			padding: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.timeline-entry.is-open .timeline-copy {
			animation: none;
		}
	}
</style>

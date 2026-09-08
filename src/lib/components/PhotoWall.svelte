<script module lang="ts">
	const failedImageUrls = $state<string[]>([]);

	function recordFailedImage(url: string) {
		if (!failedImageUrls.includes(url)) {
			failedImageUrls.push(url);
		}
	}
</script>

<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import type { PhotoWallItem } from '../data/content';

	let {
		items,
		label,
		ariaLabel,
		layout = 'grid',
		onselect
	}: {
		items: PhotoWallItem[];
		label?: string;
		ariaLabel?: string;
		layout?: 'fill' | 'stack' | 'grid';
		onselect?: (event: MouseEvent, href: string) => void;
	} = $props();

	const uid = $props.id();
	let visible = $derived(items.filter((item) => !failedImageUrls.includes(item.src)));

	const minPhotoRatio = 3 / 4;
	const maxPhotoRatio = 5 / 3;

	const fitPhoto: Attachment<HTMLImageElement> = (img) => {
		const apply = () => {
			if (img.naturalWidth === 0 || img.naturalHeight === 0) {
				return;
			}

			const ratio = img.naturalWidth / img.naturalHeight;
			const fitted = Math.min(maxPhotoRatio, Math.max(minPhotoRatio, ratio));

			img.style.setProperty('--photo-ratio', `${fitted}`);
		};

		apply();
		img.addEventListener('load', apply);
		return () => img.removeEventListener('load', apply);
	};
</script>

{#if visible.length > 0}
	<section
		class="photo-wall"
		data-layout={layout}
		aria-labelledby={label ? `${uid}-title` : undefined}
		aria-label={label ? undefined : ariaLabel}
	>
		{#if label}
			<header class="photo-wall-heading">
				<small id={`${uid}-title`}>{label}</small>
				<small>{visible.length} {visible.length === 1 ? 'frame' : 'frames'}</small>
			</header>
		{/if}
		<ul class="photo-wall-grid">
			{#each visible as item (item.src)}
				{#snippet frame()}
					<img
						src={item.src}
						alt={item.alt}
						loading={layout === 'fill' ? undefined : 'lazy'}
						decoding="async"
						{@attach fitPhoto}
						onerror={() => recordFailedImage(item.src)}
					/>
					<span class="photo-wall-caption">{item.caption}</span>
				{/snippet}
				<li class="photo-wall-item">
					{#if item.href}
						{@const inPage = item.href.startsWith('#')}
						<a
							href={item.href}
							target={inPage ? undefined : '_blank'}
							rel={inPage ? undefined : 'noreferrer'}
							aria-label={inPage ? `Jump to ${item.caption}` : `Open ${item.caption}`}
							onclick={(event) => item.href && onselect?.(event, item.href)}
						>
							{@render frame()}
						</a>
					{:else}
						<div>
							{@render frame()}
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</section>
{/if}

<style>
  .photo-wall {
    display: grid;
    min-width: 0;
    row-gap: var(--space-kicker);
  }

  .photo-wall[data-layout='fill'] {
    min-height: 0;
    height: 100%;
    overflow: hidden;
    container-type: size;
    grid-template-rows: auto minmax(0, 1fr);
  }

  .photo-wall-heading {
    position: relative;
    z-index: 2;
    display: flex;
    align-self: start;
    justify-content: space-between;
    margin: 0;
    gap: 1rem;
    padding-inline: var(--space-kicker);
    color: var(--signal);
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.09em;
    line-height: 1.2;
    text-transform: uppercase;
  }

  .photo-wall-heading small {
    font: inherit;
  }

  .photo-wall-heading small:last-child {
    color: var(--paper-muted);
  }

  .photo-wall-grid {
    display: grid;
    align-self: stretch;
    min-height: 0;
    padding: 1rem 0.15rem 1.5rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.35rem 0.45rem;
    align-content: start;
    isolation: isolate;
  }

  [data-layout='fill'] .photo-wall-grid {
    display: flex;
    padding: clamp(0.75rem, 2.5cqw, 1.25rem);
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    gap: 1.5rem 0;
  }

  .photo-wall-item {
    --angle: -3deg;
    --shift: 0.7rem;
    --nudge: -0.55rem;
    --hover-scale: 1.09;
    position: relative;
    z-index: 1;
    transform: rotate(var(--angle)) translate(var(--nudge), var(--shift, 0));
    transition:
      z-index 0s,
      transform 450ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .photo-wall-item:nth-child(5n + 2) {
    --angle: 3.8deg;
    --shift: 1.2rem;
    --nudge: 0.7rem;
  }

  .photo-wall-item:nth-child(5n + 3) {
    --angle: -3.6deg;
    --shift: -0.4rem;
    --nudge: 0.45rem;
  }

  .photo-wall-item:nth-child(5n + 4) {
    --angle: 2.6deg;
    --shift: 0.95rem;
    --nudge: -0.65rem;
  }

  .photo-wall-item:nth-child(5n) {
    --angle: -2.2deg;
    --shift: -0.65rem;
    --nudge: 0.6rem;
  }

  [data-layout='fill'] .photo-wall-item {
    --angle: -2deg;
    --nudge: 0;
    --shift: 0;
    width: min(34%, max(9.5rem, 34cqh));
    margin: -2.2%;
  }

  [data-layout='fill'] .photo-wall-item:nth-child(5n + 2) {
    --angle: 3deg;
    --shift: 0.85rem;
    width: min(42%, max(11.5rem, 42cqh));
  }

  [data-layout='fill'] .photo-wall-item:nth-child(5n + 3) {
    --angle: -4deg;
    --shift: -0.15rem;
    width: min(30%, max(8.25rem, 29cqh));
  }

  [data-layout='fill'] .photo-wall-item:nth-child(5n + 4) {
    --angle: 2deg;
    --shift: 0.2rem;
    width: min(39%, max(10.5rem, 38cqh));
  }

  [data-layout='fill'] .photo-wall-item:nth-child(5n) {
    --angle: -1deg;
    --shift: -0.2rem;
    width: min(32%, max(9rem, 32cqh));
  }

  [data-layout='fill'] .photo-wall-item a,
  [data-layout='fill'] .photo-wall-item div {
    box-shadow: 0 0 0.8rem rgb(0 0 0 / 24%);
  }

  [data-layout='stack'] {
    height: 100%;
    min-height: 0;
    grid-template-rows: minmax(0, 1fr);
  }

  [data-layout='stack'] .photo-wall-grid {
    display: flex;
    height: 100%;
    min-height: 0;
    padding: 0.15rem 0.55rem 0.35rem;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    gap: 1.85rem;
    grid-template-columns: minmax(0, 1fr);
  }

  [data-layout='stack'] .photo-wall-item,
  [data-layout='stack'] .photo-wall-item:nth-child(5n + 2),
  [data-layout='stack'] .photo-wall-item:nth-child(5n + 3),
  [data-layout='stack'] .photo-wall-item:nth-child(5n + 4),
  [data-layout='stack'] .photo-wall-item:nth-child(5n) {
    width: min(100%, 19rem);
    flex-shrink: 0;
    --angle: -1.7deg;
    --shift: 0;
    --nudge: 0;
    --hover-scale: 1.05;
  }

  [data-layout='grid'] .photo-wall-grid {
    display: grid;
    align-self: start;
    min-width: 0;
    padding: 0.85rem 0.55rem 1.1rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.85rem 0.65rem;
    align-items: start;
  }

  [data-layout='grid'] .photo-wall-item,
  [data-layout='grid'] .photo-wall-item:nth-child(5n + 2),
  [data-layout='grid'] .photo-wall-item:nth-child(5n + 3),
  [data-layout='grid'] .photo-wall-item:nth-child(5n + 4),
  [data-layout='grid'] .photo-wall-item:nth-child(5n) {
    width: 100%;
    --angle: -1.7deg;
    --shift: 0;
    --nudge: 0;
    --hover-scale: 1.04;
  }

  [data-layout='stack'] .photo-wall-item:nth-child(even),
  [data-layout='grid'] .photo-wall-item:nth-child(even) {
    --angle: 1.8deg;
  }

  [data-layout='stack'] .photo-wall-item:nth-child(3n),
  [data-layout='grid'] .photo-wall-item:nth-child(3n) {
    --angle: -0.9deg;
  }

  [data-layout='stack'] .photo-wall-item a,
  [data-layout='stack'] .photo-wall-item div,
  [data-layout='grid'] .photo-wall-item a,
  [data-layout='grid'] .photo-wall-item div {
    padding: 0.4rem 0.4rem 0.55rem;
    box-shadow: 0.45rem 0.5rem 0 rgb(0 0 0 / 28%);
  }

  .photo-wall-item:hover,
  .photo-wall-item:focus-within {
    z-index: 5;
    transform: rotate(0) translate(0) scale(var(--hover-scale));
  }

  .photo-wall-item a,
  .photo-wall-item div {
    display: block;
    padding: 0.45rem 0.45rem 0.65rem;
    color: var(--ink);
    background: var(--paper-bright);
    box-shadow: 0.7rem 0.8rem 0 rgb(0 0 0 / 30%);
    text-decoration: none;
  }

  .photo-wall-item img {
    width: 100%;
    height: auto;
    aspect-ratio: var(--photo-ratio, 4 / 3);
    object-fit: contain;
    object-position: center;
    background: var(--paper);
  }

  .photo-wall-caption {
    display: block;
    overflow: hidden;
    padding: 0.5rem 0.25rem 0;
    font-family: var(--mono);
    font-size: 0.55rem;
    letter-spacing: 0.06em;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
  }

  @media (max-width: 1050px) {
    .photo-wall[data-layout='fill'] {
      height: auto;
      overflow: visible;
      grid-template-rows: none;
      container-type: normal;
    }

    .photo-wall-heading {
      padding-inline: 0;
    }

    [data-layout='fill'] .photo-wall-grid {
      display: grid;
      padding: 1rem 0.15rem 1.5rem;
      overflow: visible;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.35rem 0.45rem;
      align-content: start;
    }

    [data-layout='fill'] .photo-wall-item,
    [data-layout='fill'] .photo-wall-item:nth-child(5n + 2),
    [data-layout='fill'] .photo-wall-item:nth-child(5n + 3),
    [data-layout='fill'] .photo-wall-item:nth-child(5n + 4),
    [data-layout='fill'] .photo-wall-item:nth-child(5n) {
      width: auto;
      margin: 0;
    }

    [data-layout='fill'] .photo-wall-item {
      --angle: -3deg;
      --shift: 0.7rem;
      --nudge: -0.55rem;
    }

    [data-layout='fill'] .photo-wall-item:nth-child(5n + 2) {
      --angle: 3.8deg;
      --shift: 1.2rem;
      --nudge: 0.7rem;
    }

    [data-layout='fill'] .photo-wall-item:nth-child(5n + 3) {
      --angle: -3.6deg;
      --shift: -0.4rem;
      --nudge: 0.45rem;
    }

    [data-layout='fill'] .photo-wall-item:nth-child(5n + 4) {
      --angle: 2.6deg;
      --shift: 0.95rem;
      --nudge: -0.65rem;
    }

    [data-layout='fill'] .photo-wall-item:nth-child(5n) {
      --angle: -2.2deg;
      --shift: -0.65rem;
      --nudge: 0.6rem;
    }
  }
</style>

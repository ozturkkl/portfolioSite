<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { PhotoWallItem } from '../data/content';
	import PhotoWall from './PhotoWall.svelte';

	let {
		id,
		kicker,
		title,
		description,
		meta,
		images = [],
		items = [],
		chips = [],
		chipsLabel,
		children
	}: {
		id: string;
		kicker: string;
		title: string;
		description: string;
		meta?: Snippet;
		images?: PhotoWallItem[];
		items?: string[];
		chips?: string[];
		chipsLabel?: string;
		children?: Snippet;
	} = $props();
</script>

<article {id} class={{ entry: true, 'has-media': images.length > 0 }}>
	<header class="entry-header">
		<p class="entry-kicker">{kicker}</p>
		<div class="entry-heading">
			<h3>{title}</h3>
			{#if meta}
				<div class="entry-meta">{@render meta()}</div>
			{/if}
		</div>
	</header>

	<p class="entry-summary">{description}</p>

	{#if images.length > 0}
		<div class="entry-wall">
			<PhotoWall layout="stack" items={images} ariaLabel={`${kicker} gallery`} />
		</div>
	{/if}

	{#if items.length > 0}
		<ul class="entry-list">
			{#each items as item (`${id}-${item}`)}
				<li>{item}</li>
			{/each}
		</ul>
	{/if}

	{#if chips.length > 0}
		<ul class="entry-chips" aria-label={chipsLabel ?? `${kicker} tools`}>
			{#each chips as chip (`${id}-${chip}`)}
				<li>{chip}</li>
			{/each}
		</ul>
	{/if}

	{#if children}
		<div class="entry-links">{@render children()}</div>
	{/if}
</article>

<style>
  .entry {
    position: relative;
    display: grid;
    padding: clamp(1.6rem, 3vw, 2.5rem) 0;
    border-bottom: 1px solid var(--line);
    grid-template-columns: minmax(0, 1fr);
  }

  .entry.has-media {
    align-items: start;
    column-gap: clamp(1.25rem, 2.5vw, 2rem);
    grid-template-columns: minmax(0, 1fr) minmax(0, 19rem);
    grid-template-areas:
      "header wall"
      "summary wall"
      "list wall"
      "chips wall"
      "links wall";
  }

  .entry::before {
    position: absolute;
    top: -4px;
    left: 0;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--signal);
    content: "";
    box-shadow: 0 0 0 5px var(--ink);
  }

  .entry-header {
    display: grid;
    justify-items: stretch;
    gap: var(--space-kicker);
  }

  .has-media .entry-header {
    grid-area: header;
  }

  .entry-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.55rem 1.15rem;
  }

  .entry-kicker {
    color: var(--signal);
    font-family: var(--mono);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .entry h3 {
    flex: 1 1 8rem;
    min-width: min(100%, 8rem);
    font-family: var(--serif);
    font-size: 2.35rem;
    font-weight: 400;
    letter-spacing: -0.035em;
  }

  .entry-meta {
    display: grid;
    flex: 0 0 auto;
    justify-items: end;
    text-align: right;
    color: var(--paper-muted);
    font-family: var(--mono);
    font-size: 0.68rem;
    line-height: 1.45;
    text-transform: uppercase;
  }

  .entry-summary {
    margin-top: 1.15rem;
    font-size: 1.05rem;
    line-height: 1.6;
  }

  .entry:not(.has-media) .entry-summary {
    padding-right: clamp(2.25rem, 6vw, 5rem);
  }

  .entry:not(.has-media) .entry-meta {
    margin-right: clamp(1.5rem, 4vw, 3.25rem);
  }

  .has-media .entry-summary {
    grid-area: summary;
  }

  .entry-wall {
    min-width: 0;
  }

  .has-media .entry-wall {
    display: grid;
    grid-area: wall;
    align-self: stretch;
    min-height: 0;
  }

  .entry-list {
    display: grid;
    gap: 0.7rem;
    margin-top: 1.25rem;
    color: var(--paper-muted);
    line-height: 1.6;
  }

  .has-media .entry-list {
    grid-area: list;
  }

  .entry-list li {
    position: relative;
    padding-left: 1.4rem;
  }

  .entry-list li::before {
    position: absolute;
    top: 0.72em;
    left: 0;
    width: 0.55rem;
    height: 1px;
    background: var(--signal);
    content: "";
  }

  .entry-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 1.25rem;
  }

  .has-media .entry-chips {
    grid-area: chips;
  }

  .entry-chips li {
    padding: 0.4rem 0.55rem;
    border: 1px solid var(--line);
    color: var(--paper-muted);
    font-family: var(--mono);
    font-size: 0.6rem;
    letter-spacing: 0.04em;
  }

  .entry-links {
    display: flex;
    gap: 1.5rem;
    margin-top: 1.15rem;
  }

  .has-media .entry-links {
    grid-area: links;
  }

  @media (max-width: 860px) {
    .entry h3 {
      font-size: 1.6rem;
    }

    .entry-summary {
      font-size: 0.98rem;
    }

    .entry.has-media {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas:
        "header"
        "summary"
        "wall"
        "list"
        "chips"
        "links";
    }

    .has-media .entry-wall {
      width: min(100%, 24rem);
      margin-top: 1.25rem;
      justify-self: center;
    }

    .entry:not(.has-media) .entry-summary {
      padding-right: 0;
    }

    .entry:not(.has-media) .entry-meta {
      margin-right: 0;
    }
  }
</style>

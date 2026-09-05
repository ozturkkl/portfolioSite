<script lang="ts">
	import { tick } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import { copy, heroQuotes, photoWallItems, profile } from '../data/content';
	import projects from '../data/projects.generated.json';
	import { formatRepositoryName } from '../format';
	import { scrollToAnchor } from '../scroll';
	import { appState } from '../appState.svelte';
	import HeroStatus from './HeroStatus.svelte';
	import PhotoWall from './PhotoWall.svelte';

	const reducedMotion = new MediaQuery('prefers-reduced-motion: reduce');
	const quoteDuration = 8000;

	let quoteIndex = $state(0);
	let fadeMs = $derived(reducedMotion.current ? 0 : 420);

	$effect(() => {
		if (heroQuotes.length < 2 || reducedMotion.current) return;

		const current = quoteIndex;
		const timer = setTimeout(() => {
			quoteIndex = (current + 1) % heroQuotes.length;
		}, quoteDuration);

		return () => clearTimeout(timer);
	});

	let photoWall = $derived([
		...photoWallItems,
		...projects.flatMap((project) =>
			project.image === null
				? []
				: [
						{
							src: project.image,
							alt: `README preview from the ${formatRepositoryName(project.name)} repository`,
							caption: formatRepositoryName(project.name),
							href: `#project-${project.name}`
						}
					]
		)
	]);

	async function revealProjectCard(event: MouseEvent, href: string) {
		if (!href.startsWith('#project-') || document.getElementById(href.slice(1))) {
			return;
		}

		event.preventDefault();
		appState.showAllProjects = true;
		await tick();
		scrollToAnchor(href);
	}
</script>

{#snippet quoteNav()}
	<div class="quote-nav" role="tablist" aria-label="Hero quotes">
		{#each heroQuotes as quote, index (`${quote.attribution}-${index}`)}
			<button
				type="button"
				role="tab"
				aria-label="Show quote {index + 1}"
				aria-selected={index === quoteIndex}
				onclick={() => (quoteIndex = index)}
			></button>
		{/each}
	</div>
{/snippet}

<section id="top" class="hero" aria-labelledby="hero-title">
	<div class="hero-primary">
		<p class="hero-kicker">
			<span>{copy.hero.kicker}</span>
			<span>{profile.location}</span>
		</p>
		<div class="hero-copy">
			<h1 id="hero-title">{profile.title}</h1>
			<div class="hero-summary" style:--quote-fade="{fadeMs}ms" aria-live="polite">
				{#each heroQuotes as quote, index (`${quote.attribution}-${index}`)}
					<blockquote class={{ active: index === quoteIndex }} aria-hidden={index !== quoteIndex}>
						<p>“{quote.text}”</p>
						<cite>{quote.attribution}</cite>
						{#if heroQuotes.length > 1}
							{@render quoteNav()}
						{/if}
					</blockquote>
				{/each}
			</div>
			<div class="hero-actions">
				<a class="button-link primary" href="#experience">View experience</a>
				<a class="button-link secondary" href="#contact">Get in touch</a>
			</div>
		</div>
	</div>

	<div class="hero-wall">
		<PhotoWall
			layout="fill"
			label={copy.hero.photoWallLabel}
			items={photoWall}
			onselect={revealProjectCard}
		/>
	</div>

	<HeroStatus />
</section>

<style>
  .hero {
    display: grid;
    align-content: stretch;
    width: min(100% - 7vw, 1440px);
    height: 100svh;
    min-height: 100svh;
    max-height: 100svh;
    margin-inline: auto;
    padding: calc(var(--header-height) + var(--anchor-gap)) 0 2rem;
    grid-template-columns: minmax(0, 1fr) minmax(24rem, 1.08fr);
    grid-template-rows: minmax(0, 1fr) auto;
    column-gap: clamp(0.85rem, 2vw, 1.75rem);
    row-gap: 0.65rem;
  }

  .hero-primary {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    align-self: stretch;
    min-width: 0;
    min-height: 0;
  }

  .hero-wall {
    display: grid;
    align-self: stretch;
    min-width: 0;
    min-height: 0;
    width: min(100%, 50rem);
    justify-self: stretch;
    overflow: hidden;
    container-type: size;
  }

  .hero-copy {
    position: relative;
    z-index: 1;
    align-self: center;
  }

  .hero-kicker {
    display: flex;
    align-self: start;
    justify-content: space-between;
    width: 100%;
    max-width: 36rem;
    color: var(--paper-muted);
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    line-height: 1.2;
    text-transform: uppercase;
  }

  .hero-kicker span:first-child {
    color: var(--signal);
  }

  .hero h1 {
    max-width: 18ch;
    font-family: var(--serif);
    font-size: clamp(3.05rem, 5.2vw, 6.15rem);
    font-weight: 400;
    letter-spacing: -0.055em;
    line-height: 0.92;
  }

  .hero-summary {
    display: grid;
    align-items: center;
    max-width: 34rem;
    margin-top: var(--space-copy);
    color: var(--paper-muted);
    font-family: var(--serif);
    font-size: clamp(1.05rem, 1.4vw, 1.28rem);
    line-height: 1.55;
  }

  .hero-summary blockquote {
    grid-area: 1 / 1;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--quote-fade) ease;
  }

  .hero-summary blockquote.active {
    opacity: 1;
    pointer-events: auto;
  }

  .hero-summary cite {
    display: block;
    margin-top: 0.7rem;
    color: var(--signal);
    font-family: var(--mono);
    font-size: 0.65rem;
    font-style: normal;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .quote-nav {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.35rem;
    margin-inline: -0.35rem;
  }

  .quote-nav button {
    display: grid;
    padding: 0.35rem;
    border: 0;
    place-items: center;
    background: transparent;
    cursor: pointer;
  }

  .quote-nav button::after {
    width: 0.38rem;
    height: 0.38rem;
    border: 1px solid var(--signal);
    border-radius: 50%;
    background: transparent;
    content: "";
    transition:
      background 180ms ease,
      transform 180ms ease;
  }

  .quote-nav button[aria-selected='true']::after {
    background: var(--signal);
    transform: scale(1.15);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: var(--space-copy);
  }

  @media (max-width: 1050px) {
    .hero {
      height: auto;
      min-height: 0;
      max-height: none;
      padding: calc(var(--header-height) + var(--anchor-gap)) 0 4rem;
      grid-template-columns: 1fr;
      grid-template-rows: none;
      row-gap: var(--space-cluster);
    }

    .hero-primary {
      grid-template-rows: none;
      row-gap: var(--space-kicker);
    }

    .hero-wall {
      container-type: normal;
      width: min(100%, 43rem);
      justify-self: center;
      overflow: visible;
    }

    .hero-copy {
      display: grid;
      justify-items: center;
      text-align: center;
      align-self: stretch;
    }

    .hero h1 {
      font-size: clamp(3.55rem, 12vw, 4.5rem);
    }

    .hero-summary {
      font-size: clamp(1.22rem, 3.6vw, 1.38rem);
    }

    .hero-kicker {
      max-width: none;
    }

    .hero-actions {
      justify-content: center;
    }

    .quote-nav {
      justify-content: center;
    }
  }

  @media (max-width: 760px) {
    .hero {
      width: min(100% - 2rem, 42rem);
    }
  }
</style>

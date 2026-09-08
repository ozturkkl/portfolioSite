<script lang="ts">
	import { tick } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import {
		copy,
		heroTypingLines,
		photoWallItems,
		profile
	} from '../data/content';
	import projects from '../data/projects.generated.json';
	import { formatRepositoryName } from '../format';
	import { scrollToAnchor } from '../scroll';
	import { appState } from '../appState.svelte';
	import HeroStatus from './HeroStatus.svelte';
	import PhotoWall from './PhotoWall.svelte';

	const reducedMotion = new MediaQuery('prefers-reduced-motion: reduce');
	const typeSpeedMs = 40;
	const deleteSpeedMs = 10;
	const phraseHoldMs = 1450;

	let typedText = $state('');
	let typingLineIndex = $state(0);
	let deleting = $state(false);

	$effect(() => {
		const line = heroTypingLines[typingLineIndex] ?? '';
		if (reducedMotion.current) {
			typedText = heroTypingLines[0] ?? '';
			return;
		}

		let delay = deleting ? deleteSpeedMs : typeSpeedMs;
		if (!deleting && typedText === line) delay = phraseHoldMs;
		if (deleting && typedText === '') delay = 260;

		const timer = setTimeout(() => {
			if (!deleting && typedText === line) {
				deleting = true;
				return;
			}
			if (deleting && typedText === '') {
				typingLineIndex = (typingLineIndex + 1) % heroTypingLines.length;
				deleting = false;
				return;
			}

			const nextLength = typedText.length + (deleting ? -1 : 1);
			typedText = line.slice(0, nextLength);
		}, delay);

		return () => clearTimeout(timer);
	});

	let photoWall = $derived(
		photoWallItems.flatMap((item) => {
			if (!('projectName' in item)) return [item];

			const project = projects.find((candidate) => candidate.name === item.projectName);

			return project?.image == null
				? []
				: [
						{
							src: project.image,
							alt: `README preview from the ${formatRepositoryName(project.name)} repository`,
							caption: formatRepositoryName(project.name),
							href: `#project-${project.name}`
						}
					];
		})
	);

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

<section id="top" class="hero" aria-labelledby="hero-title">
	<div class="hero-primary">
		<p class="hero-kicker">
			<span>{copy.hero.kicker}</span>
			<span>{profile.location}</span>
		</p>
		<div class="hero-copy">
			<h1 id="hero-title">{profile.title}</h1>
			<div
				class="terminal-intro"
				aria-label={`Kemal is a ${heroTypingLines.join(', ')}`}
			>
				<p class="terminal-command" aria-hidden="true">{copy.hero.terminalPrompt}</p>
				<p class="terminal-response" aria-hidden="true">
					<span>{typedText}</span><span class="terminal-cursor"></span>
				</p>
			</div>
			<div class="hero-summary">
				{#each copy.hero.intro as paragraph}
					<p>
						{#each paragraph as segment}
							{#if segment.href}
								<a href={segment.href} style:color={segment.color}>{segment.text}</a>
							{:else}
								<span style:color={segment.color}>{segment.text}</span>
							{/if}
						{/each}
					</p>
				{/each}
			</div>
			<div class="hero-actions">
				<a class="button-link primary" href="#experience">Read my experience</a>
				<a class="button-link secondary" href="#projects">See what I’ve built</a>
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
    width: min(100% - 7vw, 1280px);
    height: 100svh;
    min-height: 100svh;
    max-height: 100svh;
    margin-inline: auto;
    padding: calc(var(--header-height) + var(--anchor-gap)) 0 2rem;
    grid-template-columns: minmax(0, 39rem) minmax(24rem, 1fr);
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
    width: 100%;
    justify-self: stretch;
    overflow: hidden;
    container-type: size;
  }

  .hero-copy {
    position: relative;
    z-index: 1;
    align-self: center;
    width: min(100%, 39rem);
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
    max-width: 12ch;
    margin-top: 0;
    font-family: var(--serif);
    font-size: clamp(3.05rem, 5.2vw, 6.15rem);
    font-weight: 400;
    letter-spacing: -0.055em;
    line-height: 0.92;
  }

  .hero-summary {
    max-width: 38rem;
    margin-top: 1.35rem;
    color: var(--paper-muted);
    font-size: clamp(0.98rem, 1.15vw, 1.12rem);
    line-height: 1.65;
  }

  .hero-summary p + p {
    margin-top: 0.55rem;
  }

  .hero-summary a {
    text-decoration: none;
  }

  .terminal-intro {
    width: min(100%, 32rem);
    margin-top: var(--space-copy);
    padding: 0.85rem 1rem 2rem;
    border: 1px solid var(--line);
    background: rgb(11 11 10 / 52%);
    box-shadow: 0.45rem 0.5rem 0 rgb(0 0 0 / 18%);
    font-family: var(--mono);
    font-size: clamp(0.72rem, 1vw, 0.82rem);
    line-height: 1.55;
  }

  .terminal-command {
    color: var(--paper-muted);
  }

  .terminal-command::first-letter {
    color: var(--signal);
  }

  .terminal-response {
    display: flex;
    align-items: center;
    min-height: 1.55em;
    margin-top: 0.2rem;
    color: var(--mint);
  }

  .terminal-response::before {
    margin-right: 0.55rem;
    color: var(--signal);
    content: '>';
  }

  .terminal-cursor {
    width: 0.48em;
    height: 1.05em;
    margin-left: 0.22rem;
    background: currentcolor;
    animation: terminal-blink 900ms steps(1, end) infinite;
  }

  @keyframes terminal-blink {
    50% {
      opacity: 0;
    }
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: var(--space-copy);
  }

  @media (max-width: 1120px) {
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
      width: 100%;
    }

    .hero h1 {
      font-size: clamp(3.55rem, 12vw, 4.5rem);
    }

    .hero-summary {
      max-width: 38rem;
      font-size: clamp(1rem, 3.6vw, 1.12rem);
    }

    .hero-kicker {
      max-width: none;
    }

    .hero-actions {
      justify-content: center;
    }

    .terminal-intro {
      text-align: left;
    }
  }

  @media (max-width: 760px) {
    .hero {
      width: min(100% - 2rem, 42rem);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .terminal-cursor {
      animation: none;
    }
  }
</style>

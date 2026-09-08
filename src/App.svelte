<script lang="ts">
	import { onMount } from 'svelte';
	import Contact from './lib/components/Contact.svelte';
	import Experience from './lib/components/Experience.svelte';
	import Hero from './lib/components/Hero.svelte';
	import Links from './lib/components/Links.svelte';
	import Projects from './lib/components/Projects.svelte';
	import SiteFooter from './lib/components/SiteFooter.svelte';
	import SiteHeader from './lib/components/SiteHeader.svelte';
	import Toolkit from './lib/components/Toolkit.svelte';
	import {
		cancelProgrammaticScroll,
		onAnchorClick,
		onPopState,
		syncInitialAnchor
	} from './lib/scroll';

	onMount(() => {
		syncInitialAnchor();
	});

	function handlePointerMove(event: PointerEvent) {
		const shell = event.currentTarget as HTMLElement;
		const bounds = shell.getBoundingClientRect();

		shell.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
		shell.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
	}
</script>

<svelte:document onclick={onAnchorClick} />
<svelte:window
	onpopstate={onPopState}
	onwheel={cancelProgrammaticScroll}
	ontouchmove={cancelProgrammaticScroll}
/>

<a class="skip-link" href="#main-content">Skip to main content</a>

<SiteHeader />

<main id="main-content" class="page-shell" onpointermove={handlePointerMove}>
	<Hero />
	<Experience />
	<Projects />
	<Toolkit />
	<Links />
	<Contact />
</main>

<SiteFooter />

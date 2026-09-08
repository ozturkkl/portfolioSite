<script lang="ts">
	import { profile, resumeUrl } from '../data/content';

	let menuOpen = $state(false);

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header class="site-header">
	<a class="wordmark" href="#top" onclick={closeMenu} aria-label="{profile.name}, home">
		<img src="/favicon.svg?v=3" alt="" width="20" height="20" />
		<span class="wordmark-prompt">
			<span class="wordmark-name">{profile.name}</span>
			<span class="wordmark-cursor" aria-hidden="true"></span>
		</span>
	</a>

	<button
		class="menu-button"
		type="button"
		aria-controls="site-nav"
		aria-expanded={menuOpen}
		onclick={() => (menuOpen = !menuOpen)}
	>
		<span class="menu-button-label">{menuOpen ? 'Close' : 'Menu'}</span>
		<span class="menu-button-mark" aria-hidden="true"></span>
	</button>

	<nav
		id="site-nav"
		class={menuOpen ? 'site-nav is-open' : 'site-nav'}
		aria-label="Primary navigation"
	>
		<a href="#experience" onclick={closeMenu}>Experience</a>
		<a href="#projects" onclick={closeMenu}>Projects</a>
		<a href="#links" onclick={closeMenu}>Links</a>
		<a href="#contact" onclick={closeMenu}>Contact</a>
		<a href={resumeUrl} target="_blank" rel="noreferrer" onclick={closeMenu}>Resume</a>
	</nav>
</header>

<style>
  .site-header {
    position: fixed;
    z-index: 50;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 72px;
    padding: 0 3.5vw;
    border-bottom: 1px solid var(--line);
    background: rgb(23 24 21 / 82%);
    backdrop-filter: blur(16px);
  }

  .wordmark {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    min-width: 0;
    min-height: 44px;
    font-family: var(--mono);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
  }

  .wordmark img {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    border: 1px solid var(--signal);
    border-radius: 0.32rem;
    transform: rotate(-3deg);
  }

  .wordmark-prompt {
    display: inline-flex;
    align-items: center;
    gap: 0.28rem;
  }

  .wordmark-cursor {
    margin-left: 0.25rem;
    margin-bottom: 0.1rem;
    display: block;
    width: 0.38em;
    height: 0.92em;
    flex-shrink: 0;
    background: var(--mint);
    animation: blink-cursor 1.05s steps(1, end) infinite;
  }

  @keyframes blink-cursor {
    50% {
      opacity: 0;
    }
  }

  .site-nav {
    --nav-pad: clamp(0.5rem, 1.25vw, 1.25rem);
    display: flex;
    align-items: center;
  }

  .site-nav a {
    position: relative;
    display: inline-grid;
    min-height: 44px;
    padding-inline: var(--nav-pad);
    place-items: center;
    font-family: var(--mono);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
  }

  .site-nav a::after {
    position: absolute;
    right: var(--nav-pad);
    bottom: 7px;
    left: var(--nav-pad);
    height: 1px;
    background: var(--signal);
    content: "";
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 180ms ease;
  }

  .site-nav a:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  .menu-button {
    display: none;
    min-width: 44px;
    min-height: 44px;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  @media (max-width: 760px) {
    .site-header {
      min-height: 64px;
      padding-inline: 1rem;
    }

    .menu-button {
      display: inline-flex;
      align-items: center;
      justify-content: end;
      gap: 0.65rem;
    }

    .menu-button-label {
      font-family: var(--mono);
      font-size: 0.68rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .menu-button-mark {
      position: relative;
      width: 1.3rem;
      height: 1px;
      background: currentColor;
    }

    .menu-button-mark::before {
      position: absolute;
      top: -6px;
      right: 0;
      width: 0.85rem;
      height: 1px;
      background: currentColor;
      content: "";
    }

    .site-nav {
      position: absolute;
      top: 64px;
      right: 0;
      left: 0;
      display: grid;
      padding: 1rem;
      border-bottom: 1px solid var(--line);
      visibility: hidden;
      opacity: 0;
      background: var(--ink);
      transform: translateY(-0.75rem);
      transition:
        opacity 180ms ease,
        transform 180ms ease,
        visibility 180ms;
      pointer-events: none;
    }

    .site-nav.is-open {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .site-nav a {
      justify-items: start;
      padding-inline: 0.5rem;
      border-bottom: 1px solid var(--line);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .wordmark-cursor {
      animation: none !important;
      opacity: 1;
    }
  }
</style>

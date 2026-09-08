<script lang="ts">
	import { copy, skillGroups } from '../data/content';
	import SectionHeader from './SectionHeader.svelte';
</script>

<section id="toolkit" class="section" aria-labelledby="toolkit-title">
	<SectionHeader
		kicker={copy.toolkit.kicker}
		title={copy.toolkit.title}
		titleId="toolkit-title"
		intro={copy.toolkit.intro}
	/>

	<div class="toolkit-grid">
		{#each skillGroups as group (group.label)}
			<article class="inventory-card">
				<header>
					<p class="inventory-code">{copy.toolkit.labPrefix} / {group.label.slice(0, 3).toUpperCase()}</p>
					<h3>{group.label}</h3>
				</header>
				<ul>
					{#each group.skills as skill (`${group.label}-${skill}`)}
						<li>{skill}</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>

<style>
  .toolkit-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .inventory-card {
    flex: 0 0 13.25rem;
    max-width: 100%;
    padding: clamp(1.25rem, 2vw, 1.65rem);
    color: var(--ink);
    background:
      linear-gradient(rgb(23 24 21 / 8%) 1px, transparent 1px),
      var(--paper);
    background-size: 100% 1.7rem;
    box-shadow: 0.5rem 0.5rem 0 rgb(0 0 0 / 22%);
    transform: rotate(-0.6deg);
    transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .inventory-card:nth-child(even) {
    transform: rotate(0.7deg);
  }

  .inventory-card:hover,
  .inventory-card:nth-child(even):hover {
    transform: rotate(0) translateY(-5px);
  }

  .inventory-card header {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgb(23 24 21 / 20%);
  }

  .inventory-card h3 {
    margin-top: var(--space-kicker);
    font-family: var(--serif);
    font-size: 1.75rem;
    font-weight: 400;
    letter-spacing: -0.035em;
  }

  .inventory-card ul {
    display: grid;
    gap: 0.55rem;
    padding-top: 1.25rem;
    font-family: var(--mono);
    font-size: 0.68rem;
  }

  .inventory-card li {
    position: relative;
    padding-left: 1rem;
  }

  .inventory-card li::before {
    position: absolute;
    left: 0;
    color: var(--signal-dark);
    content: "/";
  }
</style>

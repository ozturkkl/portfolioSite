<script lang="ts">
	import { copy, experience } from '../data/content';
	import { createAnchorSlug } from '../format';
	import Entry from './Entry.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<section id="experience" class="section experience-section" aria-labelledby="experience-title">
	<SectionHeader
		kicker={copy.experience.kicker}
		title={copy.experience.title}
		titleId="experience-title"
		intro={copy.experience.intro}
	/>

	<div class="experience-list">
		{#each experience as role (role.company)}
			<Entry
				id={`experience-${createAnchorSlug(role.company)}`}
				kicker={role.company}
				title={role.role}
				description={role.summary}
				images={role.images}
				items={role.highlights}
				chips={role.tools}
			>
				{#snippet meta()}
					<p>{role.dates}</p>
				{/snippet}
			</Entry>
		{/each}
	</div>
</section>

<style>
  .experience-list {
    border-top: 1px solid var(--line);
  }
</style>

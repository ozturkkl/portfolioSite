<script lang="ts">
	import { copy, experience } from '../data/content';
	import { createAnchorSlug } from '../format';
	import Entry from './Entry.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<section id="experience" class="section" aria-labelledby="experience-title">
	<SectionHeader
		kicker={copy.experience.kicker}
		title={copy.experience.title}
		titleId="experience-title"
		intro={copy.experience.intro}
	/>

	<div class="divided-list">
		{#each experience as role (role.company)}
			<Entry
				id={`experience-${createAnchorSlug(role.company)}`}
				kicker={role.company}
				title={role.role}
				description={role.summary}
				images={role.images.map((image) => ({ ...image, href: role.website }))}
				items={role.highlights}
				chips={role.tools}
			>
				{#snippet meta()}
					<p>{role.dates}</p>
				{/snippet}
				{#if role.website}
					<a class="text-link" href={role.website} target="_blank" rel="noreferrer">
						Live site <span aria-hidden="true">↗</span>
					</a>
				{/if}
			</Entry>
		{/each}
	</div>
</section>

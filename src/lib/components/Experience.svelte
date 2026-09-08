<script lang="ts">
	import { copy, experience } from '../data/content';
	import ExperienceTimeline from './ExperienceTimeline.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<section id="experience" class="section" aria-labelledby="experience-title">
	<SectionHeader
		kicker={copy.experience.kicker}
		title={copy.experience.title}
		titleId="experience-title"
		intro={copy.experience.intro}
	/>

	<ExperienceTimeline roles={experience} />
</section>

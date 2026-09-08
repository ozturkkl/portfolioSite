<script lang="ts">
	import { copy, featuredProjects } from '../data/content';
	import projects from '../data/projects.generated.json';
	import { formatDate, formatRepositoryName } from '../format';
	import { appState } from '../appState.svelte';
	import Entry from './Entry.svelte';
	import SectionHeader from './SectionHeader.svelte';

	let visibleProjects = $derived(appState.showAllProjects ? projects : projects.slice(0, 4));

	function getProjectChips(language: string | null, topics: string[]) {
		return [...new Set([language, ...topics].filter((chip) => chip != null).map((chip) => chip.toLowerCase()))];
	}
</script>

<section id="projects" class="section" aria-labelledby="projects-title">
	<SectionHeader
		kicker={copy.projects.kicker}
		title={copy.projects.title}
		titleId="projects-title"
		intro={copy.projects.intro}
	/>

	<div id="project-grid" class="divided-list">
		{#each visibleProjects as project (project.id)}
			{const featured = featuredProjects[project.name]}
			{const projectTitle = formatRepositoryName(project.name)}
			{const liveUrl = featured?.liveUrl ?? project.homepage}
			<Entry
				id={`project-${project.name}`}
				kicker={featured?.eyebrow ?? copy.projects.defaultEyebrow}
				title={projectTitle}
				description={project.description ?? copy.projects.fallbackDescription}
				images={project.image === null
					? []
					: [
							{
								src: project.image,
								alt: `README preview from the ${projectTitle} repository`,
								caption: projectTitle,
								href: liveUrl || project.url
							}
						]}
				chips={getProjectChips(project.language, project.topics)}
				chipsLabel={`${projectTitle} technologies`}
			>
				{#snippet meta()}
					<p>Updated {formatDate(project.pushedAt)}</p>
					{#if project.stars >= 10}
						<p>{project.stars} {project.stars === 1 ? 'star' : 'stars'}</p>
					{/if}
					{#if project.forks >= 5}
						<p>{project.forks} {project.forks === 1 ? 'fork' : 'forks'}</p>
					{/if}
				{/snippet}
				<a class="text-link" href={project.url} target="_blank" rel="noreferrer">
					Source <span aria-hidden="true">↗</span>
				</a>
				{#if liveUrl}
					<a class="text-link" href={liveUrl} target="_blank" rel="noreferrer">
						Live site <span aria-hidden="true">↗</span>
					</a>
				{/if}
			</Entry>
		{/each}
	</div>

	{#if projects.length > 4}
		<button
			class="project-toggle"
			type="button"
			aria-controls="project-grid"
			aria-expanded={appState.showAllProjects}
			onclick={() => (appState.showAllProjects = !appState.showAllProjects)}
		>
			{appState.showAllProjects ? 'Show fewer projects' : `Show all ${projects.length} projects`}
		</button>
	{/if}
</section>

<style>
  .project-toggle {
    display: block;
    min-height: 50px;
    margin: 2rem auto 0;
    padding: 0.85rem 1.25rem;
    border: 1px solid var(--line);
    color: var(--paper);
    background: transparent;
    font-family: var(--mono);
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      border-color 180ms ease,
      background 180ms ease;
  }

  .project-toggle:hover {
    border-color: var(--signal);
    background: rgb(241 91 64 / 8%);
  }
</style>

<script lang="ts">
	import { tick } from 'svelte';
	import {
		copy,
		experience,
		featuredProjects,
		heroFacts,
		links,
		photoWallItems,
		profile,
		skillGroups
	} from './lib/data/content';
	import projects from './lib/data/projects.generated.json';

	let menuOpen = $state(false);
	let showAllProjects = $state(false);
	let failedImageUrls = $state<string[]>([]);
	let visibleProjects = $derived(showAllProjects ? projects : projects.slice(0, 4));
	let photoWall = $derived(
		[
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
		].filter((item) => !failedImageUrls.includes(item.src))
	);

	const currentYear = new Date().getFullYear();

	function closeMenu() {
		menuOpen = false;
	}

	function recordFailedImage(url: string) {
		if (!failedImageUrls.includes(url)) {
			failedImageUrls.push(url);
		}
	}

	function formatRepositoryName(name: string) {
		return name
			.replace(/[-_]+/g, ' ')
			.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
			.split(' ')
			.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
			.join(' ');
	}

	function createAnchorSlug(company: string) {
		return company
			.normalize('NFKD')
			.toLowerCase()
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

	function formatDate(value: string) {
		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			year: 'numeric'
		}).format(new Date(value));
	}

	async function revealProjectCard(event: MouseEvent, href: string) {
		if (!href.startsWith('#project-') || document.getElementById(href.slice(1))) {
			return;
		}

		event.preventDefault();
		showAllProjects = true;
		await tick();
		window.location.hash = href;
	}

	function handlePointerMove(event: PointerEvent) {
		const shell = event.currentTarget as HTMLElement;
		const bounds = shell.getBoundingClientRect();

		shell.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
		shell.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
	}
</script>

<a class="skip-link" href="#main-content">Skip to main content</a>

<header class="site-header">
	<a class="wordmark" href="#top" onclick={closeMenu} aria-label="Kemal Ozturk, home">
		<img src="/favicon.svg?v=3" alt="" width="20" height="20" />
		<span class="wordmark-prompt">
			<span class="wordmark-name">Kemal Ozturk</span>
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
		<a href="/Kemal-Ozturk-Resume-2026.pdf" download onclick={closeMenu}>Resume</a>
	</nav>
</header>

<main id="main-content" class="page-shell" onpointermove={handlePointerMove}>
	<section id="top" class="hero" aria-labelledby="hero-title">
		<div class="hero-primary">
			<p class="hero-kicker">
				<span>SIGNAL / 001</span>
				<span>{profile.location}</span>
			</p>
			<div class="hero-copy">
				<h1 id="hero-title">{profile.title}</h1>
				<blockquote class="hero-summary">
					<p>“{profile.summary}”</p>
					<cite>{profile.summaryAttribution}</cite>
				</blockquote>
				<div class="hero-actions">
					<a class="button-link primary" href="#projects">Explore selected work</a>
					<a class="button-link secondary" href={`mailto:${profile.email}`}>Email Kemal</a>
				</div>
			</div>
		</div>

		<section class="photo-wall" aria-labelledby="photo-wall-title">
			<header class="photo-wall-heading">
				<small id="photo-wall-title">PROJECT WALL / SELECT A FRAME</small>
				<small>{photoWall.length} {photoWall.length === 1 ? 'frame' : 'frames'}</small>
			</header>
			<ul class="photo-wall-grid">
				{#each photoWall as item (item.href)}
					<li class="photo-wall-item">
						<a
							href={item.href}
							aria-label={`Jump to ${item.caption}`}
							onclick={(event) => revealProjectCard(event, item.href)}
						>
							<img
								src={item.src}
								alt={item.alt}
								decoding="async"
								onerror={() => recordFailedImage(item.src)}
							/>
							<span class="photo-wall-caption">{item.caption}</span>
						</a>
					</li>
				{/each}
			</ul>
		</section>

		<dl class="hero-status" aria-label="Role, status, and background">
			{#each heroFacts as fact (fact.label)}
				<div>
					<dt>{fact.label}</dt>
					<dd>{fact.value}</dd>
				</div>
			{/each}
		</dl>
	</section>

	<section id="experience" class="section experience-section" aria-labelledby="experience-title">
		<header class="section-header">
			<div class="section-heading">
				<p class="section-number">{copy.experience.kicker}</p>
				<h2 id="experience-title">{copy.experience.title}</h2>
			</div>
			<p>{copy.experience.intro}</p>
		</header>

		<div class="experience-list">
			{#each experience as role (role.company)}
				{const roleImages = $derived(
					role.images.filter((image) => !failedImageUrls.includes(image.src))
				)}
				<article id={`experience-${createAnchorSlug(role.company)}`} class="experience-card">
					<header class="experience-card-header">
						<div>
							<p class="experience-company">{role.company}</p>
							<h3>{role.role}</h3>
						</div>
						<p class="experience-dates">{role.dates}</p>
					</header>

					<p class="experience-summary">{role.summary}</p>

					{#if roleImages.length > 0}
						<div class="experience-gallery" aria-label={`${role.company} work gallery`}>
							{#each roleImages as image (image.src)}
								<figure class="experience-image">
									<img
										src={image.src}
										alt={image.alt}
										loading="lazy"
										decoding="async"
										onerror={() => recordFailedImage(image.src)}
									/>
									<figcaption>{image.caption}</figcaption>
								</figure>
							{/each}
						</div>
					{/if}

					<ul class="experience-highlights">
						{#each role.highlights as highlight (`${role.company}-${highlight}`)}
							<li>{highlight}</li>
						{/each}
					</ul>

					<ul class="tool-chips" aria-label={`${role.company} tools`}>
						{#each role.tools as tool (`${role.company}-${tool}`)}
							<li>{tool}</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</section>

	<section id="projects" class="section projects-section" aria-labelledby="projects-title">
		<header class="section-header">
			<div class="section-heading">
				<p class="section-number">{copy.projects.kicker}</p>
				<h2 id="projects-title">{copy.projects.title}</h2>
			</div>
			<p>{copy.projects.intro}</p>
		</header>

		<div id="project-grid" class="project-grid">
			{#each visibleProjects as project (project.id)}
				{@const featured = featuredProjects[project.name]}
				{@const projectTitle = formatRepositoryName(project.name)}
				{@const liveUrl = featured?.liveUrl ?? project.homepage}
				{@const projectImage = project.image}
				<article
					id={`project-${project.name}`}
					class={featured ? 'project-card is-featured' : 'project-card'}
				>
					<div class="project-media">
						{#if projectImage !== null && !failedImageUrls.includes(projectImage)}
							<img
								src={projectImage}
								alt={`README preview from the ${projectTitle} repository`}
								loading="lazy"
								decoding="async"
								onerror={() => recordFailedImage(projectImage)}
							/>
						{:else}
							<div class="project-fallback">
								<svg
									viewBox="0 0 400 180"
									fill="none"
									aria-hidden="true"
									focusable="false"
								>
									<path d="M8 90h72l22-48 38 96 44-78 34 52 42-22 34 58 36-86 30 28h32" />
									<circle cx="102" cy="42" r="4" />
									<circle cx="294" cy="148" r="4" />
								</svg>
								<span>Repository signal / preview pending</span>
							</div>
						{/if}
					</div>

					<div class="project-content">
						<p class="project-eyebrow">{featured?.eyebrow ?? 'Recent repository'}</p>
						<h3>{projectTitle}</h3>
						<p class="project-description">
							{featured?.impact ?? project.description ?? 'Details are being documented.'}
						</p>

						{#if project.language || project.topics.length > 0}
							<ul class="project-tags" aria-label={`${projectTitle} technologies`}>
								{#if project.language}
									<li>{project.language}</li>
								{/if}
								{#each project.topics as topic (`${project.id}-${topic}`)}
									<li>{topic}</li>
								{/each}
							</ul>
						{/if}

						<div class="project-meta">
							<p>Updated {formatDate(project.pushedAt)}</p>
							{#if project.stars > 0 || project.forks > 0}
								<ul class="project-stats" aria-label="GitHub repository statistics">
									{#if project.stars > 0}
										<li>{project.stars} {project.stars === 1 ? 'star' : 'stars'}</li>
									{/if}
									{#if project.forks > 0}
										<li>{project.forks} {project.forks === 1 ? 'fork' : 'forks'}</li>
									{/if}
								</ul>
							{/if}
						</div>

						<div class="project-links">
							<a href={project.url} target="_blank" rel="noreferrer">
								Source <span aria-hidden="true">↗</span>
							</a>
							{#if liveUrl}
								<a href={liveUrl} target="_blank" rel="noreferrer">
									Live site <span aria-hidden="true">↗</span>
								</a>
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>

		{#if projects.length > 4}
			<button
				class="project-toggle"
				type="button"
				aria-controls="project-grid"
				aria-expanded={showAllProjects}
				onclick={() => (showAllProjects = !showAllProjects)}
			>
				{showAllProjects ? 'Show fewer projects' : `Show all ${projects.length} projects`}
			</button>
		{/if}
	</section>

	<section id="toolkit" class="section toolkit-section" aria-labelledby="toolkit-title">
		<header class="section-header">
			<div class="section-heading">
				<p class="section-number">{copy.toolkit.kicker}</p>
				<h2 id="toolkit-title">{copy.toolkit.title}</h2>
			</div>
			<p>{copy.toolkit.intro}</p>
		</header>

		<div class="toolkit-grid">
			{#each skillGroups as group (group.label)}
				<article class="inventory-card">
					<header>
						<p class="inventory-code">LAB / {group.label.slice(0, 3).toUpperCase()}</p>
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

	<section id="links" class="section links-section" aria-labelledby="links-title">
		<header class="section-header">
			<div class="section-heading">
				<p class="section-number">{copy.links.kicker}</p>
				<h2 id="links-title">{copy.links.title}</h2>
			</div>
			<p>{copy.links.intro}</p>
		</header>

		<div class="links-layout">
			<aside class="profile-panel" aria-labelledby="profile-panel-title">
				<img
					src="/images/other/family.jpg"
					alt="A collection of miniature pianos displayed together"
					loading="lazy"
				/>
				<div>
					<p class="profile-handle">Profile / Personal</p>
					<h3 id="profile-panel-title">Kemal_Ozt</h3>
					<blockquote>
						<p>
							“The greatest thing you'll ever learn is just to love and be loved in return.”
						</p>
						<cite>Nat King Cole</cite>
					</blockquote>
				</div>
			</aside>

			<div class="link-tree" aria-label="Social and profile links">
				{#each links as link (link.url)}
					<a class="link-card" href={link.url} target="_blank" rel="noreferrer">
						<img src={link.icon} alt="" loading="lazy" />
						<span>
							<strong>{link.title}</strong>
							<small>{link.description}</small>
						</span>
						<span aria-hidden="true">↗</span>
					</a>
				{/each}
			</div>

			<div class="video-panel">
				<p class="video-label">Off the clock / Piano</p>
				<div class="video-frame">
					<iframe
						src="https://www.youtube.com/embed/b2C7c3MK9wY"
						title="Kemal Ozturk performing a piano cover"
						width="560"
						height="315"
						loading="lazy"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
					></iframe>
				</div>
			</div>
		</div>
	</section>

	<section class="contact-panel" aria-labelledby="contact-title">
		<div class="section-heading">
			<p class="section-number">{copy.contact.kicker}</p>
			<h2 id="contact-title">{copy.contact.title}</h2>
		</div>
		<p>{copy.contact.intro}</p>
		<div class="contact-links">
			<a class="button-link primary" href={`mailto:${profile.email}`}>Email {profile.name}</a>
			<a
				class="button-link secondary"
				href="https://www.linkedin.com/in/ozturkkl/"
				target="_blank"
				rel="noreferrer"
			>
				LinkedIn <span aria-hidden="true">↗</span>
			</a>
			<a class="button-link secondary" href="/Kemal-Ozturk-Resume-2026.pdf" download>
				Download resume
			</a>
		</div>
	</section>
</main>

<footer class="site-footer">
	<p>© {currentYear} {profile.name} · {profile.location}</p>
	<p>Designed and built by Kemal Ozturk.</p>
	<a href="#top" aria-label="Back to top">Back to top <span aria-hidden="true">↑</span></a>
</footer>

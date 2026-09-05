<script lang="ts">
	import { artworks, copy, links, linksQuote, profile } from '../data/content';
	import PhotoWall from './PhotoWall.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<section id="links" class="section" aria-labelledby="links-title">
	<SectionHeader kicker={copy.links.kicker} titleId="links-title" />
	<article class="profile-card surface">
		<div class="profile-media">
			<div class="portrait-frame">
				<img
					class="portrait"
					src="/images/other/kemal.jpg"
					alt={`${profile.name} portrait`}
					loading="lazy"
				/>
			</div>
			<div class="identity-copy">
				<p class="profile-handle">{copy.links.profileKicker}</p>
				<h3>{profile.handle}</h3>
				<blockquote>
					<p>“{linksQuote.text}”</p>
					<cite>{linksQuote.attribution}</cite>
				</blockquote>
			</div>
		</div>
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
	</article>

	<div class="studio">
		<div class="studio-panel surface">
			<p class="video-label">{copy.links.studioLabel}</p>
			<div class="video-frame">
				<iframe
					src={copy.links.studioVideoUrl}
					title={copy.links.studioVideoTitle}
					width="560"
					height="315"
					loading="lazy"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			</div>
		</div>

		<div class="studio-art">
			<PhotoWall layout="grid" items={artworks} ariaLabel="Artwork" />
		</div>
	</div>
</section>

<style>
  .profile-card {
    display: grid;
    overflow: hidden;
    grid-template-columns: minmax(16rem, 22rem) minmax(0, 1fr);
  }

  .profile-media {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 0;
    padding: 1.35rem 1.35rem 1.5rem;
    gap: 1rem;
    text-align: center;
  }

  .portrait-frame {
    display: grid;
    flex: 1 1 0;
    place-items: center;
    min-width: 0;
    min-height: 7.5rem;
    width: 100%;
    overflow: clip;
    container-type: size;
  }

  .portrait {
    width: min(100cqw, 100cqh);
    height: min(100cqw, 100cqh);
    border: 1px solid var(--line);
    border-radius: 50%;
    object-fit: cover;
    object-position: 50% 18%;
    filter: grayscale(0.35) contrast(1.04);
  }

  .identity-copy {
    flex-shrink: 0;
  }

  .identity-copy h3 {
    margin-top: var(--space-kicker);
    font-family: var(--serif);
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    font-weight: 400;
    letter-spacing: -0.04em;
  }

  .identity-copy blockquote {
    margin-top: 1.15rem;
    padding-top: 1.1rem;
    border-top: 1px solid var(--line);
    color: var(--paper-muted);
    font-family: var(--serif);
    font-size: 1rem;
    line-height: 1.55;
  }

  .identity-copy cite {
    display: block;
    margin-top: 0.75rem;
    color: var(--signal);
    font-family: var(--mono);
    font-size: 0.62rem;
    font-style: normal;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .link-tree {
    display: grid;
    align-content: start;
    gap: 0.65rem;
    padding: 1rem;
    border-left: 1px solid var(--line);
  }

  .link-card {
    display: grid;
    align-items: center;
    min-height: 72px;
    padding: 0.7rem 0.85rem;
    border: 1px solid var(--line);
    text-decoration: none;
    grid-template-columns: 2.75rem 1fr auto;
    gap: 0.85rem;
    transition:
      color 180ms ease,
      background 180ms ease,
      border-color 180ms ease,
      transform 180ms ease;
  }

  .link-card:hover {
    border-color: var(--paper);
    color: var(--ink);
    background: var(--paper);
    transform: translateX(5px);
  }

  .link-card > img {
    width: 2.6rem;
    height: 2.6rem;
    padding: 0.35rem;
    border-radius: 50%;
    object-fit: contain;
    background: rgb(255 255 255 / 92%);
  }

  .link-card > span:nth-child(2) {
    display: grid;
    gap: 0.25rem;
  }

  .link-card strong {
    font-family: var(--serif);
    font-size: 1.25rem;
    font-weight: 400;
  }

  .link-card small {
    color: var(--paper-muted);
    font-size: 0.74rem;
    line-height: 1.4;
  }

  .link-card:hover small {
    color: rgb(23 24 21 / 68%);
  }

  .link-card > span:last-child {
    color: var(--signal);
    font-size: 1.1rem;
  }

  .studio {
    display: grid;
    align-items: start;
    margin-top: 1.25rem;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    gap: 1.15rem;
  }

  .studio-art {
    min-width: 0;
  }

  .studio-panel {
    padding: 1rem 1rem 1.15rem;
  }

  .video-label {
    margin-bottom: var(--space-kicker);
  }

  .video-frame {
    overflow: hidden;
    aspect-ratio: 16 / 9;
    background: #0b0b0a;
  }

  .video-frame iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }

  @media (max-width: 860px) {
    .profile-card {
      grid-template-columns: minmax(0, 1fr);
    }

    .profile-media {
      display: grid;
      align-items: center;
      padding: 1rem 1.1rem 1.15rem;
      grid-template-columns: 7.5rem minmax(0, 1fr);
      gap: 0.85rem;
      text-align: start;
    }

    .portrait-frame {
      flex: none;
      width: 7.5rem;
      height: 7.5rem;
      min-height: 0;
      container-type: size;
    }

    .identity-copy h3 {
      font-size: 1.7rem;
    }

    .identity-copy blockquote {
      margin-top: 0.85rem;
      padding-top: 0.85rem;
      font-size: 0.95rem;
    }

    .link-tree {
      border-left: 0;
      border-top: 1px solid var(--line);
    }

    .studio {
      grid-template-columns: minmax(0, 1fr);
    }

    .studio-art {
      padding-top: 0.65rem;
    }
  }
</style>

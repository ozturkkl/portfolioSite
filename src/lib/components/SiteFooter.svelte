<script lang="ts">
	import { copy, profile } from '../data/content';

	const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
	<p>© {currentYear} {profile.name} · {profile.location}</p>
	<p>{copy.footer.credit}</p>
	<a class="text-link" href="#top" aria-label="Back to top">Back to top <span aria-hidden="true">↑</span></a>
</footer>

<style>
  .site-footer {
    display: grid;
    align-items: center;
    min-height: 110px;
    padding: 2rem 3.5vw;
    border-top: 1px solid var(--line);
    color: var(--paper-muted);
    font-family: var(--mono);
    font-size: 0.62rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    grid-template-columns: 1fr auto 1fr;
    gap: 1rem;
  }

  .site-footer p:nth-child(2) {
    text-align: center;
  }

  .site-footer a {
    justify-self: end;
    padding-block: 0.8rem;
  }

  @media (max-width: 860px) {
    .site-footer {
      justify-items: start;
      grid-template-columns: 1fr;
    }

    .site-footer p:nth-child(2) {
      text-align: left;
    }

    .site-footer a {
      justify-self: start;
    }
  }
</style>

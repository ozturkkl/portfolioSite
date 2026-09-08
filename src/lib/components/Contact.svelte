<script lang="ts">
	import { copy, links, profile, resumeUrl } from '../data/content';
	import SectionHeader from './SectionHeader.svelte';

	const linkedInUrl = links.find((link) => link.title === 'LinkedIn')?.url;

	const draftKey = 'kemal-ozturk-contact-draft';
	const limits = { name: 100, email: 254, message: 2000 } as const;
	const accessKeys = [
		...new Set(
			(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '')
				.split(',')
				.map((key) => key.trim())
				.filter(Boolean)
		)
	];

	function loadDraft() {
		try {
			const raw = localStorage.getItem(draftKey);
			if (!raw) return null;

			const draft = JSON.parse(raw) as { name?: string; email?: string; message?: string };
			return {
				name: String(draft.name ?? '').slice(0, limits.name),
				email: String(draft.email ?? '').slice(0, limits.email),
				message: String(draft.message ?? '').slice(0, limits.message)
			};
		} catch {
			return null;
		}
	}

	const draft = typeof localStorage !== 'undefined' ? loadDraft() : null;

	let name = $state(draft?.name ?? '');
	let email = $state(draft?.email ?? '');
	let message = $state(draft?.message ?? '');
	let submitted = $state(false);
	let submitting = $state(false);
	let submitError = $state('');
	let emailCopied = $state(false);
	let emailCopiedTimer = 0;

	function persistDraft() {
		if (submitted) return;

		if (!name && !email && !message) {
			localStorage.removeItem(draftKey);
			return;
		}

		localStorage.setItem(draftKey, JSON.stringify({ name, email, message }));
	}

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(profile.email);
		} catch {
			return;
		}

		emailCopied = true;
		clearTimeout(emailCopiedTimer);
		emailCopiedTimer = setTimeout(() => {
			emailCopied = false;
		}, 1800);
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		submitError = '';

		if (!accessKeys.length) {
			submitError = copy.contact.errors.unconfigured;
			return;
		}

		submitting = true;

		try {
			const payload = {
				name,
				email,
				message,
				botcheck: '',
				subject: `Portfolio contact from ${name}`,
				from_name: `${profile.name} Portfolio`
			};

			await Promise.all(
				accessKeys.map(async (accessKey) => {
					const response = await fetch('https://api.web3forms.com/submit', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
						body: JSON.stringify({ ...payload, access_key: accessKey })
					});

					const result = (await response.json()) as { success?: boolean };
					if (!response.ok || result.success !== true) {
						throw result;
					}
				})
			);

			localStorage.removeItem(draftKey);
			submitted = true;
		} catch {
			submitError = copy.contact.errors.sendFailed;
		} finally {
			submitting = false;
		}
	}
</script>

<section id="contact" class="section" aria-labelledby="contact-title">
	<SectionHeader
		kicker={copy.contact.kicker}
		title={copy.contact.title}
		titleId="contact-title"
		intro={copy.contact.intro}
	/>

	<div class="contact-layout">
		{#if submitted}
			<article class="success-card surface" role="status" aria-live="polite">
				<p class="inventory-code">{copy.contact.success.kicker}</p>
				<h3>{copy.contact.success.title}</h3>
				<p>{copy.contact.success.body}</p>
			</article>
		{:else}
			<form class="contact-form surface" onsubmit={handleSubmit} oninput={persistDraft}>
				<input
					class="visually-hidden"
					type="checkbox"
					name="botcheck"
					tabindex="-1"
					autocomplete="off"
					aria-hidden="true"
				/>

				<div class="field">
					<label class="inventory-code" for="contact-name">Name</label>
					<input
						id="contact-name"
						name="name"
						type="text"
						bind:value={name}
						required
						maxlength={limits.name}
						autocomplete="name"
					/>
				</div>

				<div class="field">
					<label class="inventory-code" for="contact-email">Email</label>
					<input
						id="contact-email"
						name="email"
						type="email"
						bind:value={email}
						required
						maxlength={limits.email}
						autocomplete="email"
					/>
				</div>

				<div class="field">
					<div class="field-heading">
						<label class="inventory-code" for="contact-message">Message</label>
						<p class="inventory-code" aria-live="polite">{message.length}/{limits.message}</p>
					</div>
					<textarea
						id="contact-message"
						name="message"
						bind:value={message}
						required
						maxlength={limits.message}
						rows={6}
						placeholder={copy.contact.placeholder}
						onkeydown={(event) => {
							if (event.key !== 'Enter' || !(event.ctrlKey || event.metaKey)) return;
							event.preventDefault();
							if (!submitting) event.currentTarget.form?.requestSubmit();
						}}
					></textarea>
				</div>

				{#if submitError}
					<p class="form-error" role="alert">{submitError}</p>
				{/if}

				<div class="form-actions">
					<p class="form-hint">{copy.contact.hint}</p>
					<button class="button-link primary" type="submit" disabled={submitting}>
						{submitting ? 'Sending…' : 'Send message'}
					</button>
				</div>
			</form>
		{/if}

		<aside class="contact-aside surface">
			<p class="inventory-code">{copy.contact.asideKicker}</p>
			<div class="direct-email">
				<a class="text-link" href={`mailto:${profile.email}`}>{profile.email}</a>
				<button
					class="text-link"
					type="button"
					onclick={copyEmail}
					aria-label={emailCopied ? 'Email address copied' : 'Copy email address'}
					aria-live="polite"
				>
					{#if emailCopied}
						<svg viewBox="0 0 16 16" aria-hidden="true">
							<path d="M3.25 8.25 6.5 11.5 12.75 4.25" />
						</svg>
					{:else}
						<svg viewBox="0 0 16 16" aria-hidden="true">
							<rect x="5.75" y="5.75" width="8" height="8" rx="1" />
							<path d="M10.25 5.5V3.5a1 1 0 0 0-1-1h-6.5a1 1 0 0 0-1 1v6.5a1 1 0 0 0 1 1h2" />
						</svg>
					{/if}
				</button>
			</div>
			{#if linkedInUrl}
				<a class="text-link" href={linkedInUrl} target="_blank" rel="noreferrer">
					LinkedIn <span aria-hidden="true">↗</span>
				</a>
			{/if}
			<a class="text-link" href={resumeUrl} target="_blank" rel="noreferrer">
				View resume <span aria-hidden="true">↗</span>
			</a>
		</aside>
	</div>
</section>

<style>
  .contact-layout {
    display: grid;
    align-items: start;
    grid-template-columns: minmax(0, 1.2fr) minmax(15rem, 0.7fr);
    gap: clamp(1.5rem, 3vw, 3rem);
  }

  .contact-form,
  .success-card,
  .contact-aside {
    padding: clamp(1.25rem, 2.4vw, 1.85rem);
  }

  .contact-form {
    position: relative;
    display: grid;
    gap: 1.15rem;
  }

  .field {
    display: grid;
    gap: 0.45rem;
  }

  .field-heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
  }

  .field-heading p {
    color: var(--paper-muted);
  }

  .field input,
  .field textarea {
    width: 100%;
    min-height: 50px;
    padding: 0.85rem 1rem;
    border: 1px solid var(--line);
    color: var(--paper);
    background: var(--ink);
    font: inherit;
    line-height: 1.5;
  }

  .field textarea {
    height: 10.5rem;
    min-height: 10.5rem;
    resize: vertical;
  }

  .field input:focus-visible,
  .field textarea:focus-visible {
    outline-offset: 2px;
  }

  .form-error {
    color: var(--signal);
    font-size: 0.92rem;
    line-height: 1.5;
  }

  .form-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem 1rem;
  }

  .contact-form .button-link {
    margin-left: auto;
  }

  .form-hint {
    color: var(--paper-muted);
    font-size: 0.78rem;
    line-height: 1.4;
  }

  .contact-form .button-link:disabled {
    cursor: wait;
    opacity: 0.7;
  }

  .success-card h3 {
    margin-top: var(--space-kicker);
    font-family: var(--serif);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 400;
    letter-spacing: -0.04em;
  }

  .success-card p:last-child {
    max-width: 34rem;
    margin-top: 1rem;
    color: var(--paper-muted);
    line-height: 1.65;
  }

  .contact-aside {
    display: grid;
    justify-items: start;
    gap: 0.85rem;
  }

  .direct-email {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem 0.55rem;
  }

  @media (max-width: 860px) {
    .contact-layout {
      grid-template-columns: 1fr;
    }

    .form-actions {
      flex-direction: column;
      align-items: stretch;
    }

    .contact-form .button-link {
      width: 100%;
      margin-left: 0;
    }
  }
</style>

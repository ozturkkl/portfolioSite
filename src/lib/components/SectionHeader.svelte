<script lang="ts">
	let {
		kicker,
		title,
		titleId,
		intro
	}: {
		kicker: string;
		title?: string;
		titleId?: string;
		intro?: string;
	} = $props();
</script>

<header class={{ 'section-header': true, 'kicker-only': !title }}>
	<div class="section-heading">
		<p class="section-number" id={!title && titleId ? titleId : undefined}>{kicker}</p>
		{#if title}
			<h2 id={titleId}>{title}</h2>
		{/if}
	</div>
	{#if intro}
		<p>{intro}</p>
	{/if}
</header>

<script>
	import { page } from '$app/stores';
</script>

<nav
	class:has-color={!!$page.data.color}
	style:background={$page.data.color ?? 'var(--bg-2)'}
>
	<a href="/universal-load-functions/">home</a>
	<a href="/universal-load-functions/red">red</a>
	<a href="/universal-load-functions/green">green</a>
	<a href="/universal-load-functions/blue">blue</a>

	{#if $page.data.component}
		<svelte:component this={$page.data.component} />
	{/if}
</nav>

<slot />

<style>
	nav.has-color,
	nav.has-color a {
		color: white;
	}
</style>

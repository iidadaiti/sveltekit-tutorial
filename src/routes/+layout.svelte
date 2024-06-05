<script lang="ts">
	import { page, navigating } from '$app/stores';
</script>

<nav>
	<a href="/" aria-current={$page.url.pathname === '/'}>about</a>
	<a href="/blog" aria-current={$page.url.pathname.startsWith('/blog')}>blog</a>
	<a href="/about" aria-current={$page.url.pathname.startsWith('/about')}>about</a>

	{#if $navigating?.to}
		navigating to {$navigating.to.url.pathname}
	{/if}
</nav>

<slot />

<style>
	a {
		text-decoration: none;
		&[aria-current='true'] {
			border-bottom: 2px solid;
		}
	}
</style>

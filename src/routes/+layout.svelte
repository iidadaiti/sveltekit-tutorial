<script lang="ts">
	import { page, navigating, updated } from '$app/stores';
</script>

<nav>
	<a href="/" aria-current={$page.url.pathname === '/'}>about</a>
	<a href="/blog" aria-current={$page.url.pathname.startsWith('/blog')}>blog</a>
	<a href="/about" aria-current={$page.url.pathname.startsWith('/about')}>about</a>
	<a href="/a">a</a>
	<a href="/b">b</a>
	<a href="/expected">page with expected error</a>
	<a href="/unexpected">page with unexpected error</a>

	{#if $navigating?.to}
		navigating to {$navigating.to.url.pathname}
	{/if}
</nav>

<slot />

<button
	type="button"
	on:click={() => {
		updated.check();
	}}>Check update</button
>

{#if $updated}
	<div class="toast">
		<p>
			A new version of the app is available

			<button on:click={() => location.reload()}> reload the page </button>
		</p>
	</div>
{/if}

<style>
	a {
		text-decoration: none;
		&[aria-current='true'] {
			border-bottom: 2px solid;
		}
	}

	.toast {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 1rem;
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.toast p {
		display: flex;
		align-items: center;
		gap: 1rem;
		background: var(--bg-2);
		padding: 0.5rem 0.5rem 0.5rem 1rem;
		border-radius: 4px;
	}
</style>

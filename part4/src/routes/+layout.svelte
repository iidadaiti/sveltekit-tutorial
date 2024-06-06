<script lang="ts">
	import { navigating } from '$app/stores';
	import type { Navigation } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	// reload check
	let seconds = 0;
	onMount(() => {
		const interval = setInterval(() => {
			seconds += 1;
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	let previous: Navigation;
	let start = Date.now();
	let end: number | null;

	$: if ($navigating) {
		start = Date.now();
		end = null;
		previous = $navigating;
	} else {
		end = Date.now();
	}
</script>

<nav>
	<a href="/">Home</a>
	<a href="/trailing-slash/always">/trailing-slash/always</a>
	<a href="/trailing-slash/always/">/trailing-slash/always/</a>
	<a href="/trailing-slash/ignore">/trailing-slash/ignore</a>
	<a href="/trailing-slash/ignore/">/trailing-slash/ignore/</a>
	<a href="/trailing-slash/never">/trailing-slash/never</a>
	<a href="/trailing-slash/never/">/trailing-slash/never/</a>

	<a href="/slow-a" data-sveltekit-preload-data>slow-a</a>
	<a href="/slow-b">slow-b</a>
</nav>

<nav data-sveltekit-reload>
	<a href="/">home</a>
	<a href="/about">about</a>
</nav>

<nav>
	<a href="/lang/">default</a>
	<a href="/lang/en">english</a>
	<a href="/lang/de">german</a>
	<a href="/lang/fr">french</a>
</nav>

<slot />

<p>the page has been open for {seconds} seconds</p>

{#if previous && end}
	<p>
		navigated from {previous.from?.url.pathname} to {previous.to?.url.pathname} in
		<strong>{end - start}ms</strong>
	</p>
{/if}

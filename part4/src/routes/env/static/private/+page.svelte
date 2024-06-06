<script>
	import { PUBLIC_THEME_BACKGROUND, PUBLIC_THEME_FOREGROUND } from '$env/static/public';

	export let form;
</script>

<main style:background={PUBLIC_THEME_BACKGROUND} style:color={PUBLIC_THEME_FOREGROUND}>
	{PUBLIC_THEME_FOREGROUND} on {PUBLIC_THEME_BACKGROUND}
</main>

<form method="POST">
	<label>
		enter the passphrase
		<input name="passphrase" autocomplete="off" />
	</label>
</form>

{#if form?.incorrect}
	<p class="error">wrong passphrase!</p>
{/if}

<style>
	.error {
		color: red;
	}
</style>

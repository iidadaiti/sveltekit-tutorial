<script>
	import { env } from '$env/dynamic/public';

	export let form;
</script>

<main style:background={env.PUBLIC_THEME_BACKGROUND} style:color={env.PUBLIC_THEME_FOREGROUND}>
	{env.PUBLIC_THEME_FOREGROUND} on {env.PUBLIC_THEME_BACKGROUND}
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

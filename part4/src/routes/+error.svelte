<script>
	import { page } from '$app/stores';
</script>

<h1>{$page.status}</h1>
<p>{$page.error?.message}</p>
<!-- ignore the type error -->
<p>error code: {$page.error?.code}</p>

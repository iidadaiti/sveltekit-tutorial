<script>
	import { message } from '$lib/message';
	export let data;
</script>

<h1>Hello {data.visited ? 'friend' : 'stranger'}!</h1>
<p>{message}</p>

<div class="centered">
	<form method="post">
		<label>
			add a todo:
			<input type="text" name="description" autocomplete="off" />
		</label>
	</form>

	<ul class="todoList">
		{#each data.todoList as todo (todo.id)}
			<li>
				{todo.description}
			</li>
		{/each}
	</ul>
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	label {
		width: 100%;
	}

	input {
		flex: 1;
	}
</style>

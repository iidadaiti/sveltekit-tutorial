<script>
	import { message } from '$lib/message';
	export let data;
	export let form;
</script>

<h1>Hello {data.visited ? 'friend' : 'stranger'}!</h1>
<p>{message}</p>

<div class="centered">
	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<form method="post" action="?/create">
		<label>
			add a todo:
			<input name="description" value={form?.description ?? ''} autocomplete="off" required />
		</label>
	</form>

	<ul class="todo-list">
		{#each data.todoList as todo (todo.id)}
			<li>
				<form method="post" action="?/delete">
					<input type="hidden" name="id" value={todo.id} />
					<span>{todo.description}</span>
					<button aria-label="Mark as complete" />
				</form>
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

	span {
		flex: 1;
	}

	button {
		width: 1.5em;
		height: 1.5em;
		border: none;
		background: url(./remove.svg) no-repeat;
		cursor: pointer;
		height: 100%;
		aspect-ratio: 1;
		opacity: 0.5;
		transition: opacity 0.2s;
	}

	button:hover {
		opacity: 1;
	}

	.error {
		color: red;
	}

	.todo-list {
		display: grid;
		gap: 0.5em;
		list-style: none;
		margin: 0;
		padding: 0.5em 0;

		& > li {
			border: 1px solid gray;
		}

		& form {
			display: flex;
			align-items: center;
			gap: 1em;
			padding: 0.5em 1em;
		}
	}
</style>

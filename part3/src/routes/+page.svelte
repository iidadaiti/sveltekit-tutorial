<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { message } from '$lib/message';
	export let data;
	export let form;

	let creating = false;
	let deleting: string[] = [];
	let number: number | undefined;

	async function roll() {
		const response = await fetch('/roll');
		number = await response.json();
	}
</script>

<h1>Hello {data.visited ? 'friend' : 'stranger'}!</h1>
<p>{message}</p>

<div class="centered">
	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<label>
		add a todo from API:
		<input
			autocomplete="off"
			on:keydown={async (e) => {
				if (e.key !== 'Enter') {
					return;
				}

				const input = e.currentTarget;
				const description = input.value;
				const response = await fetch('/todo', {
					method: 'POST',
					body: JSON.stringify({ description }),
					headers: { 'Content-Type': 'application/json' }
				});

				const { id } = await response.json();
				data.todoList = [...data.todoList, { id, description, done: false }];

				input.value = '';
			}}
		/>
	</label>

	<form
		method="post"
		action="?/create"
		use:enhance={() => {
			creating = true;

			return async ({ update }) => {
				await update();
				creating = false;
			};
		}}
	>
		<label>
			add a todo:
			<input
				disabled={creating}
				name="description"
				value={form?.description ?? ''}
				autocomplete="off"
				required
			/>
		</label>
	</form>

	<ul class="todo-list">
		{#each data.todoList.filter(({ id }) => !deleting.includes(id)) as todo (todo.id)}
			<li in:fly={{ y: 20 }} out:slide>
				<label>
					<input
						type="checkbox"
						checked={todo.done}
						on:change={async (e) => {
							const done = e.currentTarget.checked;

							await fetch(`/todo/${todo.id}`, {
								method: 'PUT',
								body: JSON.stringify({ done }),
								headers: { 'Content-Type': 'application/json' }
							});
						}}
					/>
					<span>{todo.description}</span>
				</label>

				<form
					method="post"
					action="?/delete"
					use:enhance={() => {
						deleting = [...deleting, todo.id];

						return async ({ update }) => {
							await update();
							deleting = deleting.filter((id) => id !== todo.id);
						};
					}}
				>
					<input type="hidden" name="id" value={todo.id} />
					<button aria-label="Mark as complete" />
				</form>

				<button
					type="button"
					on:click={async () => {
						await fetch(`/todo/${todo.id}`, { method: 'DELETE' });
						data.todoList = data.todoList.filter((t) => t !== todo);
					}}>Delete from API</button
				>
			</li>
		{/each}

		{#if creating}
			<span class="saving">saving...</span>
		{/if}
	</ul>
</div>

<div>
	<button on:click={roll}>Roll the dice</button>

	{#if number !== undefined}
		<p>You rolled a {number}</p>
	{/if}
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
			display: flex;
			align-items: center;
			gap: 1em;
			padding: 0.5em 1em;
			border: 1px solid gray;
		}

		& form button {
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
	}

	.saving {
		opacity: 0.5;
	}
</style>

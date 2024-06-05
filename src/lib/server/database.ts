// In a real app, this data would live in a database,
// rather than in memory. But for now, we cheat.

type Todo = {
	id: string;
	description: string;
	done: boolean;
};

const db = new Map<string, Todo[]>();

export function getTodoList(userId: string) {
	let todoList = db.get(userId);
	if (!todoList) {
		todoList = [
			{
				id: crypto.randomUUID(),
				description: 'Learn SvelteKit',
				done: false
			}
		];
		db.set(userId, todoList);
	}

	return todoList;
}

export function createTodo(userId: string, description: string) {
	const todoList = getTodoList(userId);

	if (todoList.some((todo) => todo.description === description)) {
		throw new Error('todo must be unique');
	}

	const todo: Todo = {
		id: crypto.randomUUID(),
		description,
		done: false
	};

	todoList.push(todo);

	return todo;
}

export function deleteTodo(userId: string, todoId: string) {
	const todoList = getTodoList(userId);
	const index = todoList.findIndex((todo) => todo.id === todoId) ?? -1;

	if (index !== -1) {
		todoList.splice(index, 1);
	}
}

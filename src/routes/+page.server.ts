import type { Actions, PageServerLoadEvent } from './$types';
import { fail } from '@sveltejs/kit';
import * as db from '$lib/server/database.js';

const userIdCookieKey = 'userId';

export function load({ cookies }: PageServerLoadEvent) {
	const visitedCookieKey = 'visited';

	let id = cookies.get(userIdCookieKey);
	const visited = cookies.get(visitedCookieKey) === 'true';

	cookies.set(visitedCookieKey, 'true', { path: '/' });

	if (!id) {
		id = crypto.randomUUID();
		cookies.set(userIdCookieKey, id, { path: '/' });
	}

	return { visited, todoList: db.getTodoList(id) };
}

export const actions: Actions = {
	create: async ({ cookies, request }) => {
		const data = await request.formData();

		const userId = cookies.get(userIdCookieKey);
		const description = data.get('description');

		if (typeof description !== 'string') {
			throw new Error('description type is not string');
		}

		if (description === '') {
			throw new Error('todo must have a description');
		}

		if (typeof userId !== 'string') {
			throw new Error('userId type is not string');
		}

		try {
			db.createTodo(userId, description);
		} catch (error) {
			return fail(422, {
				description,
				error: error instanceof Error ? error.message : 'server error'
			});
		}
	},

	delete: async ({ cookies, request }) => {
		const data = await request.formData();

		const userId = cookies.get(userIdCookieKey);
		const id = data.get('id');

		if (typeof userId === 'string' && typeof id === 'string') {
			db.deleteTodo(userId, id);
		}
	}
};

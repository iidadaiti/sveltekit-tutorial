import type { Actions, PageServerLoadEvent } from './$types';
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
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const userId = cookies.get(userIdCookieKey);
		const description = data.get('description');

		if (typeof userId === 'string' && typeof description === 'string') {
			db.createTodo(userId, description);
		}
	}
};

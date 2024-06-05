import { json, type RequestEvent } from '@sveltejs/kit';
import * as db from '$lib/server/database';

export async function POST({ request, cookies }: RequestEvent) {
	const { description } = await request.json();

	const userId = cookies.get('userId');
	if (typeof userId !== 'string') {
		throw new Error('userId type is not string');
	}

	const { id } = await db.createTodo(userId, description);

	return json({ id }, { status: 201 });
}

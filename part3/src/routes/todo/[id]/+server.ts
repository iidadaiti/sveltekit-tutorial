import type { RequestEvent } from './$types';
import * as db from '$lib/server/database';

export async function PUT({ params, request, cookies }: RequestEvent) {
	const { done } = await request.json();

	const userId = cookies.get('userId');
	if (typeof userId !== 'string') {
		throw new Error('userId type is not string');
	}

	await db.toggleTodo(userId, params.id, done);
	return new Response(null, { status: 204 });
}

export async function DELETE({ params, cookies }: RequestEvent) {
	const userId = cookies.get('userId');
	if (typeof userId !== 'string') {
		throw new Error('userId type is not string');
	}

	await db.deleteTodo(userId, params.id);
	return new Response(null, { status: 204 });
}

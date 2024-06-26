import type { Handle, HandleServerError, HandleFetch } from '@sveltejs/kit';

export async function handleError({
	error
}: Parameters<HandleServerError>[0] & Record<'error', Error>) {
	console.error(error.stack);

	return { message: 'everything is fine', code: 'JEREMYBEARIMY' };
}

export async function handleFetch({ event, request, fetch }: Parameters<HandleFetch>[0]) {
	const url = new URL(request.url);
	if (url.pathname === '/a') {
		return await fetch('/b');
	}

	return await fetch(request);
}

export async function handle({ event, resolve }: Parameters<Handle>[0]) {
	(event.locals as Record<'answer', string>).answer = '42';

	// force!
	if (event.url.pathname === '/ping') {
		return new Response('pong');
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('<body', '<body style="color: hotpink"')
	});
}

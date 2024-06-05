import { Handle } from '@sveltejs/kit';

export async function handle({ event, resolve }: Parameters<Handle>[0]) {
	// force!
	if (event.url.pathname === '/ping') {
		return new Response('pong');
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('<body', '<body style="color: hotpink"')
	});
}

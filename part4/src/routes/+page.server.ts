import type { LoadEvent } from '@sveltejs/kit';

export const ssr = false;
export const prerender = true;

export async function load(event: LoadEvent) {
	const response = await event.fetch('/a');

	return {
		eventLocalsMessage: `the answer is ${(event as any).locals.answer}`,
		fetchMessage: await response.text()
	};
}

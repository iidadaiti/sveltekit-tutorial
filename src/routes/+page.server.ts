import type { PageServerLoadEvent } from './$types';

export function load({ cookies }: PageServerLoadEvent) {
	const visitedCookieKey = 'visited';
	const visited = cookies.get(visitedCookieKey) === 'true';

	cookies.set(visitedCookieKey, 'true', { path: '/' });

	return { visited };
}

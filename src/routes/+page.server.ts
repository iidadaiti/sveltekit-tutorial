import type { PageServerLoadEvent } from './$types';

export function load({ setHeaders }: PageServerLoadEvent) {
	setHeaders({ 'Content-Type': 'text/plain' });
}

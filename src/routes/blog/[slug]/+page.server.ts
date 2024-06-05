import type { PageServerLoadEvent } from '../$types';
import { error } from '@sveltejs/kit';
import { posts } from '../data';

export function load({ params }: PageServerLoadEvent) {
	if (!('slug' in params)) {
		throw error(500);
	}

	const post = posts.find(({ slug }) => slug === params.slug);

	if (!post) {
		throw error(404);
	}

	return { post };
}

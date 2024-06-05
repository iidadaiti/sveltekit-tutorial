import { posts } from './data';

export function load() {
	return { summaries: posts.map(({ slug, title }) => ({ slug, title })) };
}

import type { LoadEvent } from '@sveltejs/kit';

const greetings: Record<string, string> = {
	en: 'hello!',
	de: 'hallo!',
	fr: 'bonjour!'
};

export function load({ params }: LoadEvent) {
	return {
		greeting: greetings[params.lang ?? 'en']
	};
}

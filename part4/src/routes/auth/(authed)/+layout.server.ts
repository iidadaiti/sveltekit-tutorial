import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
	if (!cookies.get('logged_in')) {
		throw redirect(303, `/auth/login?redirectTo=${url.pathname}`);
	}
}

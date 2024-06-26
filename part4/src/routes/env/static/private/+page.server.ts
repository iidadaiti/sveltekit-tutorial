import { redirect, fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export function load({ cookies }) {
	if (cookies.get('allowed')) {
		throw redirect(307, '/welcome');
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		if (data.get('passphrase') === env.PASSPHRASE) {
			cookies.set('allowed', 'true', {
				path: '/env/static/private'
			});

			throw redirect(303, '/env/static/private/welcome');
		}

		return fail(403, { incorrect: true });
	}
};

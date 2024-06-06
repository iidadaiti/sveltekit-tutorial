export async function load({ depends, fetch }) {
	depends('data:now');

	return { now: new Date() };
}

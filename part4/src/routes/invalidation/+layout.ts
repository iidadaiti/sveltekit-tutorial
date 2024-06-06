export async function load({ fetch }) {
	const response = await fetch('/invalidation/api/now');
	const now = await response.json();

	return { now };
}

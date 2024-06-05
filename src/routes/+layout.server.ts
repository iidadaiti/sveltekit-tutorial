export function load() {
	if (Math.random() > 0.3) {
		throw new Error('yikes');
	}
}

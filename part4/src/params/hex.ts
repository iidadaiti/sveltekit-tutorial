export function match(value: unknown): boolean {
	return typeof value === 'string' && /^[0-9a-f]{6}$/.test(value);
}

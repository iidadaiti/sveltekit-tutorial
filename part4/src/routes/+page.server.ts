export function load(event: Record<'locals', Record<'answer', 'string'>>) {
	return {
		message: `the answer is ${event.locals.answer}`
	};
}

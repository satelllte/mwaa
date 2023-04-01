export const clamp = (value: number, min: number, max: number): number => {
	if (min > max) {
		throw new TypeError(`min cannot be more than max, but received min: ${min}, max: ${max}`)
	}

	return Math.max(min, Math.min(value, max))
}

/**
 * Returns the percent of given range, e.g.:
 * ```ts
 * 	rangePercent(0.25, -1, 1) // 25% of [-1..1] range is 0.5
 * ```
 */
export const rangePercent = (
	percent: number,
	min: number,
	max: number,
): number => {
	if (min > max) {
		throw new TypeError(`min cannot be more than max, but received min: ${min}, max: ${max}`)
	}

	return (max - min) * percent
}

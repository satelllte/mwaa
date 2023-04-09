import {describe, expect, it} from 'vitest'
import {rangePercent} from './rangePercent'

describe('rangePercent', () => {
	it('works for positive range', () => {
		expect(rangePercent(0.5, 1, 3)).toEqual(1)
	})

	it('works for negative range', () => {
		expect(rangePercent(0.25, -10, -5)).toEqual(1.25)
	})

	it('works for negative to positive range', () => {
		expect(rangePercent(0.25, -10, 10)).toEqual(5)
	})

	it('works for 0 to N range', () => {
		expect(rangePercent(0.5, 0, 1)).toEqual(0.5)
	})

	it('works for N to 0 range', () => {
		expect(rangePercent(0.25, -4, 0)).toEqual(1)
	})

	it('works for -N to N range', () => {
		expect(rangePercent(0.75, -4, 4)).toEqual(6)
	})

	it('throws if min > max', () => {
		expect(() => rangePercent(0.5, 1, 0)).toThrowErrorMatchingInlineSnapshot('"min cannot be more than max, but received min: 1, max: 0"')
	})
})

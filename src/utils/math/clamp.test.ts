import {describe, expect, it} from 'vitest'
import {clamp} from './clamp'

describe('clamp', () => {
	it('returns value if it is in the [min, max] range', () => {
		expect(clamp(5, 0, 10)).toEqual(5)
	})

	it('returns min if value is less than it', () => {
		expect(clamp(-1, 0, 10)).toEqual(0)
	})

	it('returns max if value is more than it', () => {
		expect(clamp(11, 0, 10)).toEqual(10)
	})

	it('throws if min > max', () => {
		expect(() => clamp(0, 1, -1)).toThrowErrorMatchingInlineSnapshot('"min cannot be more than max, but received min: 1, max: -1"')
	})
})

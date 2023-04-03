import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import {MWAA} from './MWAA'
import {MockAudioParam} from './MockAudioParam'

describe('MockAudioParam', () => {
	beforeAll(() => {
		MWAA.mock()
	})

	afterAll(() => {
		MWAA.unmock()
	})

	it('is defined', () => {
		expect(AudioParam).toBeDefined()
	})

	it('equals to MockAudioParam', () => {
		expect(AudioParam).toEqual(MockAudioParam)
	})

	it('throws illegal constructor error when trying to create it', () => {
		expect(() => new AudioParam()).toThrowErrorMatchingInlineSnapshot('"Illegal constructor"')
	})
})

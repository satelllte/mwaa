import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import {MWAA} from './MWAA'
import {MockBaseAudioContext} from './MockBaseAudioContext'

describe('MockBaseAudioContext', () => {
	beforeAll(() => {
		MWAA.mock()
	})

	afterAll(() => {
		MWAA.unmock()
	})

	it('is defined', () => {
		expect(BaseAudioContext).toBeDefined()
	})

	it('equals to MockBaseAudioContext', () => {
		expect(BaseAudioContext).toEqual(MockBaseAudioContext)
	})

	it('throws illegal constructor error when trying to create it', () => {
		expect(() => new BaseAudioContext()).toThrowErrorMatchingInlineSnapshot('"Illegal constructor"')
	})
})

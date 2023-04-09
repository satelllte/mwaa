import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import {MWAA} from './MWAA'
import {MockAudioNode} from './MockAudioNode'

describe('MockAudioNode', () => {
	beforeAll(() => {
		MWAA.mock()
	})

	afterAll(() => {
		MWAA.unmock()
	})

	it('is defined', () => {
		expect(AudioNode).toBeDefined()
	})

	it('equals to MockAudioNode', () => {
		expect(AudioNode).toEqual(MockAudioNode)
	})

	it('throws illegal constructor error when trying to create it', () => {
		expect(() => new AudioNode()).toThrowErrorMatchingInlineSnapshot('"Illegal constructor"')
	})
})

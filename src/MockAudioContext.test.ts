import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import {MWAA} from './MWAA'
import {MockAudioContext} from './MockAudioContext'

describe('MockAudioContext', () => {
	beforeAll(() => {
		MWAA.mock()
	})

	afterAll(() => {
		MWAA.unmock()
	})

	it('is defined', () => {
		expect(AudioContext).toBeDefined()
	})

	it('equals to MockAudioContext', () => {
		expect(AudioContext).toEqual(MockAudioContext)
	})

	it('initializes an instance of AudioContext which extends BaseAudioContext', () => {
		const ctx: AudioContext = new AudioContext()
		expect(ctx).toBeInstanceOf(AudioContext)
		expect(ctx).toBeInstanceOf(BaseAudioContext)
	})
})

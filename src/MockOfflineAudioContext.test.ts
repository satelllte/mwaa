import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import {MWAA} from './MWAA'
import {MockOfflineAudioContext} from './MockOfflineAudioContext'

describe('MockOfflineAudioContext', () => {
	beforeAll(() => {
		MWAA.mock()
	})

	afterAll(() => {
		MWAA.unmock()
	})

	it('is defined', () => {
		expect(OfflineAudioContext).toBeDefined()
	})

	it('equals to MockOfflineAudioContext', () => {
		expect(OfflineAudioContext).toEqual(MockOfflineAudioContext)
	})

	it('initializes an instance of OfflineAudioContext which extends BaseAudioContext', () => {
		const ctx: OfflineAudioContext = new OfflineAudioContext({
			numberOfChannels: 2,
			length: 44100 * 40,
			sampleRate: 44100,
		})
		expect(ctx).toBeInstanceOf(OfflineAudioContext)
		expect(ctx).toBeInstanceOf(BaseAudioContext)
	})

	// eslint-disable-next-line no-warning-comments
	// TODO: do the shared `testBaseAudioContext()`
	// ...
	// ...
	// ...
})

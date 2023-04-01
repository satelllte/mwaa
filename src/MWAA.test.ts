import {describe, expect, it} from 'vitest'
import {MockAudioContext} from './MockAudioContext'
import {MockAudioNode} from './MockAudioNode'
import {MockBaseAudioContext} from './MockBaseAudioContext'
import {MockGainNode} from './MockGainNode'
import {MWAA} from './MWAA'

describe('MWAA', () => {
	it('mocks & unmocks Web Audio API in globalThis correctly', () => {
		confirmWebAudioApiUndefined()

		MWAA.mock()
		confirmWebAudioApiDefined()

		MWAA.unmock()
		confirmWebAudioApiUndefined()
	})

	it('throws if calling mock() when Web Audio API was already mocked', () => {
		MWAA.mock()
		expect(() => {
			MWAA.mock()
		}).toThrowErrorMatchingInlineSnapshot('"[MWAA] already using mocked version of Web Audio API"')
		MWAA.unmock()
	})

	it('throws if calling unmock() when Web Audio API was not mocked', () => {
		expect(() => {
			MWAA.unmock()
		}).toThrowErrorMatchingInlineSnapshot('"[MWAA] already using the original version of Web Audio API"')
	})
})

const confirmWebAudioApiUndefined = (): void => {
	expect(globalThis.AudioContext).toBeUndefined()
	expect(globalThis.AudioNode).toBeUndefined()
	expect(globalThis.BaseAudioContext).toBeUndefined()
	expect(globalThis.GainNode).toBeUndefined()
}

const confirmWebAudioApiDefined = (): void => {
	expect(globalThis.AudioContext).toBeDefined()
	expect(globalThis.AudioContext).toEqual(MockAudioContext)
	expect(globalThis.AudioNode).toBeDefined()
	expect(globalThis.AudioNode).toEqual(MockAudioNode)
	expect(globalThis.BaseAudioContext).toBeDefined()
	expect(globalThis.BaseAudioContext).toEqual(MockBaseAudioContext)
	expect(globalThis.GainNode).toBeDefined()
	expect(globalThis.GainNode).toEqual(MockGainNode)
}

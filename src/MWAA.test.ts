import {describe, expect, it} from 'vitest'
import {MockAudioNode} from './MockAudioNode'
import {MockBaseAudioContext} from './MockBaseAudioContext'
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
	expect(globalThis.AudioNode).toBeUndefined()
	expect(globalThis.BaseAudioContext).toBeUndefined()
}

const confirmWebAudioApiDefined = (): void => {
	expect(globalThis.AudioNode).toBeDefined()
	expect(globalThis.AudioNode).toEqual(MockAudioNode)
	expect(globalThis.BaseAudioContext).toBeDefined()
	expect(globalThis.BaseAudioContext).toEqual(MockBaseAudioContext)
}

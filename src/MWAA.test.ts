import {describe, expect, it} from 'vitest'
import {MockAudioContext} from './MockAudioContext'
import {MockAudioNode} from './MockAudioNode'
import {MockAudioParam} from './MockAudioParam'
import {MockBaseAudioContext} from './MockBaseAudioContext'
import {MockDelayNode} from './MockDelayNode'
import {MockGainNode} from './MockGainNode'
import {MockOfflineAudioContext} from './MockOfflineAudioContext'
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
	const confirm = (globalThisObject: unknown): void => {
		expect(globalThisObject).toBeUndefined()
	}

	confirm(globalThis.AudioContext)
	confirm(globalThis.AudioNode)
	confirm(globalThis.AudioParam)
	confirm(globalThis.BaseAudioContext)
	confirm(globalThis.DelayNode)
	confirm(globalThis.GainNode)
	confirm(globalThis.OfflineAudioContext)
}

const confirmWebAudioApiDefined = (): void => {
	const confirm = (globalThisObject: unknown, mock: unknown): void => {
		expect(globalThisObject).toBeDefined()
		expect(globalThisObject).toEqual(mock)
	}

	confirm(globalThis.AudioContext, MockAudioContext)
	confirm(globalThis.AudioNode, MockAudioNode)
	confirm(globalThis.AudioParam, MockAudioParam)
	confirm(globalThis.BaseAudioContext, MockBaseAudioContext)
	confirm(globalThis.DelayNode, MockDelayNode)
	confirm(globalThis.GainNode, MockGainNode)
	confirm(globalThis.OfflineAudioContext, MockOfflineAudioContext)
}

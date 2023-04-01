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

	describe('sampleRate', () => {
		it('equals to 44100 by default', () => {
			const ctx: AudioContext = new AudioContext()
			expect(ctx.sampleRate).toEqual(44100)
		})

		it('equals to custom value if specified in constructor', () => {
			const ctx: AudioContext = new AudioContext({sampleRate: 48000})
			expect(ctx.sampleRate).toEqual(48000)
		})

		it('throws error if custom value specified in constructor is out of device\'s range', () => {
			expect(() => new AudioContext({sampleRate: 1})).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioContext\': The hardware sample rate provided (1) is outside the range [3000, 192000]"')
			expect(() => new AudioContext({sampleRate: 1000000})).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioContext\': The hardware sample rate provided (1000000) is outside the range [3000, 192000]"')
		})
	})

	describe('latencyHint / baseLatency / outputLatency', () => {
		it('equals to the mock values of "interactive" latencyHint by default', () => {
			const ctx: AudioContext = new AudioContext()
			expect(ctx.baseLatency).toEqual(0.005)
			expect(ctx.outputLatency).toEqual(0.009)
		})

		it('equals to the mock values of "balanced" latencyHint if specified in constructor', () => {
			const ctx: AudioContext = new AudioContext({latencyHint: 'balanced'})
			expect(ctx.baseLatency).toEqual(0.011)
			expect(ctx.outputLatency).toEqual(0.022)
		})

		it('equals to the mock values of "playback" latencyHint if specified in constructor', () => {
			const ctx: AudioContext = new AudioContext({latencyHint: 'playback'})
			expect(ctx.baseLatency).toEqual(0.025)
			expect(ctx.outputLatency).toEqual(0.051)
		})

		it('equals to the custom values of latencyHint if specified in constructor', () => {
			const ctx: AudioContext = new AudioContext({latencyHint: 0.08})
			expect(ctx.baseLatency).toEqual(0.08)
			expect(ctx.outputLatency).toEqual(0.16)
		})

		it('throws error if latencyHint specified in construtor is wrong', () => {
			// @ts-expect-error test for the latencyHint type check
			expect(() => new AudioContext({latencyHint: 'XXX'})).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioContext\': Failed to read the \'latencyHint\' property from \'AudioContextOptions\': The provided value XXX is not a valid enum value of type AudioContextLatencyCategory."')
		})
	})
})

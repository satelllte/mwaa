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

	describe('currentTime', () => {
		it('equals to 0 by default', () => {
			const ctx: AudioContext = new AudioContext()
			expect(ctx.currentTime).toEqual(0)
		})

		it('cannot be modified directly', () => {
			const ctx: AudioContext = new AudioContext()
			expect(ctx.currentTime).toEqual(0)
			// @ts-expect-error for testing
			ctx.currentTime = 0.13
			expect(ctx.currentTime).toEqual(0)
		})
	})

	describe('state', () => {
		// eslint-disable-next-line no-warning-comments
		// TODO: in the future Autoplay policy behaviour can also be simulated: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices#autoplay_policy
		it('equals to "running" by default', () => {
			const ctx: AudioContext = new AudioContext()
			expect(ctx.state).toEqual('running')
		})

		it('cannot be modified directly', () => {
			const ctx: AudioContext = new AudioContext()
			expect(ctx.state).toEqual('running')
			// @ts-expect-error for testing
			ctx.state = 'suspended'
			expect(ctx.state).toEqual('running')
		})
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
			expect(() => new AudioContext({sampleRate: 1})).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioContext\': The sample rate provided (1) is outside the range [8000, 96000]"')
			expect(() => new AudioContext({sampleRate: 1000000})).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioContext\': The sample rate provided (1000000) is outside the range [8000, 96000]"')
		})

		it('cannot be modified directly', () => {
			const ctx: AudioContext = new AudioContext()
			expect(ctx.sampleRate).toEqual(44100)
			// @ts-expect-error for testing
			ctx.sampleRate = 96000
			expect(ctx.sampleRate).toEqual(44100)
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

		it('cannot be modified directly', () => {
			const ctx: AudioContext = new AudioContext()
			expect(ctx.baseLatency).toEqual(0.005)
			expect(ctx.outputLatency).toEqual(0.009)
			// @ts-expect-error testing
			ctx.baseLatency = 0.22
			// @ts-expect-error testing
			ctx.outputLatency = 0.33
			expect(ctx.baseLatency).toEqual(0.005)
			expect(ctx.outputLatency).toEqual(0.009)
		})
	})
})

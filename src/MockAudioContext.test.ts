import {type Mock, afterAll, beforeAll, describe, expect, it, vi} from 'vitest'
import {testBaseAudioContext} from './utils/testing/testBaseAudioContext'
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

	testBaseAudioContext(() => new AudioContext())

	testAudioContextEventTarget()
	testAudioContextState()
	testAudioContextSampleRate()
	testAudioContextLatency()
})

const testAudioContextEventTarget = (): void => {
	describe('EventTarget', () => {
		const getStateChangeEventForContext = (ctx: BaseAudioContext): Partial<Event> => ({
			currentTarget: ctx,
			srcElement: ctx,
			target: ctx,
			type: 'statechange',
		})

		it('fires on state change', async () => {
			const ctx: AudioContext = new AudioContext()
			const listenerSpy: Mock = vi.fn()
			ctx.addEventListener('statechange', listenerSpy)
			expect(listenerSpy).toHaveBeenCalledTimes(0)
			await ctx.suspend()
			expect(listenerSpy).toHaveBeenCalledTimes(1)
			expect(listenerSpy).toHaveBeenCalledWith(expect.objectContaining(getStateChangeEventForContext(ctx)))
			await ctx.resume()
			expect(listenerSpy).toHaveBeenCalledTimes(2)
			expect(listenerSpy).toHaveBeenCalledWith(expect.objectContaining(getStateChangeEventForContext(ctx)))
			ctx.removeEventListener('statechange', listenerSpy)
			await ctx.close()
			expect(listenerSpy).toHaveBeenCalledTimes(2)
		})
	})
}

const testAudioContextState = (): void => {
	describe('state', () => {
		// eslint-disable-next-line no-warning-comments
		// TODO: in the future Autoplay policy behaviour can also be simulated: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices#autoplay_policy
		it('is "running" initially', () => {
			const ctx: AudioContext = new AudioContext()
			expect(ctx.state).toEqual('running')
		})

		describe('suspend', () => {
			it('is able to suspend the state', async () => {
				const ctx: AudioContext = new AudioContext()
				expect(ctx.state).toEqual('running')
				await ctx.suspend()
				expect(ctx.state).toEqual('suspended')
			})

			it('does not do anything if state already suspended', async () => {
				const ctx: AudioContext = new AudioContext()
				expect(ctx.state).toEqual('running')
				await ctx.suspend()
				expect(ctx.state).toEqual('suspended')
				await ctx.suspend()
				expect(ctx.state).toEqual('suspended')
			})

			it('rejects if state is closed', async () => {
				const ctx: AudioContext = new AudioContext()
				await ctx.close()
				expect(ctx.state).toEqual('closed')
				await expect(ctx.suspend()).rejects.toMatchInlineSnapshot('[Error: Failed to execute \'suspend\' on \'AudioContext\': Cannot suspend a closed AudioContext]')
			})
		})

		describe('resume', () => {
			it('is able to resume the state', async () => {
				const ctx: AudioContext = new AudioContext()
				expect(ctx.state).toEqual('running')
				await ctx.suspend()
				expect(ctx.state).toEqual('suspended')
				await ctx.resume()
				expect(ctx.state).toEqual('running')
			})

			it('does not do anything if state already running', async () => {
				const ctx: AudioContext = new AudioContext()
				expect(ctx.state).toEqual('running')
				await ctx.resume()
				expect(ctx.state).toEqual('running')
			})

			it('rejects if state is closed', async () => {
				const ctx: AudioContext = new AudioContext()
				await ctx.close()
				expect(ctx.state).toEqual('closed')
				await expect(ctx.resume()).rejects.toMatchInlineSnapshot('[Error: Failed to execute \'resume\' on \'AudioContext\': Cannot resume a closed AudioContext]')
			})
		})

		describe('close', () => {
			it('is able to close the state', async () => {
				const ctx: AudioContext = new AudioContext()
				expect(ctx.state).toEqual('running')
				await ctx.close()
				expect(ctx.state).toEqual('closed')
			})

			it('reject if the state already closed', async () => {
				const ctx: AudioContext = new AudioContext()
				expect(ctx.state).toEqual('running')
				await ctx.close()
				expect(ctx.state).toEqual('closed')
				await expect(ctx.close()).rejects.toMatchInlineSnapshot('[Error: Failed to execute \'close\' on \'AudioContext\': Cannot close a closed AudioContext]')
			})
		})
	})
}

const testAudioContextSampleRate = (): void => {
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
	})
}

const testAudioContextLatency = (): void => {
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
}

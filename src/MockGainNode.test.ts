import {type SpyInstance, afterAll, beforeAll, describe, expect, it} from 'vitest'
import {useConsoleWarnSpy} from './utils/testing/useConsoleWarnSpy'
import {MWAA} from './MWAA'
import {MockGainNode} from './MockGainNode'
import {testAudioNode} from './utils/testing/testAudioNode'

describe('MockGainNode', () => {
	const consoleWarnSpy: SpyInstance = useConsoleWarnSpy()

	beforeAll(() => {
		MWAA.mock()
	})

	afterAll(() => {
		MWAA.unmock()
	})

	it('is defined', () => {
		expect(GainNode).toBeDefined()
	})

	it('equals to MockGainNode', () => {
		expect(GainNode).toEqual(MockGainNode)
	})

	it('initializes an instance of GainNode which extends AudioNode', () => {
		const ctx: AudioContext = new AudioContext()
		const gainNode: GainNode = new GainNode(ctx)
		expect(gainNode).toBeInstanceOf(GainNode)
		expect(gainNode).toBeInstanceOf(AudioNode)
	})

	testAudioNode({
		nodeName: 'GainNode',
		numberOfInputs: 1,
		numberOfOutputs: 1,
	})

	/**
	 * Tests for: "gain" AudioParam
	 */
	describe('"gain" AudioParam', () => {
		it('is instance of AudioParam', () => {
			const ctx: AudioContext = new AudioContext()
			const gainNode: GainNode = new GainNode(ctx)
			expect(gainNode.gain).toBeInstanceOf(AudioParam)
		})

		it('has correct default properties: automationRate / value / defaultValue / minValue / maxValue', () => {
			const ctx: AudioContext = new AudioContext()
			const gainNode: GainNode = new GainNode(ctx)
			expect(gainNode.gain.automationRate).toEqual('a-rate')
			expect(gainNode.gain.value).toEqual(1)
			expect(gainNode.gain.defaultValue).toEqual(1)
			expect(gainNode.gain.minValue).toEqual(-3.4028234663852886e+38)
			expect(gainNode.gain.maxValue).toEqual(+3.4028234663852886e+38)
		})

		describe('"automationRate" property', () => {
			it('can be updated', () => {
				const ctx: AudioContext = new AudioContext()
				const gainNode: GainNode = new GainNode(ctx)
				expect(gainNode.gain.automationRate).toEqual('a-rate')
				gainNode.gain.automationRate = 'k-rate'
				expect(gainNode.gain.automationRate).toEqual('k-rate')
			})

			it('does not update & logs warning if the value is wrong', () => {
				const ctx: AudioContext = new AudioContext()
				const gainNode: GainNode = new GainNode(ctx)
				expect(gainNode.gain.automationRate).toEqual('a-rate')
				expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
				// @ts-expect-error bad input test
				gainNode.gain.automationRate = 'x-rate'
				expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
				expect(consoleWarnSpy).toHaveBeenCalledWith('The provided value \'x-rate\' is not a valid enum value of type AutomationRate.')
				expect(gainNode.gain.automationRate).toEqual('a-rate')
			})
		})

		describe('"value" property', () => {
			it('can be set from constructor', () => {
				const ctx: AudioContext = new AudioContext()
				const gainNode: GainNode = new GainNode(ctx, {gain: 0.77})
				expect(gainNode.gain.value).toEqual(0.77)
			})

			it('clamps the value if it is out of range from constructor', () => {
				const ctx: AudioContext = new AudioContext()
				expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
				const gainNode: GainNode = new GainNode(ctx, {gain: -3.4028234663852886e+38 - 1e38})
				expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
				expect(consoleWarnSpy).toHaveBeenCalledWith('value -4.4028234663852884e+38 outside nominal range [-3.4028234663852886e+38, 3.4028234663852886e+38]; value will be clamped')
				expect(gainNode.gain.value).toEqual(-3.4028234663852886e+38)
			})

			it('throws error if it is wrong from constructor', () => {
				const ctx: AudioContext = new AudioContext()
				expect(() =>
					// @ts-expect-error bad input test
					new GainNode(ctx, {gain: 'x'}),
				).toThrowErrorMatchingInlineSnapshot('"The provided float value is non-finite"')
			})

			it('can be updated from setter', () => {
				const ctx: AudioContext = new AudioContext()
				const gainNode: GainNode = new GainNode(ctx)
				expect(gainNode.gain.value).toEqual(1)
				gainNode.gain.value = 0.75
				expect(gainNode.gain.value).toEqual(0.75)
			})

			it('clamps the value if it is out of range from setter', () => {
				const ctx: AudioContext = new AudioContext()
				const gainNode: GainNode = new GainNode(ctx)
				expect(gainNode.gain.value).toEqual(1)
				expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
				gainNode.gain.value = -3.4028234663852886e+38 - 1e38
				expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
				expect(consoleWarnSpy).toHaveBeenCalledWith('value -4.4028234663852884e+38 outside nominal range [-3.4028234663852886e+38, 3.4028234663852886e+38]; value will be clamped')
				expect(gainNode.gain.value).toEqual(-3.4028234663852886e+38)
			})

			it('throws error if it is wrong from setter', () => {
				const ctx: AudioContext = new AudioContext()
				const gainNode: GainNode = new GainNode(ctx)
				expect(gainNode.gain.value).toEqual(1)
				expect(() => {
					// @ts-expect-error bad input test
					gainNode.gain.value = 'x'
				}).toThrowErrorMatchingInlineSnapshot('"Failed to set the \'value\' property on \'AudioParam\': The provided float value is non-finite."')
			})
		})
	})
})

import {type SpyInstance, afterAll, beforeAll, describe, expect, it, vi} from 'vitest'
import {useConsoleWarnSpy} from './utils/testing/useConsoleWarnSpy'
import {MWAA} from './MWAA'
import {MockGainNode} from './MockGainNode'

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

	testAudioNodeContext('GainNode')
	testAudioNodeNumberOfInputsAndOutputs('GainNode', 1, 1)
	testAudioNodeChannelCount('GainNode')

	// eslint-disable-next-line no-warning-comments
	// TODO: testAudioNodeChannelCountMode()
	// eslint-disable-next-line no-warning-comments
	// TODO: testAudioNodeChannelInterpretation()

	/**
	 * Tests for: channelCountMode
	 */

	it('has correct channelCountMode by default', () => {
		const ctx: AudioContext = new AudioContext()
		const gainNode: GainNode = new GainNode(ctx)
		expect(gainNode.channelCountMode).toEqual('max')
	})

	it('has correct channelCountMode from constructor', () => {
		const ctx: AudioContext = new AudioContext()
		const gainNode: GainNode = new GainNode(ctx, {channelCountMode: 'clamped-max'})
		expect(gainNode.channelCountMode).toEqual('clamped-max')
	})

	it('throws error if channelCountMode from constructor is wrong', () => {
		const ctx: AudioContext = new AudioContext()
		expect(() =>
			// @ts-expect-error bad input test
			new GainNode(ctx, {channelCountMode: 'clamped-maxx'}),
		).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'GainNode\': Failed to read the \'channelCountMode\' property from \'AudioNodeOptions\': The provided value \'clamped-maxx\' is not a valid enum value of type ChannelCountMode."')
	})

	it('allows to update channelCountMode', () => {
		const ctx: AudioContext = new AudioContext()
		const gainNode: GainNode = new GainNode(ctx)
		expect(gainNode.channelCountMode).toEqual('max')
		gainNode.channelCountMode = 'explicit'
		expect(gainNode.channelCountMode).toEqual('explicit')
	})

	it('does not do anything but logs warning when trying to update to wrong channelCountMode', () => {
		const ctx: AudioContext = new AudioContext()
		const gainNode: GainNode = new GainNode(ctx)
		expect(gainNode.channelCountMode).toEqual('max')
		expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
		// @ts-expect-error bad input testing
		gainNode.channelCountMode = 'explicitt'
		expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
		expect(consoleWarnSpy).toHaveBeenCalledWith('The provided value \'explicitt\' is not a valid enum value of type ChannelCountMode.')
		expect(gainNode.channelCountMode).toEqual('max')
	})

	/**
	 * Tests for: channelInterpretation
	 */

	it('has correct channelInterpretation by default', () => {
		const ctx: AudioContext = new AudioContext()
		const gainNode: GainNode = new GainNode(ctx)
		expect(gainNode.channelInterpretation).toEqual('speakers')
	})

	it('has correct channelInterpretation from constructor', () => {
		const ctx: AudioContext = new AudioContext()
		const gainNode: GainNode = new GainNode(ctx, {channelInterpretation: 'discrete'})
		expect(gainNode.channelInterpretation).toEqual('discrete')
	})

	it('throws error if channelInterpretation from constructor is wrong', () => {
		const ctx: AudioContext = new AudioContext()
		expect(() =>
			// @ts-expect-error bad input test
			new GainNode(ctx, {channelInterpretation: 'discr'}),
		).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'GainNode\': Failed to read the \'channelInterpretation\' property from \'AudioNodeOptions\': The provided value \'discr\' is not a valid enum value of type ChannelInterpretation."')
	})

	it('allows to update channelInterpretation', () => {
		const ctx: AudioContext = new AudioContext()
		const gainNode: GainNode = new GainNode(ctx)
		expect(gainNode.channelInterpretation).toEqual('speakers')
		gainNode.channelInterpretation = 'discrete'
		expect(gainNode.channelInterpretation).toEqual('discrete')
	})

	it('does not do anything but logs warning when trying to update to wrong channelInterpretation', () => {
		const ctx: AudioContext = new AudioContext()
		const gainNode: GainNode = new GainNode(ctx)
		expect(gainNode.channelInterpretation).toEqual('speakers')
		expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
		// @ts-expect-error bad input testing
		gainNode.channelInterpretation = 'bad'
		expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
		expect(consoleWarnSpy).toHaveBeenCalledWith('The provided value \'bad\' is not a valid enum value of type ChannelInterpretation.')
		expect(gainNode.channelInterpretation).toEqual('speakers')
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

// eslint-disable-next-line no-warning-comments
// TODO: make all the `testAudioNode...` helpers shared

type AudioNodeName =
	| 'GainNode'

const testAudioNodeContext = (nodeName: AudioNodeName): void => {
	describe(`${nodeName}.context`, () => {
		it('references the correct context', () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx)
			expect(node.context).toEqual(ctx)
		})

		it('is read-only', () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx)
			expect(node.context).toEqual(ctx)
			// @ts-expect-error for testing
			node.context = 'x'
			expect(node.context).toEqual(ctx)
		})

		it('throws error if context argument is wrong from constructor', () => {
			// @ts-expect-error for testing
			expect(() => new globalThis[nodeName]('WRONG')).toThrowErrorMatchingInlineSnapshot(`"Failed to construct '${nodeName}': parameter 1 is not of type 'BaseAudioContext'"`)
		})
	})
}

const testAudioNodeNumberOfInputsAndOutputs = (
	nodeName: AudioNodeName,
	correctNumberOfInputs: number,
	correctNumberOfOutputs: number,
): void => {
	describe(`${nodeName}.numberOfInputs / ${nodeName}.numberOfOutputs`, () => {
		it(`has correct number of inputs (${correctNumberOfInputs}) & outputs (${correctNumberOfOutputs})`, () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx)
			expect(node.numberOfInputs).toEqual(correctNumberOfInputs)
			expect(node.numberOfOutputs).toEqual(correctNumberOfOutputs)
		})

		it('is read-only', () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx)
			expect(node.numberOfInputs).toEqual(correctNumberOfInputs)
			expect(node.numberOfOutputs).toEqual(correctNumberOfOutputs)
			// @ts-expect-error for testing
			node.numberOfInputs = correctNumberOfInputs + 1
			// @ts-expect-error for testing
			node.numberOfOutputs = correctNumberOfOutputs + 1
			expect(node.numberOfInputs).toEqual(correctNumberOfInputs)
			expect(node.numberOfOutputs).toEqual(correctNumberOfOutputs)
		})
	})
}

const testAudioNodeChannelCount = (nodeName: AudioNodeName): void => {
	describe(`${nodeName}.channelCount`, () => {
		it('is 2 by default', () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx)
			expect(node.channelCount).toEqual(2)
		})

		it('can be set from constructor', () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx, {channelCount: 4})
			expect(node.channelCount).toEqual(4)
		})

		it('throws error if the value from constructor is wrong', () => {
			const ctx: AudioContext = new AudioContext()
			expect(() =>
				new globalThis[nodeName](ctx, {channelCount: 0}),
			).toThrowErrorMatchingInlineSnapshot(`"Failed to construct '${nodeName}': The channel count provided (0) is outside the range [1, 32]"`)
			expect(() =>
				new globalThis[nodeName](ctx, {channelCount: 33}),
			).toThrowErrorMatchingInlineSnapshot(`"Failed to construct '${nodeName}': The channel count provided (33) is outside the range [1, 32]"`)
			expect(() =>
				// @ts-expect-error testing
				new globalThis[nodeName](ctx, {channelCount: 'x'}),
			).toThrowErrorMatchingInlineSnapshot(`"Failed to construct '${nodeName}': The channel count provided (x) is outside the range [1, 32]"`)
		})

		it('allows modifications from setter', () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx)
			expect(node.channelCount).toEqual(2)
			node.channelCount = 8
			expect(node.channelCount).toEqual(8)
		})

		it('throws error if the value from setter is wrong', () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx)
			expect(node.channelCount).toEqual(2)
			expect(() => {
				node.channelCount = 0
			}).toThrowErrorMatchingInlineSnapshot('"Failed to set the \'channelCount\' property on \'AudioNode\': The channel count provided (0) is outside the range [1, 32]"')
			expect(() => {
				node.channelCount = 33
			}).toThrowErrorMatchingInlineSnapshot('"Failed to set the \'channelCount\' property on \'AudioNode\': The channel count provided (33) is outside the range [1, 32]"')
			expect(() => {
				// @ts-expect-error testing input with wrong type
				node.channelCount = 'x'
			}).toThrowErrorMatchingInlineSnapshot('"Failed to set the \'channelCount\' property on \'AudioNode\': The channel count provided (x) is outside the range [1, 32]"')
			expect(node.channelCount).toEqual(2)
		})
	})
}

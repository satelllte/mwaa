import {type SpyInstance, describe, expect, it} from 'vitest'
import {type AudioNodeName} from '../../types'
import {useConsoleWarnSpy} from './useConsoleWarnSpy'

// eslint-disable-next-line no-warning-comments
// TODO: repeat the tests for OfflineAudioContext as well

export const testAudioNode = ({
	nodeName,
	numberOfInputs,
	numberOfOutputs,
}: {
	nodeName: AudioNodeName;
	numberOfInputs: number;
	numberOfOutputs: number;
}): void => {
	testAudioNodeContext(nodeName)
	testAudioNodeNumberOfInputsAndOutputs(nodeName, numberOfInputs, numberOfOutputs)
	testAudioNodeChannelCount(nodeName)
	testAudioNodeChannelCountMode(nodeName)
	testAudioNodeChannelInterpretation(nodeName)
}

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

const testAudioNodeChannelCountMode = (nodeName: AudioNodeName): void => {
	describe(`${nodeName}.channelCountMode`, () => {
		const consoleWarnSpy: SpyInstance = useConsoleWarnSpy()

		it('is "max" by default', () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx)
			expect(node.channelCountMode).toEqual('max')
		})

		it('can be set from constructor', () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx, {channelCountMode: 'clamped-max'})
			expect(node.channelCountMode).toEqual('clamped-max')
		})

		it('throws error if the value from constructor is wrong', () => {
			const ctx: AudioContext = new AudioContext()
			expect(() =>
				// @ts-expect-error bad input test
				new globalThis[nodeName](ctx, {channelCountMode: 'clamped-maxx'}),
			).toThrowErrorMatchingInlineSnapshot(`"Failed to construct '${nodeName}': Failed to read the 'channelCountMode' property from 'AudioNodeOptions': The provided value 'clamped-maxx' is not a valid enum value of type ChannelCountMode."`)
		})

		it('allows modifications from setter', () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx)
			expect(node.channelCountMode).toEqual('max')
			node.channelCountMode = 'explicit'
			expect(node.channelCountMode).toEqual('explicit')
		})

		it('does not do anything but logs warning if the value from setter is wrong', () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx)
			expect(node.channelCountMode).toEqual('max')
			expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
			// @ts-expect-error bad input testing
			node.channelCountMode = 'explicitt'
			expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
			expect(consoleWarnSpy).toHaveBeenCalledWith('The provided value \'explicitt\' is not a valid enum value of type ChannelCountMode.')
			expect(node.channelCountMode).toEqual('max')
		})
	})
}

const testAudioNodeChannelInterpretation = (nodeName: AudioNodeName): void => {
	describe(`${nodeName}.channelInterpretation`, () => {
		const consoleWarnSpy: SpyInstance = useConsoleWarnSpy()

		it('is "speakers" by default', () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx)
			expect(node.channelInterpretation).toEqual('speakers')
		})

		it('can be set from constructor', () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx, {channelInterpretation: 'discrete'})
			expect(node.channelInterpretation).toEqual('discrete')
		})

		it('throws error if the value from constructor is wrong', () => {
			const ctx: AudioContext = new AudioContext()
			expect(() =>
				// @ts-expect-error bad input test
				new globalThis[nodeName](ctx, {channelInterpretation: 'discr'}),
			).toThrowErrorMatchingInlineSnapshot(`"Failed to construct '${nodeName}': Failed to read the 'channelInterpretation' property from 'AudioNodeOptions': The provided value 'discr' is not a valid enum value of type ChannelInterpretation."`)
		})

		it('allows modifications from setter', () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx)
			expect(node.channelInterpretation).toEqual('speakers')
			node.channelInterpretation = 'discrete'
			expect(node.channelInterpretation).toEqual('discrete')
		})

		it('does not do anything but logs warning if the value from setter is wrong', () => {
			const ctx: AudioContext = new AudioContext()
			const node: AudioNode = new globalThis[nodeName](ctx)
			expect(node.channelInterpretation).toEqual('speakers')
			expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
			// @ts-expect-error bad input testing
			node.channelInterpretation = 'bad'
			expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
			expect(consoleWarnSpy).toHaveBeenCalledWith('The provided value \'bad\' is not a valid enum value of type ChannelInterpretation.')
			expect(node.channelInterpretation).toEqual('speakers')
		})
	})
}

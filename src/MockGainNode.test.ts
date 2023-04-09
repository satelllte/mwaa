import {type SpyInstance, afterAll, beforeAll, describe, expect, it} from 'vitest'
import {type AudioNodeName} from './types'
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

	testAudioParam({
		nodeName: 'GainNode',
		paramName: 'gain',
		creator() {
			const ctx: AudioContext = new AudioContext()
			const node: GainNode = new GainNode(ctx)
			const	param: AudioParam = node.gain
			return {ctx, node, param}
		},
		expectedAutomationRate: 'a-rate',
		expectedValue: 1,
		expectedDefaultValue: 1,
		expectedMinValue: -3.4028234663852886e+38,
		expectedMaxValue: 3.4028234663852886e+38,
	})

	/**
	 * Tests for: "gain" AudioParam
	 */
	describe('"gain" AudioParam', () => {
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

type CreatorFnResult = {
	ctx: BaseAudioContext;
	node: AudioNode;
	param: AudioParam;
}
type CreatorFn = () => CreatorFnResult

const testAudioParam = ({
	nodeName,
	paramName,
	creator,
	expectedAutomationRate,
	expectedValue,
	expectedDefaultValue,
	expectedMinValue,
	expectedMaxValue,
}: {
	nodeName: AudioNodeName;
	paramName: string;
	creator: CreatorFn;
	expectedAutomationRate: AutomationRate;
	expectedValue: number;
	expectedDefaultValue: number;
	expectedMinValue: number;
	expectedMaxValue: number;
}): void => {
	describe(`${nodeName}.${paramName}`, () => {
		const consoleWarnSpy: SpyInstance = useConsoleWarnSpy()

		it('is instance of AudioParam', () => {
			const {ctx, node, param}: CreatorFnResult = creator()
			expect(param).toBeInstanceOf(AudioParam)
		})

		it('has correct default properties: value / defaultValue / minValue / maxValue', () => {
			const {ctx, node, param}: CreatorFnResult = creator()
			expect(param.value).toEqual(expectedValue)
			expect(param.defaultValue).toEqual(expectedDefaultValue)
			expect(param.minValue).toEqual(expectedMinValue)
			expect(param.maxValue).toEqual(expectedMaxValue)
		})

		describe('"automationRate" property', () => {
			it(`equals to expectedAutomationRate (${expectedAutomationRate}) by default`, () => {
				const {ctx, node, param}: CreatorFnResult = creator()
				expect(param.automationRate).toEqual(expectedAutomationRate)
			})

			it('can be updated via setter', () => {
				const {ctx, node, param}: CreatorFnResult = creator()
				expect(param.automationRate).toEqual(expectedAutomationRate)
				const flippedAutomationRate: AutomationRate = expectedAutomationRate === 'a-rate' ? 'k-rate' : 'a-rate'
				param.automationRate = flippedAutomationRate
				expect(param.automationRate).toEqual(flippedAutomationRate)
			})

			it('does not update & logs warning if received wrong value via setter', () => {
				const {ctx, node, param}: CreatorFnResult = creator()
				expect(param.automationRate).toEqual(expectedAutomationRate)
				expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
				// @ts-expect-error bad input test
				param.automationRate = 'x-rate'
				expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
				expect(consoleWarnSpy).toHaveBeenCalledWith('The provided value \'x-rate\' is not a valid enum value of type AutomationRate.')
				expect(param.automationRate).toEqual(expectedAutomationRate)
			})
		})

		// eslint-disable-next-line no-warning-comments
		// TODO: create reusable test
		describe.todo('"value" property')

		describe('"defaultValue" property', () => {
			it(`equals to expectedDefaultValue (${expectedDefaultValue}) by default`, () => {
				const {ctx, node, param}: CreatorFnResult = creator()
				expect(param.defaultValue).toEqual(expectedDefaultValue)
			})

			it('cannot be modified', () => {
				const {ctx, node, param}: CreatorFnResult = creator()
				expect(param.defaultValue).toEqual(expectedDefaultValue)
				// @ts-expect-error testing
				param.defaultValue = expectedDefaultValue + 1
				expect(param.defaultValue).toEqual(expectedDefaultValue)
			})
		})

		describe('"minValue" property', () => {
			it(`equals to expectedMinValue (${expectedMinValue}) by default`, () => {
				const {ctx, node, param}: CreatorFnResult = creator()
				expect(param.minValue).toEqual(expectedMinValue)
			})

			it('cannot be modified', () => {
				const {ctx, node, param}: CreatorFnResult = creator()
				expect(param.minValue).toEqual(expectedMinValue)
				// @ts-expect-error testing
				param.minValue = expectedMinValue + (expectedMinValue * 0.25) // Add 25% of the value, so the test will be also reliable for huge values like GainNode.gain.minValue
				expect(param.minValue).toEqual(expectedMinValue)
			})
		})

		describe('"maxValue" property', () => {
			it(`equals to expectedMaxValue (${expectedMaxValue}) by default`, () => {
				const {ctx, node, param}: CreatorFnResult = creator()
				expect(param.maxValue).toEqual(expectedMaxValue)
			})

			it('cannot be modified', () => {
				const {ctx, node, param}: CreatorFnResult = creator()
				expect(param.maxValue).toEqual(expectedMaxValue)
				// @ts-expect-error testing
				param.maxValue = expectedMaxValue + (expectedMinValue * 0.25) // Add 25% of the value, so the test will be also reliable for huge values like GainNode.gain.maxValue
				expect(param.maxValue).toEqual(expectedMaxValue)
			})
		})
	})
}

import {type SpyInstance, describe, expect, it} from 'vitest'
import {type AudioNodeName} from '../../types'
import {rangePercent} from '../math/rangePercent'
import {useConsoleWarnSpy} from './useConsoleWarnSpy'

type CreatorFnResult = {
	node: AudioNode;
	param: AudioParam;
}
type CreatorFn = (ctx: BaseAudioContext) => CreatorFnResult

export const testAudioParam = ({
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

		// Operating at 25% of the value shifts (e.g., instead of +/- 1) allows the tests to be also reliable for huge minValue/maxValue ranges like GainNode.gain param has
		const value25: number = rangePercent(0.25, expectedMinValue, expectedMaxValue)
		const differentInRangeValue: number = expectedMinValue + value25 // Taking value at 25% in-between of the param's min/max range
		const lessThanMinValue: number = expectedMinValue - value25 // Taking value 25% less than min relative to the param's min/max range
		const moreThanMaxValue: number = expectedMaxValue + value25 // Taking value 25% more than max relative to the param's min/max range

		it('is instance of AudioParam', () => {
			const ctx: AudioContext = new AudioContext()
			const {node, param}: CreatorFnResult = creator(ctx)
			expect(param).toBeInstanceOf(AudioParam)
		})

		it('cannot be modified', () => {
			const ctx: AudioContext = new AudioContext()
			const {node, param}: CreatorFnResult = creator(ctx)
			// @ts-expect-error for testing
			expect(node[paramName]).toEqual(param)
			// @ts-expect-error for testing
			node[paramName] = 'x'
			// @ts-expect-error for testing
			expect(node[paramName]).toEqual(param)
		})

		describe('"automationRate" property', () => {
			it(`equals to expectedAutomationRate (${expectedAutomationRate}) by default`, () => {
				const ctx: AudioContext = new AudioContext()
				const {node, param}: CreatorFnResult = creator(ctx)
				expect(param.automationRate).toEqual(expectedAutomationRate)
			})

			it('can be updated via setter', () => {
				const ctx: AudioContext = new AudioContext()
				const {node, param}: CreatorFnResult = creator(ctx)
				expect(param.automationRate).toEqual(expectedAutomationRate)
				// eslint-disable-next-line no-warning-comments
				// TODO: once expectedAutomationRate equals to "k-rate" in some case, the c8 warning will go & this comment can be removed
				const flippedAutomationRate: AutomationRate = expectedAutomationRate === 'a-rate' ? 'k-rate' : 'a-rate'
				param.automationRate = flippedAutomationRate
				expect(param.automationRate).toEqual(flippedAutomationRate)
			})

			it('does not update & logs warning if received wrong value via setter', () => {
				const ctx: AudioContext = new AudioContext()
				const {node, param}: CreatorFnResult = creator(ctx)
				expect(param.automationRate).toEqual(expectedAutomationRate)
				expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
				// @ts-expect-error bad input test
				param.automationRate = 'x-rate'
				expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
				expect(consoleWarnSpy).toHaveBeenCalledWith('The provided value \'x-rate\' is not a valid enum value of type AutomationRate.')
				expect(param.automationRate).toEqual(expectedAutomationRate)
			})
		})

		describe('"value" property', () => {
			it(`equals to expectedValue ${expectedValue}`, () => {
				const ctx: AudioContext = new AudioContext()
				const {node, param}: CreatorFnResult = creator(ctx)
				expect(param.value).toEqual(expectedValue)
			})

			it('can be updated from setter', () => {
				const ctx: AudioContext = new AudioContext()
				const {node, param}: CreatorFnResult = creator(ctx)
				expect(param.value).toEqual(expectedValue)
				param.value = differentInRangeValue
				expect(param.value).toEqual(differentInRangeValue)
			})

			it('clamps & logs warning if the value received from setter is out of range', () => {
				const ctx: AudioContext = new AudioContext()
				const {node, param}: CreatorFnResult = creator(ctx)
				console.info(`${nodeName}.${paramName} | lessThanMinValue: `, lessThanMinValue)
				console.info(`${nodeName}.${paramName} | moreThanMaxValue: `, moreThanMaxValue)
				expect(param.value).toEqual(expectedValue)
				expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
				param.value = lessThanMinValue
				expect(param.value).toEqual(expectedMinValue)
				expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
				expect(consoleWarnSpy).toHaveBeenCalledWith(`value ${lessThanMinValue} outside nominal range [${expectedMinValue}, ${expectedMaxValue}]; value will be clamped`)
				param.value = moreThanMaxValue
				expect(param.value).toEqual(expectedMaxValue)
				expect(consoleWarnSpy).toHaveBeenCalledTimes(2)
				expect(consoleWarnSpy).toHaveBeenCalledWith(`value ${moreThanMaxValue} outside nominal range [${expectedMinValue}, ${expectedMaxValue}]; value will be clamped`)
			})

			it('throws error if the value received from setter is not finite', () => {
				const ctx: AudioContext = new AudioContext()
				const {param}: CreatorFnResult = creator(ctx)
				expect(param.value).toEqual(expectedValue)
				expect(() => {
					param.value = Infinity
				}).toThrowErrorMatchingInlineSnapshot('"Failed to set the \'value\' property on \'AudioParam\': The provided float value is non-finite."')
				expect(() => {
					// @ts-expect-error bad input test
					param.value = 'x'
				}).toThrowErrorMatchingInlineSnapshot('"Failed to set the \'value\' property on \'AudioParam\': The provided float value is non-finite."')
				expect(param.value).toEqual(expectedValue)
			})

			it('can be initialized from constructor', () => {
				const ctx: AudioContext = new AudioContext()
				const node: AudioNode = new globalThis[nodeName](ctx, {
					[paramName]: differentInRangeValue,
				})
				// @ts-expect-error for testing
				const param: AudioParam = (node[paramName] as AudioParam)
				expect(param.value).toEqual(differentInRangeValue)
			})

			it('clamps & logs warning if the value received from constructor is out of range', () => {
				const ctx: AudioContext = new AudioContext()
				expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
				const node: AudioNode = new globalThis[nodeName](ctx, {
					[paramName]: moreThanMaxValue,
				})
				// @ts-expect-error for testing
				const param: AudioParam = (node[paramName] as AudioParam)
				expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
				expect(consoleWarnSpy).toHaveBeenCalledWith(`value ${moreThanMaxValue} outside nominal range [${expectedMinValue}, ${expectedMaxValue}]; value will be clamped`)
				expect(param.value).toEqual(expectedMaxValue)
			})

			it('throws error if the value received from constructor is not finite', () => {
				const ctx: AudioContext = new AudioContext()
				expect(() =>
					new globalThis[nodeName](ctx, {
						[paramName]: -Infinity,
					}),
				).toThrowErrorMatchingInlineSnapshot('"The provided float value is non-finite"')
				expect(() =>
					new globalThis[nodeName](ctx, {
						[paramName]: 'x',
					}),
				).toThrowErrorMatchingInlineSnapshot('"The provided float value is non-finite"')
			})
		})

		describe('"defaultValue" property', () => {
			it(`equals to expectedDefaultValue (${expectedDefaultValue}) by default`, () => {
				const ctx: AudioContext = new AudioContext()
				const {node, param}: CreatorFnResult = creator(ctx)
				expect(param.defaultValue).toEqual(expectedDefaultValue)
			})

			it('cannot be modified', () => {
				const ctx: AudioContext = new AudioContext()
				const {node, param}: CreatorFnResult = creator(ctx)
				expect(param.defaultValue).toEqual(expectedDefaultValue)
				// @ts-expect-error testing
				param.defaultValue = differentInRangeValue
				expect(param.defaultValue).toEqual(expectedDefaultValue)
			})
		})

		describe('"minValue" property', () => {
			it(`equals to expectedMinValue (${expectedMinValue}) by default`, () => {
				const ctx: AudioContext = new AudioContext()
				const {node, param}: CreatorFnResult = creator(ctx)
				expect(param.minValue).toEqual(expectedMinValue)
			})

			it('cannot be modified', () => {
				const ctx: AudioContext = new AudioContext()
				const {node, param}: CreatorFnResult = creator(ctx)
				expect(param.minValue).toEqual(expectedMinValue)
				// @ts-expect-error testing
				param.minValue = differentInRangeValue
				expect(param.minValue).toEqual(expectedMinValue)
			})
		})

		describe('"maxValue" property', () => {
			it(`equals to expectedMaxValue (${expectedMaxValue}) by default`, () => {
				const ctx: AudioContext = new AudioContext()
				const {node, param}: CreatorFnResult = creator(ctx)
				expect(param.maxValue).toEqual(expectedMaxValue)
			})

			it('cannot be modified', () => {
				const ctx: AudioContext = new AudioContext()
				const {node, param}: CreatorFnResult = creator(ctx)
				expect(param.maxValue).toEqual(expectedMaxValue)
				// @ts-expect-error testing
				param.maxValue = differentInRangeValue
				expect(param.maxValue).toEqual(expectedMaxValue)
			})
		})
	})
}

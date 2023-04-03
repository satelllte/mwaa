import {type SpyInstance, afterAll, beforeAll, describe, expect, it} from 'vitest'
import {MWAA} from './MWAA'
import {MockAudioParam} from './MockAudioParam'
import {useConsoleWarnSpy} from './utils/testing/useConsoleWarnSpy'

class TestParam extends MockAudioParam {
	constructor(options: {
		automationRate: AutomationRate;
		defaultValue: number;
		minValue: number;
		maxValue: number;
		value?: number;
	}) {
		super(options)
	}
}

describe('MockAudioParam', () => {
	const consoleWarnSpy: SpyInstance = useConsoleWarnSpy()

	beforeAll(() => {
		MWAA.mock()
	})

	afterAll(() => {
		MWAA.unmock()
	})

	it('is defined', () => {
		expect(AudioParam).toBeDefined()
	})

	it('equals to MockAudioParam', () => {
		expect(AudioParam).toEqual(MockAudioParam)
	})

	it('throws illegal constructor error when trying to create it without extension', () => {
		expect(() => new AudioParam()).toThrowErrorMatchingInlineSnapshot('"Illegal constructor"')
	})

	describe('constructor', () => {
		it('sets parameters correctly', () => {
			// @ts-expect-error TODO: once MockAudioParam implements everything from AudioParam, this error should go
			const param: AudioParam = new TestParam({
				automationRate: 'a-rate',
				defaultValue: 0,
				minValue: -1,
				maxValue: 1,
				value: 0.5,
			})
			expect(param.automationRate).toEqual('a-rate')
			expect(param.defaultValue).toEqual(0)
			expect(param.minValue).toEqual(-1)
			expect(param.maxValue).toEqual(1)
			expect(param.value).toEqual(0.5)
		})

		it('sets "value" parameter to "defaultValue" if it is not present initially', () => {
			// @ts-expect-error TODO: once MockAudioParam implements everything from AudioParam, this error should go
			const param: AudioParam = new TestParam({
				automationRate: 'a-rate',
				defaultValue: 0,
				minValue: -1,
				maxValue: 1,
			})
			expect(param.value).toEqual(0)
		})

		it('clamps "value" & logs warning if it is out of range initially', () => {
			expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
			// @ts-expect-error TODO: once MockAudioParam implements everything from AudioParam, this error should go
			const param: AudioParam = new TestParam({
				automationRate: 'a-rate',
				defaultValue: 0,
				minValue: -1,
				maxValue: 1,
				value: 1.1,
			})
			expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
			expect(consoleWarnSpy).toHaveBeenCalledWith('value 1.1 outside nominal range [-1, 1]; value will be clamped')
			expect(param.value).toEqual(1)
		})

		describe('error handling', () => {
			it('throws error when inherited node provides invalid "automationRate" value', () => {
				expect(() => new TestParam({
					// @ts-expect-error bad input test
					automationRate: 'x-rate',
					defaultValue: 0,
					minValue: -1,
					maxValue: 1,
				})).toThrowErrorMatchingInlineSnapshot('"Cannot create MockAudioParam: Must provide valid \\"automationRate\\""')
			})

			it('throws error when inherited node provides invalid "value" value', () => {
				expect(() => new TestParam({
					automationRate: 'a-rate',
					defaultValue: 0,
					minValue: -1,
					maxValue: 1,
					// @ts-expect-error bad input test
					value: 'x',
				})).toThrowErrorMatchingInlineSnapshot('"The provided float value is non-finite"')
				expect(() => new TestParam({
					automationRate: 'a-rate',
					defaultValue: 0,
					minValue: -1,
					maxValue: 1,
					value: Infinity,
				})).toThrowErrorMatchingInlineSnapshot('"The provided float value is non-finite"')
			})

			it('throws error when inherited node provides invalid "defaultValue" readonly value', () => {
				expect(() => new TestParam({
					automationRate: 'a-rate',
					// @ts-expect-error bad input test
					defaultValue: 'x',
					minValue: -1,
					maxValue: 1,
				})).toThrowErrorMatchingInlineSnapshot('"Cannot create MockAudioParam: Must provide valid \\"defaultValue\\""')
			})

			it('throws error when inherited node provides invalid "minValue" readonly value', () => {
				expect(() => new TestParam({
					automationRate: 'a-rate',
					defaultValue: 0,
					// @ts-expect-error bad input test
					minValue: 'x',
					maxValue: 1,
				})).toThrowErrorMatchingInlineSnapshot('"Cannot create MockAudioParam: Must provide valid \\"minValue\\""')
			})

			it('throws error when inherited node provides invalid "maxValue" readonly value', () => {
				expect(() => new TestParam({
					automationRate: 'a-rate',
					defaultValue: 0,
					minValue: -1,
					// @ts-expect-error bad input test
					maxValue: 'x',
				})).toThrowErrorMatchingInlineSnapshot('"Cannot create MockAudioParam: Must provide valid \\"maxValue\\""')
			})
		})
	})

	describe('setters', () => {
		describe('automationRate', () => {
			it('updates the value', () => {
				// @ts-expect-error TODO: once MockAudioParam implements everything from AudioParam, this error should go
				const param: AudioParam = new TestParam({
					automationRate: 'a-rate',
					defaultValue: 0,
					minValue: -1,
					maxValue: 1,
				})
				expect(param.automationRate).toEqual('a-rate')
				param.automationRate = 'k-rate'
				expect(param.automationRate).toEqual('k-rate')
			})

			it('does not change the value & logs warning if it is wrong', () => {
				// @ts-expect-error TODO: once MockAudioParam implements everything from AudioParam, this error should go
				const param: AudioParam = new TestParam({
					automationRate: 'a-rate',
					defaultValue: 0,
					minValue: -1,
					maxValue: 1,
				})
				expect(param.automationRate).toEqual('a-rate')
				expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
				// @ts-expect-error bad input test
				param.automationRate = 'x-rate'
				expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
				expect(consoleWarnSpy).toHaveBeenCalledWith('The provided value \'x-rate\' is not a valid enum value of type AutomationRate.')
				expect(param.automationRate).toEqual('a-rate')
			})
		})

		describe('value', () => {
			it('updates the value', () => {
				// @ts-expect-error TODO: once MockAudioParam implements everything from AudioParam, this error should go
				const param: AudioParam = new TestParam({
					automationRate: 'a-rate',
					defaultValue: 0,
					minValue: -1,
					maxValue: 1,
				})
				expect(param.value).toEqual(0)
				param.value = 0.75
				expect(param.value).toEqual(0.75)
			})

			it('clamps the value & logs warning if it is out of range', () => {
				// @ts-expect-error TODO: once MockAudioParam implements everything from AudioParam, this error should go
				const param: AudioParam = new TestParam({
					automationRate: 'a-rate',
					defaultValue: 0,
					minValue: -1,
					maxValue: 1,
				})
				expect(param.value).toEqual(0)
				expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
				param.value = -1.15
				expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
				expect(consoleWarnSpy).toHaveBeenCalledWith('value -1.15 outside nominal range [-1, 1]; value will be clamped')
				expect(param.value).toEqual(-1)
			})

			it('throws if it is wrong', () => {
				// @ts-expect-error TODO: once MockAudioParam implements everything from AudioParam, this error should go
				const param: AudioParam = new TestParam({
					automationRate: 'a-rate',
					defaultValue: 0,
					minValue: -1,
					maxValue: 1,
				})
				expect(param.value).toEqual(0)
				expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
				expect(() => {
					param.value = -Infinity
				}).toThrowErrorMatchingInlineSnapshot('"Failed to set the \'value\' property on \'AudioParam\': The provided float value is non-finite."')
				expect(() => {
					// @ts-expect-error bad input test
					param.value = 'x'
				}).toThrowErrorMatchingInlineSnapshot('"Failed to set the \'value\' property on \'AudioParam\': The provided float value is non-finite."')
			})
		})
	})
})

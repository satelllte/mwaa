import {describe, it, beforeAll, afterAll, expect} from 'vitest'
import {MWAA} from './MWAA'
import {MockDelayNode} from './MockDelayNode'
import {testAudioNode} from './utils/testing/testAudioNode'
import {testAudioParam} from './utils/testing/testAudioParam'

describe('MockDelayNode', () => {
	beforeAll(() => {
		MWAA.mock()
	})

	afterAll(() => {
		MWAA.unmock()
	})

	it('is defined', () => {
		expect(DelayNode).toBeDefined()
	})

	it('equals to MockDelayNode', () => {
		expect(DelayNode).toEqual(MockDelayNode)
	})

	it('initializes an instance of DelayNode which extends AudioNode', () => {
		const ctx: AudioContext = new AudioContext()
		const delayNode: DelayNode = new DelayNode(ctx)
		expect(delayNode).toBeInstanceOf(DelayNode)
		expect(delayNode).toBeInstanceOf(AudioNode)
	})

	describe('maxDelayTime', () => {
		it('sets delayTime.maxValue from constructor', () => {
			const ctx: AudioContext = new AudioContext()
			const delayNode: DelayNode = new DelayNode(ctx, {maxDelayTime: 5})
			expect(delayNode.delayTime.maxValue).toEqual(5)
		})

		it('allows to set delayTime value more than 1 from constructor', () => {
			const ctx: AudioContext = new AudioContext()
			const delayNode: DelayNode = new DelayNode(ctx, {maxDelayTime: 5, delayTime: 3})
			expect(delayNode.delayTime.value).toEqual(3)
			expect(delayNode.delayTime.maxValue).toEqual(5)
		})

		it('throws is non-finite value passed', () => {
			const ctx: AudioContext = new AudioContext()
			expect(() =>
				new DelayNode(ctx, {maxDelayTime: Infinity}),
			).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'DelayNode\': Failed to read the \'maxDelayTime\' property from \'DelayOptions\': The provided double value is non-finite."')
			expect(() =>
				// @ts-expect-error for testing
				new DelayNode(ctx, {maxDelayTime: 'x'}),
			).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'DelayNode\': Failed to read the \'maxDelayTime\' property from \'DelayOptions\': The provided double value is non-finite."')
		})

		it('throws if out of range value passed', () => {
			const ctx: AudioContext = new AudioContext()
			expect(() =>
				new DelayNode(ctx, {maxDelayTime: -1}),
			).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'DelayNode\': The max delay time provided (-1) is outside the range (0, 180)"')
			expect(() =>
				new DelayNode(ctx, {maxDelayTime: 0}),
			).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'DelayNode\': The max delay time provided (0) is outside the range (0, 180)"')
			expect(() =>
				new DelayNode(ctx, {maxDelayTime: 180}),
			).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'DelayNode\': The max delay time provided (180) is outside the range (0, 180)"')
		})
	})

	testAudioNode({
		nodeName: 'DelayNode',
		numberOfInputs: 1,
		numberOfOutputs: 1,
	})

	testAudioParam({
		nodeName: 'DelayNode',
		paramName: 'delayTime',
		creator(ctx: BaseAudioContext) {
			const node: DelayNode = new DelayNode(ctx)
			const	param: AudioParam = node.delayTime
			return {node, param}
		},
		expectedAutomationRate: 'a-rate',
		expectedValue: 0,
		expectedDefaultValue: 0,
		expectedMinValue: 0,
		expectedMaxValue: 1,
	})
})

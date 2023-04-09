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

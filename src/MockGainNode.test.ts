import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import {testAudioNode} from './utils/testing/testAudioNode'
import {testAudioParam} from './utils/testing/testAudioParam'
import {MWAA} from './MWAA'
import {MockGainNode} from './MockGainNode'

describe('MockGainNode', () => {
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
		creator(ctx: BaseAudioContext) {
			const node: GainNode = new GainNode(ctx)
			const	param: AudioParam = node.gain
			return {node, param}
		},
		expectedAutomationRate: 'a-rate',
		expectedValue: 1,
		expectedDefaultValue: 1,
		expectedMinValue: -3.4028234663852886e+38,
		expectedMaxValue: 3.4028234663852886e+38,
	})
})

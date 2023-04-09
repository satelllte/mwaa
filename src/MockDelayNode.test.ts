import {describe, it, beforeAll, afterAll, expect} from 'vitest'
import {MWAA} from './MWAA'
import {MockDelayNode} from './MockDelayNode'
import {testAudioNode} from './utils/testing/testAudioNode'

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
})

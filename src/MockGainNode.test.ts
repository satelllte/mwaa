import {afterAll, beforeAll, describe, expect, it} from 'vitest'
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

	it('throws error if context argument is wrong', () => {
		// @ts-expect-error testing error handling
		expect(() => new GainNode('WRONG')).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'GainNode\': parameter 1 is not of type \'BaseAudioContext\'"')
	})

	it('initializes an instance of GainNode which extends AudioNode', () => {
		const ctx: AudioContext = new AudioContext()
		const gainNode: GainNode = new GainNode(ctx)
		expect(gainNode).toBeInstanceOf(GainNode)
		expect(gainNode).toBeInstanceOf(AudioNode)
	})

	it('assigns correct context', () => {
		const ctx: AudioContext = new AudioContext()
		const gainNode: GainNode = new GainNode(ctx)
		expect(gainNode.context).toEqual(ctx)
	})

	it('has correct numberOfInputs & numberOfOutputs', () => {
		const ctx: AudioContext = new AudioContext()
		const gainNode: GainNode = new GainNode(ctx)
		expect(gainNode.numberOfInputs).toEqual(1)
		expect(gainNode.numberOfOutputs).toEqual(1)
	})
})

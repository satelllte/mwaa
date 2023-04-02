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

	it('has correct channelCount', () => {
		const ctx: AudioContext = new AudioContext()
		const gainNode: GainNode = new GainNode(ctx)
		expect(gainNode.channelCount).toEqual(2)
	})

	it('allows to update channelCount', () => {
		const ctx: AudioContext = new AudioContext()
		const gainNode: GainNode = new GainNode(ctx)
		expect(gainNode.channelCount).toEqual(2)
		gainNode.channelCount = 8
		expect(gainNode.channelCount).toEqual(8)
	})

	it('throws error if trying to set wrong channelCount', () => {
		const ctx: AudioContext = new AudioContext()
		const gainNode: GainNode = new GainNode(ctx)
		expect(gainNode.channelCount).toEqual(2)
		expect(() => {
			gainNode.channelCount = 0
		}).toThrowErrorMatchingInlineSnapshot('"Failed to set the \'channelCount\' property on \'AudioNode\': The channel count provided (0) is outside the range [1, 32]"')
		expect(() => {
			gainNode.channelCount = 33
		}).toThrowErrorMatchingInlineSnapshot('"Failed to set the \'channelCount\' property on \'AudioNode\': The channel count provided (33) is outside the range [1, 32]"')
		expect(() => {
			// @ts-expect-error testing input with wrong type
			gainNode.channelCount = 'x'
		}).toThrowErrorMatchingInlineSnapshot('"Failed to set the \'channelCount\' property on \'AudioNode\': The channel count provided (x) is outside the range [1, 32]"')
		expect(gainNode.channelCount).toEqual(2)
	})
})

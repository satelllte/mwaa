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
})

import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import {MWAA} from './MWAA'
import {MockAudioNode} from './MockAudioNode'

describe('MockAudioNode', () => {
	beforeAll(() => {
		MWAA.mock()
	})

	afterAll(() => {
		MWAA.unmock()
	})

	it('is defined', () => {
		expect(AudioNode).toBeDefined()
	})

	it('equals to MockAudioNode', () => {
		expect(AudioNode).toEqual(MockAudioNode)
	})

	it('throws illegal constructor error when trying to create it', () => {
		expect(() => new AudioNode()).toThrowErrorMatchingInlineSnapshot('"Illegal constructor"')
	})

	it('throws error when inherited node has wrong numberOfInputs', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
					numberOfInputs: -1,
					numberOfOutputs: 1,
				})
			}
		}
		expect(() => new MockTestNode()).toThrowErrorMatchingInlineSnapshot('"Failed to define \'MockTestNode\': numberOfInputs -1 is out of [0, 6] range"')
	})

	it('throws error when inherited node has wrong numberOfOutputs', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
					numberOfInputs: 0,
					numberOfOutputs: 7,
				})
			}
		}
		expect(() => new MockTestNode()).toThrowErrorMatchingInlineSnapshot('"Failed to define \'MockTestNode\': numberOfOutputs 7 is out of [0, 6] range"')
	})
})

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

	/**
	 * Tests for: numberOfInputs / numberOfOutputs
	 */

	it('sets numberOfInputs / numberOfOutputs to 1 by default for inherited node', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
				})
			}
		}
		const node: MockTestNode = new MockTestNode()
		expect(node.numberOfInputs).toEqual(1)
		expect(node.numberOfOutputs).toEqual(1)
	})

	it('throws error when inherited node has wrong numberOfInputs', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
					numberOfInputs: -1,
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
					numberOfOutputs: 7,
				})
			}
		}
		expect(() => new MockTestNode()).toThrowErrorMatchingInlineSnapshot('"Failed to define \'MockTestNode\': numberOfOutputs 7 is out of [0, 6] range"')
	})

	/**
	 * Tests for: channelCount
	 */

	it('sets channelCount to 2 by default for inherited node', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
				})
			}
		}
		const node: MockTestNode = new MockTestNode()
		expect(node.channelCount).toEqual(2)
	})

	it('throws error when inherited node has wrong channelCount initially', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
					channelCount: 0,
				})
			}
		}
		expect(() => new MockTestNode()).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'TestNode\': The channel count provided (0) is outside the range [1, 32]"')
	})

	it('updates channelCount for inherited node', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
				})
			}
		}
		const node: MockTestNode = new MockTestNode()
		expect(node.channelCount).toEqual(2)
		node.channelCount = 4
		expect(node.channelCount).toEqual(4)
	})

	it('throws error when inherited node tries to set out of range channelCount', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
				})
			}
		}
		const node: MockTestNode = new MockTestNode()
		expect(node.channelCount).toEqual(2)
		expect(() => {
			node.channelCount = 0
		}).toThrowErrorMatchingInlineSnapshot('"Failed to set the \'channelCount\' property on \'AudioNode\': The channel count provided (0) is outside the range [1, 32]"')
		expect(() => {
			node.channelCount = 33
		}).toThrowErrorMatchingInlineSnapshot('"Failed to set the \'channelCount\' property on \'AudioNode\': The channel count provided (33) is outside the range [1, 32]"')
		expect(() => {
			// @ts-expect-error testing input with wrong type
			node.channelCount = 'x'
		}).toThrowErrorMatchingInlineSnapshot('"Failed to set the \'channelCount\' property on \'AudioNode\': The channel count provided (x) is outside the range [1, 32]"')
		expect(node.channelCount).toEqual(2)
	})
})

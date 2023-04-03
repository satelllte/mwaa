import {type SpyInstance, afterAll, beforeAll, describe, expect, it} from 'vitest'
import {useConsoleWarnSpy} from './utils/testing/useConsoleWarnSpy'
import {MWAA} from './MWAA'
import {MockAudioNode} from './MockAudioNode'

describe('MockAudioNode', () => {
	const consoleWarnSpy: SpyInstance = useConsoleWarnSpy()

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

	it('sets channelCount to the specified initial value of inherited node', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
					channelCount: 5,
				})
			}
		}
		const node: MockTestNode = new MockTestNode()
		expect(node.channelCount).toEqual(5)
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

	/**
	 * Tests for: channelCountMode
	 */

	it('sets channelCountMode to "max" by default for inherited node', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
				})
			}
		}
		const node: MockTestNode = new MockTestNode()
		expect(node.channelCountMode).toEqual('max')
	})

	it('sets channelCountMode to the specified initial value of inherited node', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
					channelCountMode: 'explicit',
				})
			}
		}
		const node: MockTestNode = new MockTestNode()
		expect(node.channelCountMode).toEqual('explicit')
	})

	it('throws error when inherited node has wrong channelCountMode initially', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
					// @ts-expect-error bad input test
					channelCountMode: 'clamped-maxxxxx',
				})
			}
		}
		expect(() => new MockTestNode()).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'TestNode\': Failed to read the \'channelCountMode\' property from \'AudioNodeOptions\': The provided value \'clamped-maxxxxx\' is not a valid enum value of type ChannelCountMode."')
	})

	it('updates channelCountMode for inherited node', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
				})
			}
		}
		const node: MockTestNode = new MockTestNode()
		expect(node.channelCountMode).toEqual('max')
		node.channelCountMode = 'clamped-max'
		expect(node.channelCountMode).toEqual('clamped-max')
	})

	it('does not do anything but logs warning when inherited node tries to set wrong channelCountMode', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
				})
			}
		}
		const node: MockTestNode = new MockTestNode()
		expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
		expect(node.channelCountMode).toEqual('max')
		// @ts-expect-error bad input testing
		node.channelCountMode = 'explicitt'
		expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
		expect(consoleWarnSpy).toHaveBeenCalledWith('The provided value \'explicitt\' is not a valid enum value of type ChannelCountMode.')
		expect(node.channelCountMode).toEqual('max')
	})

	/**
	 * Tests for: channelInterpretation
	 */

	it('sets channelInterpretation to "speakers" by default for inherited node', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
				})
			}
		}
		const node: MockTestNode = new MockTestNode()
		expect(node.channelInterpretation).toEqual('speakers')
	})

	it('sets channelInterpretation to the specified initial value of inherited node', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
					channelInterpretation: 'discrete',
				})
			}
		}
		const node: MockTestNode = new MockTestNode()
		expect(node.channelInterpretation).toEqual('discrete')
	})

	it('throws error when inherited node has wrong channelInterpretation initially', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
					// @ts-expect-error bad input test
					channelInterpretation: 'discrette',
				})
			}
		}
		expect(() => new MockTestNode()).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'TestNode\': Failed to read the \'channelInterpretation\' property from \'AudioNodeOptions\': The provided value \'discrette\' is not a valid enum value of type ChannelInterpretation."')
	})

	it('updates channelInterpretation for inherited node', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
				})
			}
		}
		const node: MockTestNode = new MockTestNode()
		expect(node.channelInterpretation).toEqual('speakers')
		node.channelInterpretation = 'discrete'
		expect(node.channelInterpretation).toEqual('discrete')
	})

	it('does not do anything but logs warning when inherited node tries to set wrong channelInterpretation', () => {
		class MockTestNode extends MockAudioNode {
			constructor() {
				super({
					context: new AudioContext(),
				})
			}
		}
		const node: MockTestNode = new MockTestNode()
		expect(consoleWarnSpy).toHaveBeenCalledTimes(0)
		expect(node.channelInterpretation).toEqual('speakers')
		// @ts-expect-error bad input testing
		node.channelInterpretation = 'discrettte'
		expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
		expect(consoleWarnSpy).toHaveBeenCalledWith('The provided value \'discrettte\' is not a valid enum value of type ChannelInterpretation.')
		expect(node.channelInterpretation).toEqual('speakers')
	})
})

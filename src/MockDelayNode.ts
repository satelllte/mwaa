import {MockAudioNode} from './MockAudioNode'
import {MockAudioParam} from './MockAudioParam'

class MockDelayTimeAudioParam extends MockAudioParam {
	constructor({
		delayTime = 0,
		maxDelayTime = 1,
	}: {
		delayTime?: number;
		maxDelayTime?: number;
	}) {
		super({
			automationRate: 'a-rate',
			defaultValue: 0,
			minValue: 0,
			maxValue: maxDelayTime,
			value: delayTime,
		})
	}
}

export class MockDelayNode extends MockAudioNode implements Omit<DelayNode,
// EventTarget
| 'addEventListener'
| 'removeEventListener'
| 'dispatchEvent'
// AudioNode
| 'connect'
| 'disconnect'
// DelayNode
| 'delayTime' // To be deleted once MockAudioParam implements everything from AudioParam
> {
	// eslint-disable-next-line no-warning-comments
	// TODO: prevent from modifications
	public readonly delayTime: MockAudioParam

	constructor(context: BaseAudioContext, options: DelayOptions = {}) {
		const {
			channelCount,
			channelCountMode,
			channelInterpretation,
			delayTime,
			maxDelayTime,
		}: DelayOptions = options

		super({
			numberOfInputs: 1,
			numberOfOutputs: 1,
			context,
			channelCount,
			channelCountMode,
			channelInterpretation,
		})

		this.delayTime = new MockDelayTimeAudioParam({
			delayTime,
			maxDelayTime,
		})
	}
}

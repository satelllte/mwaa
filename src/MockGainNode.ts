import {MockAudioNode} from './MockAudioNode'
import {MockAudioParam} from './MockAudioParam'

class MockGainAudioParam extends MockAudioParam {
	constructor(gain?: number) {
		super({
			automationRate: 'a-rate',
			defaultValue: 1,
			minValue: -3.4028234663852886e+38,
			maxValue: +3.4028234663852886e+38,
			value: gain,
		})
	}
}

export class MockGainNode extends MockAudioNode implements Omit<GainNode,
// EventTarget
| 'addEventListener'
| 'removeEventListener'
| 'dispatchEvent'
// AudioNode
| 'connect'
| 'disconnect'
// GainNode
| 'gain' // To be deleted once MockAudioParam implements everything from AudioParam
> {
	public readonly gain: MockAudioParam

	constructor(context: BaseAudioContext, options: GainOptions = {}) {
		const {
			channelCount,
			channelCountMode,
			channelInterpretation,
			gain,
		}: GainOptions = options

		super({
			numberOfInputs: 1,
			numberOfOutputs: 1,
			context,
			channelCount,
			channelCountMode,
			channelInterpretation,
		})

		this.gain = new MockGainAudioParam(gain)
	}
}

import {MockAudioNode} from './MockAudioNode'

export class MockGainNode extends MockAudioNode implements Omit<GainNode,
// EventTarget
| 'addEventListener'
| 'removeEventListener'
| 'dispatchEvent'
// AudioNode
| 'channelCount'
| 'channelCountMode'
| 'channelInterpretation'
| 'connect'
| 'disconnect'
// GainNode
| 'gain'
> {
	constructor(context: BaseAudioContext, options?: GainOptions) {
		super({
			context,
			numberOfInputs: 1,
			numberOfOutputs: 1,
		})
	}
}

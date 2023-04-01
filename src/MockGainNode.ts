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
| 'numberOfInputs'
| 'numberOfOutputs'
| 'connect'
| 'disconnect'
// GainNode
| 'gain'
> {
	constructor(context: BaseAudioContext, options?: GainOptions) {
		super(context)
	}
}

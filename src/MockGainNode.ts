import {MockAudioNode} from './MockAudioNode'

export class MockGainNode extends MockAudioNode implements Omit<GainNode,
// EventTarget
| 'addEventListener'
| 'removeEventListener'
| 'dispatchEvent'
// AudioNode
| 'channelInterpretation'
| 'connect'
| 'disconnect'
// GainNode
| 'gain'
> {
	constructor(context: BaseAudioContext, options: GainOptions = {}) {
		const {
			channelCount,
			channelCountMode,
			channelInterpretation,
			// eslint-disable-next-line no-warning-comments
			gain, // TODO: implement
		}: GainOptions = options

		super({
			context,
			channelCount,
			channelCountMode,
			channelInterpretation,
		})
	}
}

export class MockAudioNode implements Omit<AudioNode,
| 'channelCount'
| 'channelCountMode'
| 'channelInterpretation'
| 'context'
| 'numberOfInputs'
| 'numberOfOutputs'
| 'connect'
| 'disconnect'
| 'addEventListener'
| 'removeEventListener'
| 'dispatchEvent'
> {
	protected constructor() {
		throw new TypeError('Illegal constructor')
	}
}

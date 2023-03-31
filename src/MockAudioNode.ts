export class MockAudioNode implements Omit<AudioNode,
// | 'channelCount'
| 'channelCountMode'
| 'channelInterpretation'
| 'context'
| 'numberOfInputs'
| 'numberOfOutputs'
| 'connect'
| 'disconnect'
| 'addEventListener'
| 'dispatchEvent'
| 'removeEventListener'
> {
	public get channelCount(): number {
		return 2
	}
}

export class MockAudioNode implements Omit<AudioNode,
| 'channelCount'
| 'channelCountMode'
| 'channelInterpretation'
| 'numberOfInputs'
| 'numberOfOutputs'
| 'connect'
| 'disconnect'
| 'addEventListener'
| 'removeEventListener'
| 'dispatchEvent'
> {
	public get context(): BaseAudioContext {
		return this._context
	}

	private _context: BaseAudioContext

	protected constructor(context: BaseAudioContext) {
		if (new.target === MockAudioNode) {
			throw new TypeError('Illegal constructor')
		}

		this._context = context
	}
}

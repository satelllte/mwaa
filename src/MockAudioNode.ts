type MockAudioNodeOptions = AudioNodeOptions & {
	context?: BaseAudioContext;
	numberOfInputs?: number;
	numberOfOutputs?: number;
}

export class MockAudioNode implements Omit<AudioNode,
| 'channelCountMode'
| 'channelInterpretation'
| 'connect'
| 'disconnect'
| 'addEventListener'
| 'removeEventListener'
| 'dispatchEvent'
> {
	public get context(): BaseAudioContext {
		return this._context
	}

	public get numberOfInputs(): number {
		return this._numberOfInputs
	}

	public get numberOfOutputs(): number {
		return this._numberOfOutputs
	}

	public get channelCount(): number {
		return this._channelCount
	}

	public set channelCount(channelCount: number) {
		if (!MockAudioNode._isValidChannelCount(channelCount)) {
			throw new DOMException(`Failed to set the 'channelCount' property on 'AudioNode': ${MockAudioNode._getChannelCountErrorMessage(channelCount)}`)
		}

		this._channelCount = channelCount
	}

	private static _numberOfInputsMin: number = 0
	private static _numberOfInputsMax: number = 6
	private static _numberOfOutputsMin: number = 0
	private static _numberOfOutputsMax: number = 6
	private static _channelCountMin: number = 1
	private static _channelCountMax: number = 32

	private static _isValidChannelCount(channelCount: number): boolean {
		return !Number.isNaN(Number(channelCount)) && channelCount >= MockAudioNode._channelCountMin && channelCount <= MockAudioNode._channelCountMax
	}

	private static _getChannelCountErrorMessage(channelCount: number): string {
		return `The channel count provided (${channelCount}) is outside the range [${MockAudioNode._channelCountMin}, ${MockAudioNode._channelCountMax}]`
	}

	private _context: BaseAudioContext
	private _numberOfInputs: number
	private _numberOfOutputs: number
	private _channelCount: number

	protected constructor({
		context,
		numberOfInputs = 1,
		numberOfOutputs = 1,
		channelCount = 2,
		// eslint-disable-next-line no-warning-comments
		channelCountMode = 'max', // TODO: complete
		// eslint-disable-next-line no-warning-comments
		channelInterpretation = 'speakers', // TODO: complete
	}: MockAudioNodeOptions = {}) {
		if (new.target === MockAudioNode) {
			throw new TypeError('Illegal constructor')
		}

		const mockTargetName: string = new.target.name
		const targetName: string = mockTargetName.replace('Mock', '')

		if (!(context instanceof BaseAudioContext)) {
			throw new TypeError(`Failed to construct '${targetName}': parameter 1 is not of type 'BaseAudioContext'`)
		}

		if (numberOfInputs < MockAudioNode._numberOfInputsMin || numberOfInputs > MockAudioNode._numberOfInputsMax) {
			throw new TypeError(`Failed to define '${mockTargetName}': numberOfInputs ${Number(numberOfInputs)} is out of [${MockAudioNode._numberOfInputsMin}, ${MockAudioNode._numberOfInputsMax}] range`)
		}

		if (numberOfOutputs < MockAudioNode._numberOfOutputsMin || numberOfOutputs > MockAudioNode._numberOfOutputsMax) {
			throw new TypeError(`Failed to define '${mockTargetName}': numberOfOutputs ${Number(numberOfOutputs)} is out of [${MockAudioNode._numberOfOutputsMin}, ${MockAudioNode._numberOfOutputsMax}] range`)
		}

		if (!MockAudioNode._isValidChannelCount(channelCount)) {
			throw new TypeError(`Failed to construct '${targetName}': ${MockAudioNode._getChannelCountErrorMessage(channelCount)}`)
		}

		this._context = context
		this._numberOfInputs = numberOfInputs
		this._numberOfOutputs = numberOfOutputs
		this._channelCount = channelCount
	}
}

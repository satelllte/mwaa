type MockAudioNodeOptions = AudioNodeOptions & {
	context?: BaseAudioContext;
	numberOfInputs?: number;
	numberOfOutputs?: number;
}

export class MockAudioNode implements Omit<AudioNode,
| 'connect'
| 'disconnect'
| 'addEventListener'
| 'removeEventListener'
| 'dispatchEvent'
> {
	public get channelCount(): number {
		return this._channelCount
	}

	public set channelCount(channelCount: number) {
		if (!MockAudioNode._isValidChannelCount(channelCount)) {
			throw new DOMException(`Failed to set the 'channelCount' property on 'AudioNode': ${MockAudioNode._getChannelCountErrorMessage(channelCount)}`)
		}

		this._channelCount = channelCount
	}

	public get channelCountMode(): ChannelCountMode {
		return this._channelCountMode
	}

	public set channelCountMode(channelCountMode: ChannelCountMode) {
		if (!MockAudioNode._isValidChannelCountMode(channelCountMode)) {
			// No error throw this time, but just a warning
			console.warn(MockAudioNode._getChannelCountModeErrorMessage(channelCountMode))
			return
		}

		this._channelCountMode = channelCountMode
	}

	public get channelInterpretation(): ChannelInterpretation {
		return this._channelInterpretation
	}

	public set channelInterpretation(channelInterpretation: ChannelInterpretation) {
		if (!MockAudioNode._isValidChannelInterpretation(channelInterpretation)) {
			// No error throw this time, but just a warning
			console.warn(MockAudioNode._getChannelInterpretationErrorMessage(channelInterpretation))
			return
		}

		this._channelInterpretation = channelInterpretation
	}

	private static _numberOfInputsDefault: number = 1
	private static _numberOfInputsMin: number = 0
	private static _numberOfInputsMax: number = 6
	private static _numberOfOutputsDefault: number = 1
	private static _numberOfOutputsMin: number = 0
	private static _numberOfOutputsMax: number = 6
	private static _channelCountDefault: number = 2
	private static _channelCountMin: number = 1
	private static _channelCountMax: number = 32
	private static _channelCountModeDefault: ChannelCountMode = 'max'
	private static _channelInterpretationDefault: ChannelInterpretation = 'speakers'

	private static _isValidChannelCount(channelCount: number): boolean {
		return !Number.isNaN(Number(channelCount)) && channelCount >= MockAudioNode._channelCountMin && channelCount <= MockAudioNode._channelCountMax
	}

	private static _isValidChannelCountMode(channelCountMode: ChannelCountMode): boolean {
		return channelCountMode === 'clamped-max' || channelCountMode === 'explicit' || channelCountMode === 'max'
	}

	private static _isValidChannelInterpretation(channelInterpretation: ChannelInterpretation): boolean {
		return channelInterpretation === 'discrete' || channelInterpretation === 'speakers'
	}

	private static _getChannelCountErrorMessage(channelCount: number): string {
		return `The channel count provided (${channelCount}) is outside the range [${MockAudioNode._channelCountMin}, ${MockAudioNode._channelCountMax}]`
	}

	private static _getChannelCountModeErrorMessage(channelCountMode: ChannelCountMode): string {
		return `The provided value '${channelCountMode}' is not a valid enum value of type ChannelCountMode.`
	}

	private static _getChannelInterpretationErrorMessage(channelInterpretation: ChannelInterpretation): string {
		return `The provided value '${channelInterpretation}' is not a valid enum value of type ChannelInterpretation.`
	}

	public readonly context: BaseAudioContext
	public readonly numberOfInputs: number
	public readonly numberOfOutputs: number
	private _channelCount: number
	private _channelCountMode: ChannelCountMode
	private _channelInterpretation: ChannelInterpretation

	protected constructor(options?: MockAudioNodeOptions) {
		if (new.target === MockAudioNode) {
			throw new TypeError('Illegal constructor')
		}

		const mockTargetName: string = new.target.name
		const targetName: string = mockTargetName.replace('Mock', '')

		const context: BaseAudioContext | undefined = options?.context
		const numberOfInputs: number = options?.numberOfInputs ?? MockAudioNode._numberOfInputsDefault
		const numberOfOutputs: number = options?.numberOfOutputs ?? MockAudioNode._numberOfOutputsDefault
		const channelCount: number = options?.channelCount ?? MockAudioNode._channelCountDefault
		const channelCountMode: ChannelCountMode = options?.channelCountMode ?? MockAudioNode._channelCountModeDefault
		const channelInterpretation: ChannelInterpretation = options?.channelInterpretation ?? MockAudioNode._channelInterpretationDefault

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

		if (!MockAudioNode._isValidChannelCountMode(channelCountMode)) {
			throw new TypeError(`Failed to construct '${targetName}': Failed to read the 'channelCountMode' property from 'AudioNodeOptions': ${MockAudioNode._getChannelCountModeErrorMessage(channelCountMode)}`)
		}

		if (!MockAudioNode._isValidChannelInterpretation(channelInterpretation)) {
			throw new TypeError(`Failed to construct '${targetName}': Failed to read the 'channelInterpretation' property from 'AudioNodeOptions': ${MockAudioNode._getChannelInterpretationErrorMessage(channelInterpretation)}`)
		}

		this.context = context
		this.numberOfInputs = numberOfInputs
		this.numberOfOutputs = numberOfOutputs
		this._channelCount = channelCount
		this._channelCountMode = channelCountMode
		this._channelInterpretation = channelInterpretation
	}
}

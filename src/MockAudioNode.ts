export class MockAudioNode implements Omit<AudioNode,
| 'channelCount'
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

	private static _numberOfInputsMin: number = 0
	private static _numberOfInputsMax: number = 6
	private static _numberOfOutputsMin: number = 0
	private static _numberOfOutputsMax: number = 6

	private _context: BaseAudioContext
	private _numberOfInputs: number
	private _numberOfOutputs: number

	protected constructor({
		context,
		numberOfInputs,
		numberOfOutputs,
	}: {
		context?: BaseAudioContext;
		numberOfInputs?: number;
		numberOfOutputs?: number;
	} = {}) {
		if (new.target === MockAudioNode) {
			throw new TypeError('Illegal constructor')
		}

		const mockTargetName: string = new.target.name
		const targetName: string = mockTargetName.replace('Mock', '')

		if (!(context instanceof BaseAudioContext)) {
			throw new TypeError(`Failed to construct '${targetName}': parameter 1 is not of type 'BaseAudioContext'`)
		}

		if (typeof numberOfInputs === 'undefined' || numberOfInputs < MockAudioNode._numberOfInputsMin || numberOfInputs > MockAudioNode._numberOfInputsMax) {
			throw new TypeError(`Failed to define '${mockTargetName}': numberOfInputs ${Number(numberOfInputs)} is out of [${MockAudioNode._numberOfInputsMin}, ${MockAudioNode._numberOfInputsMax}] range`)
		}

		if (typeof numberOfOutputs === 'undefined' || numberOfOutputs < MockAudioNode._numberOfOutputsMin || numberOfOutputs > MockAudioNode._numberOfOutputsMax) {
			throw new TypeError(`Failed to define '${mockTargetName}': numberOfOutputs ${Number(numberOfOutputs)} is out of [${MockAudioNode._numberOfOutputsMin}, ${MockAudioNode._numberOfOutputsMax}] range`)
		}

		this._context = context
		this._numberOfInputs = numberOfInputs
		this._numberOfOutputs = numberOfOutputs
	}
}

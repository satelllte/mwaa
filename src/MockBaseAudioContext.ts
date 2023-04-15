export class MockBaseAudioContext extends EventTarget implements Omit<BaseAudioContext,
// BaseAudioContext
| 'audioWorklet'
| 'destination'
| 'listener'
| 'onstatechange'
| 'createAnalyser'
| 'createBiquadFilter'
| 'createBuffer'
| 'createBufferSource'
| 'createChannelMerger'
| 'createChannelSplitter'
| 'createConstantSource'
| 'createConvolver'
| 'createDelay'
| 'createDynamicsCompressor'
| 'createGain'
| 'createIIRFilter'
| 'createOscillator'
| 'createPanner'
| 'createPeriodicWave'
| 'createScriptProcessor'
| 'createStereoPanner'
| 'createWaveShaper'
| 'decodeAudioData'
> {
	protected static _isValidSampleRateValue(sampleRate: unknown): boolean {
		if (!Number.isFinite(sampleRate) || typeof sampleRate !== 'number') {
			return false
		}

		return sampleRate >= MockBaseAudioContext._sampleRateMin && sampleRate <= MockBaseAudioContext._sampleRateMax
	}

	private static _currentTimeDefault: number = 0
	private static _sampleRateDefault: number = 44100
	private static _sampleRateMin: number = 8000 // Min sample rate guaranteed by all user-agents https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext
	private static _sampleRateMax: number = 96000 // Max sample rate guaranteed by all user-agents https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext

	public get currentTime(): number {
		return MockBaseAudioContext._currentTimeDefault
	}

	private set currentTime(currentTime: number) {} // Prevents direct modifications

	public get state(): AudioContextState {
		return this._state
	}

	private set state(state: AudioContextState) {} // Prevents direct modifications

	public get sampleRate(): number {
		return this._sampleRate
	}

	private set sampleRate(sampleRate: number) {} // Prevents direct modifications

	protected _state: AudioContextState
	private _sampleRate: number

	protected constructor(
		state: AudioContextState,
		sampleRate: number = MockBaseAudioContext._sampleRateDefault,
	) {
		super()

		if (new.target === MockBaseAudioContext) {
			throw new TypeError('Illegal constructor')
		}

		if (!MockBaseAudioContext._isValidSampleRateValue(sampleRate)) {
			const targetName: string = new.target.name.replace('Mock', '')
			// DOMException
			throw new Error(`Failed to construct '${targetName}': The sample rate provided (${sampleRate}) is outside the range [${MockBaseAudioContext._sampleRateMin}, ${MockBaseAudioContext._sampleRateMax}]`)
		}

		this._state = state
		this._sampleRate = sampleRate
	}

	// eslint-disable-next-line no-warning-comments
	// TODO: try this approach
	// protected _setState(state: AudioContextState): void {
	// 	this._state = state
	// 	this.dispatchEvent(new Event('statechange'))
	// }

	// eslint-disable-next-line no-warning-comments
	// TODO: test
	// public addEventListener<K extends keyof BaseAudioContextEventMap>(type: K, listener: (this: BaseAudioContext, ev: BaseAudioContextEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void {
	// 	super.addEventListener(type, listener, options)
	// }

	// eslint-disable-next-line no-warning-comments
	// TODO: test
	// public removeEventListener<K extends keyof BaseAudioContextEventMap>(type: K, listener: (this: BaseAudioContext, ev: BaseAudioContextEventMap[K]) => any, options?: boolean | EventListenerOptions): void {
	// 	super.removeEventListener(type, listener, options)
	// }
}

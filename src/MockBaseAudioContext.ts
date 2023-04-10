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
	private static _currentTimeDefault: number = 0
	// eslint-disable-next-line no-warning-comments
	// TODO: in the future Autoplay policy behaviour can also be simulated: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices#autoplay_policy
	private static _stateDefault: AudioContextState = 'running'
	private static _sampleRateDefault: number = 44100
	private static _sampleRateMin: number = 3000 // https://chromium.googlesource.com/chromium/blink/+/refs/heads/main/Source/platform/audio/AudioUtilities.cpp -> minAudioBufferSampleRate
	private static _sampleRateMax: number = 192000 // https://chromium.googlesource.com/chromium/blink/+/refs/heads/main/Source/platform/audio/AudioUtilities.cpp -> maxAudioBufferSampleRate

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

	protected constructor(sampleRate: number = MockBaseAudioContext._sampleRateDefault) {
		super()

		if (new.target === MockBaseAudioContext) {
			throw new TypeError('Illegal constructor')
		}

		if (sampleRate < MockBaseAudioContext._sampleRateMin || sampleRate > MockBaseAudioContext._sampleRateMax) {
			const targetName: string = new.target.name.replace('Mock', '')
			// DOMException
			throw new Error(`Failed to construct '${targetName}': The sample rate provided (${sampleRate}) is outside the range [${MockBaseAudioContext._sampleRateMin}, ${MockBaseAudioContext._sampleRateMax}]`)
		}

		this._state = MockBaseAudioContext._stateDefault
		this._sampleRate = sampleRate
	}

	// eslint-disable-next-line no-warning-comments
	// TODO: test
	public addEventListener<K extends keyof BaseAudioContextEventMap>(type: K, listener: (this: BaseAudioContext, ev: BaseAudioContextEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void {
		super.addEventListener(type, listener, options)
	}

	// eslint-disable-next-line no-warning-comments
	// TODO: test
	public removeEventListener<K extends keyof BaseAudioContextEventMap>(type: K, listener: (this: BaseAudioContext, ev: BaseAudioContextEventMap[K]) => any, options?: boolean | EventListenerOptions): void {
		super.removeEventListener(type, listener, options)
	}
}

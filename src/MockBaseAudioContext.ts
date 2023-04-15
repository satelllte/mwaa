import {MockDelayNode} from './MockDelayNode'
import {MockGainNode} from './MockGainNode'

type StateChangeListener = ((ev: Event) => any) | null // eslint-disable-line @typescript-eslint/ban-types

export class MockBaseAudioContext extends EventTarget implements Omit<BaseAudioContext,
// BaseAudioContext
| 'audioWorklet'
| 'destination'
| 'listener'
| 'createAnalyser'
| 'createBiquadFilter'
| 'createBuffer'
| 'createBufferSource'
| 'createChannelMerger'
| 'createChannelSplitter'
| 'createConstantSource'
| 'createConvolver'
| 'createDynamicsCompressor'
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

	private static _STATECHANGE: 'statechange' = 'statechange' as const // eslint-disable-line @typescript-eslint/naming-convention
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
	private _stateChangeListener: StateChangeListener = null

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

	public get onstatechange(): StateChangeListener {
		return this._stateChangeListener
	}

	public set onstatechange(listener: StateChangeListener) {
		if (this._stateChangeListener) {
			this.removeEventListener(MockBaseAudioContext._STATECHANGE, this._stateChangeListener)
		}

		if (typeof listener === 'function') {
			this.addEventListener(MockBaseAudioContext._STATECHANGE, listener)
			this._stateChangeListener = listener
			return
		}

		this._stateChangeListener = null
	}

	public createDelay(maxDelayTime?: number | undefined): DelayNode {
		// eslint-disable-next-line no-warning-comments
		// TODO: once MockDelayNode implements everything from DelayNode, this will be removed
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		return new MockDelayNode(this, {maxDelayTime})
	}

	public createGain(): GainNode {
		// eslint-disable-next-line no-warning-comments
		// TODO: once MockGainNode implements everything from GainNode, this will be removed
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		return new MockGainNode(this)
	}

	protected _setState(state: AudioContextState): void {
		this._state = state
		this.dispatchEvent(new Event(MockBaseAudioContext._STATECHANGE))
	}
}

import {MockBaseAudioContext} from './MockBaseAudioContext'
import {clamp} from './utils/math/clamp'

type LatencyHint = AudioContextLatencyCategory | number

export class MockAudioContext extends MockBaseAudioContext implements Omit<AudioContext,
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
// AudioContext
| 'close'
| 'createMediaElementSource'
| 'createMediaStreamDestination'
| 'createMediaStreamSource'
| 'getOutputTimestamp'
| 'suspend'
| 'resume'
> {
	private static _defaultLatencyHint: AudioContextLatencyCategory | number = 'interactive'
	private static _baseLatencyMin: number = 0.0001
	private static _baseLatencyMax: number = 0.5000
	private static _outputLatencyMin: number = 0.002
	private static _outputLatencyMax: number = 0.9999
	private static _baseLatencyForPlaybackHint: number = 0.025
	private static _baseLatencyForBalancedHint: number = 0.011
	private static _baseLatencyForInteractiveHint: number = 0.005
	private static _outputLatencyForPlaybackHint: number = 0.051
	private static _outputLatencyForBalancedHint: number = 0.022
	private static _outputLatencyForInteractiveHint: number = 0.009

	private static _validateLatencyHint(latencyHint: LatencyHint): void {
		if (typeof latencyHint === 'number') {
			return
		}

		if (latencyHint === 'balanced' || latencyHint === 'interactive' || latencyHint === 'playback') {
			return
		}

		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		throw new TypeError(`Failed to construct 'AudioContext': Failed to read the 'latencyHint' property from 'AudioContextOptions': The provided value ${latencyHint} is not a valid enum value of type AudioContextLatencyCategory.`)
	}

	private static _getBaseLatencyForHint(latencyHint: LatencyHint): number {
		if (typeof latencyHint === 'number') {
			return clamp(latencyHint, MockAudioContext._baseLatencyMin, MockAudioContext._baseLatencyMax)
		}

		if (latencyHint === 'playback') {
			return MockAudioContext._baseLatencyForPlaybackHint
		}

		if (latencyHint === 'balanced') {
			return MockAudioContext._baseLatencyForBalancedHint
		}

		return MockAudioContext._baseLatencyForInteractiveHint
	}

	private static _getOutputLatencyForHint(latencyHint: LatencyHint): number {
		if (typeof latencyHint === 'number') {
			return clamp(latencyHint * 2, MockAudioContext._outputLatencyMin, MockAudioContext._outputLatencyMax)
		}

		if (latencyHint === 'playback') {
			return MockAudioContext._outputLatencyForPlaybackHint
		}

		if (latencyHint === 'balanced') {
			return MockAudioContext._outputLatencyForBalancedHint
		}

		return MockAudioContext._outputLatencyForInteractiveHint
	}

	public get baseLatency(): number {
		return this._baseLatency
	}

	private set baseLatency(baseLatency: number) {} // Prevents direct modifications

	public get outputLatency(): number {
		return this._outputLatency
	}

	private set outputLatency(outputLatency: number) {} // Prevents direct modifications

	private _baseLatency: number
	private _outputLatency: number

	constructor(options?: AudioContextOptions) {
		// eslint-disable-next-line no-warning-comments
		// TODO: in the future Autoplay policy behaviour can also be simulated,
		// so the context might also equal to `suspended` by default:
		// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices#autoplay_policy
		const state: AudioContextState = 'running'

		super(state, options?.sampleRate)

		const latencyHint: LatencyHint = options?.latencyHint ?? MockAudioContext._defaultLatencyHint
		MockAudioContext._validateLatencyHint(latencyHint)

		this._baseLatency = MockAudioContext._getBaseLatencyForHint(latencyHint)
		this._outputLatency = MockAudioContext._getOutputLatencyForHint(latencyHint)
	}
}

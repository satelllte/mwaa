import {MockBaseAudioContext} from './MockBaseAudioContext'
import {clamp} from './utils/math/clamp'

type LatencyHint = AudioContextLatencyCategory | number

export class MockAudioContext extends MockBaseAudioContext implements Omit<AudioContext,
// EventTarget
| 'addEventListener'
| 'removeEventListener'
| 'dispatchEvent'
// BaseAudioContext
| 'audioWorklet'
| 'currentTime'
| 'destination'
| 'listener'
| 'onstatechange'
| 'state'
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
| 'resume'
| 'suspend'
> {
	public get baseLatency(): number {
		return this._baseLatency
	}

	public get outputLatency(): number {
		return this._outputLatency
	}

	public get sampleRate(): number {
		return this._sampleRate
	}

	private static _defaultLatencyHint: AudioContextLatencyCategory | number = 'interactive'
	private static _defaultSampleRate: number = 44100
	private static _minSampleRate: number = 3000 // https://chromium.googlesource.com/chromium/blink/+/refs/heads/main/Source/platform/audio/AudioUtilities.cpp -> minAudioBufferSampleRate
	private static _maxSampleRate: number = 192000 // https://chromium.googlesource.com/chromium/blink/+/refs/heads/main/Source/platform/audio/AudioUtilities.cpp -> maxAudioBufferSampleRate
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

	private static _validateSampleRate(sampleRate: number): void {
		if (sampleRate >= MockAudioContext._minSampleRate && sampleRate <= MockAudioContext._maxSampleRate) {
			return
		}

		throw new DOMException(`Failed to construct 'AudioContext': The hardware sample rate provided (${sampleRate}) is outside the range [${MockAudioContext._minSampleRate}, ${MockAudioContext._maxSampleRate}]`)
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

	private _sampleRate: number
	private _baseLatency: number
	private _outputLatency: number

	constructor(options?: AudioContextOptions) {
		super()

		const latencyHint: LatencyHint = options?.latencyHint ?? MockAudioContext._defaultLatencyHint
		MockAudioContext._validateLatencyHint(latencyHint)

		const sampleRate: number = options?.sampleRate ?? MockAudioContext._defaultSampleRate
		MockAudioContext._validateSampleRate(sampleRate)

		this._baseLatency = MockAudioContext._getBaseLatencyForHint(latencyHint)
		this._outputLatency = MockAudioContext._getOutputLatencyForHint(latencyHint)
		this._sampleRate = sampleRate
	}
}
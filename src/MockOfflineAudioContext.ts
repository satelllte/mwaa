import {MockBaseAudioContext} from './MockBaseAudioContext'

export class MockOfflineAudioContext extends MockBaseAudioContext implements Omit<OfflineAudioContext,
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
// OfflineAudioContext
| 'oncomplete'
| 'resume'
| 'startRendering'
| 'suspend'
> {
	public get length(): number {
		return this._length
	}

	public set length(length: number) {} // Prevents modifications

	private static _numberOfChannelsDefault: number = 1
	private static _numberOfChannelsMin: number = 1
	private static _numberOfChannelsMax: number = 32
	private static _lengthMin: number = 1

	private static _validateNumberOfChannels(numberOfChannels: number): void {
		if (!Number.isFinite(numberOfChannels) || numberOfChannels < MockOfflineAudioContext._numberOfChannelsMin || numberOfChannels > MockOfflineAudioContext._numberOfChannelsMax) {
			// DOMException
			throw new Error(`Failed to construct 'OfflineAudioContext': The number of channels provided (${numberOfChannels}) is outside the range [${MockOfflineAudioContext._numberOfChannelsMin}, ${MockOfflineAudioContext._numberOfChannelsMax}]`)
		}
	}

	private static _validateLength(length: number): void {
		if (!Number.isFinite(length) || length < MockOfflineAudioContext._lengthMin) {
			// DOMException
			throw new Error(`Failed to construct 'OfflineAudioContext': The number of frames provided (${length}) is less than the minimum bound (${MockOfflineAudioContext._lengthMin})`)
		}
	}

	private static _validateSampleRate(sampleRate: number): void {
		if (!MockBaseAudioContext._isValidSampleRateValue(sampleRate)) {
			throw new TypeError('Failed to construct \'OfflineAudioContext\': The provided float value is non-finite')
		}
	}

	private _length: number

	constructor(contextOptions: OfflineAudioContextOptions)
	constructor(numberOfChannels: number, length: number, sampleRate: number)
	constructor(...args: [OfflineAudioContextOptions] | [number, number, number]) {
		const state: AudioContextState = 'suspended'

		if (args.length === 1) {
			const contextOptions: OfflineAudioContextOptions = args[0]
			const numberOfChannels: number = contextOptions?.numberOfChannels ?? MockOfflineAudioContext._numberOfChannelsDefault
			const length: number = contextOptions?.length
			const sampleRate: number = contextOptions?.sampleRate
			MockOfflineAudioContext._validateNumberOfChannels(numberOfChannels)
			MockOfflineAudioContext._validateLength(length)
			MockOfflineAudioContext._validateSampleRate(sampleRate)
			super(state, sampleRate)
			this._length = length
			return
		}

		if (args.length >= 3) {
			const [numberOfChannels, length, sampleRate]: [number, number, number] = args
			MockOfflineAudioContext._validateNumberOfChannels(numberOfChannels)
			MockOfflineAudioContext._validateLength(length)
			MockOfflineAudioContext._validateSampleRate(sampleRate)
			super(state, sampleRate)
			this._length = length
			return
		}

		if (!args.length) {
			throw new TypeError('Failed to construct \'OfflineAudioContext\': 1 argument required, but only 0 present')
		}

		// eslint-disable-next-line no-warning-comments
		// TODO: figure out why this warns in c8 coverage though it's tested in "throws if 2 arguments passed" test
		throw new TypeError('Failed to construct \'OfflineAudioContext\': Overload resolution failed.')
	}
}

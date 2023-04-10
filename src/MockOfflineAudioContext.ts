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
		if (numberOfChannels < MockOfflineAudioContext._numberOfChannelsMin || numberOfChannels > MockOfflineAudioContext._numberOfChannelsMax) {
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

	private _length: number

	constructor(contextOptions: OfflineAudioContextOptions)
	constructor(numberOfChannels: number, length: number, sampleRate: number)
	constructor(...args: [OfflineAudioContextOptions] | [number, number, number]) {
		if (args.length === 1) {
			const contextOptions: OfflineAudioContextOptions = args[0]
			const numberOfChannels: number = contextOptions?.numberOfChannels ?? MockOfflineAudioContext._numberOfChannelsDefault
			MockOfflineAudioContext._validateNumberOfChannels(numberOfChannels)
			const length: number = contextOptions?.length
			MockOfflineAudioContext._validateLength(length)
			const sampleRate: number = contextOptions?.sampleRate
			super(sampleRate)
			this._length = length
			return
		}

		if (args.length >= 3) {
			const [numberOfChannels, length, sampleRate]: [number, number, number] = args
			MockOfflineAudioContext._validateNumberOfChannels(numberOfChannels)
			MockOfflineAudioContext._validateLength(length)
			super(sampleRate)
			this._length = length
			return
		}

		if (!args.length) {
			throw new TypeError('Failed to construct \'OfflineAudioContext\': 1 argument required, but only 0 present')
		}

		throw new TypeError('Failed to construct \'OfflineAudioContext\': Overload resolution failed.')
	}
}

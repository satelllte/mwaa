export class MockBaseAudioContext implements Omit<BaseAudioContext,
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
> {
	public get sampleRate(): number {
		return this._sampleRate
	}

	private static _defaultSampleRate: number = 44100
	private static _minSampleRate: number = 3000 // https://chromium.googlesource.com/chromium/blink/+/refs/heads/main/Source/platform/audio/AudioUtilities.cpp -> minAudioBufferSampleRate
	private static _maxSampleRate: number = 192000 // https://chromium.googlesource.com/chromium/blink/+/refs/heads/main/Source/platform/audio/AudioUtilities.cpp -> maxAudioBufferSampleRate

	protected _sampleRate: number = MockBaseAudioContext._defaultSampleRate

	protected constructor(sampleRate: number = MockBaseAudioContext._defaultSampleRate) {
		if (new.target === MockBaseAudioContext) {
			throw new TypeError('Illegal constructor')
		}

		if (sampleRate < MockBaseAudioContext._minSampleRate || sampleRate > MockBaseAudioContext._maxSampleRate) {
			const targetName: string = new.target.name.replace('Mock', '')
			throw new DOMException(`Failed to construct '${targetName}': The sample rate provided (${sampleRate}) is outside the range [${MockBaseAudioContext._minSampleRate}, ${MockBaseAudioContext._maxSampleRate}]`)
		}

		this._sampleRate = sampleRate
	}
}

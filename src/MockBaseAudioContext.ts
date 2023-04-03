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
	private static _sampleRateDefault: number = 44100
	private static _sampleRateMin: number = 3000 // https://chromium.googlesource.com/chromium/blink/+/refs/heads/main/Source/platform/audio/AudioUtilities.cpp -> minAudioBufferSampleRate
	private static _sampleRateMax: number = 192000 // https://chromium.googlesource.com/chromium/blink/+/refs/heads/main/Source/platform/audio/AudioUtilities.cpp -> maxAudioBufferSampleRate

	public readonly sampleRate: number = MockBaseAudioContext._sampleRateDefault

	protected constructor(sampleRate: number = MockBaseAudioContext._sampleRateDefault) {
		if (new.target === MockBaseAudioContext) {
			throw new TypeError('Illegal constructor')
		}

		if (sampleRate < MockBaseAudioContext._sampleRateMin || sampleRate > MockBaseAudioContext._sampleRateMax) {
			const targetName: string = new.target.name.replace('Mock', '')
			throw new DOMException(`Failed to construct '${targetName}': The sample rate provided (${sampleRate}) is outside the range [${MockBaseAudioContext._sampleRateMin}, ${MockBaseAudioContext._sampleRateMax}]`)
		}

		this.sampleRate = sampleRate
	}
}

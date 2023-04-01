// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MockBaseAudioContext implements Omit<BaseAudioContext,
| 'addEventListener'
| 'removeEventListener'
| 'dispatchEvent'
| 'audioWorklet'
| 'currentTime'
| 'destination'
| 'listener'
| 'onstatechange'
| 'sampleRate'
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
	constructor() {
		throw new TypeError('Illegal constructor')
	}
}

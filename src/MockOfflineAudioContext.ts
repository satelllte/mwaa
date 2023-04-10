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
| 'length'
| 'oncomplete'
| 'resume'
| 'startRendering'
| 'suspend'
> {
	constructor(contextOptions: OfflineAudioContextOptions)
	constructor(numberOfChannels: number, length: number, sampleRate: number)
	constructor(...args: [OfflineAudioContextOptions] | [number, number, number]) {
		super()
	}
}

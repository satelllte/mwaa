import {MockBaseAudioContext} from './MockBaseAudioContext'

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
		return 0.0053
	}

	public get outputLatency(): number {
		return 0.016
	}
}

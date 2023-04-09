import {MockAudioNode} from './MockAudioNode'
import {MockAudioParam} from './MockAudioParam'

class MockDelayTimeAudioParam extends MockAudioParam {
	constructor({
		delayTime,
		maxDelayTime,
	}: {
		delayTime: number;
		maxDelayTime: number;
	}) {
		super({
			automationRate: 'a-rate',
			defaultValue: 0,
			minValue: 0,
			maxValue: maxDelayTime,
			value: delayTime,
		})
	}
}

export class MockDelayNode extends MockAudioNode implements Omit<DelayNode,
// EventTarget
| 'addEventListener'
| 'removeEventListener'
| 'dispatchEvent'
// AudioNode
| 'connect'
| 'disconnect'
// DelayNode
| 'delayTime' // To be deleted once MockAudioParam implements everything from AudioParam
> {
	private static _maxDelayTimeMin: number = 0
	private static _maxDelayTimeMax: number = 180 // https://chromium.googlesource.com/chromium/blink/+/refs/heads/main/Source/modules/webaudio/DelayNode.cpp#38

	public get delayTime(): MockAudioParam {
		return this._delayTime
	}

	private set delayTime(delayTime: MockAudioParam) {} // Prevents modifications

	private _delayTime: MockAudioParam

	constructor(context: BaseAudioContext, options: DelayOptions = {}) {
		const {
			channelCount,
			channelCountMode,
			channelInterpretation,
			delayTime = 0,
			maxDelayTime = 1,
		}: DelayOptions = options

		if (!Number.isFinite(maxDelayTime)) {
			throw new TypeError('Failed to construct \'DelayNode\': Failed to read the \'maxDelayTime\' property from \'DelayOptions\': The provided double value is non-finite.')
		}

		// The range is not inclusive
		// https://chromium.googlesource.com/chromium/blink/+/refs/heads/main/Source/modules/webaudio/DelayNode.cpp#49
		if (maxDelayTime <= MockDelayNode._maxDelayTimeMin || maxDelayTime >= MockDelayNode._maxDelayTimeMax) {
			// DOMException
			throw new Error(`Failed to construct 'DelayNode': The max delay time provided (${maxDelayTime}) is outside the range (${MockDelayNode._maxDelayTimeMin}, ${MockDelayNode._maxDelayTimeMax})`)
		}

		super({
			numberOfInputs: 1,
			numberOfOutputs: 1,
			context,
			channelCount,
			channelCountMode,
			channelInterpretation,
		})

		this._delayTime = new MockDelayTimeAudioParam({
			delayTime,
			maxDelayTime,
		})
	}
}

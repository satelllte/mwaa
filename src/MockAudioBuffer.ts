import {numberOfChannelsDefault, numberOfChannelsMax, numberOfChannelsMin, sampleRateMax, sampleRateMin} from './constants'

export class MockAudioBuffer implements Omit<AudioBuffer,
| 'copyFromChannel'
| 'copyToChannel'
> {
	public get length(): number {
		return this._length
	}

	public set length(length: number) {} // Prevents modifications

	public get duration(): number {
		return this._length / this._sampleRate
	}

	public set duration(duration: number) {} // Prevents modifications

	public get numberOfChannels(): number {
		return this._numberOfChannels
	}

	public set numberOfChannels(numberOfChannels: number) {} // Prevents modifications

	public get sampleRate(): number {
		return this._sampleRate
	}

	public set sampleRate(sampleRate: number) {} // Prevents modifications

	private static _className: string = MockAudioBuffer.name.replace('Mock', '')

	private static _buildFailedToConstructMessage(message: string): string {
		return `Failed to construct '${MockAudioBuffer._className}': ${message}`
	}

	private _length: number
	private _numberOfChannels: number
	private _sampleRate: number

	constructor(options: AudioBufferOptions) {
		if (!options) {
			throw new TypeError(MockAudioBuffer._buildFailedToConstructMessage('1 argument required, but only 0 present'))
		}

		const length: number = options?.length
		if (!Number.isFinite(length) || length <= 0) {
			// DOMException
			throw new Error(MockAudioBuffer._buildFailedToConstructMessage(`The number of frames provided (${length}) is less than or equal to the minimum bound (0)`))
		}

		const numberOfChannels: number = options?.numberOfChannels ?? numberOfChannelsDefault
		if (!Number.isFinite(numberOfChannels) || numberOfChannels < numberOfChannelsMin || numberOfChannels > numberOfChannelsMax) {
			// DOMException
			throw new Error(MockAudioBuffer._buildFailedToConstructMessage(`The number of channels provided (${numberOfChannels}) is outside the range [${numberOfChannelsMin}, ${numberOfChannelsMax}]`))
		}

		const sampleRate: number = options?.sampleRate
		if (!Number.isFinite(sampleRate) || sampleRate < sampleRateMin || sampleRate > sampleRateMax) {
			// DOMException
			throw new Error(MockAudioBuffer._buildFailedToConstructMessage(`The sample rate provided (${sampleRate}) is outside the range [${sampleRateMin}, ${sampleRateMax}]`))
		}

		this._length = length
		this._numberOfChannels = numberOfChannels
		this._sampleRate = sampleRate
	}

	public getChannelData(channel: number): Float32Array {
		if (typeof channel === 'undefined') {
			throw new TypeError(`Failed to execute 'getChannelData' on '${MockAudioBuffer._className}': 1 argument required, but only 0 present.`)
		}

		if (!Number.isFinite(channel) || channel < 0 || channel > this._numberOfChannels - 1) {
			// DOMException
			throw new Error(`Failed to execute 'getChannelData' on '${MockAudioBuffer._className}': channel index (${channel}) exceeds number of channels (${this._numberOfChannels})`)
		}

		return new Float32Array(this._length)
	}
}

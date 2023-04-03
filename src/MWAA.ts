import {MockAudioContext} from './MockAudioContext'
import {MockAudioNode} from './MockAudioNode'
import {MockAudioParam} from './MockAudioParam'
import {MockBaseAudioContext} from './MockBaseAudioContext'
import {MockGainNode} from './MockGainNode'

type ModuleName =
| 'AudioContext'
| 'AudioNode'
| 'AudioParam'
| 'BaseAudioContext'
| 'GainNode'

// eslint-disable-next-line @typescript-eslint/naming-convention
export class MWAA {
	public static mock(): void {
		if (MWAA._isMocked) {
			throw new Error('[MWAA] already using mocked version of Web Audio API')
		}

		MWAA._mock('AudioContext', MockAudioContext as unknown as AudioContext, MWAA._originalAudioContext)
		MWAA._mock('AudioNode', MockAudioNode as unknown as AudioNode, MWAA._originalAudioNode)
		MWAA._mock('AudioParam', MockAudioParam as unknown as AudioParam, MWAA._originalAudioParam)
		MWAA._mock('BaseAudioContext', MockBaseAudioContext as unknown as BaseAudioContext, MWAA._originalBaseAudioContext)
		MWAA._mock('GainNode', MockGainNode as unknown as GainNode, MWAA._originalGainNode)

		MWAA._isMocked = true
	}

	public static unmock(): void {
		if (!MWAA._isMocked) {
			throw new Error('[MWAA] already using the original version of Web Audio API')
		}

		MWAA._unmock('AudioContext', MWAA._originalAudioContext)
		MWAA._unmock('AudioNode', MWAA._originalAudioNode)
		MWAA._unmock('AudioParam', MWAA._originalAudioParam)
		MWAA._unmock('BaseAudioContext', MWAA._originalBaseAudioContext)
		MWAA._unmock('GainNode', MWAA._originalGainNode)

		MWAA._isMocked = false
	}

	private static _isMocked: boolean = false
	private static _originalAudioContext: AudioContext
	private static _originalAudioNode: AudioNode
	private static _originalAudioParam: AudioParam
	private static _originalBaseAudioContext: BaseAudioContext
	private static _originalGainNode: GainNode

	private static _mock<T>(
		name: ModuleName,
		mock: T,
		temp: T,
	): void {
		temp = globalThis[name] as T
		(globalThis[name] as T) = mock
	}

	private static _unmock<T>(
		name: ModuleName,
		temp: T,
	): void {
		(globalThis[name] as T) = temp
	}
}

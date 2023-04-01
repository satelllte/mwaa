import {log} from './utils/log'
import {MockBaseAudioContext} from './MockBaseAudioContext'

type ModuleName =
| 'BaseAudioContext'

// eslint-disable-next-line @typescript-eslint/naming-convention
export class MWAA {
	public static mock(): void {
		if (MWAA._isMocked) {
			throw new Error('[MWAA] already using mocked version of Web Audio API')
		}

		MWAA._mock('BaseAudioContext', MockBaseAudioContext as unknown as BaseAudioContext, MWAA._originalBaseAudioContext)

		MWAA._isMocked = true

		log('using mocked version of Web Audio API')
	}

	public static unmock(): void {
		if (!MWAA._isMocked) {
			throw new Error('[MWAA] already using the original version of Web Audio API')
		}

		MWAA._unmock('BaseAudioContext', MWAA._originalBaseAudioContext)

		MWAA._isMocked = false

		log('back to the original version of Web Audio API')
	}

	private static _isMocked: boolean = false
	private static _originalBaseAudioContext: BaseAudioContext

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

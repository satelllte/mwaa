import {log} from './utils/log'
import {MockAudioContext} from './MockAudioContext'

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-extraneous-class
export class MWAA {
	public static mock(): void {
		if (MWAA._isMocked) {
			throw new Error('[MWAA] already using mocked version of Web Audio API')
		}

		// @ts-expect-error store original
		MWAA._originalAudioContext = globalThis.AudioContext
		// @ts-expect-error replace original with mock
		globalThis.AudioContext = MockAudioContext

		MWAA._isMocked = true

		log('using mocked version of Web Audio API')
	}

	public static unmock(): void {
		if (!MWAA._isMocked) {
			throw new Error('[MWAA] already using the original version of Web Audio API')
		}

		// @ts-expect-error back to original
		globalThis.AudioContext = MWAA._originalAudioContext

		MWAA._isMocked = false

		log('back to the original version of Web Audio API')
	}

	private static _isMocked: boolean = false
	private static _originalAudioContext: AudioContext
}

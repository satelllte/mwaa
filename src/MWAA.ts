import { log } from './utils/log'
import { MockAudioContext } from './MockAudioContext'

export class MWAA {
  private static _isMocked = false
  private static _AudioContext: AudioContext

  public static mock(): void {
    if (MWAA._isMocked) {
      throw new Error('[MWAA] already using mocked version of Web Audio API')
    }

    // @ts-expect-error
    MWAA._AudioContext = globalThis.AudioContext
    globalThis.AudioContext = MockAudioContext

    MWAA._isMocked = true

    log('using mocked version of Web Audio API')
  }

  public static unmock(): void {
    if (!MWAA._isMocked) {
      throw new Error('[MWAA] already using the original version of Web Audio API')
    }

    // @ts-expect-error
    globalThis.AudioContext = MWAA._AudioContext

    MWAA._isMocked = false

    log('back to the original version of Web Audio API')
  }
}

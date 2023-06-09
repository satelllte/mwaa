import {describe, expect, it} from 'vitest'

type ContextCreatorFn = () => BaseAudioContext

export const testBaseAudioContext = (createContext: ContextCreatorFn): void => {
	testBaseAudioContextInstance(createContext)
	testBaseAudioContextCurrentTime(createContext)
	testBaseAudioContextState(createContext)
	testBaseAudioContextSampleRate(createContext)
}

const testBaseAudioContextInstance = (createContext: ContextCreatorFn): void => {
	it('initializes an instance of context which extends BaseAudioContext', () => {
		const ctx: BaseAudioContext = createContext()
		expect(ctx).toBeInstanceOf(BaseAudioContext)
	})
}

const testBaseAudioContextCurrentTime = (createContext: ContextCreatorFn): void => {
	describe('BaseAudioContext.currentTime', () => {
		describe('currentTime', () => {
			it('equals to 0 by default', () => {
				const ctx: BaseAudioContext = createContext()
				expect(ctx.currentTime).toEqual(0)
			})

			it('is read-only', () => {
				const ctx: BaseAudioContext = createContext()
				expect(ctx.currentTime).toEqual(0)
				// @ts-expect-error for testing
				ctx.currentTime = 0.13
				expect(ctx.currentTime).toEqual(0)
			})
		})
	})
}

const testBaseAudioContextState = (createContext: ContextCreatorFn): void => {
	describe('BaseAudioContext.state', () => {
		it('is read-only', () => {
			const ctx: BaseAudioContext = createContext()
			const state: AudioContextState = ctx?.state
			expect(ctx.state).toEqual(state)
			// @ts-expect-error for testing
			ctx.state = 'stopped'
			expect(ctx.state).toEqual(state)
		})
	})
}

const testBaseAudioContextSampleRate = (createContext: ContextCreatorFn): void => {
	describe('BaseAudioContext.sampleRate', () => {
		it('is read-only', () => {
			const ctx: BaseAudioContext = createContext()
			const sampleRate: number = ctx?.sampleRate
			expect(ctx.sampleRate).toEqual(sampleRate)
			// @ts-expect-error for testing
			ctx.sampleRate = sampleRate + 10
			expect(ctx.sampleRate).toEqual(sampleRate)
		})
	})
}

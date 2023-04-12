import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import {MWAA} from './MWAA'
import {MockOfflineAudioContext} from './MockOfflineAudioContext'

describe('MockOfflineAudioContext', () => {
	beforeAll(() => {
		MWAA.mock()
	})

	afterAll(() => {
		MWAA.unmock()
	})

	it('is defined', () => {
		expect(OfflineAudioContext).toBeDefined()
	})

	it('equals to MockOfflineAudioContext', () => {
		expect(OfflineAudioContext).toEqual(MockOfflineAudioContext)
	})

	testOfflineAudioContextConstructor()
	testOfflineAudioContextLength()

	// eslint-disable-next-line no-warning-comments
	// TODO: do the shared `testBaseAudioContext()`
	// ...
	// ...
	// ...
})

const testOfflineAudioContextConstructor = (): void => {
	const numberOfChannels: number = 2
	const sampleRate: number = 44100
	const length: number = sampleRate * 10

	type Overload = {
		name: string;
		createContext: (numberOfChannels: number, length: number, sampleRate: number) => OfflineAudioContext;
	}

	const overloads: Overload[] = [
		{
			name: 'object constructor',
			createContext: (numberOfChannels: number, length: number, sampleRate: number): OfflineAudioContext =>
				new OfflineAudioContext({numberOfChannels, length, sampleRate}),
		},
		{
			name: 'args constructor',
			createContext: (numberOfChannels: number, length: number, sampleRate: number): OfflineAudioContext =>
				new OfflineAudioContext(numberOfChannels, length, sampleRate),
		},
	]

	describe('MockOfflineAudioContext.constructor', () => {
		it('throws if 0 arguments passed', () => {
			expect(() =>
				// @ts-expect-error for testing
				new OfflineAudioContext(),
			).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'OfflineAudioContext\': 1 argument required, but only 0 present"')
		})

		it('throws if 2 arguments passed', () => {
			expect(() =>
				// @ts-expect-error for testing
				new OfflineAudioContext(2, 44100 * 5 * 2),
			).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'OfflineAudioContext\': Overload resolution failed."')
		})

		describe.each(overloads)('overload: $name', ({createContext}: Overload) => {
			it('initializes an instance of OfflineAudioContext which extends BaseAudioContext', () => {
				const ctx: OfflineAudioContext = createContext(numberOfChannels, length, sampleRate)
				expect(ctx).toBeInstanceOf(OfflineAudioContext)
				expect(ctx).toBeInstanceOf(BaseAudioContext)
			})

			describe('length', () => {
				it('sets the value correctly', () => {
					const ctx: OfflineAudioContext = createContext(numberOfChannels, length, sampleRate)
					expect(ctx.length).toEqual(length)
				})

				it('throws if not present', () => {
					expect(() =>
						// @ts-expect-error for testing
						createContext(numberOfChannels, undefined, sampleRate),
					).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'OfflineAudioContext\': The number of frames provided (undefined) is less than the minimum bound (1)"')
				})

				it('throws if not number', () => {
					const length: string = 'x'
					expect(() =>
						// @ts-expect-error for testing
						createContext(numberOfChannels, length, sampleRate),
					).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'OfflineAudioContext\': The number of frames provided (x) is less than the minimum bound (1)"')
				})
				it('throws if less than 1', () => {
					const length: number = 0
					expect(() =>
						createContext(numberOfChannels, length, sampleRate),
					).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'OfflineAudioContext\': The number of frames provided (0) is less than the minimum bound (1)"')
				})
			})

			describe('numberOfChannels', () => {
				it.todo('sets the value correctly', () => {
					// eslint-disable-next-line no-warning-comments
					// TODO: test once the ctx.destination will be there via:
					// - ctx.destination.channelCount === numberOfChannels
					// - ctx.destination.maxChannelCount === numberOfChannels
				})
				it('sets to 1 by default', () => {
					// Applicable to `OfflineAudioContextOptions` object overload only
					const ctx: OfflineAudioContext = new OfflineAudioContext({length, sampleRate})
					// eslint-disable-next-line no-warning-comments
					// TODO: test once the ctx.destination will be there via:
					// - ctx.destination.channelCount === 1
					// - ctx.destination.maxChannelCount === 1
				})
				it('throws if not number', () => {
					expect(() =>
						createContext(Infinity, length, sampleRate),
					).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'OfflineAudioContext\': The number of channels provided (Infinity) is outside the range [1, 32]"')
					expect(() =>
						// @ts-expect-error for testing
						createContext('x', length, sampleRate),
					).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'OfflineAudioContext\': The number of channels provided (x) is outside the range [1, 32]"')
				})
				it('throws if less than 1', () => {
					expect(() =>
						createContext(0, length, sampleRate),
					).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'OfflineAudioContext\': The number of channels provided (0) is outside the range [1, 32]"')
				})
				it('throws if more than 32', () => {
					expect(() =>
						createContext(33, length, sampleRate),
					).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'OfflineAudioContext\': The number of channels provided (33) is outside the range [1, 32]"')
				})
			})

			describe('sampleRate', () => {
				it('sets the value correctly', () => {
					const ctx: OfflineAudioContext = createContext(numberOfChannels, length, sampleRate)
					expect(ctx.sampleRate).toEqual(sampleRate)
				})
				it('throws if not present', () => {
					expect(() =>
						// @ts-expect-error for testing
						createContext(numberOfChannels, length, undefined),
					).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'OfflineAudioContext\': The provided float value is non-finite"')
				})
				it('throws if not number', () => {
					expect(() =>
						// @ts-expect-error for testing
						createContext(numberOfChannels, length, 'x'),
					).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'OfflineAudioContext\': The provided float value is non-finite"')
				})
				it('throws if less than 8000', () => {
					expect(() =>
						createContext(numberOfChannels, length, 7999),
					).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'OfflineAudioContext\': The provided float value is non-finite"')
				})
				it('throws if more than 96000', () => {
					expect(() =>
						createContext(numberOfChannels, length, 96001),
					).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'OfflineAudioContext\': The provided float value is non-finite"')
				})
			})
		})
	})
}

const testOfflineAudioContextLength = (): void => {
	const numberOfChannels: number = 2
	const sampleRate: number = 44100
	const length: number = sampleRate * 10

	describe('length', () => {
		it('sets from constructor', () => {
			const ctx: OfflineAudioContext = new OfflineAudioContext({
				numberOfChannels,
				sampleRate,
				length,
			})
			expect(ctx.length).toEqual(length)
		})

		it('is read-only', () => {
			const ctx: OfflineAudioContext = new OfflineAudioContext({
				numberOfChannels,
				sampleRate,
				length,
			})
			expect(ctx.length).toEqual(length)
			// @ts-expect-error for testing
			ctx.length = length / 2
			expect(ctx.length).toEqual(length)
		})
	})
}

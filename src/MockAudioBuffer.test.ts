import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import {MWAA} from './MWAA'
import {MockAudioBuffer} from './MockAudioBuffer'

describe('MockAudioBuffer', () => {
	beforeAll(() => {
		MWAA.mock()
	})

	afterAll(() => {
		MWAA.unmock()
	})

	it('is defined', () => {
		expect(AudioBuffer).toBeDefined()
	})

	it('equals to MockAudioBuffer', () => {
		expect(AudioBuffer).toEqual(MockAudioBuffer)
	})

	const sampleRate: number = 11025
	const duration: number = 1.5
	const length: number = sampleRate * duration

	describe('constructor', () => {
		it('throws if options not provided', () => {
			expect(() =>
				// @ts-expect-error for testing
				new AudioBuffer(),
			).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioBuffer\': 1 argument required, but only 0 present"')
		})

		describe('"length" option', () => {
			it('sets the value correctly', () => {
				const buffer: AudioBuffer = new AudioBuffer({length, sampleRate})
				expect(buffer.length).toEqual(length)
			})

			it('throws if length is not above the minimum bound', () => {
				expect(() =>
					new AudioBuffer({length: 0, sampleRate}),
				).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioBuffer\': The number of frames provided (0) is less than or equal to the minimum bound (0)"')
				expect(() =>
					new AudioBuffer({length: -1, sampleRate}),
				).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioBuffer\': The number of frames provided (-1) is less than or equal to the minimum bound (0)"')
			})

			it('throws if length type is not finite number', () => {
				expect(() =>
					new AudioBuffer({length: Infinity, sampleRate}),
				).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioBuffer\': The number of frames provided (Infinity) is less than or equal to the minimum bound (0)"')
				expect(() =>
					// @ts-expect-error for testing
					new AudioBuffer({length: 'x', sampleRate}),
				).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioBuffer\': The number of frames provided (x) is less than or equal to the minimum bound (0)"')
			})
		})

		describe('"numberOfChannels" option', () => {
			it('is 1 by default', () => {
				const buffer: AudioBuffer = new AudioBuffer({length, sampleRate})
				expect(buffer.numberOfChannels).toEqual(1)
			})

			it('sets the value correctly', () => {
				const buffer: AudioBuffer = new AudioBuffer({length, sampleRate, numberOfChannels: 4})
				expect(buffer.numberOfChannels).toEqual(4)
			})

			it('throws if out of 1-32 range', () => {
				expect(() =>
					new AudioBuffer({length, sampleRate, numberOfChannels: 0}),
				).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioBuffer\': The number of channels provided (0) is outside the range [1, 32]"')
				expect(() =>
					new AudioBuffer({length, sampleRate, numberOfChannels: 33}),
				).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioBuffer\': The number of channels provided (33) is outside the range [1, 32]"')
			})

			it('throws if type is not finite number', () => {
				expect(() =>
					new AudioBuffer({length, sampleRate, numberOfChannels: Infinity}),
				).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioBuffer\': The number of channels provided (Infinity) is outside the range [1, 32]"')
				expect(() =>
					// @ts-expect-error for testing
					new AudioBuffer({length, sampleRate, numberOfChannels: 'x'}),
				).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioBuffer\': The number of channels provided (x) is outside the range [1, 32]"')
			})
		})

		describe('"sampleRate" option', () => {
			it('sets the value correctly', () => {
				const buffer: AudioBuffer = new AudioBuffer({length, sampleRate})
				expect(buffer.sampleRate).toEqual(sampleRate)
			})

			it('throws if out of 8000-96000 range', () => {
				expect(() =>
					new AudioBuffer({length, sampleRate: 7999}),
				).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioBuffer\': The sample rate provided (7999) is outside the range [8000, 96000]"')
				expect(() =>
					new AudioBuffer({length, sampleRate: 96001}),
				).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioBuffer\': The sample rate provided (96001) is outside the range [8000, 96000]"')
			})

			it('throws if type is not finite number', () => {
				expect(() =>
					new AudioBuffer({length, sampleRate: Infinity}),
				).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioBuffer\': The sample rate provided (Infinity) is outside the range [8000, 96000]"')
				expect(() =>
					// @ts-expect-error for testing
					new AudioBuffer({length, sampleRate: 'x'}),
				).toThrowErrorMatchingInlineSnapshot('"Failed to construct \'AudioBuffer\': The sample rate provided (x) is outside the range [8000, 96000]"')
			})
		})
	})

	describe('length', () => {
		it('has correct value', () => {
			const buffer: AudioBuffer = new AudioBuffer({length, sampleRate})
			expect(buffer.length).toEqual(length)
		})

		it('is read-only', () => {
			const buffer: AudioBuffer = new AudioBuffer({length, sampleRate})
			expect(buffer.length).toEqual(length)
			// @ts-expect-error for testing
			buffer.length = length * 2
			expect(buffer.length).toEqual(length)
		})
	})

	describe('sampleRate', () => {
		it('has correct value', () => {
			const buffer: AudioBuffer = new AudioBuffer({length, sampleRate})
			expect(buffer.sampleRate).toEqual(sampleRate)
		})

		it('is read-only', () => {
			const buffer: AudioBuffer = new AudioBuffer({length, sampleRate})
			expect(buffer.sampleRate).toEqual(sampleRate)
			// @ts-expect-error for testing
			buffer.sampleRate = sampleRate * 2
			expect(buffer.sampleRate).toEqual(sampleRate)
		})
	})

	describe('numberOfChannels', () => {
		const numberOfChannels: number = 8

		it('has correct value', () => {
			const buffer: AudioBuffer = new AudioBuffer({length, sampleRate, numberOfChannels})
			expect(buffer.numberOfChannels).toEqual(numberOfChannels)
		})

		it('is read-only', () => {
			const buffer: AudioBuffer = new AudioBuffer({length, sampleRate, numberOfChannels})
			expect(buffer.numberOfChannels).toEqual(numberOfChannels)
			// @ts-expect-error for testing
			buffer.numberOfChannels = numberOfChannels * 2
			expect(buffer.numberOfChannels).toEqual(numberOfChannels)
		})
	})

	describe('duration', () => {
		it('has correct value', () => {
			const buffer: AudioBuffer = new AudioBuffer({length, sampleRate})
			expect(buffer.duration).toEqual(duration)
		})

		it('is read-only', () => {
			const buffer: AudioBuffer = new AudioBuffer({length, sampleRate})
			expect(buffer.duration).toEqual(duration)
			// @ts-expect-error for testing
			buffer.duration = duration * 2
			expect(buffer.duration).toEqual(duration)
		})
	})
})

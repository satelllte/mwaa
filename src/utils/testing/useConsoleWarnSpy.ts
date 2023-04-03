import {type SpyInstance, beforeEach, afterEach, vi} from 'vitest'

export const useConsoleWarnSpy = (): SpyInstance => {
	const consoleWarnSpy: SpyInstance = vi.spyOn(console, 'warn')

	beforeEach(() => {
		consoleWarnSpy.mockImplementation(() => {})
	})

	afterEach(() => {
		consoleWarnSpy.mockRestore()
	})

	return consoleWarnSpy
}

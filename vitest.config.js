import {defineConfig} from 'vite'

export default defineConfig({
	test: {
		coverage: {
			reporter: ['text', 'json-summary', 'json'],
      lines: 99,
      branches: 99,
      functions: 99,
      statements: 99,
		},
	},
})

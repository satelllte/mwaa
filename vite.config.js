import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: false,
    sourcemap: true,
    target: 'es2020',
    lib: {
      formats: ['es', 'cjs'],
      entry: 'src/index.ts',
      fileName: '[name]'
    },
  },
})

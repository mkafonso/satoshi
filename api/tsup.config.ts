import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['source/server.ts'],
  outDir: 'dist',
  tsconfig: 'tsconfig.build.json',
  splitting: false,
  minify: true,
})

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2020',
  splitting: false,
  esbuildOptions(options) {
    // Preserve conditional exports if needed
    options.conditions = ['module', 'import'];
  },
}); 
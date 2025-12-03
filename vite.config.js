import { defineConfig } from 'vite'
import { resolve } from 'path'
import image from 'rollup-plugin-images'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    // threeMinifier(), //need { ... } imports everywhere for this.
    // glsl(),
    image({
      limit: 10000,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
  },
  // envDir: './environment',
})

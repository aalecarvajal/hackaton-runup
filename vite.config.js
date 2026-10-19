import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        inicio: fileURLToPath(new URL('./index.html', import.meta.url)),
        carrito: fileURLToPath(new URL('./carrito.html', import.meta.url)),
      },
    },
  },
})

import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'docs',          // ← 重要
  build: {
    outDir: '../dist',   // dist を docs の外に出す
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'docs/index.html'),
        delay: resolve(__dirname, 'docs/delay.html'),
        admin: resolve(__dirname, 'docs/admin.html'),
        adminDelay: resolve(__dirname, 'docs/admin-delay.html'),
      }
    }
  }
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // 明确设置为相对路径
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
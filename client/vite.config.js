import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://airbnb-clone-backend-t8xj.onrender.com',
        changeOrigin: true,
        secure: true
      }
    }
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias para usar la librería core local en desarrollo
      '@epaolillo/react-crud': path.resolve(__dirname, '../core/src')
    }
  },
  server: {
    port: 3001
  }
})

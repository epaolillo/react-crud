import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Opción A: UN SOLO BUNDLE de librería (más simple)
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.jsx',
      name: 'epaolillo@react-crud',
      fileName: (format) => format === 'es' ? 'index.mjs' : 'index.cjs',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // No incluyas react en el bundle
      external: ['react', 'react-dom', 'react-router-dom']
    },
    sourcemap: true,
    minify: false
  }
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'], // Agrega las extensiones de archivo que deseas resolver
  },
  build: {
    rollupOptions: {
      input: '/src/main.jsx', // Ruta al archivo de entrada principal
    },
  },
});
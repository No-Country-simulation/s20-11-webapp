import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname manualmente
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true, // asegura que Vite escuche en 0.0.0.0

    allowedHosts: ['educplanner.onrender.com'], 
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Define '@' como la carpeta 'src'
    },
  },
});
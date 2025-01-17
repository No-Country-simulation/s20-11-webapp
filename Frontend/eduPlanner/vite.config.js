import { fileURLToPath } from 'url';
import path from 'path';

// Define __dirname manualmente
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Define '@' como la carpeta 'src'
    },
  },
});
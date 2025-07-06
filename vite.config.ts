import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/aquienvoto.info/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
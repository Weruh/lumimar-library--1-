import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: __dirname,
  envDir: path.resolve(__dirname, '..'),
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: [
      'unpatent-unsnaffled-radia.ngrok-free.dev',
      '.ngrok-free.dev',
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    }
  }
});

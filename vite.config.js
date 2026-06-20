import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  base: process.env.VITE_BASE_PATH || "/ResumeForge",
});

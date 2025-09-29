import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// vite.config.js
export default {
  server: {
    port:5173,
    proxy: {
      '/grafana': {
        target: 'http://localhost', // Replace with your Grafana server URL
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path,
      },
    }
  }
}

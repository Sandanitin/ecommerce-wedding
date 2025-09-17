import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_BACKEND_TARGET || 'http://localhost:5000'
  const isHttps = proxyTarget.startsWith('https:')
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: isHttps,
        },
        '/uploads': {
          target: proxyTarget,
          changeOrigin: true,
          secure: isHttps,
        }
      }
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom']
          }
        }
      }
    }
  }
})

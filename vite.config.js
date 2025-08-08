import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'

export default defineConfig(({ command, mode }) => {
  // Carica le variabili d'ambiente
  const env = loadEnv(mode, process.cwd(), '')

  // Configurazione SSL condizionale
  let sslConfig = false
  if (env.VITE_SSL_ENABLED === 'true') {
    try {
      sslConfig = {
        key: fs.readFileSync(env.VITE_SSL_KEY_PATH || './ssl/localhost-key.pem'),
        cert: fs.readFileSync(env.VITE_SSL_CERT_PATH || './ssl/localhost.pem'),
      }
    } catch (error) {
      console.warn('SSL certificates not found, SSL disabled for build')
      sslConfig = false
    }
  }

  return {
    plugins: [
      tailwindcss(),
      react()
    ],
    server: {
      // Configurazione SSL per development
      https: sslConfig,
      host: env.VITE_SERVER_HOST || '0.0.0.0',
      port: parseInt(env.VITE_SERVER_PORT) || 3000,
    },
    preview: {
      // Configurazione SSL per preview
      https: sslConfig,
      host: env.VITE_SERVER_HOST || '0.0.0.0',
      port: parseInt(env.VITE_PREVIEW_PORT) || 4173,
    },
    build: {
      // Configurazione build ottimizzata per produzione
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
      minify: env.VITE_BUILD_MINIFY === 'true' ? 'terser' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            i18n: ['i18next', 'react-i18next'],
          },
        },
      },
    },
    // Configurazione per gestire le variabili d'ambiente
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __SSL_ENABLED__: JSON.stringify(env.VITE_SSL_ENABLED === 'true'),
      __API_URL__: JSON.stringify(env.VITE_API_URL),
      __DEBUG_MODE__: JSON.stringify(env.VITE_ENABLE_DEBUG_MODE === 'true'),
    },
  }
})
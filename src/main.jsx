import { ViteReactSSG } from 'vite-react-ssg/single-page'
import './index.css'
import './i18n.js'
import 'flag-icons/css/flag-icons.min.css'
import App from './App.jsx'

// Entry SSG/CSR. La home viene pre-renderizzata in HTML a build-time (vite-react-ssg)
// e poi idratata sul client. Tutti i side-effect che toccano window/document
// (warning manager, performance/preload monitor, service worker) girano SOLO sul
// client, nel setup qui sotto: durante il prerender (Node) non esistono.
export const createRoot = ViteReactSSG(<App />, async ({ isClient }) => {
  if (!isClient) return

  const { default: warningManager } = await import('./config/warnings.js')
  window.warningManager = warningManager

  await import('./utils/performanceMonitor.js')
  await import('./utils/preloadManager.js')

  // Service worker: caching e gestione aggiornamenti.
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                window.location.reload()
              }
            })
          })
        })
        .catch((err) => console.error('Service Worker registration failed:', err))
    })
  }
})

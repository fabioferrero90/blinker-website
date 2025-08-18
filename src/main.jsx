import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n.js'
import 'flag-icons/css/flag-icons.min.css'
import App from './App.jsx'
import performanceMonitor from './utils/performanceMonitor.js'
import preloadManager from './utils/preloadManager.js'
import warningManager from './config/warnings.js'

// Expose warning manager globally for performance monitoring
window.warningManager = warningManager;

// Registra il service worker per il caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        // Log only in development
        if (process.env.NODE_ENV === 'development') {
          console.log('SW registered: ', registration);
        }
      })
      .catch((registrationError) => {
        // Log only in development
        if (process.env.NODE_ENV === 'development') {
          console.log('SW registration failed: ', registrationError);
        }
      });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

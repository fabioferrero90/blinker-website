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

// Registra il service worker per il caching e gestione aggiornamenti
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered successfully');
        
        // Controlla se c'è un aggiornamento disponibile
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Nuovo service worker disponibile, forza il refresh
              console.log('New service worker available, forcing refresh');
              window.location.reload();
            }
          });
        });
      })
      .catch((registrationError) => {
        console.error('Service Worker registration failed:', registrationError);
      });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

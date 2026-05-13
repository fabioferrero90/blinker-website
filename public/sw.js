// Service Worker per gestire il cache e forzare aggiornamenti
const CACHE_NAME = 'blinker-v1.0.8'; // Incrementa questo numero ad ogni deploy
const STATIC_CACHE_NAME = 'blinker-static-v1.0.8';

// File da cachare
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json'
];

// File da non cachare mai (sempre aggiornati)
const DYNAMIC_FILES = [
  '/assets/js/',
  '/assets/css/'
];

// Installazione del service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
  );
});

// Attivazione del service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Elimina cache vecchie
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      return self.clients.claim();
    })
  );
});

// Gestione delle richieste
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // /index.html e navigazioni HTML: network-first. Motivo: l'HTML
  // referenzia gli asset JS/CSS con hash che cambiano a ogni deploy
  // (Vite bundle hashing) — servire un index.html cached significa
  // tentare di caricare hash che il deploy ha rimosso (rm -rf su
  // /var/www/get.blinker-app.com). Network-first evita la finestra
  // di "sito bianco" post-deploy. Fallback a cache solo offline.
  if (
    request.mode === 'navigate' ||
    url.pathname === '/' ||
    url.pathname === '/index.html'
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Per file dinamici (JS, CSS), sempre controlla la rete prima
  if (DYNAMIC_FILES.some(path => url.pathname.startsWith(path))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Se la richiesta va a buon fine, aggiorna la cache
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Se la rete fallisce, prova la cache
          return caches.match(request);
        })
    );
    return;
  }

  // Per altri file statici (icone, manifest, ecc), cache-first.
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(request);
      })
  );
});

// Messaggio per forzare il refresh
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
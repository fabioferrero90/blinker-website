// Service Worker per Blinker Website
const CACHE_NAME = 'blinker-cache-v2';
const STATIC_CACHE = 'blinker-static-v2';
const MEDIA_CACHE = 'blinker-media-v2';
const DYNAMIC_CACHE = 'blinker-dynamic-v2';

// Cache strategies
const CACHE_FIRST = 'cache-first';
const STALE_WHILE_REVALIDATE = 'stale-while-revalidate';
const NETWORK_FIRST = 'network-first';

// File extensions for different caching strategies
const STATIC_EXTENSIONS = ['.html', '.css', '.js', '.json', '.xml'];
const MEDIA_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg', '.mp4', '.webm', '.ogg'];
const FONT_EXTENSIONS = ['.woff', '.woff2', '.ttf', '.eot'];

// URLs to cache immediately
const STATIC_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  '/sitemap-index.xml',
  '/sitemap-pages.xml',
  '/sitemap-images.xml'
];

// Critical resources that should use network-first
const CRITICAL_RESOURCES = [
  '/hero-background.mp4',
  '/hero-video-poster.avif',
  '/icon.avif'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE),
      caches.open(MEDIA_CACHE),
      caches.open(DYNAMIC_CACHE)
    ]).then((caches) => {
      return Promise.all([
        caches[0].addAll(STATIC_URLS),
        // Pre-cache critical media files
        caches[1].addAll(CRITICAL_RESOURCES)
      ]);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (![STATIC_CACHE, MEDIA_CACHE, DYNAMIC_CACHE].includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Determine caching strategy based on file type and URL
  const strategy = getCachingStrategy(url, request);

  event.respondWith(handleRequest(request, strategy));
});

function getCachingStrategy(url, request) {
  const pathname = url.pathname;
  const extension = pathname.substring(pathname.lastIndexOf('.')).toLowerCase();

  // Static assets - cache first
  if (STATIC_EXTENSIONS.includes(extension) || STATIC_URLS.includes(pathname)) {
    return CACHE_FIRST;
  }

  // Media files - cache first with revalidation
  if (MEDIA_EXTENSIONS.includes(extension)) {
    return STALE_WHILE_REVALIDATE;
  }

  // Fonts - cache first
  if (FONT_EXTENSIONS.includes(extension)) {
    return CACHE_FIRST;
  }

  // API calls - network first
  if (pathname.includes('/api/') || pathname.includes('analytics')) {
    return NETWORK_FIRST;
  }

  // Default to stale-while-revalidate for other resources
  return STALE_WHILE_REVALIDATE;
}

async function handleRequest(request, strategy) {
  try {
    switch (strategy) {
      case CACHE_FIRST:
        return await cacheFirst(request);
      case STALE_WHILE_REVALIDATE:
        return await staleWhileRevalidate(request);
      case NETWORK_FIRST:
        return await networkFirst(request);
      default:
        return await staleWhileRevalidate(request);
    }
  } catch (error) {
    // Fallback to network request
    return fetch(request);
  }
}

async function cacheFirst(request) {
  const cache = await getCacheForRequest(request);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cacheToUse = await getCacheForRequest(request);
      cacheToUse.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    throw error;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await getCacheForRequest(request);
  const cachedResponse = await cache.match(request);

  // Return cached response immediately if available
  if (cachedResponse) {
    // Update cache in background
    fetch(request)
      .then(async (response) => {
        if (response.ok) {
          const cacheToUse = await getCacheForRequest(request);
          cacheToUse.put(request, response.clone());
        }
      })
      .catch(() => {
        // Silent fail for background revalidation
      });

    return cachedResponse;
  }

  // No cache, fetch from network
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cacheToUse = await getCacheForRequest(request);
      cacheToUse.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    throw error;
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await getCacheForRequest(request);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Fallback to cache
    const cache = await getCacheForRequest(request);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    throw error;
  }
}

async function getCacheForRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const extension = pathname.substring(pathname.lastIndexOf('.')).toLowerCase();

  if (STATIC_EXTENSIONS.includes(extension) || STATIC_URLS.includes(pathname)) {
    return caches.open(STATIC_CACHE);
  }

  if (MEDIA_EXTENSIONS.includes(extension)) {
    return caches.open(MEDIA_CACHE);
  }

  if (FONT_EXTENSIONS.includes(extension)) {
    return caches.open(STATIC_CACHE);
  }

  return caches.open(DYNAMIC_CACHE);
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Check for any queued requests
    const cache = await caches.open(DYNAMIC_CACHE);
    const requests = await cache.keys();

    for (const request of requests) {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.put(request, response.clone());
        }
      } catch (error) {
        // Silent fail for background sync
      }
    }
  } catch (error) {
    // Silent fail for background sync
  }
}

// Handle push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'Nuova notifica da Blinker',
      icon: '/icon.avif',
      badge: '/icon.avif',
      tag: 'blinker-notification',
      data: data.data || {},
      actions: data.actions || []
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Blinker', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action) {
    // Handle specific action
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Cache size management
async function manageCacheSize() {
  const maxSize = 100 * 1024 * 1024; // 100MB limit
  const cachesToCheck = [STATIC_CACHE, MEDIA_CACHE, DYNAMIC_CACHE];

  for (const cacheName of cachesToCheck) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();

    if (keys.length > 0) {
      // Calculate cache size (rough estimation)
      let totalSize = 0;
      for (const key of keys) {
        try {
          const response = await cache.match(key);
          if (response) {
            const blob = await response.blob();
            totalSize += blob.size;
          }
        } catch (error) {
          // Silent fail for cache size calculation
        }
      }

      // If cache is too large, remove oldest items
      if (totalSize > maxSize) {
        // Remove oldest items (simple FIFO approach)
        const itemsToRemove = Math.floor(keys.length * 0.3); // Remove 30% of items
        for (let i = 0; i < itemsToRemove; i++) {
          await cache.delete(keys[i]);
        }
      }
    }
  }
}

// Periodic cache cleanup
setInterval(manageCacheSize, 24 * 60 * 60 * 1000); // Every 24 hours

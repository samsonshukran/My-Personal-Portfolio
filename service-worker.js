// ============================================
// SERVICE WORKER - Samkran Portfolio PWA v2.0.2
// Fixed for GitHub Pages deployment
// ============================================

const CACHE_NAME = 'samkran-portfolio-v2.0.2';
const BASE_PATH = '/My-Personal-Portfolio';

const urlsToCache = [
  // Core files - adjusted for GitHub Pages
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/css/style.css`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/assets/icons/icon-72x72.png`,
  `${BASE_PATH}/assets/icons/icon-96x96.png`,
  `${BASE_PATH}/assets/icons/icon-128x128.png`,
  `${BASE_PATH}/assets/icons/icon-144x144.png`,
  `${BASE_PATH}/assets/icons/icon-152x152.png`,
  `${BASE_PATH}/assets/icons/icon-192x192.png`,
  `${BASE_PATH}/assets/icons/icon-384x384.png`,
  `${BASE_PATH}/assets/icons/icon-512x512.png`,
  
  // External resources (these are safe to cache)
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

// Font Awesome CDN patterns for cache-first strategy
const FONT_AWESOME_DOMAINS = [
  'cdnjs.cloudflare.com',
  'use.fontawesome.com'
];

// ============================================
// HELPER: Get proper request URL with base path
// ============================================
function getFullUrl(url) {
  if (url.startsWith('http')) return url;
  // Handle relative URLs
  if (url.startsWith('/')) return url;
  return `${BASE_PATH}/${url}`;
}

// ============================================
// INSTALL EVENT
// ============================================
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...', CACHE_NAME);
  
  // Force activation without waiting
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell and assets');
        
        // Cache each URL individually to prevent one failure from breaking all
        const cachePromises = urlsToCache.map(url => {
          return cache.add(url).catch(error => {
            console.warn(`[Service Worker] Failed to cache: ${url}`, error.message);
            // Continue even if individual asset fails
            return Promise.resolve();
          });
        });
        
        return Promise.all(cachePromises);
      })
      .then(() => {
        console.log('[Service Worker] Install completed successfully');
      })
      .catch(error => {
        console.error('[Service Worker] Install failed:', error);
      })
  );
});

// ============================================
// ACTIVATE EVENT - Clean up old caches
// ============================================
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete any cache that doesn't match current version
          if (cacheName !== CACHE_NAME && cacheName.startsWith('samkran-portfolio')) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Activated and ready to handle fetches');
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// ============================================
// FETCH EVENT - Smart caching strategy for GitHub Pages
// ============================================
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  const requestPath = requestUrl.pathname;
  
  // Skip cross-origin requests that aren't allowed (like analytics)
  if (!event.request.url.startsWith(self.location.origin) && 
      !requestUrl.hostname.includes('googleapis') && 
      !requestUrl.hostname.includes('gstatic') && 
      !requestUrl.hostname.includes('cloudflare') && 
      !FONT_AWESOME_DOMAINS.some(domain => requestUrl.hostname.includes(domain))) {
    return; // Let browser handle normally
  }
  
  // ===== STRATEGY 1: Network First for HTML/CSS/JS (Always get latest) =====
  if (requestPath.endsWith('.html') || 
      requestPath.endsWith('.css') || 
      requestPath.endsWith('.js') ||
      requestPath.endsWith('manifest.json')) {
    
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the new version for offline use
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone).catch(err => {
                console.log('[Service Worker] Cache put failed:', err);
              });
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if offline
          return caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
              console.log('[Service Worker] Serving from cache (offline):', requestPath);
              return cachedResponse;
            }
            // If not in cache and offline, return index.html for SPA-like behavior
            if (requestPath.endsWith('.html')) {
              return caches.match(`${BASE_PATH}/index.html`);
            }
            return new Response('Offline - Resource not available', { 
              status: 503,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
        })
    );
    return;
  }
  
  // ===== STRATEGY 2: Cache First for Images and Icons =====
  if (requestPath.includes('/assets/') || 
      requestPath.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/)) {
    
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          // Return cached version immediately
          return cachedResponse;
        }
        
        return fetch(event.request).then(networkResponse => {
          if (networkResponse.ok) {
            // Cache the new image
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone).catch(err => {
                console.log('[Service Worker] Image cache put failed:', err);
              });
            });
          }
          return networkResponse;
        }).catch(() => {
          // Return a minimal placeholder if image fails
          return new Response(
            '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%231a2340"/><text x="50" y="55" font-family="Arial" font-size="12" fill="%2300e5ff" text-anchor="middle">Image</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        });
      })
    );
    return;
  }
  
  // ===== STRATEGY 3: Stale-While-Revalidate for Fonts and External Resources =====
  if (requestUrl.hostname.includes('googleapis') || 
      requestUrl.hostname.includes('gstatic') || 
      requestUrl.hostname.includes('cloudflare') ||
      FONT_AWESOME_DOMAINS.some(domain => requestUrl.hostname.includes(domain))) {
    
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              // Update cache with new response if valid
              if (networkResponse.ok) {
                cache.put(event.request, networkResponse.clone()).catch(err => {
                  console.log('[Service Worker] Font cache update failed:', err);
                });
              }
              return networkResponse;
            })
            .catch(error => {
              console.log('[Service Worker] Font fetch failed:', error);
              // Return cached response if fetch fails
              return cachedResponse;
            });
          
          // Return cached response immediately if available, otherwise wait for fetch
          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }
  
  // ===== STRATEGY 4: Default - Network First with Cache Fallback =====
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses for future offline use
        if (response.ok && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone).catch(err => {
              // Silently fail - caching is optional
            });
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If all else fails, return a simple offline message
          return new Response('You are offline and this resource is not cached.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
  );
});

// ============================================
// SYNC EVENT - Handle background sync for offline forms
// ============================================
self.addEventListener('sync', event => {
  console.log('[Service Worker] Background sync event:', event.tag);
  
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(sendContactForms());
  }
});

// Function to process queued contact forms
async function sendContactForms() {
  try {
    // Open IndexedDB
    const db = await openDatabase();
    const unsentForms = await getUnsentForms(db);
    
    for (const form of unsentForms) {
      try {
        // Note: Replace with your actual form endpoint
        const response = await fetch('https://formspree.io/f/your-form-id', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.data)
        });
        
        if (response.ok) {
          await deleteForm(db, form.id);
          console.log('[Service Worker] Synced form:', form.id);
        }
      } catch (error) {
        console.log('[Service Worker] Failed to sync form:', form.id, error);
      }
    }
  } catch (error) {
    console.log('[Service Worker] Sync failed:', error);
  }
}

// IndexedDB helper functions
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SamkranOfflineDB', 1);
    
    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('contactForms')) {
        db.createObjectStore('contactForms', { keyPath: 'id', autoIncrement: true });
      }
    };
    
    request.onsuccess = event => resolve(event.target.result);
    request.onerror = event => reject(event.target.error);
  });
}

function getUnsentForms(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['contactForms'], 'readonly');
    const store = transaction.objectStore('contactForms');
    const request = store.getAll();
    
    request.onsuccess = event => resolve(event.target.result);
    request.onerror = event => reject(event.target.error);
  });
}

function deleteForm(db, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['contactForms'], 'readwrite');
    const store = transaction.objectStore('contactForms');
    const request = store.delete(id);
    
    request.onsuccess = () => resolve();
    request.onerror = event => reject(event.target.error);
  });
}

// ============================================
// MESSAGE EVENT - Handle messages from client
// ============================================
self.addEventListener('message', event => {
  console.log('[Service Worker] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls;
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return Promise.all(
          urls.map(url => 
            cache.add(url).catch(err => {
              console.warn(`[Service Worker] Failed to cache URL: ${url}`, err);
            })
          )
        );
      })
    );
  }
});

// ============================================
// ERROR HANDLING
// ============================================
self.addEventListener('error', event => {
  console.error('[Service Worker] Error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('[Service Worker] Unhandled rejection:', event.reason);
});

// ============================================
// CLEANUP FUNCTION - Prevent memory leaks
// ============================================
function cleanup() {
  // Clear any intervals
  if (self._cacheSizeInterval) {
    clearInterval(self._cacheSizeInterval);
  }
}

self.addEventListener('beforeunload', cleanup);

console.log('[Service Worker] Registered successfully for GitHub Pages');
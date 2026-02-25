// ============================================
// SERVICE WORKER - Samkran Portfolio PWA v2.0.1
// Modern Tech Theme with Minimal Islamic Accents
// ============================================

const CACHE_NAME = 'samkran-portfolio-v2.0.1';
const urlsToCache = [
  // Core files - relative paths for production
  './',
  './index.html',
  './css/style.css',
  './manifest.json',
  
  // External resources
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-brands-400.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-regular-400.woff2'
];

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
        return cache.addAll(urlsToCache).catch(error => {
          console.error('[Service Worker] Cache addAll error:', error);
          // Continue even if some assets fail to cache
        });
      })
      .then(() => {
        console.log('[Service Worker] Install completed successfully');
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
// FETCH EVENT - Smart caching strategy
// ============================================
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  const requestPath = requestUrl.pathname;
  
  // ===== STRATEGY 1: Network First for HTML/CSS/JS (Always get latest) =====
  if (requestPath.endsWith('.html') || 
      requestPath.endsWith('.css') || 
      requestPath.endsWith('.js') ||
      requestPath.endsWith('manifest.json')) {
    
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the new version for offline use
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cache if offline
          return caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
              console.log('[Service Worker] Serving from cache (offline):', requestPath);
              return cachedResponse;
            }
            // If not in cache and offline, return offline page
            if (requestPath.endsWith('.html')) {
              return caches.match('./index.html');
            }
            return new Response('Offline - Resource not available', { status: 503 });
          });
        })
    );
    return;
  }
  
  // ===== STRATEGY 2: Cache First for Images and Fonts (Faster loading) =====
  if (requestPath.startsWith('/assets/') || 
      requestPath.match(/\.(png|jpg|jpeg|gif|svg|ico|woff2|woff|ttf)$/)) {
    
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(event.request).then(networkResponse => {
          // Cache the new image/font
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        }).catch(() => {
          // Return a placeholder if image fails
          if (requestPath.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
            return new Response('<svg>Placeholder</svg>', { 
              headers: { 'Content-Type': 'image/svg+xml' } 
            });
          }
        });
      })
    );
    return;
  }
  
  // ===== STRATEGY 3: Stale-While-Revalidate for Google Fonts =====
  if (requestUrl.hostname.includes('googleapis') || 
      requestUrl.hostname.includes('gstatic') || 
      requestUrl.hostname.includes('cloudflare')) {
    
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            // Update cache with new response
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
            return networkResponse;
          })
          .catch(error => {
            console.log('[Service Worker] Font fetch failed:', error);
          });
        
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }
  
  // ===== STRATEGY 4: Default - Cache First, Network Fallback =====
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      return fetch(event.request).then(networkResponse => {
        // Don't cache non-successful responses
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        
        // Cache valid responses
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        
        return networkResponse;
      }).catch(error => {
        console.log('[Service Worker] Fetch failed:', error.message);
        
        // Return a basic offline response
        return new Response('Offline content not available', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
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
        const response = await fetch('https://your-api-endpoint.com/contact', {
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
// PUSH EVENT - Handle push notifications (for future use)
// ============================================
self.addEventListener('push', event => {
  console.log('[Service Worker] Push received:', event);
  
  let data = { title: 'Samkran Portfolio', body: 'New update available', icon: './assets/icons/icon-192x192.png' };
  
  if (event.data) {
    try {
      data = JSON.parse(event.data.text());
    } catch (e) {
      data.body = event.data.text();
    }
  }
  
  const options = {
    body: data.body,
    icon: data.icon || './assets/icons/icon-192x192.png',
    badge: './assets/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'close', title: 'Close' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// ============================================
// NOTIFICATION CLICK EVENT
// ============================================
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'close') {
    return;
  }
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // Check if there's already a window open
      for (const client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, open a new window
      return clients.openWindow(urlToOpen);
    })
  );
});

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
        return cache.addAll(urls);
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
// HELPER FUNCTION: Check if URL should be cached
// ============================================
function shouldCache(url) {
  const cacheableExtensions = [
    '.html', '.css', '.js', '.json',
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
    '.woff', '.woff2', '.ttf', '.eot',
    '.txt', '.xml'
  ];
  
  return cacheableExtensions.some(ext => url.endsWith(ext));
}

// ============================================
// HELPER FUNCTION: Get cache size
// ============================================
async function getCacheSize() {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();
  let totalSize = 0;
  
  for (const request of keys) {
    const response = await cache.match(request);
    const blob = await response.blob();
    totalSize += blob.size;
  }
  
  console.log(`[Service Worker] Cache size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
  return totalSize;
}

// Run cache size check periodically (every hour)
setInterval(async () => {
  try {
    await getCacheSize();
  } catch (error) {
    console.log('[Service Worker] Cache size check failed:', error);
  }
}, 60 * 60 * 1000); // 1 hour

console.log('[Service Worker] Registered successfully');
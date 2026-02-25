// service-worker.js - VERSION 2.0.0
const CACHE_NAME = 'samkran-portfolio-v2.0.0';
const urlsToCache = [
  '/',
  '/index.html?v=20250225-01',
  '/css/style.css?v=20250225-01',
  '/manifest.json?v=2',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

// Install event - cache core assets
self.addEventListener('install', event => {
  console.log('Service Worker installing...', CACHE_NAME);
  self.skipWaiting(); // Activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache', CACHE_NAME);
        return cache.addAll(urlsToCache).catch(error => {
          console.log('Cache addAll error:', error);
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete any cache that doesn't match current version
          if (cacheName !== CACHE_NAME && cacheName.startsWith('samkran-portfolio')) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('New cache activated:', CACHE_NAME);
      return self.clients.claim(); // Take control of all clients immediately
    })
  );
});

// Fetch event - network first for critical files, cache fallback
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Handle Google Fonts and CDN assets - cache first
  if (requestUrl.hostname.includes('googleapis') || 
      requestUrl.hostname.includes('gstatic') || 
      requestUrl.hostname.includes('cloudflare')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        });
      })
    );
    return;
  }
  
  // For HTML and CSS files - network first with cache fallback
  if (event.request.url.includes('.css') || 
      event.request.url.includes('index.html') || 
      event.request.url.includes('.json')) {
    
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the new version
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then(response => {
            if (response) {
              console.log('Serving from cache:', event.request.url);
              return response;
            }
          });
        })
    );
    return;
  }
  
  // For images and other assets - cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then(response => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.log('Fetch failed:', error);
            // You could return a fallback image here
          });
      })
  );
});

// Handle messages from the client
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync for offline form submissions (optional)
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form-sync') {
    console.log('Background sync triggered');
    // Handle offline form submissions here
  }
});
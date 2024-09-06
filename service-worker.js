const CACHE_NAME = 'point-counter-v1';
const urlsToCache = [
  '/multi-point-system-generated-by-ai/',
  '/multi-point-system-generated-by-ai/index.html',
  '/multi-point-system-generated-by-ai/styles.css',
  '/multi-point-system-generated-by-ai/script.js',
  '/multi-point-system-generated-by-ai/icon-192x192.png',
  '/multi-point-system-generated-by-ai/icon-512x512.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
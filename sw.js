var cacheName = 'lexarcana-pwa';
var appShellFiles = [
  'style.css',
  'icon/la.png',
  'https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js',
  'https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js',
  'https://fonts.googleapis.com/css2?family=Marcellus+SC&display=swap',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons',
];


self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching all');
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

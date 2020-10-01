const staticCacheName = 'lexarcana-pwa';
var filesToCache = [
  'style.css',
  'icon/la.png',
  'pyodide.js',
  'handlebars.js',
  'fonts.googleapis.com/css2?family=Marcellus+SC&display=swap',
  'fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons',
];


self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
          console.log('[Service Worker] Caching all');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(staticCacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

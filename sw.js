let cacheName = 'lexarcana-pwa';
let filesToCache = [
  '/',
  '/style.css',
  '/index.html',
  '/icon/la.png',
  '/pyodide.js',
  '/handlebars.js',
  '/scheda.svg',
  'favicon.ico'
]

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("adding files to cache");
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      console.log("fetching from cache");
      return response || fetch(e.request)
    })
  )
})

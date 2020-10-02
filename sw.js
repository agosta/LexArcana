let cacheName = 'lexarcana-pwa';
let filesToCache = [
  '/',
  '/style.css',
  '/lexarcana.html',
  '/icon/la.png',
  '/pyodide.js',
  '/handlebars.js',
  'fonts.googleapis.com/css2?family=Marcellus+SC&display=swap',
  'fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons',
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

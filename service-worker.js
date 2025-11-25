// Nombre del caché
const CACHE_NAME = "glamour-v1";

// Archivos que se van a almacenar
const urlsToCache = [
  "./",
  "./index.html",
  "./login.html",
  "./css/styles.css",
  "./scripts/login.js",
  "./scripts/sintaxis.js",
  "./img/kanelas.png"
];

// Instalación del Service Worker
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// Intercepción de peticiones
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

const CACHE_NAME = "glamour-v2";

const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./login.html",
  "./css/styles.css",
  "./scripts/login.js",
  "./scripts/sintaxis.js",
  "./img/kanelas.png"
];

// Instalación: cachea archivos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activación: limpia cachés viejos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  return self.clients.claim();
});

// Estrategia NETWORK FIRST → lo más profesional
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => {
        // Offline → intenta archivo en cache
        return caches.match(event.request).then(res => {
          return res || caches.match("./index.html");
        });
      })
  );
});

const CACHE_NAME = 'notesapp-pro-v1';
const urlsToCache = ['./', './index.html'];

// Instalasi: Cache file dasar aplikasi
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch: Strategi Cache-First untuk UI, Network-First untuk Firebase
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('firestore') || event.request.url.includes('firebase')) {
    // Selalu ambil data terbaru dari jaringan untuk database
    event.respondWith(fetch(event.request));
  } else {
    // Gunakan cache untuk tampilan agar bisa dibuka offline
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

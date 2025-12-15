const CACHE_NAME = 'elite-v7-cache';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  // Network first for DB calls, Cache first for UI
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

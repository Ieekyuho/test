// sw.js - WithCare PWA Service Worker
const CACHE_NAME = 'withcare-pink-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './data.js',
  './store.js',
  './assets/logo_pink.png',
  './logo_pink.png',
  './assets/hero_companion.jpg',
  './assets/hero_report.jpg',
  './assets/hero_hospital.jpg',
  './assets/avatar_kim.svg',
  './assets/avatar_lee.svg',
  './assets/avatar_park.svg',
  './assets/avatar_choi.svg',
  './assets/avatar_jung.svg',
  './assets/avatar_kang.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('PWA cache pre-fetch warning:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});

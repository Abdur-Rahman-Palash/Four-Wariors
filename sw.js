const CACHE_NAME = 'fw-static-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/app.js',
  '/components/Header.js',
  '/components/Footer.js',
  '/components/HeroCarousel.js',
  '/components/ProjectCard.js',
  '/components/ServiceCard.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  // Only handle GET requests
  if (request.method !== 'GET') return;

  // For navigation, use network-first then cache fallback (fresh content)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return res;
      }).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // For images and static assets, use cache-first
  if (request.destination === 'image' || request.destination === 'script' || request.destination === 'style') {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(res => {
        try { caches.open(CACHE_NAME).then(cache => cache.put(request, res.clone())); } catch(e){}
        return res;
      })).catch(() => cached)
    );
  }
});

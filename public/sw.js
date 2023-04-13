const cacheName = '1.0.6';

const contentToCache = [
    '/',
    '/index.php',
    '/js/app.js',
    '/css/app.css',
    '/css/material.icon.css',
    '/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    '/images/baixe-aplicativo.png',
    '/images/favicon.png',
    '/images/fundo.jpg',
    '/images/escudo.png',
    '/images/logo_laranja.png',
    '/images/logo_preta.png',
    '/images/pix.png',
];

self.addEventListener('install', (e) => {
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', (e) => {

    if (!e.request.url.includes('/api/')) {
        e.respondWith((async () => {
            const r = await caches.match(e.request);
            // console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
            if (r) { return r; }
            const response = await fetch(e.request);
            const cache = await caches.open(cacheName);
            //  console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
            cache.put(e.request, response.clone());
            return response;
        })());
    }

});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
            if (key !== cacheName) return caches.delete(key);
        }))
    }));
});
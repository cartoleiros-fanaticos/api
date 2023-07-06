const CACHE_NAME = 'v1.0.30';

const STATIC_CACHE_URLS = [
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

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_CACHE_URLS))
    )
});

self.addEventListener('fetch', event => {

    if (event.request.url.includes('/api/')) {
        // response to API requests, Cache Update Refresh strategy
        console.log('continuar daqui');
        //event.respondWith(caches.match(event.request))
        //event.waitUntil(update(event.request).then(refresh)) //TODO: refresh
    } else {

        event.respondWith(
            caches.match(event.request) // check if the request has already been cached
                .then(cached => cached || fetch(event.request)) // otherwise request network
        );
    }

})

function update(request) {
    return fetch(request.url)
        .then(response => {
            if (!response.ok) { throw new Error('Network error'); }

            // we can put response in cache
            return caches.open(CACHE_NAME)
                .then(cache => cache.put(request, response.clone()))
                .then(() => response) // resolve promise with the Response object
        })
}

function refresh(response) {
    return response.json() // read and parse JSON response
        .then(jsonResponse => {
            self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    // report and send new data to client
                    client.postMessage(JSON.stringify({
                        type: response.url,
                        data: jsonResponse.data
                    }))
                })
            })
            return jsonResponse.data; // resolve promise with new data
        })
}

self.addEventListener('activate', event => {
    // delete any unexpected caches
    event.waitUntil(
        caches.keys()
            .then(keys => keys.filter(key => key !== CACHE_NAME))
            .then(keys => Promise.all(keys.map(key => {
                console.log(`Deleting cache ${key}`);
                return caches.delete(key)
            })))
    );
});

// const cacheName = '1.0.7';

// const contentToCache = [
//     '/',
//     '/index.php',
//     '/js/app.js',
//     '/css/app.css',
//     '/css/material.icon.css',
//     '/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
//     '/images/baixe-aplicativo.png',
//     '/images/favicon.png',
//     '/images/fundo.jpg',
//     '/images/escudo.png',
//     '/images/logo_laranja.png',
//     '/images/logo_preta.png',
//     '/images/pix.png',
// ];

// self.addEventListener('install', (e) => {
//     e.waitUntil((async () => {
//         const cache = await caches.open(cacheName);
//         await cache.addAll(contentToCache);
//     })());
// });

// self.addEventListener('fetch', (e) => {

//     if (!e.request.url.includes('/api/')) {
//         e.respondWith((async () => {
//             const r = await caches.match(e.request);
//             // console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
//             if (r) { return r; }
//             const response = await fetch(e.request);
//             const cache = await caches.open(cacheName);
//             //  console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
//             cache.put(e.request, response.clone());
//             return response;
//         })());
//     }

// });

// self.addEventListener('activate', (e) => {
//     e.waitUntil(caches.keys().then((keyList) => {
//         return Promise.all(keyList.map((key) => {
//             if (key !== cacheName) return caches.delete(key);
//         }))
//     }));
// });
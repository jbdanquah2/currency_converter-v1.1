const staticCacheName = 'version-5';
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            return cache.addAll([
       
        '/index.html',
        'css/converter.css',
        'js/indexdb.js',
        '/img',
        '/img/converter-512.png',
        '/css/bootstrap.min.css',
        '/js/converter.js',
        'https://free.currencyconverterapi.com/api/v5/currencies',      'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css'
                
      ])
                .then(() => self.skipWaiting());

        })
    );
});
//
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
           return Promise.all(
            cacheNames.filter(function(cacheName) {
                return cacheName.startsWith('version-') && cacheName != staticCacheName; 
            }).map(function(cacheName) {
                return caches.delete(cacheName);                
            })
            );
        })
    );
});


//self.addEventListener('fetch', event => {
//  event.respondWith(
//    caches.open(cacheName)
//      .then(cache => cache.match(event.request, {ignoreSearch: true}))
//      .then(response => {
//      return response || fetch(event.request);
//    })
//  );
//});


addEventListener('fetch', function (event) {
//    
//    const requestUrl = new URL(event.request.url);
//    if (requestUrl.origin === location.origin) {
//        if (requestUrl.pathname === '/') {
//            event.respondWith(caches.match('/'));
//            return;
//        }
//    }
        
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response; // if valid response is found in cache return it
            } else {
                return fetch(event.request).then(function (res) {
                    return caches.open(staticCacheName)
                        .then(function (cache) {
                            cache.put(event.request.url, res.clone()); //save the response for future
                            return res; // return the fetched data
                        })
                }).catch(function (err) {
                    return caches.open(staticCacheName)
                        .then(function (cache) {
                            return cache.match('/index.html');
                        });
                });

            }
        })
    );
});

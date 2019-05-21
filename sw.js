var staticCacheName = 'restrvw-static-v1';

self.addEventListener('install', function(event) {
  // TODO: cache /skeleton rather than the root page

  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        './',
        'sw.js',
        'css/styles.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        'js/main.js',
        'js/restaurant_info.js',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
        'js/dbhelper.js',
        'data/restaurants.json'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restrvw-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname.endsWith('.jpg')) {
      event.respondWith(
        caches.open(staticCacheName).then(function(cache) {
          return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })      
      );
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

var r=FetchEvent.prototype.respondWith
FetchEvent.prototype.respondWith=function(){return new URL(this.request.url).search.endsWith("bypass-sw")?void 0:r.apply(this,arguments)}
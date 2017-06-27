const version = 'v1::';

self.addEventListener("install", function(event) {
  console.log('WORKER: install event in progress.');
  event.waitUntil(
    caches.open(version + 'myfirstapp')
      .then(function(cache) {
        return cache.addAll([
          '/',
          '/style.css',
          '/js/app.js'
        ]);
      })
      .then(function() {
        console.log('WORKER: install completed');
      })
  );
});


self.addEventListener('fetch', function(event) {
  console.log(event.request);
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      console.log(event.request);
      return cached;
    })
    .catch(function() {
      console.log(event.request);
      return event.default();
    })
  );
});


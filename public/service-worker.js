const cacheName = 'v1';
self.addEventListener('activate', (e) =>{
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      )
    })
  )
});
self.addEventListener('fetch', e => {
  e.respondWith(
      fetch(e.request)
        .then(res => {
            console.log(e.request.url);
            const resClone = res.clone();
            caches
                .open(cacheName)
                .then(cache => {
                    cache.put(e.request, resClone);
                });
                window.addEventListener('install', () => {
            console.log("install!!");
        });
                return res;
        }).catch(err => caches.match(e.request).then(res => res))
  );
});
console.log("Entra en service worker");
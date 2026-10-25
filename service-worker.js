const CACHE = "graveyard-survivors-v1";
const APP_SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon.svg"];
self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(APP_SHELL);
    self.skipWaiting();
  })());
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Same-origin game files: cache first, then update from network.
  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(req);
      if (cached) {
        event.waitUntil(fetch(req).then(r => { if (r.ok) cache.put(req, r.clone()); }).catch(() => {}));
        return cached;
      }
      try { const response = await fetch(req); if (response.ok) cache.put(req, response.clone()); return response; }
      catch (e) { return new Response("Offline and this file is not cached yet.", {status:503,headers:{"Content-Type":"text/plain"}}); }
    })());
  } else {
    // Cache external CDN modules/styles after a successful first online visit.
    event.respondWith((async () => {
      const cache = await caches.open(CACHE + "-external");
      const cached = await cache.match(req);
      if (cached) return cached;
      try {
        const response = await fetch(req);
        if (response.ok || response.type === "opaque") cache.put(req, response.clone());
        return response;
      } catch (e) {
        if (cached) return cached;
        throw e;
      }
    })());
  }
});

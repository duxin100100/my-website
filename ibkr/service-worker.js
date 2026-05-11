const CACHE_VERSION = "ibkr-report-v12";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./api.css?v=api12",
  "./api-addon.js?v=api12",
  "https://cdn.jsdelivr.net/gh/duxin100100/-@main/src/app.js?v=api12",
  "https://cdn.jsdelivr.net/gh/duxin100100/-@main/src/styles.css?v=api12",
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.mjs",
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.mjs",
  "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    const copy = response.clone();
    caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match("./index.html"))));
});

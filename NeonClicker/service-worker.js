// Název cache
const CACHE_NAME = 'neon-clicker-cache-v1';

// Soubory k uložení
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://www.soundjay.com/button/sounds/button-16.mp3',
  'https://www.soundjay.com/button/sounds/button-3.mp3',
  'https://cdn.pixabay.com/download/audio/2023/02/14/audio_68a4ac0039.mp3?filename=neon-gaming-142228.mp3'
];

// Instalace service workeru
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Aktivace
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

// Načítání souborů z cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

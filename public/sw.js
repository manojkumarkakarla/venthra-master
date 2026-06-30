// sw.js - Venthra Solutions Service Worker
// Cache-first for static assets, Network-first for navigation

const CACHE_NAME = 'venthra-solutions-v1';
const STATIC_CACHE_NAME = 'venthra-static-v1';

// Core assets to pre-cache on install
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/vts-logo.jpeg',
];

// ─── Install: Pre-cache core shell assets ────────────────────────────────────
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_ASSETS);
        })
    );
    // Take control immediately without waiting for old SW to die
    self.skipWaiting();
});

// ─── Activate: Clean up stale caches ─────────────────────────────────────────
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME && name !== STATIC_CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    // Claim all open clients so the new SW takes effect immediately
    self.clients.claim();
});

// ─── Fetch: Routing strategy ──────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests and cross-origin requests (e.g. Razorpay, APIs)
    if (request.method !== 'GET' || url.origin !== self.location.origin) {
        return;
    }

    // Navigation requests (HTML pages) → Network-first, fall back to cached /
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Clone and cache the fresh response
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                    return response;
                })
                .catch(() => {
                    // Offline fallback: serve cached index.html for SPA routing
                    return caches.match('/index.html');
                })
        );
        return;
    }

    // Static assets (JS, CSS, images, fonts) → Cache-first, update in background
    if (
        url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|woff2?|ttf|ico)$/)
    ) {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                const networkFetch = fetch(request).then((networkResponse) => {
                    caches
                        .open(STATIC_CACHE_NAME)
                        .then((cache) => cache.put(request, networkResponse.clone()));
                    return networkResponse;
                });
                // Return cache immediately (stale-while-revalidate)
                return cachedResponse || networkFetch;
            })
        );
        return;
    }

    // Everything else → Network-first
    event.respondWith(
        fetch(request).catch(() => caches.match(request))
    );
});

// ─── Web Push Notifications ──────────────────────────────────────────────────
self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    let payload = { title: 'New Notification', body: 'You have a new message.' };
    
    if (event.data) {
        try {
            payload = event.data.json();
        } catch (e) {
            payload.body = event.data.text();
        }
    }

    const title = payload.title || 'Venthra Solutions';
    const options = {
        body: payload.body || 'You have a new notification.',
        icon: payload.icon || '/vts-logo.jpeg',
        badge: payload.badge || '/vts-logo.png',
        image: payload.image,
        data: payload.url || '/',
        actions: payload.actions || [
            { action: 'install', title: '📥 Install App' },
            { action: 'open', title: '🌐 Open Site' }
        ]
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received. Action:', event.action);
    event.notification.close();

    let urlToOpen = event.notification.data || '/';

    // If the user clicks the "Install App" button
    if (event.action === 'install') {
        urlToOpen = 'https://play.google.com/store/apps/details?id=app.vercel.venthrasolutions.twa&pcampaignid=web_share';
    }

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // Check if there is already a window/tab open with the target URL
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, open a new window
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});

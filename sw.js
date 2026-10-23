// Life service worker. Push only: shows the Friday reminder. No caching, so the app never goes stale.
self.addEventListener("push", e => {
  const d = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(d.title || "Life", {
    body: d.body || "", icon: "icon-192.png", badge: "icon-192.png", tag: "life-reminder", data: { url: d.url || "./" },
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true })
    .then(ws => ws.length ? ws[0].focus() : clients.openWindow(e.notification.data.url)));
});

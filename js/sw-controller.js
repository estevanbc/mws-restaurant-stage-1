function registerServiceWorker() {
    navigator.serviceWorker.register('/sw.js').then(function (reg) {        
    });

    // Ensure refresh is only called once.
    // This works around a bug in "force update on reload".
    var refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
    });
}

if (navigator.serviceWorker) {
    registerServiceWorker();
}
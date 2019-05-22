function registerServiceWorker() {
    navigator.serviceWorker.register('/sw.js').then(function (reg) {
        console.log('ServiceWorker registration successful with scope');
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

window.addEventListener('load', function() {
    if (navigator.serviceWorker) {
        registerServiceWorker();
    }
});
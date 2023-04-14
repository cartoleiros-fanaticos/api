// window.addEventListener('load', () => {
//     if (location.hostname != 'localhost') {
//         registerSW()
//     }
// })

// async function registerSW() {
//     if ('serviceWorker' in navigator) {
//         try {
//             await navigator.serviceWorker.register('/sw.js')
//         } catch (e) {
//             console.log(`SW registration failed`);
//         }
//     }
// }

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(serviceWorker => {
            console.log(`Service Worker registered: ${serviceWorker}`);
        })
        .catch(error => {
            console.log(`Error registering the Service Worker: ${error}`);
        });
}
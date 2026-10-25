// cleaner.js - Periodically purges off-screen video buffer memory
(function () {
  let scrollTimeout;

  function purgeOffscreenMedia() {
    const videos = document.querySelectorAll('video');
    videos.forEach((v) => {
      try {
        const rect = v.getBoundingClientRect();
        // Check if the video is far out of the visible screen area
        if (rect.bottom < -1000 || rect.top > window.innerHeight + 1000) {
          if (!v.paused) {
            v.pause();
          }
          // Reset buffer
          if (v.src || v.srcObject) {
            v.removeAttribute('src');
            v.srcObject = null;
            v.load();
          }
        }
      } catch (err) {
        // Silently skip if Instagram's player locks an element
      }
    });
  }

  window.addEventListener(
    'scroll',
    () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(purgeOffscreenMedia, 300);
    },
    { passive: true }
  );
})();

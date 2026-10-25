// Automatically unloads off-screen video stream buffers as you scroll
window.addEventListener('scroll', () => {
  const videos = document.querySelectorAll('video');
  videos.forEach(v => {
    const rect = v.getBoundingClientRect();
    // If the video scrolled far above or below the visible window
    if (rect.bottom < -1200 || rect.top > window.innerHeight + 1200) {
      if (!v.paused) {
        v.pause();
      }
      // Drop buffered frames to release memory back to WebView2
      if (v.src) {
        v.removeAttribute('src');
        v.load();
      }
    }
  });
}, { passive: true });

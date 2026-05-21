// ===== ACCRETION SITE SCRIPT =====

// --- Star field ---
(function generateStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  const count = Math.min(120, Math.floor(window.innerWidth * window.innerHeight / 8000));
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.setProperty('--dur', (2 + Math.random() * 4) + 's');
    star.style.setProperty('--o1', (0.1 + Math.random() * 0.3).toFixed(2));
    star.style.setProperty('--o2', (0.5 + Math.random() * 0.5).toFixed(2));
    if (Math.random() > 0.7) {
      star.style.width = '3px';
      star.style.height = '3px';
    }
    container.appendChild(star);
  }
})();

// --- YouTube embed on play click ---
// Replace VIDEO_ID with your actual YouTube video ID
const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ'; // TODO: Replace with Accretion trailer

const poster = document.getElementById('videoPoster');
const ytContainer = document.getElementById('ytContainer');

if (poster) {
  poster.addEventListener('click', function loadVideo() {
    poster.classList.add('hidden');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.setAttribute('loading', 'lazy');
    ytContainer.appendChild(iframe);
  }, { once: true });
}

// --- Discord link ---
// Replace with your actual Discord invite link
const discordBtn = document.getElementById('discordBtn');
if (discordBtn) {
  discordBtn.href = 'https://discord.gg/accretion'; // TODO: Replace with real invite
}

// --- Wishlist link ---
// Replace with actual Quest Store link when available
const wishlistBtn = document.getElementById('wishlistBtn');
if (wishlistBtn && wishlistBtn.href === '#') {
  wishlistBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // Could show a "coming soon" toast or similar
  });
}

// --- Smooth appearance for CTA ---
const ctaSection = document.querySelector('.cta-section');
if (ctaSection) {
  ctaSection.style.opacity = '0';
  ctaSection.style.transform = 'translateY(12px)';
  ctaSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  setTimeout(() => {
    ctaSection.style.opacity = '1';
    ctaSection.style.transform = 'translateY(0)';
  }, 400);
}

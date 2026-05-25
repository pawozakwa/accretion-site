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
const DEFAULT_YOUTUBE_VIDEO_ID = 'i3XFzZuGcOE';
const TROLL_YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ';
const pageParams = new URLSearchParams(window.location.search);
const YOUTUBE_VIDEO_ID = pageParams.get('viral') === 'trololo'
  ? TROLL_YOUTUBE_VIDEO_ID
  : DEFAULT_YOUTUBE_VIDEO_ID;

const poster = document.getElementById('videoPoster');
const ytContainer = document.getElementById('ytContainer');

if (poster) {
  // Load iframe immediately for true autoplay (poster shows briefly as fallback)
  function loadVideo() {
    poster.classList.add('hidden');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&enablejsapi=1`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.setAttribute('allow', 'autoplay');
    ytContainer.appendChild(iframe);
  }

  // Try autoplay immediately
  loadVideo();

  // Also keep poster click as fallback (if iframe blocked, poster re-shows)
  poster.addEventListener('click', function() {
    loadVideo();
  });
}

// --- Campaign / QR tracking ---
(function trackCampaignSource() {
  const params = new URLSearchParams(window.location.search);
  const qr = params.get('qr');
  const ref = params.get('ref') || params.get('utm_campaign');
  const sourceId = (qr || ref || '').trim().slice(0, 80);

  if (sourceId) {
    sessionStorage.setItem('accretion_campaign_id', sourceId);
    sessionStorage.setItem('accretion_campaign_kind', qr ? 'qr' : 'link');
  }

  const storedId = sessionStorage.getItem('accretion_campaign_id');
  const kind = sessionStorage.getItem('accretion_campaign_kind') || 'link';
  if (!storedId) return;

  document.documentElement.dataset.campaign = storedId;

  const decorateUrl = (href) => {
    try {
      const url = new URL(href, window.location.href);
      url.searchParams.set('utm_source', kind === 'qr' ? 'qr' : 'campaign');
      url.searchParams.set('utm_medium', kind === 'qr' ? 'offline' : 'link');
      url.searchParams.set('utm_campaign', storedId);
      url.searchParams.set('utm_content', storedId);
      return url.toString();
    } catch (_) {
      return href;
    }
  };

  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href.includes('accretionvr.com')) return;
    link.href = decorateUrl(href);
  });
})();

// --- Discord link ---
// Replace with your actual Discord invite link
const discordBtn = document.getElementById('discordBtn');
if (discordBtn) {
  discordBtn.href = 'https://discord.gg/WN5d4R5wzD';
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

const DEFAULT_META_QUEST_WISHLIST_URL = 'https://www.meta.com/pl-pl/experiences/accretion/25885780671035110/';

function safeWishlistUrl(env) {
  const configured = String(env.ACCRETION_WISHLIST_URL || '').trim();
  if (!configured) return DEFAULT_META_QUEST_WISHLIST_URL;

  try {
    const url = new URL(configured);
    if (url.protocol === 'https:' && url.hostname === 'www.meta.com' && url.pathname.includes('/experiences/')) {
      return url.toString();
    }
  } catch (_) {
    // Fall through to the known Meta Quest app URL.
  }

  return DEFAULT_META_QUEST_WISHLIST_URL;
}

function withCampaignParams(target, sourceUrl) {
  const out = new URL(target);
  const incoming = sourceUrl.searchParams;
  const passthrough = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  for (const key of passthrough) {
    const value = incoming.get(key);
    if (value) out.searchParams.set(key, value.slice(0, 100));
  }

  const ref = incoming.get('ref') || incoming.get('qr');
  if (ref && !out.searchParams.has('utm_campaign')) {
    const cleanRef = ref.slice(0, 80);
    out.searchParams.set('utm_source', incoming.get('qr') ? 'qr' : 'accretionvr.com');
    out.searchParams.set('utm_medium', incoming.get('qr') ? 'offline' : 'website');
    out.searchParams.set('utm_campaign', cleanRef);
    out.searchParams.set('utm_content', cleanRef);
  }

  if (!out.searchParams.has('utm_source')) out.searchParams.set('utm_source', 'accretionvr.com');
  if (!out.searchParams.has('utm_medium')) out.searchParams.set('utm_medium', 'website');
  if (!out.searchParams.has('utm_campaign')) out.searchParams.set('utm_campaign', 'wishlist');
  if (!out.searchParams.has('utm_content')) out.searchParams.set('utm_content', 'homepage_button');

  return out.toString();
}

export async function onRequest({ request, env }) {
  const sourceUrl = new URL(request.url);
  const target = withCampaignParams(safeWishlistUrl(env || {}), sourceUrl);

  return Response.redirect(target, 302);
}

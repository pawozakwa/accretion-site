# ACCRETION QR / campaign links

Primary site: https://accretionvr.com/
Wishlist redirect: https://accretionvr.com/wishlist

## Recommended format

Use one unique id per physical QR code or campaign placement:

```text
https://accretionvr.com/qr/<id>
```

Examples:

```text
https://accretionvr.com/qr/reddit-profile
https://accretionvr.com/qr/quest-poster-001
https://accretionvr.com/qr/business-card-001
https://accretionvr.com/qr/youtube-short-agent-site
```

Cloudflare redirects these to:

```text
https://accretionvr.com/?qr=<id>
```

The website stores the id in the browser session and forwards it into outbound links as UTM tags. The `/wishlist` redirect also forwards these tags to the Meta Quest store URL, for example:

```text
https://accretionvr.com/wishlist?utm_source=youtube_shorts&utm_medium=short_video&utm_campaign=wishlist&utm_content=end_card_v1
```

Discord gets the same campaign shape:

```text
utm_source=qr
utm_medium=offline
utm_campaign=<id>
utm_content=<id>
```

## Naming rules

- lowercase only
- use hyphens, not spaces
- include channel/location, for example `poster-krakow-001`
- never reuse an id for a different QR placement

## Quick generator

```bash
node tools/make-qr-link.mjs poster-001
```

Output:

```text
https://accretionvr.com/qr/poster-001
```

To generate a PNG QR code if `qrcode` is available:

```bash
npx qrcode "https://accretionvr.com/qr/poster-001" -o qr-poster-001.png
```

## Hidden viral recording URL

For the planned short where the page briefly shows the old troll video:

```text
https://accretionvr.com/viral-agent-site
```

This redirects to:

```text
https://accretionvr.com/?viral=trololo
```

The normal homepage stays unchanged.

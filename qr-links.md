# ACCRETION QR / campaign links

Primary site: https://accretionvr.com/

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

The website stores the id in the browser session and forwards it into outbound links as UTM tags, for example Discord gets:

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

#!/usr/bin/env node
const rawId = process.argv[2];

if (!rawId) {
  console.error('Usage: node tools/make-qr-link.mjs <campaign-id>');
  console.error('Example: node tools/make-qr-link.mjs poster-001');
  process.exit(1);
}

const id = rawId
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

if (!id) {
  console.error('Campaign id must contain at least one letter or number.');
  process.exit(1);
}

console.log(`https://accretionvr.com/qr/${id}`);

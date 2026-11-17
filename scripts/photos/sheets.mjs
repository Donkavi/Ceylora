// Builds numbered contact sheets per topic from candidates.json so photos can be reviewed visually.
// Usage: node sheets.mjs <candidates.json> <outDir> [topic...]
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const UA = 'CeyloraImageSourcing/1.0 (static site build script)';
const [, , candPath, outDir, ...only] = process.argv;
const cands = JSON.parse(fs.readFileSync(candPath, 'utf8'));
fs.mkdirSync(outDir, { recursive: true });

const W = 260, H = 160, COLS = 6;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url) {
  for (let a = 0; a < 6; a++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    if (res.status === 429 || res.status >= 500) { await sleep(4000 * (a + 1)); continue; }
    throw new Error(`${res.status}`);
  }
  throw new Error('retries exhausted');
}

for (const [topic, list] of Object.entries(cands)) {
  if (only.length && !only.includes(topic)) continue;
  const file = path.join(outDir, `${topic}.jpg`);
  if (fs.existsSync(file) || !list.length) continue;
  const tiles = [];
  for (let i = 0; i < list.length; i++) {
    try {
      const buf = await get(list[i].thumb);
      const img = await sharp(buf).resize(W, H, { fit: 'cover' }).toBuffer();
      const label = Buffer.from(`<svg width="${W}" height="${H}"><rect x="0" y="0" width="34" height="24" fill="black"/><text x="5" y="18" font-size="17" font-family="Arial" fill="yellow">${i}</text></svg>`);
      tiles.push({ input: await sharp(img).composite([{ input: label, top: 0, left: 0 }]).toBuffer(), i });
    } catch (e) { console.error(topic, i, e.message); }
    await sleep(120);
  }
  const rows = Math.ceil(list.length / COLS);
  await sharp({ create: { width: COLS * W, height: rows * H, channels: 3, background: '#222' } })
    .composite(tiles.map(({ input, i }) => ({ input, left: (i % COLS) * W, top: Math.floor(i / COLS) * H })))
    .jpeg({ quality: 70 }).toFile(file);
  console.log('sheet', topic, tiles.length);
}

// Prints candidate titles/descriptions: node titles.mjs <candidates.json> topic:1,2,3 topic2:4,5
import fs from 'node:fs';
const [, , candPath, ...specs] = process.argv;
const cands = JSON.parse(fs.readFileSync(candPath, 'utf8'));
for (const spec of specs) {
  const [topic, idx] = spec.split(':');
  const list = cands[topic] ?? [];
  const ids = idx ? idx.split(',').map(Number) : list.map((_, i) => i);
  for (const i of ids) {
    const c = list[i];
    if (!c) continue;
    console.log(`${topic}[${i}] ${c.title.replace('File:', '')} | ${c.width}x${c.height} | ${c.license} | ${c.desc.slice(0, 90)}`);
  }
}

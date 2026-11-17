// Searches Wikimedia Commons for landscape photos per topic and writes candidates JSON.
// Usage: node search.mjs <topics.json> <out.json>
import fs from 'node:fs';

const UA = 'CeyloraImageSourcing/1.0 (static site build script)';
const [, , topicsPath, outPath] = process.argv;
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

const strip = (html = '') => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

async function search(q, limit = 30) {
  const params = new URLSearchParams({
    action: 'query', format: 'json', generator: 'search', gsrnamespace: '6',
    gsrsearch: `${q} filew:>1600 filetype:bitmap`, gsrlimit: String(limit),
    prop: 'imageinfo', iiprop: 'url|size|extmetadata|mime', iiurlwidth: '330',
    iiextmetadatafilter: 'Artist|LicenseShortName|ImageDescription|Categories',
  });
  let res;
  for (let attempt = 0; attempt < 6; attempt++) {
    res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { 'User-Agent': UA } });
    if (res.status !== 429) break;
    const wait = (Number(res.headers.get('retry-after')) || 10 * (attempt + 1)) * 1000;
    console.error('429, waiting', wait);
    await new Promise((r) => setTimeout(r, wait));
  }
  if (!res.ok) throw new Error(`${res.status} for ${q}`);
  const json = await res.json();
  const pages = Object.values(json.query?.pages ?? {}).sort((a, b) => a.index - b.index);
  return pages.map((p) => {
    const ii = p.imageinfo?.[0] ?? {};
    const md = ii.extmetadata ?? {};
    return {
      title: p.title, width: ii.width, height: ii.height, mime: ii.mime,
      thumb: ii.thumburl, page: ii.descriptionurl,
      artist: strip(md.Artist?.value), license: md.LicenseShortName?.value ?? '',
      desc: strip(md.ImageDescription?.value).slice(0, 160),
    };
  }).filter((c) => c.mime === 'image/jpeg' && c.width / c.height >= 1.3 && c.width / c.height <= 2.6);
}

const out = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath,'utf8')) : {};
for (const [key, queries] of Object.entries(topics)) {
  if (out[key]?.length) continue;
  const seen = new Set();
  out[key] = [];
  for (const q of queries) {
    try {
      for (const c of await search(q)) {
        if (seen.has(c.title)) continue;
        seen.add(c.title);
        out[key].push(c);
      }
    } catch (e) { console.error(key, e.message); }
    await new Promise((r) => setTimeout(r, 1500));
  }
  out[key] = out[key].slice(0, 24);
  console.log(key, out[key].length);
  fs.writeFileSync(outPath, JSON.stringify(out, null, 1));
}
fs.writeFileSync(outPath, JSON.stringify(out, null, 1));

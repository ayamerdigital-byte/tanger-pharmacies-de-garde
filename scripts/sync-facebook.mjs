import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseTimeline, PLUGIN_URL, SOURCE_PAGE } from './facebook-parser.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const githubPages = process.env.DEPLOY_TARGET === 'github-pages';
const storageDir = path.resolve(process.env.STORAGE_DIR || path.join(root, 'storage'));
const output = githubPages ? path.join(root, 'data', 'feed.json') : process.env.FEED_PATH || path.join(storageDir, 'feed.json');
const imageDir = githubPages ? path.join(root, 'public', 'rosters') : path.join(storageDir, 'rosters');

const response = await fetch(PLUGIN_URL, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; TangierDutyPharmacyMVP/1.0)' }, signal: AbortSignal.timeout(20000) });
if (!response.ok) throw new Error(`Facebook returned HTTP ${response.status}`);
const posts = parseTimeline(await response.text());
if (posts.length === 0) throw new Error('No dated roster posts found; keeping the previous feed');

await mkdir(path.dirname(output), { recursive: true });
await mkdir(imageDir, { recursive: true });

for (const post of posts) {
  const localImages = [];
  for (let i = 0; i < post.images.length; i++) {
    const filename = `${post.id}-${i + 1}.jpg`;
    const filepath = path.join(imageDir, filename);
    const image = await fetch(post.images[i], { signal: AbortSignal.timeout(20000) });
    if (!image.ok || !(image.headers.get('content-type') || '').startsWith('image/')) continue;
    const bytes = Buffer.from(await image.arrayBuffer());
    if (bytes.length < 1000 || bytes.length > 5_000_000) continue;
    await writeFile(filepath, bytes);
    localImages.push(`${githubPages ? '/rosters' : '/photos'}/${filename}`);
  }
  post.images = localImages;
}

const usable = posts.filter(post => post.images.length > 0);
if (!usable.length) throw new Error('No roster images could be downloaded; keeping the previous feed');

let prior = null;
try { prior = JSON.parse(await readFile(output, 'utf8')); } catch {}
const fingerprint = JSON.stringify(usable);
const changed = JSON.stringify(prior?.posts) !== fingerprint;
const feed = {
  source: SOURCE_PAGE,
  lastCheckedAt: new Date().toISOString(),
  lastChangedAt: changed ? new Date().toISOString() : prior?.lastChangedAt || new Date().toISOString(),
  posts: usable,
};
await writeFile(`${output}.tmp`, `${JSON.stringify(feed, null, 2)}\n`);
await rename(`${output}.tmp`, output);
console.log(`${changed ? 'Updated' : 'Checked'} ${usable.length} roster posts at ${feed.lastCheckedAt}`);

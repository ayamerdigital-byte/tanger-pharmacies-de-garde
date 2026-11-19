import { readFile } from 'node:fs/promises';
import path from 'node:path';

const feedPath = process.env.FEED_PATH || path.resolve(process.env.STORAGE_DIR || path.resolve(process.cwd(), 'storage'), 'feed.json');
const fallbackPath = path.resolve(process.cwd(), 'data/feed.json');

export async function readFeed() {
  try {
    let raw;
    try { raw = await readFile(process.env.DEPLOY_TARGET === 'github-pages' ? fallbackPath : feedPath, 'utf8'); }
    catch { raw = await readFile(fallbackPath, 'utf8'); }
    const data = JSON.parse(raw);
    return { posts: [], ...data };
  } catch {
    return { posts: [], source: 'https://web.facebook.com/pharmacies.degarde.tanger', lastCheckedAt: null };
  }
}

export function localNow(date = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Casablanca', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date).map(part => [part.type, part.value]));
  return { date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}` };
}

function nextDate(date) {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + 1);
  return value.toISOString().slice(0, 10);
}

export function isActive(post, now = localNow()) {
  const intervals = post.intervals?.length ? post.intervals : post.interval ? [post.interval] : [];
  return intervals.some(({ start, end }) => end > start
    ? post.date === now.date && now.time >= start && now.time < end
    : (post.date === now.date && now.time >= start) || (nextDate(post.date) === now.date && now.time < end));
}

export function latestRelevant(posts, now = localNow()) {
  const active = posts.filter(post => isActive(post, now));
  if (active.length) return { posts: active, active: true };
  const latestDate = posts.map(post => post.date).sort().at(-1);
  return { posts: posts.filter(post => post.date === latestDate), active: false };
}

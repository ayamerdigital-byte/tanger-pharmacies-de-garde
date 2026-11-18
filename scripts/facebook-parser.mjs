export const SOURCE_PAGE = 'https://web.facebook.com/pharmacies.degarde.tanger';
export const PLUGIN_URL = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(SOURCE_PAGE)}&tabs=timeline&width=500&height=800`;

const months = {
  'يناير': 1, 'فبراير': 2, 'مارس': 3, 'أبريل': 4, 'ابريل': 4,
  'ماي': 5, 'مايو': 5, 'يونيو': 6, 'يوليوز': 7, 'يوليو': 7,
  'غشت': 8, 'أغسطس': 8, 'شتنبر': 9, 'سبتمبر': 9,
  'أكتوبر': 10, 'اكتوبر': 10, 'نونبر': 11, 'نوفمبر': 11,
  'دجنبر': 12, 'ديسمبر': 12,
};

export function extractJsonValue(html, key) {
  const marker = `"${key}":`;
  const index = html.indexOf(marker);
  if (index < 0) throw new Error(`Facebook plugin did not contain ${key}`);
  const start = index + marker.length;
  if (html[start] !== '[') throw new Error(`${key} was not an array`);
  let depth = 0;
  let quoted = false;
  let escaped = false;
  for (let i = start; i < html.length; i++) {
    const char = html[i];
    if (quoted) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') quoted = false;
    } else if (char === '"') quoted = true;
    else if (char === '[') depth++;
    else if (char === ']' && --depth === 0) return JSON.parse(html.slice(start, i + 1));
  }
  throw new Error(`Unterminated ${key} array`);
}

export function parsePost(post) {
  if (!post || typeof post !== 'object') return null;
  const message = typeof post.message === 'string' ? post.message : '';
  const dateMatch = message.match(/\b(\d{1,2})\s+([\p{L}]+)\s+(20\d{2})\b/u);
  const month = dateMatch ? months[dateMatch[2]] : undefined;
  const date = month ? `${dateMatch[3]}-${String(month).padStart(2, '0')}-${dateMatch[1].padStart(2, '0')}` : null;
  const shift = /الليلية/u.test(message) ? 'night' : /النهارية/u.test(message) ? 'day' : 'other';
  const times = [...message.matchAll(/(\d{1,2})h(\d{2})/g)].map(match => `${match[1].padStart(2, '0')}:${match[2]}`);
  const createdAt = Number.isFinite(post.createdTime) ? new Date(post.createdTime * 1000).toISOString() : null;
  const images = [...new Set([post.photoURL, ...(post.albumPhotoURLs || [])].filter(url => typeof url === 'string' && url.startsWith('https://')))];
  if (!createdAt || !date || images.length === 0) return null;
  const interval = shift !== 'other' && times.length >= 2 ? { start: times[0], end: times[1] } : null;
  return { id: String(post.createdTime), date, shift, interval, message, createdAt, images };
}

export function parseTimeline(html) {
  const posts = extractJsonValue(html, 'timelinePosts');
  if (!Array.isArray(posts)) throw new Error('Invalid timeline');
  return posts.map(parsePost).filter(Boolean);
}

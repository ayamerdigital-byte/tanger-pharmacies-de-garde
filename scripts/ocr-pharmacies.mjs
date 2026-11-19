import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

export function normalizeName(value) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/^PHARMACIE\s+/, '').replace(/[^A-Z0-9]/g, '');
}

export function extractName(text) {
  const lines = text.split(/\r?\n/).map(value => value.trim()).filter(Boolean);
  for (let i = 0; i < lines.length; i++) {
    if (!/\bPharmacie\b/i.test(lines[i])) continue;
    const sameLine = lines[i].match(/\bPharmacie\s+([A-Z0-9À-ÿ][A-Z0-9À-ÿ '-]*)/i);
    if (sameLine) return sameLine[1].trim().replace(/\s{2,}.*/, '');
    if (/^[A-Z0-9À-ÿ][A-Z0-9À-ÿ '-]+$/i.test(lines[i + 1] || '')) return lines[i + 1];
  }
  return null;
}

export function matchDirectory(name, directory) {
  const key = normalizeName(name);
  return directory.find(item => [item.name, ...(item.aliases || [])].some(candidate => normalizeName(candidate) === key)) || null;
}

export function mapsSearchUrl(item) {
  const query = `Pharmacie ${item.name}, ${item.address}, Maroc`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

async function recognize(worker, image) {
  const processed = await sharp(image).resize({ width: 1440 }).grayscale().normalize().sharpen().toBuffer();
  const { data } = await worker.recognize(processed);
  return { text: data.text, confidence: Math.round(data.confidence) };
}

export async function enrichLatestPosts(posts, imageDir, directory) {
  const recentDates = [...new Set(posts.map(post => post.date))].sort().slice(-2);
  const latestPosts = posts.filter(post => recentDates.includes(post.date));
  if (!latestPosts.length) return posts;
  const worker = await createWorker('eng+fra');
  try {
    for (const post of latestPosts) {
      post.pharmacies = [];
      for (let imageIndex = 0; imageIndex < post.images.length; imageIndex++) {
        const sourceImage = post.images[imageIndex];
        const file = path.join(imageDir, path.basename(sourceImage));
        const bytes = await readFile(file);
        const dimensions = await sharp(bytes).metadata();
        const full = await recognize(worker, bytes);
        const nameCount = [...full.text.matchAll(/\bPharmacie\s+[A-Z0-9]/gi)].length;
        const segments = [];
        if (nameCount >= 2 && dimensions.height >= dimensions.width * 0.8) {
          const split = Math.floor(dimensions.height / 2);
          segments.push(await sharp(bytes).extract({ left: 0, top: 0, width: dimensions.width, height: split }).toBuffer());
          segments.push(await sharp(bytes).extract({ left: 0, top: split, width: dimensions.width, height: dimensions.height - split }).toBuffer());
        } else segments.push(bytes);
        for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
          const result = segments.length === 1 ? full : await recognize(worker, segments[segmentIndex]);
          const ocrName = extractName(result.text);
          const match = ocrName ? matchDirectory(ocrName, directory) : null;
          post.pharmacies.push({
            id: `${post.id}-${imageIndex + 1}-${segmentIndex + 1}`,
            name: match?.name || (result.confidence >= 55 && ocrName ? ocrName : null),
            address: match?.address || null,
            phone: match?.phone || null,
            mapUrl: match ? mapsSearchUrl(match) : null,
            addressSource: match?.source || null,
            status: match ? 'matched' : 'pending',
            sourceImage,
            ocrConfidence: result.confidence,
          });
        }
      }
    }
  } finally {
    await worker.terminate();
  }
  return posts;
}

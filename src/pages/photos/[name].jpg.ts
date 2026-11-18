import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const prerender = process.env.DEPLOY_TARGET === 'github-pages';

export function getStaticPaths() {
  return [];
}

export async function GET({ params }) {
  const name = params.name;
  if (!/^\d+-\d+$/.test(name || '')) return new Response('Not found', { status: 404 });
  const filepath = path.resolve(process.env.STORAGE_DIR || path.resolve(process.cwd(), 'storage'), 'rosters', `${name}.jpg`);
  try {
    const bytes = await readFile(filepath);
    return new Response(bytes, { headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=3600' } });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}

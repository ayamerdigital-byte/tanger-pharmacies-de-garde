export const prerender = true;
export function GET({ site }) {
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap.xml`, site)}\n`, { headers: { 'Content-Type': 'text/plain' } });
}

export const prerender = true;
export function GET({ site }) {
  const urls = ['/fr/tanger/pharmacies-de-garde/', '/ar/tanger/pharmacies-de-garde/'];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(path => `<url><loc>${new URL(`${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`, site)}</loc></url>`).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}

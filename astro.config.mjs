import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

const githubPages = process.env.DEPLOY_TARGET === 'github-pages';

export default defineConfig({
  output: githubPages ? 'static' : 'server',
  adapter: githubPages ? undefined : node({ mode: 'standalone' }),
  site: githubPages ? 'https://ayamerdigital-byte.github.io' : process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || 'http://localhost:4321',
  base: githubPages ? '/tanger-pharmacies-de-garde' : '/',
});

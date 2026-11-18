# Tanger pharmacies de garde MVP

Mobile-first Astro site for the Tangier duty-pharmacy roster. It reads the public [Facebook Page Plugin timeline](https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fweb.facebook.com%2Fpharmacies.degarde.tanger&tabs=timeline&width=500&height=800), saves dated posts and their pharmacy-card images, and shows French and Arabic roster pages.

## Temporary GitHub Pages hosting

The public site is deployed at `https://ayamerdigital-byte.github.io/tanger-pharmacies-de-garde/`. `.github/workflows/pages.yml` fetches the latest source posts and rebuilds static pages on pushes, manual runs, and at **00:00, 06:00, 12:00, and 18:00 Africa/Casablanca**. A failed fetch stops that deployment, leaving the last published site available. GitHub may delay scheduled workflows, so this is a development host rather than a guaranteed live duty service.

Run the Pages build locally with:

```sh
npm run sync:pages
npm run build:pages
```

Static Pages show the latest dated day and night cards and their published hours. They do **not** label a roster as currently open, because the exact local time changes between builds. The Node version below retains the live current-shift view.

## Run locally

```sh
npm install
npm run sync
npm run dev
```

Open `http://localhost:4321/fr/tanger/pharmacies-de-garde/` or the Arabic route at `/ar/tanger/pharmacies-de-garde/`.

## Run a production Node server

```sh
SITE_URL=https://your-domain.example npm run build
SITE_URL=https://your-domain.example npm start
```

`npm start` serves the site, syncs once on launch, and checks at 00:00, 06:00, 12:00, and 18:00 in `Africa/Casablanca`. Keep the process running with a process manager. Current updates are written to `storage/feed.json` and `storage/rosters/`; set `STORAGE_DIR` to a persistent directory in production. The bundled `data/feed.json` is only a fallback snapshot if the first sync fails. A serverless deployment needs an external scheduled job and persistent storage instead.

## Deploy on Render

The included [`render.yaml`](render.yaml) provisions a **paid** Node web service with a 1 GB persistent disk. It is intentionally not the free plan: free services sleep after inactivity, which would interrupt the six-hour checker, and their local files do not persist. Push this project to a Git repository in your account, connect it in Render, and create a Blueprint from `render.yaml`. Render supplies an `onrender.com` URL and TLS. `astro.config.mjs` uses Render's `RENDER_EXTERNAL_URL` for canonical URLs and the sitemap unless you set `SITE_URL` explicitly. Review Render's current price before creating the service.

The disk stores new rosters across deploys. The web app serves roster images from that disk via `/photos/...`; the initial `public/rosters` files remain only as a fallback snapshot. New posts become visible without a rebuild.

## Data policy and current limits

- The importer uses a public Facebook plugin response. This endpoint can change or stop returning posts. A failed sync leaves the last successful feed intact and logs an error.
- Each card remains an image from the source. The MVP does not infer names, addresses, phones, coordinates, or opening status from OCR. Users should enlarge cards and call before visiting.
- Only posts with a parseable date and attached images are stored. A current duty label requires explicit day/night text and two times in the post. Other posts can appear as the latest planning, never as confirmed current.
- The Page Plugin exposes the page URL but does not provide an individual post permalink in this response, so source links point to the Facebook page.
- Images and post text belong to the source page. For a public launch, arrange permission or an official feed with the page owner.
- No analytics, geolocation, user accounts, or cookies are required for this MVP.

## Verification

```sh
npm test
npm run build
npm audit
```

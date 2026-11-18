# Tangier duty-pharmacy web app: product strategy

## Goal

Help someone in Tangier find a **currently on-duty pharmacy** in a few seconds on a phone. Start with the Facebook page [Pharmacies de garde à Tanger](https://web.facebook.com/pharmacies.degarde.tanger) as the nominated source. Expand city by city only after the Tangier update process is reliable.

The page's public description says it publishes Tangier duty-pharmacy lists. Its recent post content and format were **not reliably retrievable during this research**, so ingestion feasibility is the first project gate. Do not promise automatic publication until access and accuracy are demonstrated.

## What the first version should do

1. Open directly to **On duty now in Tangier**, with the local date, time, and time zone visible.
2. Show a text list first: pharmacy name, neighborhood, address, duty interval, call button, and directions button. Put an optional map below the list.
3. Offer neighborhood search and a day/night filter only when the source actually distinguishes those shifts.
4. Display **verified at**, **source post**, and **last checked** separately. A six-hour check does not mean a pharmacy is verified open at this instant.
5. If a duty interval has ended or the roster cannot be confirmed, replace “open now” with **schedule unconfirmed** and link to the source. Never silently carry yesterday's roster forward.
6. Let visitors report an error. Route reports to an editor; do not let public reports change the roster automatically.
7. Offer French and Arabic from launch, with proper right-to-left layout for Arabic. Keep names and addresses as published rather than guessing translations.

## Source and six-hour publishing workflow

**Preferred source path:** ask the page owner for cooperation and a structured roster or access to its posts. Meta's Graph API can read Page posts, but access to a public Page can require **Page Public Content Access** and approval; access to a Page managed by the app owner has different permissions. Validate the exact access path before coding an automated importer.

**Fallback:** an editor enters each new Facebook roster through a simple admin form. This is a viable launch path if API access is unavailable. Avoid building a fragile login-dependent scraper as the only source.

At **00:00, 06:00, 12:00, and 18:00 Africa/Casablanca**, a scheduled job checks for new or corrected source posts. If an accessible post exists, it saves the original URL, post ID, publication time, and raw text or image reference. Text extraction/OCR produces a draft; an editor verifies pharmacy identities, addresses, phone numbers, and exact duty start/end times before publishing. Deduplicate by source post ID and roster interval. Corrections can be published immediately between scheduled checks.

Each run records one of three outcomes: **new verified roster**, **no change**, or **needs attention**. “No change” updates the last-checked timestamp without creating a duplicate post or changing the verified-at time. A failed check alerts the editor. The next scheduled run never overwrites a valid record with a failed extraction.

## Data design

Store these separately:

| Entity | Essential fields |
| --- | --- |
| Pharmacy | Stable ID, published name, address, neighborhood, phone, map coordinates with verification status |
| Duty assignment | Pharmacy ID, city, start/end timestamps, shift label, verification status, published and superseded timestamps |
| Source record | Facebook post ID/URL, posted time, retrieved time, raw text/image reference, extraction status |
| Edit history | Editor, changed fields, reason, before/after values, time |

Store timestamps in UTC and render duty times in **Africa/Casablanca**. Never infer a 24-hour opening period from a post's date. A pharmacy's normal hours and its temporary duty assignment are different facts.

## Technology choice

Use **Astro** for the public site, with server-rendered Tangier pages and small React islands only for neighborhood search or the optional map. Use PostgreSQL for roster data, an authenticated admin area, and a separate scheduled worker for Facebook import and alerts. Astro supports on-demand rendering, API endpoints, React components, and localized routes. This keeps the main result list usable without JavaScript.

**Astro and Next.js are alternative app frameworks here; don't put one “on” the other.** If the product later grows into accounts, personalized notifications, and a complex interactive dashboard, reconsider Next.js. Its on-demand revalidation can update cached pages after publishing, but it adds little to this read-mostly first version.

Suggested shape:

```text
Facebook page / partner roster
          ↓
scheduled import → extraction draft → editor verification
                                      ↓
                                  PostgreSQL
                                      ↓
                          Astro public pages + admin
```

## Mobile and SEO plan

- Prioritize the answer above the fold: “Pharmacies de garde à Tanger aujourd'hui” and the currently valid roster. Use large tap targets, high contrast, readable text, and a fast list before loading a map.
- Use stable city URLs such as `/fr/tanger/pharmacies-de-garde/` and `/ar/tanger/pharmacies-de-garde/`. Future cities get the same route pattern. Avoid a new indexable URL for each six-hour run.
- Render useful page content as HTML on the server. Give each city/language page a unique title, description, heading, canonical URL, reciprocal `hreflang` links, and an XML sitemap with truthful `lastmod` values.
- Create pharmacy detail pages only when their name, location, and contact details are verified and useful beyond a single shift. Use `Pharmacy` structured data for verified facts only. Do not mark a pharmacy as open 24/7 merely because it is on duty for one interval.
- Include an About/methodology page that names the source, explains the verification process and correction method, and states what “last checked” means. Accuracy and clear provenance matter especially for health-related searches.
- Track indexing and search queries in Search Console, but measure success primarily by whether users can reach the correct pharmacy.

## Delivery sequence

| Stage | Deliverable | Exit condition |
| --- | --- | --- |
| 1. Source test | Inspect 2–4 weeks of posts; document formats, cadence, shifts, and legal/technical access; request cooperation from the page owner | Repeatable way to obtain the current roster and permission to use it |
| 2. Tangier MVP | French/Arabic public pages, verified roster database, manual admin entry, call/directions links, timestamps, correction form | Editor can publish and correct a shift; expired data is never presented as current |
| 3. Automation | Six-hour importer, OCR draft, duplicate detection, review queue, failure alert, audit log | Several consecutive rosters match the source and are published correctly |
| 4. Expansion | Reusable city/source model, city-specific editor and monitoring | Tangier coverage and correction process are stable; each new city has its own dependable source |

Launch with manual entry if necessary. Automate only after the importer has been run in parallel with human review and its errors are understood.

## Measures and operating rules

- Measure **coverage**: proportion of source-listed duty assignments represented accurately on the site.
- Measure **lag**: time from a source post or correction to a verified site update. A strict six-hour polling interval can create nearly six hours of detection delay; urgent corrections need a manual path.
- Measure **wrong-listing incidents** and time to correct them. Treat these as the main quality signal.
- Monitor check failures, OCR uncertainty, expired assignments, broken phone/map links, and pages without a current verified roster.
- Expand beyond Tangier only when a city has a dependable source, a reviewer, and a tested expiry policy.

## Decisions to settle before implementation

1. Can the Facebook page owner provide permission, Page access, or a structured feed? This determines whether the first importer is automated or editor-driven.
2. What are the actual roster start/end times and day/night rules in the page's posts? Configure them from evidence, never from an assumed 09:00–09:00 pattern.
3. Who will verify daily changes and receive failure alerts? Name a primary editor and backup before public launch.

## Research references

- [Nominated Tangier Facebook page](https://web.facebook.com/pharmacies.degarde.tanger)
- [Meta Page API: public content access and Page posts](https://developers.facebook.com/docs/graph-api/reference/page/)
- [Astro on-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/), [React integration](https://docs.astro.build/en/guides/integrations-guide/react/), and [internationalization](https://docs.astro.build/en/guides/internationalization/)
- [Next.js on-demand and time-based revalidation](https://nextjs.org/docs/app/getting-started/revalidating)
- [Google localized page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business), and [helpful, reliable content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

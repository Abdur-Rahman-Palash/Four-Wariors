
# Four Wariors — Noventrix Tech Agency

Professional marketing site and lightweight admin for a small creative team (digital marketing, design, and web development).

This repository contains a multi-page static site (HTML + in-page React) and a minimal admin UI used to manage team members, projects and related content. The codebase is optimized for fast page loads and simple deployments.

## Key Features

- Static multi-page marketing site (no build step required)
- Lightweight client-side admin (stores data locally; optional remote sync with Firestore)
- Performance optimizations: critical CSS inlined, deferred scripts, font preloads and image WebP hints
- Simple server option (`server.js`) for Render deployments that require a Node web service

## Repository structure (important files)

- `index.html`, `about.html`, `services.html`, `portfolio.html`, `contact.html`, `testimonials.html` — public pages
- `admin.html`, `public/admin.html` — admin interfaces
- `components/`, `public/components/` — reusable UI components
- `app.js`, `admin-app.js`, `portfolio-app.js`, `testimonials-app.js` — page scripts and app logic
- `styles.css`, `public/styles.css` — stylesheet files
- `render.yaml`, `vercel.json` — deployment configuration for Render and Vercel
- `server.js` — small Express server used when deploying as a Node web service
- `firebase-config.example.js` — example template for optional Firebase integration (do not commit secrets)

## Local development

1. Quick static serve (no install required):

```powershell
npx serve -s . -l 3000
# open http://localhost:3000
```

2. Node (Express) option (if you want the included server):

```powershell
npm install
npm start
# open http://localhost:3000
```

3. Editing: files can be edited directly (HTML / JS). The admin UI reads/writes `localStorage` keys such as `fw_team`, `fw_projects`, `fw_clients`, and `fw_satisfaction`.

## Deployment

- Render: This repo includes `render.yaml`. When using Render, ensure the service is configured to use the repository root (or update `render.yaml` to point to the correct `staticPublishPath`), then trigger a deploy. If you use the Node service variant, Render will run `npm install` and `npm start` per `render.yaml`.
- Vercel: `vercel.json` is included for easy Vercel deployment. Configure the project in Vercel and deploy from the repository.

If your live site does not reflect recent changes: clear browser cache, try an incognito window, or trigger a manual redeploy from your hosting dashboard. Edge caches (CDN) can take a few minutes to purge.

## Admin — Cross-device sync (optional)

- By default the admin saves to `localStorage` (local device only). Optional Firestore helpers are present in the codebase to enable cross-device sync.
- To enable remote sync:
	1. Create a Firebase project and add a Web app in the Firebase Console.
	2. Copy the Web SDK config and provide it at runtime as `window.FIREBASE_CONFIG` on pages that load the admin.
	3. The admin will then read/write a Firestore document (e.g. `site_data/team`) so changes propagate across devices.

See `firebase-config.example.js` for the expected shape. Do NOT commit real credentials to the repository.

## Contributing

- Small content or copy updates: edit the HTML/JS files and open a PR.
- Larger structural changes: open an issue first so we can discuss scope and backwards compatibility.

## Contact

Email: fourwarriors24@gmail.com

---
_Maintained by Noventrix Tech Agency — updated 2025-12-01_
# Four Wariors — Noventrix Tech Agency

> Small 4-member creative agency static site (marketing, design, web development).

This repository contains the single-page marketing site and a simple client-side admin panel used to manage team members, projects, clients and satisfaction entries. The site is static HTML/JS (UMD React via Babel) and is optimized for fast loads.

## What's in this repo

- `index.html`, `about.html`, `services.html`, `portfolio.html`, `contact.html`, `testimonials.html` — public pages
- `admin.html`, `public/admin.html`, `public/admin/index.html` — lightweight admin interfaces
- `components/` and `public/components/` — UI components used by the in-page React app
- `app.js`, `admin-app.js`, `portfolio-app.js`, `testimonials-app.js`, `public/app.js` — page scripts and app logic
- `styles.css`, `public/styles.css` — consolidated non-critical CSS (loaded non-blocking)
- `vercel.json` — hosting config and cache header rules
- `sw.js`, `sw-optimized.js` — service worker files (caching + offline helpers)

## Key notes & recent changes

- Performance: many pages were optimized for PageSpeed — critical CSS inlined, vendor scripts deferred, fonts preloaded, and images updated to request WebP via CDN query params.
- Fonts: `Inter` is preloaded with `font-display: swap` to reduce FOIT.
- Images: Unsplash image URLs in JS were updated to `auto=format&fit=crop&fm=webp&q=75` for smaller payloads.
- CSS: `styles.css` and `public/styles.css` hold non-critical utilities and are loaded with `media="print" onload="this.media='all'"` pattern.

## Run locally

You can serve the site with any static server. Examples:

PowerShell (recommended using `npx`):
```
npx serve -s . -l 3000
# then open http://localhost:3000
```

Python (quick option):
```
python -m http.server 3000
# then open http://localhost:3000
```

If you prefer to use the Node.js start script (if present), run:
```
npm install
npm start
```

## Deploy

- This repo includes a `vercel.json` ready for Vercel deployments. Push to your Git provider and deploy with Vercel for best edge caching and compression support.
- After deploy, re-run PageSpeed Insights on your production URL to validate improvements.

## Admin panel

- The admin panel is client-side and stores data in `localStorage` under keys like `fw_team`, `fw_projects`, `fw_clients`, and `fw_satisfaction`.
- To edit or reset entries, open the admin UI in a browser and use the forms. Some team entries are password-protected in the admin UI.

## Contributing

- Small changes are welcomed — for content updates edit the HTML/JS files and push a branch/PR.
- Big refactors (introducing a build pipeline, Tailwind build, or image pipeline) should be discussed first.

## Contact

fourwarriors24@gmail.com

---
_Generated/updated README on 2025-11-15 as part of repository housekeeping and PageSpeed optimization work._

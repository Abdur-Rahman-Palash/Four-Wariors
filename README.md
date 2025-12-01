# Four Wariors — Noventrix Tech Agency

Small 4-member creative agency static site (marketing, design, web development).

This repository contains a multi-page marketing site and a lightweight client-side admin panel to manage team members, projects, clients and satisfaction entries. The site is implemented as static HTML + in-page React (UMD via Babel) and optimized for fast loads.

## What’s in this repo

- `index.html`, `about.html`, `services.html`, `portfolio.html`, `contact.html`, `testimonials.html` — public pages
- `admin.html`, `public/admin.html` — admin interfaces
- `components/` and `public/components/` — UI components used by the in-page React apps
- `app.js`, `admin-app.js`, `portfolio-app.js`, `testimonials-app.js`, `public/app.js` — page/app scripts
- `styles.css`, `public/styles.css` — CSS (non-critical styles are loaded non-blocking)
- `vercel.json`, `render.yaml` — hosting config and cache header rules
- `server.js` — small Express server (used for Render when configured as a web service)

## Recent changes

- Rebranded to **Noventrix Tech Agency** across pages and meta tags.
- Optional Firestore sync helpers added to allow cross-device admin sync when `window.FIREBASE_CONFIG` is provided.
- Performance improvements: critical CSS inlined, non-blocking CSS loading pattern, deferred scripts, font preloads, WebP image variants.

## Run locally

Fast static serve (recommended):
```bash
npx serve -s . -l 3000
# then open http://localhost:3000
```

Node/Express option (if you prefer the included server):
```bash
npm install
npm start
# then open http://localhost:3000
```

## Deploy (Render / Vercel)

- This repo includes `render.yaml` for Render and `vercel.json` for Vercel. Ensure the service root and build settings match your hosting provider.
- If you change files but the live site doesn't update: clear browser cache, check Render/Vercel build logs, and trigger a manual redeploy.

## Admin panel notes

- Admin stores data in `localStorage` under keys: `fw_team`, `fw_projects`, `fw_clients`, `fw_satisfaction`.
- To enable cross-device syncing, provide a Firebase Web config as `window.FIREBASE_CONFIG` in a secure way (do **not** commit secrets). See `firebase-config.example.js`.

## Contact

fourwarriors24@gmail.com

_Updated on 2025-12-01_
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

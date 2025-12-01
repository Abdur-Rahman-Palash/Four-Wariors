# Noventrix Tech Agency

A modern, high-performance creative agency website built with cutting-edge web technologies. Specializing in Digital Marketing, Graphic Design, Web Development, and SEO services for businesses across Bangladesh and globally.

**Live Site:** [https://four-wariors.onrender.com](https://four-wariors.onrender.com)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Performance](#performance)
- [SEO & Analytics](#seo--analytics)
- [Security](#security)
- [Team & Contact](#team--contact)

---

## Overview

Noventrix Tech Agency is a full-stack, responsive web application showcasing a 4-member creative agency based in Dinajpur, Bangladesh. The website features:

- Dynamic service and portfolio management
- Admin dashboard for content updates
- Real-time team member management with localStorage persistence
- Responsive design optimized for all devices
- Advanced SEO with structured data (JSON-LD)
- Google Analytics 4 integration
- Progressive performance with optimized assets

---

## Features

### Core Features
- **Responsive Design** - Mobile-first approach using Tailwind CSS
- **Admin Dashboard** - Manage services, projects, team members, and client testimonials
- **Local Data Persistence** - Team, projects, clients data stored in localStorage
- **Dynamic Routing** - Single-page application with client-side routing
- **Real-time Updates** - All changes reflected instantly across pages
- **Service Worker** - Offline support and asset caching

### Performance Features
- **Critical CSS Inlining** - Reduced First Contentful Paint (FCP)
- **Deferred Script Loading** - Non-blocking JavaScript execution
- **Font Preloading** - Optimized typography rendering
- **Image Optimization** - WebP format hints and responsive images
- **No-Cache Headers** - Always fresh content delivery
- **Asset Minification** - Reduced bundle sizes

### SEO & Analytics
- **JSON-LD Structured Data** - Organization and LocalBusiness schemas
- **Meta Tags** - Comprehensive Open Graph, Twitter, and standard meta tags
- **Google Site Verification** - Verified and indexed
- **Google Analytics 4** - Measurement ID: `G-XNBZ4550NC`
- **Sitemap & Robots.txt** - Search engine crawling optimization
- **Multilingual Keywords** - Bengali and English SEO optimization

### Security Features
- `.gitignore` - Protects sensitive files
- `firebase-config.example.js` - Credentials template
- `SECURITY.md` - Security guidelines and best practices
- No hardcoded secrets in version control

---

## Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Tailwind CSS (utility-first framework)
- **JavaScript (ES6+)** - Vanilla JS + React (UMD/Babel)
- **React 18** - Component-based UI
- **Babel** - JSX transformation
- **Lucide Icons** - SVG icon library

### Backend/Server
- **Node.js** - JavaScript runtime
- **Express.js** - Lightweight web framework
- **Static File Serving** - Express static middleware

### Storage
- **localStorage** - Client-side data persistence
- **Firebase (Optional)** - Remote sync capabilities (requires config)

### Build & Tools
- **Tailwind CSS** - Utility-first CSS framework
- **npm** - Package manager
- **Git** - Version control

### Deployment
- **Render** - Cloud platform for hosting
- **GitHub** - Source code repository
- **Node Web Service** - Render deployment type

### Analytics & Verification
- **Google Analytics 4** - User tracking and insights
- **Google Search Console** - Verified property

---

## Project Structure

```
Four-Wariors/
├── public/
│   ├── index.html              # Main homepage (public version)
│   ├── admin.html              # Admin dashboard
│   ├── about.html              # About page
│   ├── contact.html            # Contact page
│   ├── services.html           # Services page
│   ├── portfolio.html          # Portfolio page
│   ├── testimonials.html       # Testimonials page
│   ├── styles.css              # Tailwind CSS compiled
│   ├── sitemap.xml             # SEO sitemap
│   ├── robots.txt              # Search engine directives
│   ├── components/             # React components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── HeroCarousel.js
│   │   ├── ServiceCard.js
│   │   ├── ProjectCard.js
│   │   ├── StatsSection.js
│   │   ├── FloatingContact.js
│   │   └── (more components)
│   └── app.js                  # Main React app entry
├── components/                 # Root component files (mirror of public)
├── assets/                     # JSON data for hero slides
├── index.html                  # Root homepage
├── admin-app.js                # Admin app logic
├── admin.html                  # Admin page (root)
├── about-app.js                # About app logic
├── about.html                  # About page (root)
├── (other page files)
├── server.js                   # Express server
├── package.json                # Node dependencies
├── tailwind.config.js          # Tailwind configuration
├── render.yaml                 # Render deployment config
├── sw.js                       # Service Worker
├── .gitignore                  # Git ignore rules
├── firebase-config.example.js  # Firebase config template
├── SECURITY.md                 # Security documentation
├── SEO_GUIDE.md               # SEO best practices
└── README.md                   # This file
```

---

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Clone Repository
```bash
git clone https://github.com/Abdur-Rahman-Palash/Four-Wariors.git
cd Four-Wariors
```

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm start
```

The server runs on `http://localhost:3000`

---

## Development

### Local Development
```bash
npm start
```

Opens the development server at `http://localhost:3000` with hot-reload support.

### Build Tailwind CSS
```bash
npx tailwindcss -i ./tailwind.css -o ./public/styles.css --watch
```

### Service Worker Testing
- Service Worker registers automatically on page load
- View in DevTools: Application → Service Workers
- Clear cache: DevTools → Application → Clear storage

### Admin Dashboard
Navigate to `/admin` to access the admin panel. Features:
- Add/edit/delete team members
- Manage services and pricing
- Update portfolio projects
- Add client testimonials
- Password-protected (optional): "JASS"

---

## Deployment

### Render Deployment

**Platform:** Render (Node Web Service)

**Configuration:**
- **Runtime:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment:** Production

**Deploy Steps:**
1. Push changes to GitHub `main` branch
2. Render automatically detects changes
3. Builds and deploys the app
4. Site updates at `https://four-wariors.onrender.com`

**Files:**
- `server.js` - Express server configuration
- `render.yaml` - Render deployment manifest
- `package.json` - Node scripts and dependencies

### Cache Control
Strict no-cache headers on HTML ensure fresh content delivery:
```javascript
Cache-Control: no-cache, no-store, must-revalidate, max-age=0
```

---

## Performance

### Lighthouse Metrics
- **FCP (First Contentful Paint):** < 2s
- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **Performance Score:** Target 75+

### Optimization Techniques
1. **Critical CSS Inlining** - Above-the-fold styles loaded first
2. **Deferred Script Loading** - `defer` attribute on non-critical scripts
3. **Font Preloading** - `preload` for system fonts (Inter)
4. **Image Optimization** - WebP hints and lazy loading
5. **Service Worker Caching** - Static assets cached on first visit
6. **Minification** - CSS and JavaScript bundled

### Performance Report
Detailed metrics available in `PERFORMANCE_REPORT.md`

---

## SEO & Analytics

### Google Analytics
- **Measurement ID:** `G-XNBZ4550NC`
- **Tracking:** Delayed initialization to reduce main thread work
- **Events:** Standard page views and custom events

### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Noventrix Tech Agency",
  "url": "https://four-wariors.onrender.com",
  "contactPoint": {
    "telephone": "+8801971233127",
    "email": "fourwarriors24@gmail.com"
  }
}
```

### Keywords
- Primary: Digital Marketing, Web Development, Graphic Design, SEO, MERN Stack
- Localized: Dinajpur, Bangladesh, Local Business
- Global: USA, Canada, UK, Australia, Europe

### Meta Tags
- Canonical URLs → `https://four-wariors.onrender.com`
- OG Tags → Social media sharing
- Twitter Cards → Rich previews
- Mobile Viewport → Responsive design

---

## Security

### Best Practices
- **No Secrets in Code** - Use `.gitignore` for sensitive files
- **Environment Variables** - Render config for secrets
- **Firebase Config Example** - Template provided (`firebase-config.example.js`)
- **HTTPS Only** - All external resources load over HTTPS

### Files
- `.gitignore` - Excludes node_modules, .env, secrets
- `SECURITY.md` - Detailed security guidelines
- `firebase-config.example.js` - Template for Firebase credentials

### Data Storage
- **localStorage** - Client-side only, no server transmission
- **Optional Firebase** - For cross-device sync (requires config)

---

## Team & Contact

**Noventrix Tech Agency**
- **Address:** Dadul, Kazihal, Attpukurhat, Fulbari, Dinajpur, Bangladesh
- **Email:** fourwarriors24@gmail.com
- **Phone:** +8801971233127
- **Website:** https://four-wariors.onrender.com

### Services
- Digital Marketing
- Graphic Design
- Web Development (MERN Stack)
- SEO Optimization
- Social Media Management

---

## Documentation

- **SEO Guide:** `SEO_GUIDE.md` - Comprehensive SEO optimization tips
- **Performance Guide:** `PAGESPEED_OPTIMIZATION_GUIDE.md` - Lighthouse optimization
- **Security Guide:** `SECURITY.md` - Security best practices
- **Google Verification:** `GOOGLE_VERIFICATION_GUIDE.md` - Setup instructions

---

## License

This project is proprietary. All rights reserved by Noventrix Tech Agency.

---

## Contributing

For internal contributions:
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "feat: description"`
3. Push to GitHub: `git push origin feature/your-feature`
4. Submit pull request

---

## Support & Maintenance

For issues, feature requests, or maintenance:
- **GitHub Issues:** [Create an issue](https://github.com/Abdur-Rahman-Palash/Four-Wariors/issues)
- **Email:** fourwarriors24@gmail.com
- **Phone:** +8801971233127

---

**Last Updated:** December 1, 2025  
**Version:** 2.1.0 (Production Release)  
**Repository:** [GitHub - Abdur-Rahman-Palash/Four-Wariors](https://github.com/Abdur-Rahman-Palash/Four-Wariors)

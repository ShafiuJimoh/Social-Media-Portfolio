# Shafiu Jimoh — Social Media Manager Portfolio

A modern, single-page portfolio site for **Shafiu Jimoh**, Social Media Manager and
content strategist based in Abuja, Nigeria. Built as static HTML/CSS/JS (no build step),
deployable anywhere — GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any static host.

## What's included

- **Hero** — headline, key proof points, animated stat ticker.
- **About** — bio, tools & technology stack.
- **Viral Campaign case study** — the 1.2M-view TikTok post, full metrics, lightbox screenshot.
- **Before/after performance** — side-by-side account analytics (Jun–Aug vs Aug–Nov) with
  multiplier callouts (167× views, 363× likes, etc.), plus an extensible screenshot gallery.
- **Three-month content calendar** — tabbed Month 1/2/3 roadmap with a fully scripted sample
  week per month, built around a 4-pillar content system.
- **Video editing samples** — data-driven grid; add real clips by editing one array in
  `assets/js/main.js`, missing clips show a tasteful "coming soon" placeholder instead of
  breaking.
- **Scripts & creative concepts** — six hook/build/CTA video scripts across gaming, lifestyle,
  entertainment and community formats.
- **Growth strategy** — the 6-step repeatable framework behind the calendar.
- **Experience timeline** — freelance + agency history pulled from the CV.
- **Contact** — email, phone, LinkedIn, CV download.

## Project structure

```
webapp/
├── index.html              # single-page site
├── assets/
│   ├── css/style.css        # full design system (dark-first, gradient accents)
│   ├── js/main.js           # nav, scroll reveal, counters, calendar tabs, gallery, lightbox
│   ├── images/               # analytics screenshots (before/after/viral post)
│   └── cv/                  # downloadable CV PDF
└── README.md
```

## Adding new screenshots or video clips later

The screenshot gallery and video editing grid are **data-driven** so new proof assets can be
added without touching any HTML/CSS:

1. Drop the image/video file into `assets/images/` (or a new subfolder).
2. Open `assets/js/main.js`.
   - For a new **screenshot**, add an object to the `galleryItems` array:
     ```js
     { src: "assets/images/your-file.jpg", label: "Short label", caption: "Full caption text." }
     ```
   - For a new **video edit sample**, add an object to the `editSamples` array:
     ```js
     { title: "Clip title", desc: "One-line description.", tags: ["CapCut"], src: "assets/videos/clip.mp4", poster: "assets/images/clip-poster.jpg" }
     ```
3. Remove the corresponding `{ placeholder: true, ... }` entry if you want to replace a
   placeholder slot, or just add new items — placeholders and real media render side by side.

If an image fails to load (404), the gallery automatically falls back to a labelled
placeholder tile instead of showing a broken image icon, so the layout never breaks.

## Local preview

```bash
cd webapp
python3 -m http.server 8080
# open http://localhost:8080
```

## Deployment

This is a fully static site — deploy the repository root as-is to GitHub Pages, Cloudflare
Pages, Netlify, or Vercel with no build command needed.

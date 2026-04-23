# Deployment Guide

This site is a Next.js 14 application with a server-side API route (`/api/chat`) that proxies the résumé assistant to the Groq inference API. Because of that server route, the deployment target must support **Node.js / serverless functions** — a pure static host (vanilla GitHub Pages, plain S3, etc.) cannot run the chatbot endpoint.

The recommended free path is **Vercel**, which is purpose-built for Next.js and offers a generous Hobby tier suitable for a personal portfolio. A GitHub-Pages-only fallback is documented at the end for completeness.

---

## Option A — Vercel (recommended, free tier)

Vercel hosts the static pages on its CDN and runs `/api/chat` as a serverless function. SSL, custom domains, preview deployments, and analytics are all included on the free Hobby plan.

### 1. Push the repository to GitHub

```bash
cd ~/Documents/shahnawaz-profile
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin git@github.com:mshanawaz114/shahnawaz-profile.git
git push -u origin main
```

(Replace the remote URL with the repository you create under your GitHub account.)

### 2. Import the project in Vercel

1. Sign in at <https://vercel.com> with your GitHub account.
2. Click **Add New → Project**, pick the `shahnawaz-profile` repository, and accept the auto-detected Next.js settings — no overrides are needed.
3. Under **Environment Variables**, add the following (mark them as available to Production, Preview, and Development):

   | Name | Value |
   | --- | --- |
   | `GROQ_API_KEY` | your Groq API key (`gsk_…`) |
   | `NEXT_PUBLIC_SITE_URL` | `https://<your-project>.vercel.app` (update after the first deploy if you attach a custom domain) |

4. Click **Deploy**. The first build takes ~90 seconds; subsequent pushes to `main` deploy automatically.

### 3. (Optional) Attach a custom domain

In **Project → Settings → Domains**, add the domain you own (e.g. `shahnawaz.dev`). Vercel will show the DNS records to set at your registrar and provision an SSL certificate automatically.

### 4. Local development parity

```bash
cp .env.example .env.local           # populate GROQ_API_KEY locally
npm install
npm run dev
```

Vercel reads the same `GROQ_API_KEY` you set in step 2, so the local and hosted experience match.

---

## Option B — GitHub Pages (chatbot disabled)

GitHub Pages serves static files only, so the résumé assistant cannot run there as-is. Use this option only if you are willing to ship the site without the chat widget, or if you move the `/api/chat` endpoint to an external function host (e.g. Cloudflare Workers).

### 1. Configure Next.js for static export

Edit `next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: "/shahnawaz-profile", // omit if deploying to <user>.github.io root
};
export default nextConfig;
```

### 2. Remove or stub the API route

Either delete `app/api/chat/route.ts` or comment out the `ChatWidget` import in `app/page.tsx`. Static export will fail to build while a server route is present.

### 3. Build and publish

```bash
npm run build         # produces an `out/` directory
npx gh-pages -d out   # one-time `npm i -D gh-pages` if not installed
```

A workflow alternative — drop this into `.github/workflows/pages.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./out }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

In the repository settings, set **Pages → Source** to *GitHub Actions*. Subsequent pushes to `main` redeploy automatically.

### 4. (Optional) Re-enable the chatbot via Cloudflare Workers

If the assistant is required and Pages is non-negotiable, port `app/api/chat/route.ts` to a Cloudflare Worker, host the worker at e.g. `https://chat.shahnawaz.workers.dev`, and update `ChatWidget.tsx` to `fetch("https://chat.shahnawaz.workers.dev")`. Both Cloudflare Workers and GitHub Pages have free tiers.

---

## Other free hosts that fit Next.js + API routes

| Host | Notes |
| --- | --- |
| **Netlify** | Free Starter plan, supports Next.js via the `@netlify/plugin-nextjs` adapter. |
| **Cloudflare Pages** | Free, supports Next.js with `@cloudflare/next-on-pages`; serverless functions on the free Workers tier. |
| **Render** | Free web-service tier (cold starts after 15 minutes of idle) — works but slower for a portfolio. |

Vercel remains the lowest-friction choice for this codebase.

---

## Pre-deploy checklist

- [ ] `npm run lint` clean (or warnings reviewed).
- [ ] `npx tsc --noEmit` clean.
- [ ] `GROQ_API_KEY` set in the host's environment variables.
- [ ] `NEXT_PUBLIC_SITE_URL` set so Open Graph / canonical URLs resolve correctly.
- [ ] `public/resume.pdf` is the up-to-date résumé file referenced by the Hero CTA.
- [ ] Manual smoke test in production: open the chat widget and send one message, confirm the response renders.
- [ ] Lighthouse / axe scan against the deployed URL — target ≥ 95 on Accessibility, with no WCAG 2.1 AA violations.

---

## Accessibility & compliance posture

The site is engineered to **WCAG 2.1 AA** and **Section 508** standards:

- Semantic landmarks (`header`, `main`, `footer`, `nav`, `section[aria-labelledby]`).
- Skip-to-content link as the first focusable element.
- All decorative iconography is `aria-hidden`; interactive icon buttons carry descriptive `aria-label` text.
- Chat transcript uses `role="log"` with `aria-live="polite"` so assistive technology hears new replies.
- Colour contrast verified for body copy in both themes (≥ 4.5:1 for normal text, ≥ 3:1 for large text and UI components).
- `prefers-reduced-motion` honoured globally — animations collapse to near-zero duration.
- Keyboard-only navigation supported across every interactive element; focus rings are visible in both themes.

These should be re-verified after each major content change using Lighthouse, axe DevTools, or the WAVE browser extension.

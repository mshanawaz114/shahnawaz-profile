# INSTRUCTIONS.md — Build Plan (Phases 1 → 5)

This document is the authoritative, step-by-step build plan for `shahnawaz-profile`. Follow it top to bottom. Each phase has **goals, steps, acceptance criteria, and estimated time**.

**Total estimated time:** ~8–14 hours of focused work, spreadable across a week.

---

## Overview

```
Phase 1 ─ Foundation            (repo, tooling, resume ingestion)
Phase 2 ─ Portfolio UI          (hero, sections, responsive, dark mode)
Phase 3 ─ Chatbot Integration   (Groq API, chat widget, system prompt)
Phase 4 ─ Content & Polish      (projects, SEO, accessibility, analytics)
Phase 5 ─ Deployment            (push to GitHub, ship to Vercel, custom domain)
```

---

## Phase 1 — Foundation & Resume Ingestion

**Goal:** Have a working Next.js project locally, pushed to a GitHub repo named `shahnawaz-profile`, with the resume extracted into usable content files.

**Estimated time:** 1.5–2 hours

### 1.1 Create the GitHub repo

Pick **one** of the following:

**Option A — via the web (easiest):**
1. Go to <https://github.com/new>.
2. Repository name: `shahnawaz-profile`.
3. Visibility: **Public** (needed for free Vercel hobby tier + GitHub Pages).
4. Do **not** initialize with README, .gitignore, or license — we already have these locally.
5. Click *Create repository*. Copy the SSH/HTTPS URL GitHub shows you.

**Option B — via GitHub CLI (`gh`):**
```bash
# one-time install if needed
brew install gh          # macOS
gh auth login            # follow the prompts, pick GitHub.com + HTTPS + web login

# from the project folder
cd ~/Documents/shahnawaz-profile
gh repo create shahnawaz-profile --public --source=. --remote=origin
```

### 1.2 Initialize git locally

```bash
cd ~/Documents/shahnawaz-profile
git init -b main
git add README.md CLAUDE.md INSTRUCTIONS.md ideas.md .gitignore
git commit -m "chore: initial planning docs"
# if you used Option A above:
git remote add origin https://github.com/<your-username>/shahnawaz-profile.git
git push -u origin main
```

### 1.3 Scaffold the Next.js app

```bash
cd ~/Documents/shahnawaz-profile
npx create-next-app@latest . \
  --typescript --tailwind --eslint --app --src-dir=false \
  --import-alias "@/*" --use-npm
```

When prompted about overwriting files, **decline** (we want to keep our planning docs). If Next insists, answer `No` to every conflict and manually merge changes.

Verify:
```bash
npm run dev
# open http://localhost:3000 — you should see the Next.js starter
```

### 1.4 Install additional dependencies

```bash
npm install groq-sdk framer-motion lucide-react clsx tailwind-merge
npm install -D @types/node
npx shadcn@latest init     # accept defaults, choose Slate as base color
npx shadcn@latest add button card input textarea scroll-area avatar badge sheet
```

### 1.5 Ingest the resume

1. Drop your resume PDF at `public/resume.pdf`.
2. Extract plain text into `content/resume.md`. Options:
   - Fast path: copy-paste from your PDF viewer, clean up formatting by hand.
   - Programmatic: `npx -y pdf-parse-cli public/resume.pdf > content/resume.md` or any tool you prefer.
3. Create a structured `content/resume.json` with this shape:

```json
{
  "name": "Shahnawaz Mohammed",
  "title": "Software Engineer",
  "location": "…",
  "email": "…",
  "summary": "A 2–3 sentence elevator pitch.",
  "skills": ["…"],
  "experience": [
    {
      "company": "…",
      "role": "…",
      "start": "YYYY-MM",
      "end": "YYYY-MM | present",
      "bullets": ["…"]
    }
  ],
  "education": [ { "school": "…", "degree": "…", "year": "…" } ],
  "projects": [ { "name": "…", "description": "…", "link": "…" } ],
  "certifications": ["…"],
  "social": { "github": "…", "linkedin": "…", "twitter": "…" }
}
```

Also set up env:
```bash
echo 'GROQ_API_KEY=' > .env.local.example
cp .env.local.example .env.local
# get a free key at https://console.groq.com/keys and paste it into .env.local
```

### 1.6 Acceptance criteria for Phase 1

- [ ] `https://github.com/<you>/shahnawaz-profile` exists and is public
- [ ] `git clone` of the repo produces a working `npm run dev`
- [ ] `public/resume.pdf` is present
- [ ] `content/resume.md` and `content/resume.json` are populated and accurate
- [ ] `.env.local` has a valid `GROQ_API_KEY` and is gitignored

---

## Phase 2 — Portfolio UI

**Goal:** A visually polished, responsive, accessible single-page portfolio with all the core sections and dark/light theme.

**Estimated time:** 3–4 hours

### 2.1 Information architecture

The landing page will have these sections, in order:

1. **Hero** — name, one-line tagline, primary CTA ("Ask me anything" opens the chatbot), secondary CTA ("Download resume").
2. **About** — 2–3 paragraphs in first person. Photo on the side.
3. **Skills** — grouped chips (Languages, Frameworks, Tools, Cloud).
4. **Experience** — vertical timeline, one card per role.
5. **Projects** — 3–6 highlight cards with links, tech badges, short blurbs.
6. **Contact** — email, LinkedIn, GitHub, X, and a "Start chatting" button.

### 2.2 Build each section as its own component

```
components/sections/
  Hero.tsx
  About.tsx
  Skills.tsx
  Experience.tsx
  Projects.tsx
  Contact.tsx
  SectionHeader.tsx   // shared
```

Each section reads from `content/resume.json` and/or `content/projects.json`. **Do not hardcode content in JSX** — it will later feed the chatbot too.

### 2.3 Layout + theming

- Top-level layout in `app/layout.tsx` — loads fonts (Inter + a display font like Space Grotesk), wraps the page in a `<ThemeProvider>`.
- Dark/light mode via `next-themes` (`npm i next-themes`), with system-preference as default.
- Add a `ThemeToggle` in the nav bar.
- Use a max-width container (`max-w-5xl`) with generous vertical spacing.
- Smooth scroll between sections, subtle Framer Motion fade-ins on scroll (`whileInView`).

### 2.4 Responsiveness

- Mobile-first. Test at 375px, 768px, 1024px, 1440px.
- Hamburger menu below `md` breakpoint.
- Chat widget button stays in the bottom-right corner on all sizes.

### 2.5 Accessibility pass

- Every section has a proper `<section id="…" aria-labelledby="…">`.
- Semantic headings (`h1` → `h2` → `h3`, no skipping).
- Focus rings visible (don't remove `outline` without replacement).
- Color contrast checked in both themes (use the Axe or Lighthouse accessibility audit).

### 2.6 Acceptance criteria for Phase 2

- [ ] All 6 sections render with real content
- [ ] Dark + light theme both look good, toggle works
- [ ] Mobile layout is clean (no horizontal scroll)
- [ ] Lighthouse accessibility score ≥ 95
- [ ] Resume PDF is linked (not 404)

---

## Phase 3 — Chatbot Integration ("Ask Shahnawaz")

**Goal:** A floating chat widget that answers questions about Shahnawaz using Groq-hosted Llama, grounded in the resume.

**Estimated time:** 2–3 hours

### 3.1 Design the system prompt

In `lib/prompt.ts`:

```ts
import resume from "@/content/resume.json";

export function buildSystemPrompt() {
  return `You are "Ask Shahnawaz", a helpful assistant that answers questions
about Shahnawaz Mohammed using ONLY the information in the resume below.

Rules:
- Be concise (2–4 sentences per answer unless the user asks for detail).
- If the answer isn't in the resume, say: "I don't have that information in
  my resume, but you can email Shahnawaz at ${resume.email}."
- Stay strictly on-topic: Shahnawaz's background, skills, projects, experience,
  education, and career interests. Politely redirect off-topic questions.
- Never invent employers, dates, certifications, or quotes.
- If asked about availability or rates, say Shahnawaz handles that personally
  and share his email.

RESUME (source of truth):
${JSON.stringify(resume, null, 2)}
`;
}
```

### 3.2 Build the API route

`app/api/chat/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { buildSystemPrompt } from "@/lib/prompt";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = process.env.GROQ_MODEL ?? "llama-3.1-8b-instant";

// simple in-memory IP rate-limit (swap for Upstash Redis in prod)
const hits = new Map<string, { count: number; resetAt: number }>();
function rateLimit(ip: string, limit = 20, windowMs = 10 * 60_000) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anon";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { messages } = await req.json(); // [{ role: "user" | "assistant", content: string }]

  const completion = await groq.chat.completions.create({
    model: MODEL,
    temperature: 0.3,
    messages: [
      { role: "system", content: buildSystemPrompt() },
      ...messages.slice(-10), // keep context small
    ],
  });

  return NextResponse.json({
    reply: completion.choices[0]?.message?.content ?? "",
  });
}
```

### 3.3 Build the chat widget

`components/chatbot/ChatWidget.tsx` (client component):

- Floating circular button, bottom-right, `fixed bottom-6 right-6 z-50`.
- On click, opens a card/sheet with:
  - Header: "Ask Shahnawaz" + close button.
  - Scrollable message list.
  - Input box with send button and `Enter` to submit.
- Messages render with different styles for user vs assistant.
- Show a "typing…" indicator while fetch is in-flight.
- Lazy-load with `dynamic(() => import("@/components/chatbot/ChatWidget"), { ssr: false })` in `app/page.tsx` so it doesn't bloat initial JS.

### 3.4 Add starter questions

Surface 3–4 suggested prompts when the chat is empty:

- "What are your top skills?"
- "Walk me through your most recent role."
- "What kinds of projects have you built?"
- "How do I get in touch?"

Clicking one prefills the input.

### 3.5 Prompt-injection & safety

- Enforce the system message in code — don't let user messages override role.
- Truncate user input to 500 chars.
- Scrub obvious jailbreak phrases in the UI (optional, belt-and-suspenders).
- Log requests server-side (just count + timestamp, no content by default).

### 3.6 Acceptance criteria for Phase 3

- [ ] Chat widget opens and closes smoothly
- [ ] A real question ("what languages do you know?") returns a correct answer
- [ ] An off-topic question ("what's the weather?") is politely redirected
- [ ] An unknown-fact question ("do you have a PhD?") returns the "not in resume" response (if it isn't)
- [ ] `GROQ_API_KEY` is never visible in the browser (check DevTools → Network → Response payloads)
- [ ] Rate-limiter kicks in after 20 messages / 10 min

---

## Phase 4 — Content & Polish

**Goal:** Treat this as a real portfolio someone would hire you from.

**Estimated time:** 1.5–2 hours

### 4.1 Project entries

In `content/projects.json`, add 3–6 projects. For each:

- Title, one-liner, problem statement, outcome/impact, tech stack, link(s), optional screenshot.

### 4.2 SEO

- `app/layout.tsx` metadata: title, description, Open Graph tags, Twitter card.
- Add `app/opengraph-image.tsx` (Next.js auto-generates an OG image from JSX).
- Add `robots.txt` and `sitemap.ts`.
- Add structured data: `<script type="application/ld+json">` with a `Person` schema including name, jobTitle, sameAs links (GitHub, LinkedIn).

### 4.3 Analytics (pick one)

- **Vercel Web Analytics:** `npm i @vercel/analytics`, add `<Analytics />` in layout. Zero config once deployed.
- **Plausible:** free self-hosted, no cookies, drop their script in layout.

### 4.4 Performance

- Run `npm run build` locally; fix any warnings.
- Run Lighthouse. Target: Performance ≥ 95, Accessibility ≥ 95, Best Practices 100, SEO 100.
- Compress images (`public/*`) to WebP where possible.

### 4.5 Nice-to-haves (time permitting)

- Copy-to-clipboard on email.
- Print stylesheet so the page prints cleanly.
- A tiny Easter egg on the console (`console.log("Thanks for looking under the hood 👋")`).

### 4.6 Acceptance criteria for Phase 4

- [ ] OG preview looks good when pasting the URL into Slack / iMessage / LinkedIn
- [ ] All Lighthouse scores meet targets
- [ ] Analytics show at least one real session
- [ ] No console errors in production build

---

## Phase 5 — Deployment

**Goal:** The site is live on a real URL, auto-deploys from `main`, and the chatbot works in production.

**Estimated time:** 30–60 minutes

### 5.1 Push everything to GitHub

```bash
git add .
git commit -m "feat: portfolio + chatbot ready for deploy"
git push origin main
```

### 5.2 Connect to Vercel

1. Go to <https://vercel.com/signup> and sign in with GitHub.
2. Click **Add New → Project** and pick `shahnawaz-profile`.
3. Framework preset: Next.js (auto-detected).
4. **Environment variables**, add:
   - `GROQ_API_KEY` = *your key*
   - `GROQ_MODEL` = `llama-3.1-8b-instant` (or `llama-3.1-70b-versatile`)
5. Click **Deploy**. Wait ~1 minute.

Your site is now live at `https://shahnawaz-profile.vercel.app` (or similar).

### 5.3 Smoke-test production

- Open the live URL on desktop and phone.
- Try the chatbot. Confirm it answers correctly.
- Open DevTools → Network → /api/chat → ensure the request does not leak the key.
- Check all section anchors, resume link, social links.

### 5.4 Custom domain (optional)

If you own e.g. `shahnawaz.dev`:

1. In Vercel → Project → Settings → Domains, add `shahnawaz.dev` and `www.shahnawaz.dev`.
2. Vercel shows the DNS records to add at your registrar (A/CNAME).
3. Wait for DNS propagation (usually minutes).
4. Vercel issues the TLS certificate automatically.

### 5.5 GitHub Pages mirror (optional, static-only)

If you also want a `username.github.io/shahnawaz-profile` copy (without the chatbot — since GH Pages has no serverless):

1. In `next.config.mjs`, add `output: "export"`.
2. Add a GitHub Action at `.github/workflows/pages.yml` that runs `npm run build` and deploys `out/` to the `gh-pages` branch.
3. In the repo → Settings → Pages, source = `gh-pages` branch.

The Vercel deploy remains the primary site because it's the only one with the chatbot.

### 5.6 Post-launch

- Add the live URL to the top of the README.
- Share it on LinkedIn, Twitter, and your email signature.
- Schedule a reminder to update the resume + redeploy every ~6 months.

### 5.7 Acceptance criteria for Phase 5

- [ ] Live URL works on desktop and mobile
- [ ] Chatbot replies in production
- [ ] `git push` triggers an automatic redeploy
- [ ] Lighthouse still ≥ targets on the live URL
- [ ] README updated with live URL

---

## Appendix A — Environment Variables

| Variable        | Where                  | Purpose                                     |
| --------------- | ---------------------- | ------------------------------------------- |
| `GROQ_API_KEY`  | `.env.local`, Vercel   | Auth for Groq chat completions              |
| `GROQ_MODEL`    | `.env.local`, Vercel   | Override the default model                  |
| `NEXT_PUBLIC_SITE_URL` | Vercel          | Used by sitemap/OG metadata (e.g. https://…)|

`.env.local` is in `.gitignore`. Never commit it.

## Appendix B — Troubleshooting

- **`GROQ_API_KEY` undefined in production:** you pasted it in the wrong Vercel env (Production vs Preview). Add it to all three environments.
- **Chatbot returns empty string:** check model name; Groq deprecates models occasionally. Fall back to `llama-3.1-8b-instant`.
- **Hydration warning:** almost always a client-only value rendered on the server (e.g. `Date.now()`). Wrap in a `useEffect` or dynamic import.
- **Build fails on Vercel but not locally:** Vercel uses the exact Node version in `package.json engines`. Pin it (`"engines": { "node": ">=20" }`).

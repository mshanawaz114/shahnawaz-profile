# CLAUDE.md

This file gives Claude (and any AI assistant) the context it needs to be productive in this repo on every future session.

---

## Project Snapshot

**shahnawaz-profile** is a personal portfolio website for Shahnawaz Mohammed with an AI chatbot ("Ask Shahnawaz") that answers questions about his background, grounded in his resume.

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **LLM:** Groq API (Llama 3.1 models, free tier)
- **Host:** Vercel (free) with GitHub as source of truth
- **Repo name on GitHub:** `shahnawaz-profile`

The chatbot must never leak the Groq API key. The key lives only in server-side env vars (`GROQ_API_KEY`) and is read only inside `app/api/chat/route.ts`.

---

## Working Conventions

### Code style

- **TypeScript strict mode** — no `any` unless annotated with a TODO and reason.
- **Functional React components** only. No class components.
- **Server Components by default**, use `"use client"` only where required (chat widget, theme toggle, anything with `useState`/`useEffect`).
- Prefer small files. If a component exceeds ~200 lines, split it.
- Co-locate component-specific tests, styles, and types next to the component.

### Naming

- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utilities: `camelCase.ts`
- Content files: `kebab-case.md` / `kebab-case.json`

### Folders (authoritative)

```
app/              routes + api
components/
  sections/       landing-page sections (Hero, About, Experience, Projects, Contact)
  chatbot/        ChatWidget, ChatMessage, ChatInput, useChat
  ui/             shadcn primitives
content/          resume.md, resume.json, projects.json (editable source of truth)
lib/              groq.ts, prompt.ts, helpers
public/           static assets, resume.pdf, og image
```

### Git & commits

- Default branch: `main`
- Commit style: **conventional commits** (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `style:`, `test:`).
- One logical change per commit. Small PRs preferred.
- Never commit `.env.local`, `.env*.local`, or anything under `node_modules/`.

### Chatbot guardrails (important)

When editing anything chatbot-related, preserve these rules:

1. The system prompt **must** include the resume content (from `content/resume.md` or `content/resume.json`) so answers stay grounded.
2. The chatbot is only allowed to talk about **Shahnawaz's professional background, skills, projects, and things tangentially related**. Off-topic requests should be politely redirected.
3. The chatbot must **never invent** credentials, employers, dates, or certifications. If something isn't in the resume, say "I don't have that information in my resume."
4. Strip any user input that looks like a prompt-injection attempt ("ignore previous instructions", etc.) — at minimum, keep the system message first and enforce it in code.
5. Rate-limit the `/api/chat` route (IP-based, e.g. 20 requests / 10 min) to avoid abuse.
6. The Groq model should be configurable via `GROQ_MODEL` env var (default: `llama-3.1-8b-instant` for speed, or `llama-3.1-70b-versatile` for quality).

### Accessibility

- All interactive elements must be keyboard-navigable.
- Chatbot widget must trap focus when open and restore it on close.
- Color contrast must pass WCAG AA in both light and dark themes.
- All images need `alt` text.

### Performance

- Target Lighthouse Performance ≥ 95 on desktop, ≥ 90 on mobile.
- Use `next/image` for all images.
- Don't ship the resume PDF inline into JS — link to `/resume.pdf` statically.
- Chat widget is lazy-loaded (`dynamic(() => import(...), { ssr: false })`).

---

## Commands Claude Should Know

```bash
# Install
npm install

# Dev server
npm run dev

# Type-check + lint (run before committing)
npm run typecheck
npm run lint

# Production build (must succeed before pushing to main)
npm run build

# Run the chatbot locally — needs .env.local with GROQ_API_KEY
```

---

## When Adding a New Section to the Portfolio

1. Create `components/sections/<Name>.tsx` (Server Component if possible).
2. Import and render it inside `app/page.tsx` in the chosen order.
3. If it needs data, add a JSON file under `content/` — never hardcode long content in JSX.
4. Update `content/resume.md` if the information should also feed the chatbot.

## When Updating the Resume

The resume is the single source of truth for the chatbot. To update:

1. Replace `public/resume.pdf` with the new version.
2. Regenerate `content/resume.md` (extract text from the PDF, clean it up).
3. Regenerate `content/resume.json` (structured view used for rendering and prompting).
4. Verify the chatbot by asking: "What is your most recent role?" and "What are your top skills?"

---

## Things To NOT Do

- Do **not** expose `GROQ_API_KEY` to the client. It must only be referenced inside `app/api/chat/route.ts`.
- Do **not** add analytics that require cookies without a consent banner.
- Do **not** introduce a heavy state-management library (Redux, Zustand) — React state + server components is enough.
- Do **not** hardcode Shahnawaz's email into the repo in plain text (use an obfuscation helper or a contact form route).
- Do **not** add a database yet. Current scope is stateless.

---

## Current Status

See `INSTRUCTIONS.md` for the 5-phase build plan and check off phases as they ship.

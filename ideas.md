# Ideas & Brainstorm

A running list of ideas, trade-offs, and stretch goals for `shahnawaz-profile`. Not all of these should ship — they're a menu.

---

## Core differentiators (things that make this portfolio stand out)

1. **The chatbot itself is the demo.** Most portfolios say "I can build AI features." This one *is* one. Lead with it.
2. **"Ask me anything" CTA in the hero.** The primary call-to-action isn't "View résumé" — it's "Ask me anything," which immediately opens the chatbot. That's memorable.
3. **Prompt suggestions tailored to recruiters.** "Are you open to remote roles?", "What's your salary band?", "Can you lead a team?" — the chatbot handles the first-round screener for you.
4. **Resume as source of truth.** One file updates both the rendered page *and* the chatbot — no drift.
5. **Printable résumé mode.** A nicely-styled `@media print` stylesheet so the site itself can be saved as a PDF résumé.

---

## Chatbot feature ideas

### Must-have (Phase 3)

- Floating widget, open/close, message history during the session
- Grounded in `content/resume.json`
- Rate-limited, injection-resistant
- Suggested starter prompts

### Nice to have

- **Voice input** — use the browser's `SpeechRecognition` API for a mic button. No extra cost.
- **Voice output** — ElevenLabs has a free tier, or use the built-in `speechSynthesis`. Toggle on/off.
- **Message streaming** — stream tokens from Groq for the "typing" feel. Much nicer UX than waiting for the full reply.
- **Cite sources** — when answering, append "(from: Experience → Company X)" so answers feel verifiable.
- **Copy answer** button on each assistant message.
- **Share conversation** — generate a URL that replays the conversation (serverless, no DB: encode the messages in the URL).
- **Export as résumé** — "Generate a résumé tailored to a backend role" → LLM re-writes the résumé for that context, downloadable as PDF.
- **Language switcher** — answer in Hindi/Urdu/Spanish/etc. if the user asks.

### Stretch / fun

- **"Interview me" mode** — the chatbot asks *me* interview questions and grades my answers. Could be a separate `/interview` route.
- **Match to JD** — user pastes a job description, chatbot scores fit and drafts a cover-letter opener.
- **Project deep-dive** — clicking a project card opens chat pre-loaded with "Tell me about <project>".

---

## Portfolio UX ideas

- **Timeline experience view** — interactive scrub bar to scroll through roles.
- **Skills bar chart or radar** — visual instead of chips. Use Recharts.
- **Now page** — `shahnawaz.dev/now` with what I'm currently building / learning. Easy to keep fresh.
- **Uses page** — gear, editor setup, browser extensions. Popular on dev portfolios and great for SEO.
- **Blog** — even two or three posts signal seriousness. MDX with Next.js is easy.
- **Testimonials carousel** — 2–3 quotes from past managers/collaborators.
- **Lab section** — experiments and half-finished things. Shows curiosity.
- **3D hero object** — a subtle Three.js shape orbiting behind the name. Use only if it doesn't tank Lighthouse.
- **Dark-mode that's actually different** — not just inverted colors; different accent palette, different font weights.
- **Keyboard shortcuts** — `?` opens help, `g h` goes home, `c` opens chat. `kbar` library is nice.

---

## Content ideas

- **"How this site works" sub-page** — explain the stack, embed a diagram. Demonstrates ability to explain systems.
- **"Case study" posts** for 1–2 flagship projects: problem, constraints, decisions, outcome. These carry a portfolio.
- **Downloadable "one-pager" PDF résumé** in addition to the standard one.
- **Reading list** — books/papers that shaped how I work.

---

## Engineering / infra ideas

- **Dependabot** for keeping dependencies fresh.
- **GitHub Actions** for CI: typecheck, lint, build on PRs.
- **Semantic-release** for auto-versioned commits (overkill for a portfolio, but fun).
- **E2E smoke test** with Playwright that runs `/api/chat` against a mocked Groq.
- **Sentry** (free tier) for error tracking once there's real traffic.
- **Cloudflare in front of Vercel** for DDoS / caching if the chatbot gets popular.

---

## Cost-avoidance strategy

Stay 100% free as long as possible:

| Service     | Free tier covers                                   |
| ----------- | -------------------------------------------------- |
| Vercel Hobby| 100 GB bandwidth/mo, unlimited sites, serverless   |
| Groq        | Generous free tier with Llama 3.1 models           |
| GitHub      | Public repos + Actions + Pages                     |
| Plausible   | Not free, but privacy-friendly; use Vercel Analytics free tier instead |
| Resend      | 100 emails/day free (if you add a contact form)    |

Triggers for moving off free tier:
- Chatbot gets > a few hundred convos/day → buy Groq credits or switch to self-hosted Ollama behind Cloudflare.
- Bandwidth > 100 GB/mo → move static assets to Cloudflare R2 (10 GB free) or switch to Cloudflare Pages.

---

## Things I explicitly will NOT do (scope guard)

- No user accounts, login, or DB. The chatbot is stateless.
- No CMS (Contentful, Sanity). Markdown/JSON in the repo is enough.
- No multi-page SPA gymnastics. Single long scrollable page + a few static sub-pages.
- No crypto wallet connect, NFT, or web3. Not on-brand.
- No "hire me" button that opens an in-app calendar. Email is fine.

---

## Open questions to answer before Phase 2

- What colors / fonts? (Suggestion: dark palette with a single vibrant accent — cyan, lime, or orange.)
- Is there a photo I want to use in the hero? If yes, needs to be a high-res PNG/WebP with a clean background.
- What's the elevator pitch I want to show in the hero? (Draft: *"Software engineer who ships reliable systems and tasteful interfaces."*)
- Do I have a personal logo / monogram? If not, a clean wordmark works.
- What's my primary CTA — "Ask me anything" (chatbot) or "See my work" (projects)? (Recommendation: chatbot.)

---

## Success metrics

Small portfolio, small metrics. Still worth tracking:

- Time to first meaningful paint < 1.5s
- At least 10 chat conversations in the first month (tracks if the CTA is doing its job)
- Zero unhandled errors in Sentry
- At least 2 inbound messages from the contact form or chatbot in the first 90 days

# shahnawaz-profile

A personal portfolio website with a built-in AI chatbot that answers questions about me, my experience, and my work — trained on my resume.

## Live Demo

> Coming soon — will be deployed to Vercel (free tier) and optionally mirrored to GitHub Pages.

## Stack at a Glance

| Layer          | Choice                                     | Why                                               |
| -------------- | ------------------------------------------ | ------------------------------------------------- |
| Framework      | **Next.js 14 (App Router) + TypeScript**   | SSR + API routes in one repo, great DX, free host |
| Styling        | **Tailwind CSS + shadcn/ui**               | Modern, fast to theme, copy-paste components      |
| Chatbot LLM    | **Groq API (Llama 3.1 70B / 8B)**          | Free tier, very fast inference                    |
| Chatbot UI     | Custom floating widget (React + Framer)    | Full control over look & feel                     |
| Resume Context | Markdown + JSON extracted from PDF         | Easy to edit, diffable, LLM-friendly              |
| Hosting        | **Vercel** (primary) + GitHub Pages mirror | Free, git-based, has serverless for the chatbot   |
| Analytics      | Vercel Web Analytics or Plausible          | Privacy-friendly, free                            |

## Features

- Responsive portfolio (hero, about, skills, experience, projects, contact)
- Dark / light mode with system preference detection
- AI chatbot ("Ask Shahnawaz") grounded in resume content
- SEO + Open Graph metadata + sitemap
- Fully git-versioned with GitHub Actions for CI
- Free hosting, free chatbot, free analytics

## Project Structure (target)

```text
shahnawaz-profile/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx            # Landing page
│   └── api/
│       └── chat/
│           └── route.ts    # Serverless chatbot endpoint (Groq)
├── components/
│   ├── sections/           # Hero, About, Experience, Projects, Contact
│   ├── chatbot/            # ChatWidget, ChatMessage, ChatInput
│   └── ui/                 # shadcn/ui primitives
├── content/
│   ├── resume.md           # Canonical resume in markdown (from PDF)
│   ├── resume.json         # Structured copy for the chatbot system prompt
│   └── projects.json       # Portfolio project data
├── public/
│   ├── resume.pdf          # Original resume (linkable)
│   └── og-image.png
├── lib/
│   ├── groq.ts             # Groq client wrapper
│   └── prompt.ts           # Builds the system prompt from resume context
├── styles/
│   └── globals.css
├── .env.local.example      # GROQ_API_KEY=...
├── .gitignore
├── CLAUDE.md               # Instructions for Claude when editing this repo
├── INSTRUCTIONS.md         # The 5-phase build plan
├── ideas.md                # Brainstorm of features, ideas, stretch goals
├── README.md
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Quick Start — Run it locally

```bash
# 1. from your home terminal
cd ~/Documents/shahnawaz-profile

# 2. install dependencies (first run takes ~1 minute)
npm install

# 3. get a free Groq API key at https://console.groq.com/keys
#    then create your local env file:
cp .env.local.example .env.local
#    edit .env.local and paste your key after GROQ_API_KEY=

# 4. start the dev server
npm run dev
```

Open **http://localhost:3000** in your browser.

The portfolio renders immediately. The chatbot works as soon as `GROQ_API_KEY` is set in `.env.local` — click the bottom-right chat bubble or the "Ask me anything" button.

> **Node version:** this project requires Node 20 or newer. Check with `node -v`. If needed, install from <https://nodejs.org> or `brew install node@20`.

## Deployment

The site is git-deployed: every push to `main` automatically builds and ships to Vercel.

```bash
git push origin main   # → auto-deploys
```

Environment variables (set in Vercel dashboard → Project → Settings → Environment Variables):

- `GROQ_API_KEY` — your Groq API key (keep secret, never commit)

## Documentation Index

- **[INSTRUCTIONS.md](./INSTRUCTIONS.md)** — step-by-step 5-phase build guide (start here)
- **[CLAUDE.md](./CLAUDE.md)** — conventions for Claude when editing this repo
- **[ideas.md](./ideas.md)** — feature brainstorm, future ideas, stretch goals

## License

MIT — feel free to fork and remix for your own portfolio.

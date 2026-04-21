# Initial Claude Code Prompt
**Instructions:** Copy everything below the `---` line and paste it as your first message to Claude Code inside your `portafolio-jesus` project folder.

---

You are my pair-programmer for building my personal portfolio website. I have already placed three key files in this project directory for you:

1. **`CLAUDE.md`** — the persistent project context with tech stack, design system, color palette, content sections, copy, and build order. Read this first and treat it as the source of truth.
2. **`JesusETCV.pdf`** — my CV. Cross-reference against `CLAUDE.md` if anything is unclear.
3. **`profile-photo.jpg`** — my professional photo for the Hero section (if missing, I'll add it manually before you wire up the Hero).

## Your task

Execute the full build in `CLAUDE.md` Section 11 ("Build Order"). Specifically:

1. Scaffold a Vite + React 18 project in `/client`.
2. Install Tailwind CSS v3, configure dark mode via `class` strategy, and wire up the exact color palette in Section 3.1 of `CLAUDE.md`.
3. Install and set up: `react-router-dom`, `framer-motion`, `lucide-react`, `@fontsource/inter`, `@fontsource/jetbrains-mono`.
4. Create the Theme context + toggle (default light, persisted in `localStorage`, respects `prefers-color-scheme` on first load).
5. Build every component listed in Section 4, in order — Navbar, Hero, About, Experience, Projects, Education, Skills, Leadership, Contact, Footer.
6. Put **all CV content** into `src/data/portfolio.js` as a structured JS object. Components read from this file — no hardcoded copy.
7. Copy `profile-photo.jpg` and `JesusETCV.pdf` into `client/public/` so they're served statically.
8. Set up `/api/contact` as a Vercel serverless function using **Resend** (preferred) or Nodemailer. It should POST Name/Email/Message to my email `jespinoza2511@hotmail.com`. Use environment variables — do not hardcode secrets.
9. Add a `vercel.json` at the repo root with proper routing.
10. Write a concise `README.md` covering local dev and deployment.
11. Ensure it hits the quality bar in Section 9 (Lighthouse ≥ 95, mobile-first, a11y, SEO).

## Working style I want from you

- **Plan before writing code.** Give me a short, numbered plan of the next 3–5 steps you're about to take before you start running commands.
- **Ask me only when blocked.** If something is ambiguous (like my GitHub username, which I haven't confirmed), ask once, then proceed. Use `https://github.com/` as a placeholder link if I don't answer immediately.
- **Small commits.** After each major milestone (scaffold, theme, each section), make a git commit with a clear message.
- **Test as you go.** After building each section, run `npm run dev` to verify it renders. Screenshot-describe what you see if possible.
- **No placeholder content.** Every section must pull from my real CV data.
- **No scope creep.** Don't add TypeScript, a CMS, a blog, or i18n unless I ask.

## Start here

Begin by:
1. Reading `CLAUDE.md` end to end.
2. Reading `JesusETCV.pdf` to confirm you have all the content you need.
3. Printing a concise plan of your first 5 steps.
4. Waiting for me to say "go" before running any shell commands.

Ready when you are.

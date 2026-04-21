# Jesus Espinoza — Portfolio

Personal portfolio for Jesus Espinoza, Full-Stack Developer and Computer Software Engineering student at Tec de Monterrey (ITESM).

Live site: _deploy on Vercel to publish at `jesusespinoza.vercel.app` (or a custom domain)._

---

## Stack

- **Frontend:** React 18 + Vite, Tailwind CSS v3, Framer Motion, lucide-react
- **Backend:** Vercel Serverless Function (`/api/contact`) + [Resend](https://resend.com) for email delivery
- **Fonts:** Inter, JetBrains Mono (via `@fontsource`)
- **Hosting:** Vercel (static client + serverless API)

---

## Project layout

```
portafolio-jesus/
├── api/
│   └── contact.js              # Vercel serverless function
├── client/
│   ├── public/                 # static assets (photo, CV, robots, sitemap)
│   └── src/
│       ├── components/         # Navbar, Hero, About, Experience, Projects, ...
│       ├── context/            # ThemeContext (light/dark)
│       ├── data/portfolio.js   # all CV content as structured data
│       ├── App.jsx
│       └── main.jsx
├── vercel.json
├── package.json                # root (serverless deps)
└── CLAUDE.md                   # project spec / source of truth
```

All content flows from `client/src/data/portfolio.js` — components never hardcode copy.

---

## Local development

Install dependencies for both root (serverless) and client:

```bash
npm run install:all
```

Run the Vite dev server:

```bash
npm run dev
```

The client runs at http://localhost:5173. The contact form posts to `/api/contact`, which is proxied to `http://localhost:3000` in dev — use `vercel dev` from the repo root for a full local backend:

```bash
npx vercel dev
```

### Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable           | Purpose                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| `RESEND_API_KEY`   | API key from [resend.com](https://resend.com).                          |
| `CONTACT_EMAIL`    | Destination inbox (defaults to `jespinoza2511@hotmail.com`).            |
| `CONTACT_FROM`     | Verified sender (e.g. `Portfolio <hello@your-domain.dev>`).             |

---

## Build

```bash
npm run build           # produces client/dist/
npm run preview         # previews the production build locally
```

---

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import into Vercel — it picks up `vercel.json` automatically.
3. Add the three environment variables above in **Settings → Environment Variables**.
4. Deploy. The API route `/api/contact` is wired automatically from `api/contact.js`.

The `vercel.json` already configures:

- Build command: `npm --prefix client run build`
- Output directory: `client/dist`
- Long-lived cache headers for hashed assets and static media

---

## Quality checklist

- Lighthouse ≥ 95 (Performance, Accessibility, Best Practices, SEO)
- Mobile-first, tested at 375 / 768 / 1024 / 1440 px
- Semantic HTML (`<main>`, `<section>`, proper heading order)
- WCAG AA color contrast, keyboard-navigable, ARIA on icon-only controls
- Open Graph + Twitter meta tags, `robots.txt`, `sitemap.xml`, themed favicon

---

## Scripts

| Script                | What it does                           |
| --------------------- | -------------------------------------- |
| `npm run dev`         | Start Vite dev server                  |
| `npm run build`       | Production build of the client         |
| `npm run preview`     | Preview the built client locally       |
| `npm run install:all` | Install root + client dependencies     |

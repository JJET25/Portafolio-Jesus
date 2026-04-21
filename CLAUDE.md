# Portfolio Project — Claude Code Context

> This file is auto-loaded by Claude Code at the start of every session.
> It is the persistent source of truth for this project.

---

## 1. Project Overview

Build a personal portfolio website for **Jesus Espinoza** — a Computer Software Engineering student at Tecnológico de Monterrey (ITESM) and Full-Stack Developer based in Mexico City. The site must be **dynamic, minimalistic, and modern**, and must accurately reflect every element of his CV (`JesusETCV.pdf` in this folder).

**Primary goal:** a polished, deployable portfolio that lives at a custom URL (e.g., `jesusespinoza.dev` or `jesusespinoza.vercel.app`) and serves as his professional landing page for recruiters and collaborators.

---

## 2. Tech Stack (Locked)

| Layer | Choice |
|---|---|
| Frontend | **React 18** (via Vite — fast, minimal config) |
| Routing | **React Router v6** (single-page with smooth-scroll anchors + optional `/projects/:slug` routes) |
| Styling | **Tailwind CSS v3** + CSS variables for theming |
| Animations | **Framer Motion** (scroll reveals, hero transitions) |
| Icons | **lucide-react** |
| Backend | **Node.js + Express** (for contact form `/api/contact`) |
| Email | **Nodemailer** with Gmail SMTP, or **Resend** (cleaner API, free tier) |
| Hosting | **Vercel** (frontend static + serverless API routes) |
| Version control | Git + GitHub |

Do **not** add Redux, Next.js, TypeScript, or a database unless explicitly requested. Keep the stack lean.

---

## 3. Design System

### 3.1 Color Palette

**Light Mode:**
- Background primary: `#FFFFFF` (pure white)
- Background secondary: `#F8FAFC` (soft off-white for cards)
- Accent: `#7DD3FC` (light blue — Tailwind `sky-300`) with hover `#38BDF8` (`sky-400`)
- Text primary: `#0F172A` (slate-900)
- Text secondary: `#475569` (slate-600)
- Border: `#E2E8F0` (slate-200)

**Dark Mode:**
- Background primary: `#000000` (pure black)
- Background secondary: `#0A0A0A` (card layer)
- Accent: `#7DD3FC` (same light blue — unifies brand)
- Text primary: `#F8FAFC` (slate-50)
- Text secondary: `#94A3B8` (slate-400)
- Border: `#1E293B` (slate-800)

### 3.2 Typography
- Headings: **Inter** (700 / 800 weights)
- Body: **Inter** (400 / 500)
- Code / accents: **JetBrains Mono** (for skill tags, project tech stacks)
- All loaded via `@fontsource/inter` and `@fontsource/jetbrains-mono` npm packages.

### 3.3 Spacing & Layout
- Max content width: `max-w-6xl` (1152px), centered
- Section vertical padding: `py-20 md:py-28`
- Section horizontal padding: `px-6 md:px-8`
- Rounded corners: `rounded-2xl` for cards, `rounded-full` for pills

### 3.4 Motion
- Scroll reveal: fade-up 20px, 0.5s ease-out, once
- Hero photo: subtle float animation (y: ±6px, 4s loop)
- Hover states: `transition-all duration-200 ease-out`, `hover:-translate-y-1`

### 3.5 Theme Toggle
- Defaults to **light mode**
- Toggle button top-right of navbar (sun/moon icon from lucide)
- Persist preference in `localStorage` under key `theme`
- Respects `prefers-color-scheme` on first visit

---

## 4. Required Sections (in order)

### 4.1 Navbar (sticky)
- Left: "JE" monogram or full "Jesus Espinoza"
- Center: `About · Experience · Projects · Skills · Contact` (smooth scroll)
- Right: Theme toggle + optional EN/ES language toggle
- Mobile: hamburger drawer

### 4.2 Hero
- Left column (text):
  - H1: `Jesus Espinoza`
  - Subtitle: `Full-Stack Developer & Computer Software Engineer`
  - Tagline: 1-sentence pitch (see Section 5)
  - Primary CTA button: `View Projects` (scrolls to Projects)
  - Secondary CTA: `Download CV` (serves `/JesusETCV.pdf` from public)
  - Social icons row: LinkedIn, GitHub, Email (from Section 6)
- Right column: profile photo (`/profile-photo.jpg`), circular crop, soft light-blue ring glow
- Fully responsive: stacks vertically on mobile with photo on top

### 4.3 About
- Short bio paragraph (see Section 5)
- Stats row: `GPA 96/100 · IB Grade 32 · 3 Languages · 2 Years Full-Stack`
- Languages with proficiency bars:
  - Spanish: Native (100%)
  - English: C1 (85%)
  - German: B1 (55%)

### 4.4 Experience (vertical timeline)
Two entries from CV:

**Gummy Blast** — Full Stack Developer (2025 – Present, Mexico City)
- Architected and deployed a full-stack e-commerce platform using React, Node.js, and PostgreSQL
- Integrated Stripe API for secure, high-volume nationwide transactions across Mexico
- Engineered a mobile-first UI/UX, increasing user engagement via responsive design
- Developed an automated inventory management system reducing stock discrepancies by 40%

**Soluciones Integrales Lauti SA de CV** — Business Analyst (2023 – 2024, Mexico City)
- Contributed to an internal research project evaluating strategic focus with business analysis tools
- Achieved positive outcome indicating 50% profitability improvement potential
- Conducted in-depth data analysis supporting data-driven decision-making

Visual: alternating left/right cards along a central vertical line, with date pills.

### 4.5 Projects (grid gallery)
Card grid (2 cols desktop, 1 col mobile). Each card: tech-stack pills, title, 2-line description, "View details →" link. Clicking opens a modal or dedicated `/projects/:slug` route with the full description.

**Projects from CV:**

1. **Gummy Blast** (2025) — `JavaScript, Node.js, HTML, CSS, React, PostgreSQL`
   - Scaled a local brick-and-mortar business into a national digital brand (0 → 250+ monthly orders, 4.9/5.0 CSAT).
   - Built custom real-time inventory sync engine with 99.9% data consistency.
   - Integrated Stripe with automated webhooks for order status.

2. **IoT Plant Monitor (AgroSense)** (2024) — `ESP32, Arduino, MQTT, React, Node.js`
   - End-to-end IoT environmental monitoring; bridged hardware sensors with cloud analytics.
   - MQTT-based real-time telemetry, 99.9% uptime.
   - Low-power firmware with deep-sleep cycles.
   - Dashboard reduced plant mortality by 80%.

3. **Machine Learning Movie Rating Predictor** (2024) — `Python, Google Colab, Pandas, scikit-learn`
   - Predictive model using linear regression and Random Forest.
   - Comprehensive database analysis and preprocessing with Pandas.

4. **Vertical Wordle** (2024) — `JavaScript, Node.js, React, HTML, CSS`
   - Full-stack vertical variant of Wordle.
   - Dynamic React front-end + Node.js REST API for game logic.

5. **Product Management Website** (2024) — `JavaScript, Node.js, HTML, CSS, React`
   - Responsive CRUD web app with dark/light mode.
   - Adaptive across all screen resolutions.

Card hover: subtle lift (`-translate-y-1`) + accent glow.

### 4.6 Education
Two cards:
- **Tec de Monterrey (ITESM)** — BEng Computer Software | GPA 96/100 | 2024 – Present
  - Coursework: OOP (Python & C++), Data Structures & Algorithms, Software Engineering, Web Development, Machine Learning, Data Analytics Bootcamp, Database Systems, Statistics.
- **Tec de Monterrey (ITESM)** — International Baccalaureate | GPA 96/100 | IB Grade 32 | 2021 – 2024
  - Subjects: Physics, Mathematics, Economics, Business & Management, German, Literature.

### 4.7 Skills
Three categories as pill groups:
- **Technical:** Python, C++, JavaScript, React, Node.js, PostgreSQL, HTML, CSS, MATLAB, Git
- **Concepts:** Object-Oriented Programming, Algorithm Design, Data Structures, Complexity Analysis, Relational Databases
- **Personal:** Analytical Thinking, Adaptability, Teamwork, Communication, Problem Solving
- **Tools:** VS Code, PyCharm, Git

### 4.8 Leadership
Three cards, each with icon + title + 2-line description:
- **Volunteer Program for Children with Down Syndrome** — Led a team of volunteers to organize creative activities and foster a supportive environment.
- **Student Marketplace App** — Managed end-to-end development with a team of developers and designers, overseeing full project lifecycle.
- **Community Housing Initiative** — Planned and executed home construction for low-income communities; managed volunteer coordination, resources, and logistics.

### 4.9 Contact
- Short invite paragraph: "Let's build something together."
- Form fields: Name, Email, Message → POST to `/api/contact`
- Backend sends email to `jespinoza2511@hotmail.com` via Nodemailer/Resend
- Success/error toast states
- Below form: social icons (LinkedIn, GitHub, Email), phone `(52) 55 4384 1591`, location `Mexico City, Mexico`

### 4.10 Footer
- Monogram + `© 2026 Jesus Espinoza. Built with React, Tailwind, and Node.js.`
- Small `Back to top ↑` link

---

## 5. Key Copy (use verbatim)

**Hero tagline:**
> "Computer Software Engineer building scalable full-stack experiences — from real-time e-commerce platforms to IoT-driven dashboards."

**About paragraph:**
> "I'm a Computer Software Engineering student at Tec de Monterrey (GPA 96/100) and Full-Stack Developer based in Mexico City. I architect production-grade applications that solve real business problems — from a nationwide e-commerce platform processing 250+ monthly orders, to IoT systems that reduced plant mortality by 80%. I care about clean code, quantifiable impact, and shipping work that matters."

---

## 6. Contact & Social Links

- **Email:** jespinoza2511@hotmail.com
- **LinkedIn:** https://linkedin.com/in/jesus-espinoza-torruco
- **GitHub:** https://github.com/ *(username pending — ask Jesus to confirm)*
- **Phone:** (52) 55 4384 1591
- **Location:** Mexico City, Mexico

---

## 7. Project Structure (target)

```
portafolio-jesus/
├── client/                    # React + Vite front-end
│   ├── public/
│   │   ├── profile-photo.jpg
│   │   └── JesusETCV.pdf
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Leadership.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── context/ThemeContext.jsx
│   │   ├── data/portfolio.js  # all content as structured data
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/                    # Express backend
│   ├── api/contact.js         # Vercel serverless function
│   ├── index.js               # local dev server
│   └── package.json
├── vercel.json
├── .gitignore
├── README.md
├── CLAUDE.md                  # this file
└── JesusETCV.pdf
```

---

## 8. Deployment Requirements

- Primary target: **Vercel**
- Frontend: static build from `client/dist`
- Backend: `/api/contact` as a Vercel serverless function (in `api/` at repo root)
- Environment variables required in Vercel dashboard:
  - `RESEND_API_KEY` (or `SMTP_USER` + `SMTP_PASS` if using Nodemailer/Gmail)
  - `CONTACT_EMAIL=jespinoza2511@hotmail.com`
- Configure `vercel.json` with appropriate routing and headers (cache-control for static assets).

---

## 9. Quality Bar

- **Lighthouse score ≥ 95** on Performance, Accessibility, Best Practices, SEO
- **Mobile-first**, tested at 375px, 768px, 1024px, 1440px breakpoints
- **Semantic HTML** (`<main>`, `<section>`, `<article>`, proper heading hierarchy)
- **A11y:** all images have alt text, all interactive elements keyboard-navigable, ARIA labels on icon-only buttons, color contrast WCAG AA
- **SEO:** meta tags, Open Graph image (Jesus's photo), favicon, `sitemap.xml`, `robots.txt`
- **Performance:** lazy-load images, Vite code-splitting, no unused Tailwind classes in production build

---

## 10. Constraints & Conventions

- **Content is data-driven:** all CV content lives in `src/data/portfolio.js` — never hardcode in components
- **Bilingual-ready:** structure data so EN/ES can be added later (nested keys per language), but ship English-only for v1 unless Jesus requests otherwise
- **No placeholder lorem ipsum** — everything must be real CV content
- **No icon libraries other than lucide-react**
- **No CSS-in-JS** — Tailwind utilities only, plus `@apply` in `index.css` for repeated patterns

---

## 11. Build Order (when Claude Code starts)

1. Scaffold Vite + React + Tailwind in `/client`
2. Install dependencies (react-router-dom, framer-motion, lucide-react, @fontsource/inter, @fontsource/jetbrains-mono)
3. Set up Tailwind config with custom colors + dark mode class strategy
4. Build `ThemeContext` and `ThemeToggle`
5. Build all components in the order listed in Section 4
6. Populate `src/data/portfolio.js` with CV content
7. Set up `/api/contact` serverless function
8. Add `vercel.json`
9. Write a clean `README.md`
10. Run a local build to verify, then commit

Do **not** skip the data file — it is critical for maintainability.

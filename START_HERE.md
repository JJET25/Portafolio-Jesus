# Portfolio Project — Setup & Handoff Guide
**For:** Jesus Espinoza
**Stack:** React + Node.js/Express + Tailwind CSS
**Tooling:** VS Code + Claude Code CLI
**Deployment:** Vercel (free) + optional `.dev` domain

---

## 0. What's in This Folder

| File | Purpose |
|---|---|
| `START_HERE.md` | This guide — read first |
| `CLAUDE.md` | Persistent project context Claude Code auto-loads every session |
| `INITIAL_PROMPT.md` | The exact message to paste into Claude Code to kick off the build |
| `JesusETCV.pdf` | Your CV (source of truth for content) |
| `profile-photo.jpg` | **You must save your photo here manually** — see Step 3 |

---

## 1. One-Time Setup (~10 minutes)

### 1.1 Install prerequisites
If you don't have them already:

```bash
# Node.js (v20 LTS or newer) — check with:
node --version

# If missing, install from https://nodejs.org  (pick LTS)

# Git — check with:
git --version
```

### 1.2 Install Claude Code CLI
```bash
npm install -g @anthropic-ai/claude-code
```

Then authenticate:
```bash
claude
```
It will open a browser to sign in with your Anthropic account. Follow the prompts.

### 1.3 VS Code extensions (recommended)
Open VS Code → Extensions → install:
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Prettier — Code formatter**
- **GitHub Pull Requests**
- **Claude Code** (official — gives you in-editor integration)

---

## 2. Create Your Project Folder

In your terminal:

```bash
# Choose where to put it (example: Documents)
cd ~/Documents
mkdir portafolio-jesus
cd portafolio-jesus
```

Then copy these three files from THIS folder (`Portafolio Jesus`) into `portafolio-jesus`:
- `CLAUDE.md`
- `INITIAL_PROMPT.md`
- `JesusETCV.pdf`

Open the folder in VS Code:
```bash
code .
```

---

## 3. Save Your Professional Photo

The photo you uploaded in Cowork isn't auto-saved to a file. Do this:

1. Right-click the photo you sent in the Cowork chat → **Save image as…**
2. Save it into your `portafolio-jesus` folder as **`profile-photo.jpg`**
3. Later, Claude Code will move it to the correct `public/` or `src/assets/` location.

---

## 4. Initialize Git + Open Claude Code

Inside `portafolio-jesus/`:

```bash
git init
git branch -M main
claude
```

You're now in a Claude Code session, inside your project folder.

---

## 5. Kick Off the Build

Open `INITIAL_PROMPT.md`, copy the entire content, and paste it as your **first message** to Claude Code.

Claude Code will:
1. Read `CLAUDE.md` automatically for project context
2. Scaffold the folder structure (client/React + server/Express)
3. Install dependencies
4. Build all sections (Hero, About, Experience, Projects, Skills, Leadership, Contact)
5. Wire up the light/dark mode toggle
6. Set up the contact form backend
7. Prepare the Vercel deployment config

Approve file edits as they come. Claude Code will ask before running destructive commands.

---

## 6. Run the App Locally

After Claude finishes scaffolding:

```bash
# Install all dependencies (if not done)
npm install

# Start the dev server
npm run dev
```

Open http://localhost:5173 (Vite default) or http://localhost:3000 (Next.js default) — Claude will tell you which.

---

## 7. Deploy to Vercel (Free)

### 7.1 Push to GitHub
```bash
git add .
git commit -m "Initial portfolio build"
# Create a new repo on github.com (e.g., "portafolio-jesus"), then:
git remote add origin https://github.com/<your-username>/portafolio-jesus.git
git push -u origin main
```

### 7.2 Deploy on Vercel
1. Go to https://vercel.com → sign in with GitHub
2. Click **Add New → Project**
3. Select your `portafolio-jesus` repo
4. Vercel auto-detects React/Vite → click **Deploy**
5. Done. You get a free URL like `portafolio-jesus.vercel.app`

### 7.3 Custom domain (optional, ~$12/year)
- Buy `jesusespinoza.dev` at https://www.namecheap.com or https://domains.cloudflare.com
- In Vercel → Project → Settings → Domains → Add `jesusespinoza.dev`
- Follow Vercel's DNS instructions (copy the CNAME/A records to your registrar)
- HTTPS auto-provisioned in ~2 minutes

---

## 8. Ongoing Workflow with Claude Code

Any time you want to change something:

```bash
cd ~/Documents/portafolio-jesus
claude
```

Then just describe what you want — examples:
- *"Add a new project called 'X' to the Projects section using the Gummy Blast card format"*
- *"The Hero photo is too large on mobile — fix the responsive sizing"*
- *"Add a Spanish/English language toggle"*
- *"Deploy the latest changes"* (Claude will run `git push` and Vercel auto-redeploys)

---

## 9. Quick Troubleshooting

| Problem | Fix |
|---|---|
| `claude: command not found` | Reinstall: `npm install -g @anthropic-ai/claude-code` |
| Port 5173 already in use | `npx kill-port 5173` or change port in `vite.config.js` |
| Vercel build fails | Check the build log — usually a missing env var or bad import path. Paste the error into Claude Code. |
| Photo doesn't show | Make sure it's in `public/profile-photo.jpg` and the `<img src>` uses `/profile-photo.jpg` |

---

## 10. Recommended Next Steps (after MVP is live)

1. Add **real project screenshots** to each Project card (take screenshots of Gummy Blast, AgroSense dashboard, etc.)
2. Add a **GitHub Readme badge** with a live Vercel deploy link
3. Add **SEO metadata** (Open Graph tags) for LinkedIn preview
4. Connect **Google Analytics** (Vercel has a free built-in analytics tab)
5. Add a **downloadable CV button** that serves `JesusETCV.pdf` from `/public`

---

**You now have everything you need. Open a terminal, follow Steps 1→7, and you'll have a live portfolio in about an hour.**

const KEY = 'portfolio:updates';

const SEED = [
  {
    id: '2026-04-20-portfolio-shipped',
    date: '2026-04-20',
    title: 'Shipped the new portfolio',
    tags: ['personal', 'shipped'],
    body: "Today I pushed v1 of this site. Built with React, Vite, Tailwind, and Framer Motion. The goal: a minimal, high-signal landing page for recruiters and collaborators — no lorem ipsum, no fluff, just the work.",
    media: null,
    link: null,
  },
];

let memoryStore = null;

function hasKv() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function getKv() {
  const mod = await import('@vercel/kv');
  return mod.kv;
}

export async function readUpdates() {
  if (hasKv()) {
    try {
      const kv = await getKv();
      const existing = await kv.get(KEY);
      if (Array.isArray(existing)) return existing;
      await kv.set(KEY, SEED);
      return SEED;
    } catch (err) {
      console.error('KV read failed, falling back to memory:', err);
    }
  }
  if (!memoryStore) memoryStore = [...SEED];
  return memoryStore;
}

export async function writeUpdates(list) {
  const normalized = Array.isArray(list) ? list : [];
  if (hasKv()) {
    try {
      const kv = await getKv();
      await kv.set(KEY, normalized);
      return normalized;
    } catch (err) {
      console.error('KV write failed, falling back to memory:', err);
    }
  }
  memoryStore = normalized;
  return memoryStore;
}

export function isAuthorized(req) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const header = req.headers['x-admin-password'] || req.headers['X-Admin-Password'];
  return typeof header === 'string' && header === expected;
}

export { hasKv };

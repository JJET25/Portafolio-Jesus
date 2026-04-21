import { isAuthorized, readUpdates, writeUpdates, hasKv } from './_updatesStore.js';

const MAX = { title: 200, body: 4000, tagCount: 10, tagLen: 40, linkLen: 500 };

function validEntry(e) {
  if (!e || typeof e !== 'object') return false;
  if (typeof e.id !== 'string' || !e.id.trim()) return false;
  if (typeof e.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(e.date)) return false;
  if (typeof e.title !== 'string' || !e.title.trim() || e.title.length > MAX.title) return false;
  if (typeof e.body !== 'string' || e.body.length > MAX.body) return false;
  if (e.tags && (!Array.isArray(e.tags) || e.tags.length > MAX.tagCount ||
    e.tags.some((t) => typeof t !== 'string' || t.length > MAX.tagLen))) return false;
  if (e.media && typeof e.media === 'object') {
    if (!['image', 'video'].includes(e.media.type)) return false;
    if (typeof e.media.src !== 'string' || e.media.src.length > MAX.linkLen) return false;
  }
  if (e.link && typeof e.link === 'object') {
    if (typeof e.link.href !== 'string' || e.link.href.length > MAX.linkLen) return false;
    if (typeof e.link.label !== 'string' || e.link.label.length > MAX.tagLen * 2) return false;
  }
  return true;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const updates = await readUpdates();
      return res.status(200).json({ updates, storage: hasKv() ? 'kv' : 'memory' });
    }

    if (req.method === 'PUT') {
      if (!isAuthorized(req)) return res.status(401).json({ error: 'Unauthorized' });
      const body = req.body || {};
      const list = Array.isArray(body.updates) ? body.updates : null;
      if (!list) return res.status(400).json({ error: 'Expected { updates: [...] }' });
      if (!list.every(validEntry)) return res.status(400).json({ error: 'Invalid entry shape' });
      const saved = await writeUpdates(list);
      return res.status(200).json({ updates: saved, storage: hasKv() ? 'kv' : 'memory' });
    }

    res.setHeader('Allow', 'GET, PUT');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('updates handler error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

import { isAuthorized, hasKv } from './_updatesStore.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return res.status(503).json({ error: 'Admin is not configured: set ADMIN_PASSWORD' });
  }
  const body = req.body || {};
  const headers = {
    ...req.headers,
    'x-admin-password': typeof body.password === 'string' ? body.password : '',
  };
  if (!isAuthorized({ headers })) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  return res.status(200).json({ ok: true, storage: hasKv() ? 'kv' : 'memory' });
}

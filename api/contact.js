import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, email: 200, message: 5000 };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are all required.' });
  }
  if (name.length > MAX.name || email.length > MAX.email || message.length > MAX.message) {
    return res.status(400).json({ error: 'One or more fields exceed the maximum length.' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL || 'jespinoza2511@hotmail.com';
  const from = process.env.CONTACT_FROM || 'Portfolio Contact <onboarding@resend.dev>';

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  try {
    const resend = new Resend(apiKey);
    const escape = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #0F172A; max-width: 560px;">
          <h2 style="margin: 0 0 12px;">New portfolio inquiry</h2>
          <p><strong>From:</strong> ${escape(name)} &lt;${escape(email)}&gt;</p>
          <p style="white-space: pre-wrap; line-height: 1.55;">${escape(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({ error: 'Failed to deliver message.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
}

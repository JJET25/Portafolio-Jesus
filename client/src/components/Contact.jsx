import { useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import Reveal from './Reveal';
import { copy, personal, social } from '../data/portfolio';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ state: 'error', msg: 'Please fill in every field.' });
      return;
    }
    setStatus({ state: 'loading', msg: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Request failed');
      }
      setStatus({ state: 'success', msg: 'Thanks — your message is on its way.' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({
        state: 'error',
        msg: err.message || 'Something went wrong. Please try again or email me directly.',
      });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-content">
        <Reveal>
          <p className="section-eyebrow section-eyebrow-dot mb-5">Connect with me</p>
          <h2 className="section-title max-w-3xl">Let's build something together.</h2>
          <p className="mt-6 muted max-w-xl text-lg leading-relaxed">
            Have a project, role, or idea worth exploring? Drop a message — I respond within a day.
            Or write me directly at{' '}
            <a
              href={social.email}
              className="text-ink-light-primary dark:text-ink-dark-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-hover"
            >
              {personal.email}
            </a>
            .
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-5">
          <Reveal className="md:col-span-3" delay={0.05}>
            <form onSubmit={onSubmit} className="card space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-edge-light dark:border-edge-dark bg-bg-light dark:bg-bg-dark px-4 py-3 text-base outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-edge-light dark:border-edge-dark bg-bg-light dark:bg-bg-dark px-4 py-3 text-base outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={5}
                  className="w-full rounded-xl border border-edge-light dark:border-edge-dark bg-bg-light dark:bg-bg-dark px-4 py-3 text-base outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.state === 'loading'}
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status.state === 'loading' ? 'Sending…' : 'Send message'}
                <Send size={16} aria-hidden="true" />
              </button>

              {status.state === 'success' && (
                <p role="status" className="text-sm text-accent-hover">
                  {status.msg}
                </p>
              )}
              {status.state === 'error' && (
                <p role="alert" className="text-sm text-red-500">
                  {status.msg}
                </p>
              )}
            </form>
          </Reveal>

          <Reveal className="md:col-span-2" delay={0.1}>
            <div className="card h-full">
              <h3 className="font-semibold text-lg">Other ways to reach me</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="text-accent-hover" size={18} aria-hidden="true" />
                  <a href={social.email} className="hover:text-accent-hover transition-colors">
                    {personal.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-accent-hover" size={18} aria-hidden="true" />
                  <span>{personal.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="text-accent-hover" size={18} aria-hidden="true" />
                  <span>{personal.location}</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-edge-light dark:border-edge-dark">
                <p className="text-xs uppercase tracking-wider muted mb-3">Find me online</p>
                <ul className="flex items-center gap-3">
                  <li>
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="icon-btn"
                    >
                      <Linkedin size={18} aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="icon-btn"
                    >
                      <Github size={18} aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href={social.email} aria-label="Email" className="icon-btn">
                      <Mail size={18} aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { updates as fallbackUpdates } from '../data/updates';

const fmt = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

function Media({ media }) {
  if (!media) return null;
  if (media.type === 'image') {
    return (
      <img
        src={media.src}
        alt={media.alt || ''}
        loading="lazy"
        className="mt-6 w-full rounded-xl border border-edge-light dark:border-edge-dark"
      />
    );
  }
  if (media.type === 'video') {
    return (
      <video
        controls
        playsInline
        preload="metadata"
        poster={media.poster || undefined}
        className="mt-6 w-full rounded-xl border border-edge-light dark:border-edge-dark"
      >
        <source src={media.src} type={media.mime || 'video/mp4'} />
      </video>
    );
  }
  return null;
}

export default function Updates() {
  const [entries, setEntries] = useState(fallbackUpdates);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch('/api/updates')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive) return;
        if (Array.isArray(data?.updates) && data.updates.length > 0) {
          setEntries(data.updates);
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
    return () => {
      alive = false;
    };
  }, []);

  const sorted = [...entries].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="pt-32 md:pt-40 pb-28">
      <div className="container-content">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm muted hover:text-ink-light-primary dark:hover:text-ink-dark-primary transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" /> Back to home
        </Link>

        <header className="mt-10 md:mt-14 max-w-2xl">
          <p className="section-eyebrow section-eyebrow-dot mb-4">Dev log</p>
          <h1 className="display text-5xl md:text-6xl lg:text-7xl">
            Updates, notes, and small wins.
          </h1>
          <p className="mt-6 muted text-lg leading-relaxed">
            A chronological feed of what I'm building, learning, and shipping — updated as things happen.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Link to="/admin" className="btn-ghost text-xs">
              <Lock size={12} aria-hidden="true" /> Admin
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] muted">
              {loaded ? `${sorted.length} entries` : 'Loading…'}
            </span>
          </div>
        </header>

        <ol className="mt-20 relative">
          <div
            aria-hidden="true"
            className="absolute left-3 md:left-5 top-3 bottom-3 w-px bg-edge-light dark:bg-edge-dark"
          />
          {sorted.map((u, i) => (
            <motion.li
              key={u.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.03 }}
              className="relative pl-12 md:pl-20 pb-20 md:pb-24 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="absolute left-[7px] md:left-[13px] top-7 h-3 w-3 rounded-full bg-accent ring-4 ring-bg-light dark:ring-bg-dark shadow-[0_0_0_6px_rgba(125,211,252,0.12)]"
              />

              <article className="card bg-bg-light-secondary dark:bg-bg-dark-secondary p-7 md:p-9 hover:border-ink-light-primary dark:hover:border-ink-dark-primary">
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
                  <time
                    dateTime={u.date}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] muted"
                  >
                    {fmt(u.date)}
                  </time>
                  {u.tags?.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5">
                      {u.tags.map((t) => (
                        <li key={t} className="pill">
                          #{t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                  {u.title}
                </h2>

                <p className="mt-4 muted leading-relaxed">{u.body}</p>

                <Media media={u.media} />

                {u.link && (
                  <a
                    href={u.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-light-primary dark:text-ink-dark-primary hover:text-accent-hover hover:gap-2.5 transition-all"
                  >
                    {u.link.label} <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </main>
  );
}

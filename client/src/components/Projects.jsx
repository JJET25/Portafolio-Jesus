import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github, X } from 'lucide-react';
import Reveal from './Reveal';
import { projects } from '../data/portfolio';

const BENTO_CLASSES = {
  hero: 'md:col-span-4 md:row-span-2',
  tall: 'md:col-span-2 md:row-span-2',
  wide: 'md:col-span-3',
  standard: 'md:col-span-2',
  slim: 'md:col-span-4',
};

const PERSONA_GLOWS = [
  { dot: 'bg-accent', glow: 'rgba(125,211,252,0.18)', shadow: 'rgba(125,211,252,0.45)' },
  { dot: 'bg-brand-coral', glow: 'rgba(253,186,116,0.18)', shadow: 'rgba(253,186,116,0.4)' },
  { dot: 'bg-brand-violet', glow: 'rgba(196,181,253,0.2)', shadow: 'rgba(196,181,253,0.45)' },
  { dot: 'bg-brand-mint', glow: 'rgba(134,239,172,0.18)', shadow: 'rgba(134,239,172,0.4)' },
  { dot: 'bg-accent-hover', glow: 'rgba(56,189,248,0.18)', shadow: 'rgba(56,189,248,0.45)' },
  { dot: 'bg-brand-rose', glow: 'rgba(253,164,175,0.18)', shadow: 'rgba(253,164,175,0.4)' },
];

function LinkBtn({ href, icon: Icon, label, primary }) {
  if (!href) return null;
  const base =
    'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 border';
  const cls = primary
    ? `${base} bg-ink-light-primary text-bg-light border-ink-light-primary hover:bg-accent hover:text-ink-light-primary hover:border-accent dark:bg-ink-dark-primary dark:text-bg-dark dark:border-ink-dark-primary`
    : `${base} border-edge-light dark:border-edge-dark muted hover:text-ink-light-primary dark:hover:text-ink-dark-primary hover:border-ink-light-primary dark:hover:border-ink-dark-primary`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={cls}
      aria-label={label}
    >
      <Icon size={13} aria-hidden="true" /> {label}
    </a>
  );
}

function Card({ project, onOpen, index = 0 }) {
  const isHero = project.bento === 'hero';
  const isTall = project.bento === 'tall';
  const isSlim = project.bento === 'slim';
  const isLarge = isHero || isTall;
  const persona = PERSONA_GLOWS[index % PERSONA_GLOWS.length];

  return (
    <article
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(project);
        }
      }}
      style={{ '--card-shadow': persona.shadow }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-accent/20 dark:border-accent/25 bg-bg-light-secondary/60 dark:bg-bg-dark-secondary/50 backdrop-blur-md p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 dark:hover:border-accent/70 h-full flex flex-col hover:shadow-[0_20px_60px_-25px_var(--card-shadow)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(60% 60% at 100% 0%, ${persona.glow}, transparent 70%)`,
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="pill inline-flex items-center">
          <span className={`persona-dot ${persona.dot}`} aria-hidden="true" />
          {project.year}
        </span>
        <ArrowUpRight
          className="text-ink-light-secondary dark:text-ink-dark-secondary group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
          size={20}
          aria-hidden="true"
        />
      </div>

      <h3
        className={`relative mt-5 font-semibold tracking-tight leading-tight ${
          isHero
            ? 'text-3xl md:text-4xl lg:text-5xl'
            : isTall
            ? 'text-2xl md:text-3xl'
            : 'text-xl md:text-2xl'
        }`}
      >
        {project.title}
      </h3>
      <p className="relative mt-1.5 muted text-sm">{project.tagline}</p>

      {isLarge && (
        <p className="relative mt-5 muted text-sm md:text-base leading-relaxed">
          {project.summary}
        </p>
      )}

      {!isSlim && (
        <div className="relative mt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] muted mb-2.5">Stack</p>
          <ul className="stack-list">
            {project.stack.map((t) => (
              <li key={t} className="pill">
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative mt-auto pt-6 flex flex-wrap items-center gap-2">
        <LinkBtn href={project.links.live} icon={ExternalLink} label="Live demo" primary />
        <LinkBtn href={project.links.github} icon={Github} label="GitHub" />
      </div>
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <section id="projects" className="section">
      <div className="container-content">
        <Reveal>
          <p className="section-eyebrow section-eyebrow-dot mb-5">Selected work</p>
          <h2 className="section-title max-w-3xl">A few things I've built recently.</h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-6 md:auto-rows-[13rem]">
          {projects.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 0.06}
              variant={i % 2 === 0 ? 'up' : 'scale'}
              className={`h-full ${BENTO_CLASSES[p.bento] || 'md:col-span-2'}`}
            >
              <Card project={p} onOpen={setActive} index={i} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full md:max-w-2xl max-h-[85vh] overflow-y-auto rounded-t-2xl md:rounded-2xl bg-bg-light dark:bg-bg-dark border border-edge-light dark:border-edge-dark p-6 md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="icon-btn absolute top-4 right-4"
                aria-label="Close"
              >
                <X size={18} aria-hidden="true" />
              </button>
              <span className="pill">{active.year}</span>
              <h3
                id="project-modal-title"
                className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight leading-tight"
              >
                {active.title}
              </h3>
              <p className="mt-1 muted">{active.tagline}</p>

              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] muted mb-2">Stack</p>
                <ul className="stack-list">
                  {active.stack.map((t) => (
                    <li key={t} className="pill">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 leading-relaxed">{active.summary}</p>

              <h4 className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] muted">
                Highlights
              </h4>
              <ul className="mt-3 space-y-2.5 text-sm">
                {active.highlights.map((h, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="muted leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <LinkBtn href={active.links.live} icon={ExternalLink} label="Live demo" primary />
                <LinkBtn href={active.links.github} icon={Github} label="View on GitHub" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

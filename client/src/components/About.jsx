import Reveal from './Reveal';
import { copy, languages, personal, personalTraits, stats } from '../data/portfolio';

const TRAIT_TINTS = [
  'border-accent/40 text-ink-light-primary dark:text-ink-dark-primary bg-accent/10',
  'border-brand-coral/50 text-ink-light-primary dark:text-ink-dark-primary bg-brand-coral/10',
  'border-brand-mint/50 text-ink-light-primary dark:text-ink-dark-primary bg-brand-mint/10',
  'border-brand-violet/50 text-ink-light-primary dark:text-ink-dark-primary bg-brand-violet/10',
  'border-brand-rose/50 text-ink-light-primary dark:text-ink-dark-primary bg-brand-rose/10',
  'border-accent-hover/50 text-ink-light-primary dark:text-ink-dark-primary bg-accent-hover/10',
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-content">
        <Reveal>
          <p className="section-eyebrow section-eyebrow-dot mb-5">About</p>
          <h2 className="section-title max-w-3xl">{copy.about.heading}</h2>
        </Reveal>

        <div className="mt-12 grid gap-12 md:gap-16 md:grid-cols-12 items-start">
          <Reveal className="md:col-span-5" delay={0.05} variant="left">
            <div className="relative group">
              <div
                aria-hidden="true"
                className="absolute inset-0 -m-6 rounded-[2rem] bg-accent/20 blur-3xl animate-pulse-soft"
              />
              <div
                aria-hidden="true"
                className="absolute -top-8 -right-6 h-40 w-40 rounded-full bg-brand-coral/25 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-8 -left-6 h-40 w-40 rounded-full bg-brand-violet/25 blur-3xl"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-accent/30 dark:border-accent/35 bg-bg-light-secondary dark:bg-bg-dark-secondary shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <img
                  src={personal.photo}
                  alt={`${personal.name} — portrait`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: '50% 22%' }}
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" delay={0.1} variant="right">
            <div className="space-y-6">
              {copy.about.paragraphs.map((p, i) => (
                <p key={i} className="text-base md:text-lg leading-[1.75] muted">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] muted mb-3">
                Skills
              </p>
              <ul className="stack-list">
                {personalTraits.map((trait, i) => (
                  <li
                    key={trait}
                    className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide transition-transform duration-200 hover:-translate-y-0.5 ${TRAIT_TINTS[i % TRAIT_TINTS.length]}`}
                  >
                    {trait}
                  </li>
                ))}
              </ul>
            </div>

            <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="card text-center">
                  <dt className="text-xs uppercase tracking-wider muted">{s.label}</dt>
                  <dd className="mt-1 font-mono text-xl font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="card mt-6">
              <h3 className="font-semibold text-lg">Languages</h3>
              <ul className="mt-5 grid gap-5 sm:grid-cols-3">
                {languages.map((lang) => (
                  <li key={lang.name}>
                    <div className="flex items-baseline justify-between">
                      <span className="font-medium">{lang.name}</span>
                      <span className="font-mono text-xs muted">{lang.level}</span>
                    </div>
                    <div
                      className="mt-2 h-1.5 w-full rounded-full bg-edge-light dark:bg-edge-dark overflow-hidden"
                      role="progressbar"
                      aria-label={`${lang.name} proficiency`}
                      aria-valuenow={lang.percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="h-full rounded-full bg-accent transition-all duration-500"
                        style={{ width: `${lang.percent}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

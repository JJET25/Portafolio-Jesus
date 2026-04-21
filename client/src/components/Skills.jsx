import Reveal from './Reveal';
import { skills } from '../data/portfolio';

const CATEGORY_DOTS = ['bg-accent', 'bg-brand-violet', 'bg-brand-coral', 'bg-brand-mint'];

export default function Skills() {
  const groups = Object.entries(skills);

  return (
    <section id="skills" className="section">
      <div className="container-content">
        <Reveal>
          <p className="section-eyebrow section-eyebrow-dot mb-5">Skills</p>
          <h2 className="section-title max-w-3xl">My toolkit.</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {groups.map(([category, items], i) => (
            <Reveal key={category} delay={i * 0.08} variant="scale">
              <div className="card h-full transition-all duration-300 hover:-translate-y-1 hover:border-accent/60">
                <h3 className="text-sm uppercase tracking-wider font-mono flex items-center">
                  <span className={`persona-dot ${CATEGORY_DOTS[i % CATEGORY_DOTS.length]}`} aria-hidden="true" />
                  {category}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <li
                      key={s}
                      className="pill transition-transform duration-200 hover:-translate-y-0.5 hover:border-accent/60"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { GraduationCap } from 'lucide-react';
import Reveal from './Reveal';
import { education } from '../data/portfolio';

export default function Education() {
  return (
    <section id="education" className="section bg-bg-light-secondary dark:bg-bg-dark-secondary">
      <div className="container-content">
        <Reveal>
          <p className="section-eyebrow section-eyebrow-dot mb-5">Education</p>
          <h2 className="section-title max-w-3xl">Academic foundations.</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.05}>
              <article className="card h-full">
                <div className="flex items-start justify-between gap-4">
                  <GraduationCap className="text-accent-hover" aria-hidden="true" />
                  <span className="pill">{e.period}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{e.school}</h3>
                <p className="muted">{e.degree}</p>
                <p className="mt-1 font-mono text-xs text-accent-hover">{e.meta}</p>
                <p className="mt-1 text-xs muted">{e.location}</p>
                <div className="mt-5">
                  <h4 className="text-xs uppercase tracking-wider muted mb-3">Coursework</h4>
                  <ul className="flex flex-wrap gap-2">
                    {e.coursework.map((c) => (
                      <li key={c} className="pill">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

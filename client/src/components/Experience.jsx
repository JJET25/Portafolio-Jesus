import Reveal from './Reveal';
import { experience } from '../data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="section bg-bg-light-secondary dark:bg-bg-dark-secondary">
      <div className="container-content">
        <Reveal>
          <p className="section-eyebrow section-eyebrow-dot mb-5">Experience</p>
          <h2 className="section-title max-w-3xl">Where I've shipped.</h2>
        </Reveal>

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-edge-light dark:bg-edge-dark md:-translate-x-1/2"
          />

          <ul className="space-y-12 md:space-y-16">
            {experience.map((job, i) => {
              const alignRight = i % 2 === 1;
              return (
                <li key={job.company} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute left-4 md:left-1/2 top-4 h-3 w-3 -translate-x-1/2 rounded-full bg-accent ring-4 ring-bg-light-secondary dark:ring-bg-dark-secondary"
                  />
                  <Reveal className="md:grid md:grid-cols-2 md:gap-12" delay={0.05}>
                    <div
                      className={`pl-12 md:pl-0 ${alignRight ? 'md:col-start-2' : 'md:pr-10'}`}
                    >
                      <div className="card bg-bg-light dark:bg-bg-dark">
                        <span className="pill mb-4">{job.period}</span>
                        <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                          {job.role}
                        </h3>
                        <p className="muted mt-1 text-sm">
                          {job.company} · {job.location}
                        </p>

                        <ul className="mt-5 space-y-2.5 text-sm">
                          {job.bullets.map((b, idx) => (
                            <li key={idx} className="flex gap-3">
                              <span
                                aria-hidden="true"
                                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                              />
                              <span className="muted leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>

                        {job.stack?.length > 0 && (
                          <div className="mt-6 hairline pt-5">
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] muted mb-2.5">
                              Stack
                            </p>
                            <ul className="stack-list">
                              {job.stack.map((s) => (
                                <li key={s} className="pill">
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

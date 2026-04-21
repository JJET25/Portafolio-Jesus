import { Heart, Home, Users } from 'lucide-react';
import Reveal from './Reveal';
import { leadership } from '../data/portfolio';

const ICONS = { Heart, Users, Home };

const TINTS = [
  { bg: 'bg-brand-rose/20', text: 'text-brand-rose', hover: 'hover:border-brand-rose/50' },
  { bg: 'bg-accent/20', text: 'text-accent-hover', hover: 'hover:border-accent' },
  { bg: 'bg-brand-mint/20', text: 'text-brand-mint', hover: 'hover:border-brand-mint/50' },
];

export default function Leadership() {
  return (
    <section id="leadership" className="section bg-bg-light-secondary dark:bg-bg-dark-secondary">
      <div className="container-content">
        <Reveal>
          <p className="section-eyebrow section-eyebrow-dot mb-5">Leadership</p>
          <h2 className="section-title max-w-3xl">Beyond the keyboard.</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {leadership.map((item, i) => {
            const Icon = ICONS[item.icon] || Users;
            const tint = TINTS[i % TINTS.length];
            const variant = ['left', 'up', 'right'][i % 3];
            return (
              <Reveal key={item.title} delay={i * 0.08} variant={variant}>
                <article className={`card h-full transition-all duration-300 hover:-translate-y-1 ${tint.hover}`}>
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${tint.bg} ${tint.text}`}>
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm muted leading-relaxed">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

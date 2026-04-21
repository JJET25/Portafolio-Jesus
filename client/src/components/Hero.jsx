import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { copy, personal, social } from '../data/portfolio';

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 md:pt-36 pb-24 md:pb-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-90"
        style={{
          background:
            'radial-gradient(55% 45% at 75% 20%, rgba(125,211,252,0.28), transparent 70%), radial-gradient(40% 35% at 10% 40%, rgba(125,211,252,0.14), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[28%] -z-10 hidden dark:block h-[40rem] w-[40rem] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(125,211,252,0.35), rgba(125,211,252,0.12) 45%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="container-content grid gap-14 md:gap-20 md:grid-cols-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="order-2 md:order-1 md:col-span-7"
        >
          <p className="section-eyebrow section-eyebrow-dot mb-6">
            <MapPin size={12} className="inline -mt-0.5 mr-1" aria-hidden="true" />
            Available · {personal.location}
          </p>

          <h1 className="display">
            {personal.name.split(' ')[0]}
            <span className="block gradient-text">
              {personal.name.split(' ').slice(1).join(' ')}.
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl muted max-w-xl leading-relaxed">
            {personal.title}
          </p>

          <p className="mt-6 max-w-xl text-base leading-[1.75]">{copy.heroTagline}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              View projects <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href={personal.cv} download className="btn-secondary">
              <Download size={18} aria-hidden="true" /> Download CV
            </a>
          </div>

          <ul className="mt-10 flex items-center gap-3" aria-label="Social links">
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

          <a
            href="#about"
            aria-label="Scroll to about"
            className="mt-14 hidden md:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] muted hover:text-accent transition-colors"
          >
            Scroll
            <ChevronDown size={14} className="animate-bounce-down" aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="order-1 md:order-2 md:col-span-5 flex justify-center md:justify-end"
        >
          <motion.div
            className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-[22rem] md:w-[22rem] lg:h-[26rem] lg:w-[26rem]"
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -m-8 rounded-full bg-accent/25 blur-3xl animate-pulse-soft"
            />
            <div
              aria-hidden="true"
              className="absolute -top-10 -right-6 h-40 w-40 rounded-full bg-brand-coral/20 dark:bg-brand-coral/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-8 -left-6 h-40 w-40 rounded-full bg-brand-violet/25 dark:bg-brand-violet/30 blur-3xl"
            />
            <div className="relative z-10 h-full w-full rounded-full overflow-hidden ring-1 ring-edge-light dark:ring-edge-dark shadow-2xl bg-bg-light-secondary dark:bg-bg-dark-secondary">
              <img
                src={personal.photo}
                alt={`${personal.name} — professional headshot`}
                width={600}
                height={600}
                className="h-full w-full object-cover scale-110"
                style={{ objectPosition: '50% 28%' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

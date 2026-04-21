import { ArrowUp } from 'lucide-react';
import { personal } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-edge-light dark:border-edge-dark py-10">
      <div className="container-content flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm muted">
          <span className="font-mono font-bold text-accent-hover mr-2">{personal.monogram}</span>
          © 2026 {personal.name}. Built with React, Tailwind, and Node.js.
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-sm muted hover:text-accent-hover transition-colors"
        >
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

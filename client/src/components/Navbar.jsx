import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { navLinks, personal } from '../data/portfolio';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const onLanding = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = () => setOpen(false);

  const NavItem = ({ href, label, onClick }) => {
    const cls =
      'text-sm text-ink-light-secondary dark:text-ink-dark-secondary hover:text-ink-light-primary dark:hover:text-ink-dark-primary transition-colors';
    if (onLanding) {
      return (
        <a href={href} onClick={onClick} className={cls}>
          {label}
        </a>
      );
    }
    return (
      <Link to={`/${href}`} onClick={onClick} className={cls}>
        {label}
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? 'bg-bg-light/60 dark:bg-bg-dark/50 border-b border-accent/20 dark:border-accent/25 shadow-[0_8px_30px_-20px_rgba(125,211,252,0.3)]'
          : 'bg-bg-light/30 dark:bg-bg-dark/20 border-b border-transparent'
      }`}
    >
      <nav className="container-content flex h-16 items-center justify-between" aria-label="Primary">
        <Link to="/" className="flex items-baseline gap-2" aria-label="Home">
          <span className="text-xl font-semibold tracking-tight leading-none">
            {personal.monogram}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] muted hidden sm:inline">
            / portfolio
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavItem href={link.href} label={link.label} />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/updates" className="hidden md:inline-flex btn-ghost">
            Updates
          </Link>
          {onLanding ? (
            <a href="#contact" className="hidden md:inline-flex btn-primary !py-2 !px-5 text-sm">
              Hire me
            </a>
          ) : (
            <Link to="/#contact" className="hidden md:inline-flex btn-primary !py-2 !px-5 text-sm">
              Hire me
            </Link>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="icon-btn md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-edge-light dark:border-edge-dark bg-bg-light dark:bg-bg-dark">
          <ul className="container-content py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavItem href={link.href} label={link.label} onClick={close} />
              </li>
            ))}
            <li className="pt-3 flex gap-2">
              <Link to="/updates" onClick={close} className="btn-ghost flex-1">
                Updates
              </Link>
              {onLanding ? (
                <a href="#contact" onClick={close} className="btn-primary flex-1">
                  Hire me
                </a>
              ) : (
                <Link to="/#contact" onClick={close} className="btn-primary flex-1">
                  Hire me
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { ease, Magnetic } from './ui/motion';
import Logo from './Logo';

const links = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
];

export default function Navbar() {
  const { pathname, hash } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname, hash]);

  // Highlight the link for the section currently in the middle of the screen.
  useEffect(() => {
    setActive('');
    if (pathname !== '/') return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    const timer = window.setTimeout(() => {
      ['top', ...links.map((link) => link.id), 'why', 'contact'].forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    }, 500);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Main"
        className={`mx-auto flex h-16 max-w-[1240px] items-center justify-between rounded-full border pl-5 pr-2 transition-[background-color,border-color,box-shadow] duration-500 ${solid ? 'border-white/10 bg-navy/80 shadow-[0_20px_50px_-20px_rgba(4,12,29,0.75)] backdrop-blur-xl' : 'border-transparent'}`}
      >
        <Link to="/" aria-label="Levi Tech Solutions home" className="shrink-0">
          <Logo className="h-8 sm:h-9" />
        </Link>

        <div className="hidden items-center lg:flex">
          {links.map((link) => (
            <Link key={link.id} to={`/#${link.id}`} className="relative rounded-full px-4 py-2 text-sm font-medium text-white/65 transition-colors hover:text-white">
              {active === link.id && <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full bg-white/10" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="relative">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="hidden md:inline-flex">
            <Magnetic strength={0.2}>
              <Link to="/#contact" className="btn-primary h-12 px-5">
                Start a project <ArrowUpRight className="icon-diagonal h-4 w-4" />
              </Link>
            </Magnetic>
          </span>
          <button type="button" onClick={() => setOpen((value) => !value)} className="flex h-12 w-12 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden" aria-label="Toggle navigation" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.35, ease }}
            className="mx-auto mt-2 max-w-[1240px] origin-top rounded-3xl border border-white/10 bg-navy/95 p-3 text-white shadow-2xl backdrop-blur-xl lg:hidden"
          >
            {[...links, { id: 'contact', label: 'Contact' }].map((link, index) => (
              <motion.div key={link.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + index * 0.04, duration: 0.4, ease }}>
                <Link to={`/#${link.id}`} className="flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-semibold hover:bg-white/[0.06]">
                  <span className="flex items-baseline gap-3"><span className="font-mono text-xs text-cyan">0{index + 1}</span>{link.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-white/40" />
                </Link>
              </motion.div>
            ))}
            <Link to="/#contact" className="btn-primary mt-2 w-full md:hidden">Start a project</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

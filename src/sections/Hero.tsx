import { type MouseEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { site } from '../lib/site';
import { ease, Magnetic, RevealLines } from '../components/ui/motion';
import HeroVisual from './HeroVisual';

const WORDS = ['websites', 'web apps', 'online stores', 'platforms'];

function RotatingWord() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % WORDS.length), 2600);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <span className="relative block overflow-hidden pb-[0.14em]" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={WORDS[index]}
          className="text-gradient block"
          initial={reduce ? false : { y: '100%', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={reduce ? undefined : { y: '-100%', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease }}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  // Cursor position, normalised to -0.5…0.5, drives the spotlight and the 3D stack.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothX = useSpring(mx, { stiffness: 70, damping: 20 });
  const smoothY = useSpring(my, { stiffness: 70, damping: 20 });
  const px = useMotionValue(-1000);
  const py = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(640px circle at ${px}px ${py}px, rgb(22 119 255 / 0.16), transparent 65%)`;

  const track = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
    px.set(event.clientX - rect.left);
    py.set(event.clientY - rect.top);
  };

  return (
    <section id="top" onMouseMove={track} className="relative isolate overflow-hidden bg-navy text-white">
      <div className="dots fade-edges absolute inset-0 -z-10" />
      <motion.div className="absolute inset-0 -z-10" style={{ background: spotlight }} />
      <div className="absolute -right-48 -top-56 -z-10 h-[40rem] w-[40rem] animate-drift rounded-full bg-blue/25 blur-[120px]" />
      <div className="absolute -bottom-72 -left-40 -z-10 h-[34rem] w-[34rem] animate-drift rounded-full bg-cyan/10 blur-[120px] [animation-delay:-9s]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />

      <div className="container-x grid min-h-[100svh] items-center gap-16 pb-24 pt-36 lg:grid-cols-[1.05fr_1fr] lg:pb-28">
        <div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="label label-light">
            {site.slogan}
          </motion.p>
          <h1 className="mt-7 text-[2.9rem] font-bold leading-[1.02] sm:text-6xl xl:text-[4.6rem]">
            <RevealLines lines={['We build']} delay={0.1} />
            <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
              <motion.span className="block" initial={{ y: '115%' }} animate={{ y: '0%' }} transition={{ duration: 1.05, delay: 0.19, ease }}>
                <RotatingWord />
              </motion.span>
            </span>
            <RevealLines lines={['that move', 'businesses forward.']} delay={0.28} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9, ease }} className="mt-7 max-w-md text-lg leading-relaxed text-white/60">
            Websites and web applications engineered to make an impact.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.9, ease }} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link to="/#contact" className="btn-primary px-7 py-4 text-[15px]">Start a project <ArrowRight className="h-4 w-4" /></Link>
            </Magnetic>
            <Link to="/#work" className="btn-ghost-dark px-7 py-4 text-[15px]">Explore our work</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15, duration: 1 }} className="mt-14 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-70" /><span className="relative h-2 w-2 rounded-full bg-live" /></span>
            Available for new projects
          </motion.div>
        </div>

        <div className="hidden lg:block">
          <HeroVisual mx={smoothX} my={smoothY} />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex" aria-hidden="true">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">Scroll</span>
        <span className="h-10 w-px overflow-hidden bg-white/10"><span className="block h-full w-full animate-scroll-cue bg-cyan" /></span>
      </div>
    </section>
  );
}

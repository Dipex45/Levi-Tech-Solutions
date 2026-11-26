import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { findProject, projects } from '../data/projects';
import { BrowserFrame, StatusBadge } from '../components/BrowserFrame';
import { ease, FadeIn, Item, Magnetic, RevealLines, Stagger, Tilt } from '../components/ui/motion';

const sections = [
  { id: 'challenge', label: 'The challenge' },
  { id: 'solution', label: 'Our solution' },
  { id: 'features', label: 'Key features' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'stack', label: 'Technology' },
];

function Block({ id, index, label, children }: { id: string; index: number; label: string; children: ReactNode }) {
  return (
    <FadeIn>
      <section id={id} className="scroll-mt-32">
        <p className="label">{String(index + 1).padStart(2, '0')} · {label}</p>
        <div className="mt-6">{children}</div>
      </section>
    </FadeIn>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = findProject(slug);
  const reduce = useReducedMotion();
  const shotRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: shotRef, offset: ['start end', 'start 20%'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.88, 1]);
  const [active, setActive] = useState('challenge');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    const timer = window.setTimeout(() => sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }), 500);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const live = project.status === 'live';

  return (
    <article>
      <header className="relative isolate overflow-hidden bg-navy pb-56 pt-36 text-white sm:pt-40">
        <div className="dots fade-edges absolute inset-0 -z-10" />
        <div className="absolute -right-48 -top-56 -z-10 h-[36rem] w-[36rem] animate-drift rounded-full bg-blue/25 blur-[120px]" />
        <div className="container-x">
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-white/45">
            <Link to="/#work" className="hover:text-cyan">work</Link>
            <span>/</span>
            <span className="text-white/80">{project.slug}</span>
          </motion.nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
                <StatusBadge project={project} dark />
              </motion.div>
              <h1 className="mt-6 text-5xl font-bold leading-[1.02] sm:text-7xl">
                <RevealLines lines={[project.name]} delay={0.15} />
              </h1>
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease }} className="mt-5 text-xl leading-relaxed text-white/60">
                {project.tagline}
              </motion.p>
            </div>
            {project.url && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease }}>
                <Magnetic>
                  <a href={project.url} target="_blank" rel="noreferrer" className="btn-primary px-7 py-4 text-[15px]">
                    {live ? 'Visit the live site' : 'View the preview'} <ArrowUpRight className="icon-diagonal h-4 w-4" />
                  </a>
                </Magnetic>
              </motion.div>
            )}
          </div>

          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.55 }} className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-7 sm:grid-cols-4">
            {[
              ['Type', project.category],
              ['Year', project.year],
              ['Status', live ? 'Live' : 'In development'],
              ['Stack', `${project.tech.slice(0, 2).join(', ')} +${project.tech.length - 2}`],
            ].map(([term, value]) => (
              <div key={term}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{term}</dt>
                <dd className="mt-2 text-sm font-medium text-white/85">{value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </header>

      <div ref={shotRef} className="container-x relative z-10 -mt-40" style={{ perspective: 1600 }}>
        <motion.div style={{ rotateX, scale, transformOrigin: 'center top' }}>
          <BrowserFrame project={project} eager className="shadow-[0_60px_120px_-50px_rgb(7_21_46/0.55)]" />
        </motion.div>
      </div>

      <div className="container-x grid gap-16 py-24 sm:py-32 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <nav aria-label="Case study sections" className="sticky top-32">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">On this page</p>
            <ul className="mt-5 space-y-1 border-l border-line">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className={`-ml-px block border-l-2 py-1.5 pl-4 text-left text-sm transition-colors ${active === section.id ? 'border-blue font-semibold text-ink' : 'border-transparent text-muted hover:text-ink'}`}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
            <Link to="/#contact" className="btn-ink mt-10 w-full">Start a similar project</Link>
          </nav>
        </aside>

        <div className="space-y-20 lg:col-span-9 lg:pl-6">
          <Block id="challenge" index={0} label="The challenge">
            <p className="font-display text-2xl font-medium leading-[1.45] tracking-[-0.02em] text-ink/85 sm:text-[1.75rem]">{project.challenge}</p>
          </Block>

          <Block id="solution" index={1} label="Our solution">
            <p className="text-lg leading-relaxed text-muted sm:text-xl">{project.solution}</p>
          </Block>

          <Block id="features" index={2} label="Key features">
            <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2" gap={0.05}>
              {project.features.map((feature, index) => (
                <Item key={feature} className="group flex gap-4 bg-white p-6 transition-colors duration-300 hover:bg-mist">
                  <span className="font-mono text-xs text-muted transition-colors group-hover:text-blue">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-medium">{feature}</span>
                </Item>
              ))}
            </Stagger>
          </Block>

          <Block id="outcome" index={3} label="Outcome">
            <div className="gradient-border relative isolate overflow-hidden rounded-3xl bg-navy p-8 text-white sm:p-10">
              <div className="dots absolute inset-0 -z-10 opacity-60" />
              <div className="absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-blue/30 blur-3xl" />
              <Sparkles className="h-6 w-6 text-cyan" strokeWidth={1.75} />
              <p className="mt-5 font-display text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl">{project.outcome}</p>
              {project.url && (
                <a href={project.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-cyan hover:underline">
                  {new URL(project.url).host} <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </Block>

          <Block id="stack" index={4} label="Technology">
            <div className="flex flex-wrap gap-2.5">
              {project.tech.map((tech) => <span key={tech} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium shadow-[0_2px_8px_-4px_rgb(7_21_46/0.15)]">{tech}</span>)}
            </div>
          </Block>

          <Link to="/#contact" className="btn-ink w-full lg:hidden">Start a similar project</Link>
        </div>
      </div>

      {next !== project && (
        <Link to={`/work/${next.slug}`} className="group relative isolate block overflow-hidden bg-navy text-white">
          <div className="dots fade-edges absolute inset-0 -z-10 opacity-60" />
          <div className="container-x grid items-center gap-12 py-24 lg:grid-cols-2">
            <div>
              <p className="label label-light">Next project</p>
              <p className="mt-5 flex items-center gap-5 font-display text-5xl font-bold tracking-[-0.04em] sm:text-7xl">
                {next.name}
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-transparent group-hover:bg-gradient-brand sm:h-16 sm:w-16">
                  <ArrowRight className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-0.5" />
                </span>
              </p>
              <p className="mt-4 max-w-md text-white/55">{next.tagline}</p>
            </div>
            <Tilt max={5}>
              <div className="transition-transform duration-700 group-hover:scale-[1.02]">
                <BrowserFrame project={next} dark className="shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]" />
              </div>
            </Tilt>
          </div>
        </Link>
      )}
    </article>
  );
}

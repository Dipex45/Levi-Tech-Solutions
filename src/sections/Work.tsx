import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects, upcoming, type Project } from '../data/projects';
import { BrowserFrame, StatusBadge } from '../components/BrowserFrame';
import { ease, FadeIn, RevealLines, Tilt } from '../components/ui/motion';

type Filter = 'all' | 'live' | 'in-development' | 'coming-soon';

const filters: { id: Filter; label: string; count: number }[] = [
  { id: 'all', label: 'All', count: projects.length + upcoming.length },
  { id: 'live', label: 'Live', count: projects.filter((project) => project.status === 'live').length },
  { id: 'in-development', label: 'In development', count: projects.filter((project) => project.status === 'in-development').length },
  { id: 'coming-soon', label: 'Coming soon', count: upcoming.length },
];

function CaseCard({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, ease }}
      className="gradient-border group rounded-[28px] bg-white/[0.03] p-3 sm:p-4"
    >
      <div className="grid items-center gap-8 rounded-[22px] bg-navy-soft/40 p-5 sm:p-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        <Link to={`/work/${project.slug}`} className={`block ${flip ? 'lg:order-2' : ''}`} aria-label={`${project.name} case study`}>
          <Tilt max={4}>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-blue/0 blur-2xl transition-colors duration-700 group-hover:bg-blue/25" />
              <BrowserFrame project={project} dark className="shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]" />
            </div>
          </Tilt>
        </Link>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge project={project} dark />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">{project.category} · {project.year}</span>
          </div>
          <h3 className="mt-5 text-3xl font-bold sm:text-[2.6rem]">{project.name}</h3>
          <p className="mt-3 text-lg leading-relaxed text-white/60">{project.tagline}</p>
          <ul className="mt-7 space-y-3">
            {project.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-white/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gradient-brand" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((tech) => <span key={tech} className="chip-mono border-white/10 bg-white/[0.04] text-white/60">{tech}</span>)}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to={`/work/${project.slug}`} className="btn-primary">Read case study <ArrowRight className="h-4 w-4" /></Link>
            {project.url && (
              <a href={project.url} target="_blank" rel="noreferrer" className="btn-ghost-dark">
                {project.status === 'live' ? 'Visit live site' : 'View preview'} <ArrowUpRight className="icon-diagonal h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ComingSoon() {
  return (
    <motion.div layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.7, ease }}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-12">
        <div>
          <p className="label label-light">Coming soon</p>
          <h3 className="mt-4 text-3xl font-bold">In the lab next.</h3>
        </div>
        <p className="max-w-sm text-sm text-white/50">Upcoming web products in the Levi Tech ecosystem. Planned, not yet launched.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {upcoming.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.6, ease }}
              className={`group relative overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 transition-colors duration-500 hover:border-cyan/40 hover:bg-white/[0.04] ${index === 0 ? 'lg:col-span-2' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="relative flex h-12 w-12 items-center justify-center text-white/70 transition-colors group-hover:text-cyan">
                  <span className="absolute inset-[12%] rotate-45 rounded-[22%] border border-white/15 transition-colors group-hover:border-cyan/50" />
                  <Icon className="relative h-5 w-5" strokeWidth={1.6} />
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan/70" /> Soon
                </span>
              </div>
              <h4 className="mt-6 text-lg font-semibold">{item.name}</h4>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{item.brief}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState<Filter>('all');
  const shown = projects.filter((project) => filter === 'all' || project.status === filter);
  const showUpcoming = filter === 'all' || filter === 'coming-soon';

  return (
    <section id="work" className="relative isolate overflow-hidden bg-navy py-28 text-white sm:py-36">
      <div className="dots fade-edges absolute inset-0 -z-10 opacity-60" />
      <div className="absolute left-1/2 top-0 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-blue/15 blur-[140px]" />

      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <FadeIn><p className="label label-light">Our work · [03]</p></FadeIn>
            <h2 className="mt-5 text-4xl font-bold leading-[1.08] sm:text-[3.4rem]">
              <RevealLines inView lines={['Real projects.', <span key="code" className="text-gradient">Real code.</span>]} />
            </h2>
            <FadeIn delay={0.1} className="mt-5 max-w-lg text-white/55">Each project comes with the problem, our solution and the technology behind it.</FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1 sm:rounded-full">
              {filters.map((item) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={filter === item.id}
                  onClick={() => setFilter(item.id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === item.id ? 'text-white' : 'text-white/55 hover:text-white'}`}
                >
                  {filter === item.id && <motion.span layoutId="work-filter" className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/15" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="relative">{item.label} <span className="font-mono text-[10px] text-white/40">{item.count}</span></span>
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="mt-16 space-y-8">
          <AnimatePresence mode="popLayout">
            {shown.map((project, index) => <CaseCard key={project.slug} project={project} index={index} />)}
            {showUpcoming && <ComingSoon key="coming-soon" />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

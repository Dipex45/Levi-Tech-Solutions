import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { site, whatsappUrl } from '../lib/site';
import { services } from '../data/content';
import { projects } from '../data/projects';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-navy-deep text-white">
      <div className="container-x grid gap-12 pb-10 pt-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo full className="h-16 sm:h-[72px]" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">{site.summary}</p>
        </div>
        <FooterColumn title="Services" className="md:col-span-3">
          {services.map((service) => <Link key={service.title} to="/#services" className="hover:text-white">{service.title}</Link>)}
        </FooterColumn>
        <FooterColumn title="Work" className="md:col-span-2">
          {projects.map((project) => <Link key={project.slug} to={`/work/${project.slug}`} className="hover:text-white">{project.name}</Link>)}
        </FooterColumn>
        <FooterColumn title="Contact" className="md:col-span-2">
          <a href={`mailto:${site.email}`} className="break-all hover:text-white">{site.email}</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp</a>
        </FooterColumn>
      </div>

      <div className="container-x flex flex-col gap-4 border-t border-white/10 py-6 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p className="hidden md:block">{site.slogan}</p>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex w-fit items-center gap-2 hover:text-white">
          Back to top <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>

      <p aria-hidden="true" className="pointer-events-none -mb-[0.22em] select-none text-center font-display text-[19vw] font-extrabold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.07)]">
        LEVI TECH
      </p>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cyan">{title}</h2>
      <div className="mt-5 flex flex-col gap-3 text-sm text-white/55">{children}</div>
    </div>
  );
}

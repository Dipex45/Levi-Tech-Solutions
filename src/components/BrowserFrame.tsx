import { Lock } from 'lucide-react';
import type { Project } from '../data/projects';

/** A project screenshot in a slim browser window. `dark` suits navy backgrounds. */
export function BrowserFrame({ project, dark = false, eager = false, className = '' }: { project: Project; dark?: boolean; eager?: boolean; className?: string }) {
  const host = project.url ? new URL(project.url).host : 'private preview';
  return (
    <div className={`overflow-hidden rounded-xl ${dark ? 'border border-white/10 bg-navy-soft' : 'border border-line bg-white'} ${className}`}>
      <div className={`flex items-center gap-3 px-3.5 py-2.5 ${dark ? 'border-b border-white/[0.08] bg-white/[0.03]' : 'border-b border-line bg-mist'}`}>
        <span className="flex gap-1.5" aria-hidden="true">
          {['bg-[#ff5f57]', 'bg-[#febc2e]', 'bg-[#28c840]'].map((color) => <span key={color} className={`h-2 w-2 rounded-full ${color} ${dark ? 'opacity-80' : ''}`} />)}
        </span>
        <span className={`mx-auto flex min-w-0 max-w-[60%] items-center justify-center gap-1.5 truncate rounded-md px-3 py-1 font-mono text-[10.5px] ${dark ? 'bg-white/[0.05] text-white/50' : 'bg-white text-muted'}`}>
          <Lock className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
          {host}
        </span>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      {project.image && <img src={project.image} alt={`${project.name} website`} loading={eager ? 'eager' : 'lazy'} className="aspect-[16/10] w-full object-cover object-top" />}
    </div>
  );
}

/** Live / In development pill. */
export function StatusBadge({ project, dark = false }: { project: Project; dark?: boolean }) {
  const live = project.status === 'live';
  const tone = live
    ? dark ? 'border-live/30 bg-live/10 text-[#4ade80]' : 'border-live/25 bg-live/[0.07] text-[#0e8a52]'
    : dark ? 'border-cyan/30 bg-cyan/10 text-cyan' : 'border-blue/25 bg-blue/[0.06] text-blue';
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] ${tone}`}>
      <span className="relative flex h-1.5 w-1.5">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${live ? 'bg-live' : 'bg-cyan'}`} />
        <span className={`relative h-1.5 w-1.5 rounded-full ${live ? 'bg-live' : 'bg-cyan'}`} />
      </span>
      {live ? 'Live' : 'In development'}
    </span>
  );
}

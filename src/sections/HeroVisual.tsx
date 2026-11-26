import { useEffect, useState } from 'react';
import { motion, type MotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { projects } from '../data/projects';
import { BrowserFrame } from '../components/BrowserFrame';
import { ease } from '../components/ui/motion';

const live = projects.find((project) => project.status === 'live') ?? projects[0];
const building = projects.find((project) => project.status === 'in-development');

const LINES = [
  { text: '$ levi deploy --production', tone: 'text-white/85' },
  { text: '✓ build passed', tone: 'text-[#4ade80]' },
  { text: '✓ checks passed', tone: 'text-[#4ade80]' },
  { text: `✓ live → ${live.url ? new URL(live.url).host : live.name}`, tone: 'text-cyan' },
];
const TOTAL = LINES.reduce((sum, line) => sum + line.text.length, 0);

/** A small terminal that types out a deployment. */
function Terminal() {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? TOTAL : 0);

  useEffect(() => {
    if (typed >= TOTAL) return;
    const timer = window.setTimeout(() => setTyped((count) => count + 1), typed === 0 ? 1400 : 32);
    return () => window.clearTimeout(timer);
  }, [typed]);

  let remaining = typed;
  return (
    <div className="w-[300px] overflow-hidden rounded-xl border border-white/10 bg-navy-deep/95 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur">
      <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-3 py-2">
        {[0, 1, 2].map((dot) => <span key={dot} className="h-2 w-2 rounded-full bg-white/15" />)}
        <span className="ml-2 font-mono text-[10px] text-white/35">terminal</span>
      </div>
      <div className="min-h-[104px] space-y-1 p-4 font-mono text-[11.5px] leading-relaxed">
        {LINES.map((line) => {
          const shown = line.text.slice(0, Math.max(0, remaining));
          const isCurrent = remaining > 0 && remaining <= line.text.length;
          remaining -= line.text.length;
          if (!shown) return null;
          return (
            <p key={line.text} className={line.tone}>
              {shown}
              {isCurrent && typed < TOTAL && <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-blink bg-cyan" />}
            </p>
          );
        })}
        {typed >= TOTAL && <span className="inline-block h-3 w-1.5 animate-blink bg-cyan" />}
      </div>
    </div>
  );
}

/** Layered, cursor-tilted stack of real project screenshots. */
export default function HeroVisual({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const rotateY = useTransform(mx, [-0.5, 0.5], reduce ? [-6, -6] : [-14, 2]);
  const rotateX = useTransform(my, [-0.5, 0.5], reduce ? [6, 6] : [12, 0]);

  return (
    <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1.3, ease }} className="relative" style={{ perspective: 1800 }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative pb-10 pt-6">
        {building && (
          <div className="absolute right-0 top-0 w-[74%] opacity-60" style={{ transform: 'translateZ(-90px)' }}>
            <BrowserFrame project={building} dark eager />
          </div>
        )}
        <div className="relative mt-[22%] w-[90%]" style={{ transform: 'translateZ(0px)' }}>
          <div className="absolute -inset-6 -z-10 rounded-[28px] bg-blue/30 blur-3xl" />
          <BrowserFrame project={live} dark eager className="shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85)]" />
        </div>
        <div className="absolute -left-10 bottom-0" style={{ transform: 'translateZ(80px)' }}>
          <Terminal />
        </div>
        <div className="absolute right-[6%] top-[30%] flex items-center gap-2 rounded-full border border-white/15 bg-navy/80 px-3.5 py-2 font-mono text-[11px] text-white shadow-xl backdrop-blur" style={{ transform: 'translateZ(120px)' }}>
          <span className="h-1.5 w-1.5 rounded-full bg-live shadow-[0_0_10px_2px_rgb(18_183_106/0.6)]" />
          {live.name} · live
        </div>
      </motion.div>
    </motion.div>
  );
}

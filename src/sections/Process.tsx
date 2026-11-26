import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { steps } from '../data/content';
import { FadeIn, RevealLines } from '../components/ui/motion';

/** A timeline whose line fills, and whose diamonds light up, as the section scrolls past. */
export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const [reached, setReached] = useState(-1);
  useMotionValueEvent(scrollYProgress, 'change', (value) => setReached(Math.floor(value * (steps.length - 1) + 0.15)));

  return (
    <section id="process" className="relative py-28 sm:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <FadeIn><p className="label">How we work · [04]</p></FadeIn>
            <h2 className="mt-5 text-4xl font-bold leading-[1.08] sm:text-[3.4rem]">
              <RevealLines inView lines={['From idea to launch,', 'step by step.']} />
            </h2>
          </div>
          <FadeIn delay={0.1} className="max-w-md text-muted lg:justify-self-end">
            A clear, predictable process, so you always know what’s happening and what comes next.
          </FadeIn>
        </div>

        <div ref={ref} className="relative mt-20">
          {/* Track and fill: horizontal on large screens, vertical below. */}
          <div className="absolute left-0 right-0 top-[11px] hidden h-px bg-line lg:block" />
          <motion.div className="bg-gradient-brand absolute left-0 right-0 top-[11px] hidden h-px origin-left lg:block" style={{ scaleX: progress }} />
          <div className="absolute bottom-0 left-[11px] top-0 w-px bg-line lg:hidden" />
          <motion.div className="bg-gradient-brand absolute bottom-0 left-[11px] top-0 w-px origin-top lg:hidden" style={{ scaleY: progress }} />

          <ol className="grid gap-12 lg:grid-cols-6 lg:gap-6">
            {steps.map((step, index) => {
              const on = index <= reached;
              return (
                <li key={step.title} className="relative pl-12 lg:pl-0">
                  <span className={`absolute left-0 top-0 flex h-6 w-6 items-center justify-center lg:relative`}>
                    <span className={`absolute inset-[3px] rotate-45 rounded-[4px] border-2 transition-all duration-500 ${on ? 'border-transparent bg-gradient-brand shadow-[0_0_0_6px_rgb(22_119_255/0.12)]' : 'border-line bg-white'}`} />
                  </span>
                  <p className={`mt-0 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 lg:mt-7 ${on ? 'text-blue' : 'text-muted'}`}>Step {String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

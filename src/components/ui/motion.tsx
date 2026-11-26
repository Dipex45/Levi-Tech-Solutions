import { type MouseEvent, type ReactNode, useRef } from 'react';
import { motion, type MotionValue, useReducedMotion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion';

export const ease = [0.16, 1, 0.3, 1] as const;

/** Fades, lifts and un-blurs its children into view once. */
export function FadeIn({ children, className, delay = 0, y = 24 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

const group = (gap: number): Variants => ({ hidden: {}, show: { transition: { staggerChildren: gap } } });
const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease }, transitionEnd: { filter: 'none' } },
};

export function Stagger({ children, className, gap = 0.08 }: { children: ReactNode; className?: string; gap?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={group(gap)} initial={reduce ? 'show' : 'hidden'} whileInView="show" viewport={{ once: true, margin: '-60px' }}>
      {children}
    </motion.div>
  );
}

export function Item({ children, className }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} variants={item}>{children}</motion.div>;
}

/** Each line slides up from behind a mask, one after another. */
export function RevealLines({ lines, delay = 0, inView = false }: { lines: ReactNode[]; delay?: number; inView?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <>
      {lines.map((line, index) => (
        <span key={index} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: '115%' }}
            {...(inView ? { whileInView: { y: '0%' }, viewport: { once: true, margin: '-60px' } } : { animate: { y: '0%' } })}
            transition={{ duration: 1.05, delay: delay + index * 0.09, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/** Gently pulls its child towards the cursor. */
export function Magnetic({ children, strength = 0.3, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });
  const move = (event: MouseEvent<HTMLSpanElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.span className={`inline-flex ${className}`} style={{ x, y }} onMouseMove={move} onMouseLeave={reset}>
      {children}
    </motion.span>
  );
}

/** Card wrapper whose soft highlight follows the cursor (see .spotlight in index.css). */
export function Spotlight({ children, className = '' }: { children: ReactNode; className?: string }) {
  const move = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };
  return <div className={`spotlight ${className}`} onMouseMove={move}>{children}</div>;
}

/** Tilts its child in 3D towards the cursor. */
export function Tilt({ children, className = '', max = 5 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 140, damping: 16 });
  const rotateY = useSpring(0, { stiffness: 140, damping: 16 });
  const move = (event: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * max * 2);
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * max * 2);
  };
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };
  return (
    <div className={className} style={{ perspective: 1200 }} onMouseMove={move} onMouseLeave={reset}>
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>{children}</motion.div>
    </div>
  );
}

/** A paragraph whose words light up one by one as it scrolls through the screen. */
export function ScrollText({ segments, className = '' }: { segments: { text: string; className?: string }[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 50%'] });
  const words = segments.flatMap((segment) => segment.text.split(' ').filter(Boolean).map((word) => ({ word, className: segment.className })));
  return (
    <p ref={ref} className={className}>
      {words.map((entry, index) => (
        <Word key={index} progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]} className={entry.className}>
          {entry.word}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range, className = '' }: { children: string; progress: MotionValue<number>; range: [number, number]; className?: string }) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity: reduce ? 1 : opacity }} className={`mr-[0.26em] inline-block ${className}`}>{children}</motion.span>;
}

/** Diamond outline (the logo's shape) with content kept upright inside. */
export function Diamond({ children, className = '', active = false }: { children?: ReactNode; className?: string; active?: boolean }) {
  return (
    <span className={`relative flex shrink-0 items-center justify-center ${className}`}>
      <span className={`absolute inset-[14%] rotate-45 rounded-[22%] border transition-all duration-500 ${active ? 'border-transparent bg-gradient-brand shadow-[0_8px_24px_-8px_rgb(22_119_255/0.7)]' : 'border-current opacity-40'}`} />
      <span className="relative">{children}</span>
    </span>
  );
}

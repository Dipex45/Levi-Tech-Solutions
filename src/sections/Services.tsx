import { motion } from 'framer-motion';
import { services, type Service } from '../data/content';
import { ease, FadeIn, Item, RevealLines, Spotlight, Stagger } from '../components/ui/motion';

/* Small illustrations, one per service. Pure CSS shapes, animated on hover or when scrolled into view. */

function WebIllustration() {
  return (
    <div className="rounded-xl border border-line bg-white p-3 shadow-[0_20px_40px_-24px_rgb(7_21_46/0.25)]">
      <div className="flex items-center gap-2 border-b border-line pb-2.5">
        <span className="h-2 w-10 rounded-full bg-ink/80" />
        <span className="ml-auto h-1.5 w-6 rounded-full bg-line" />
        <span className="h-1.5 w-6 rounded-full bg-line" />
        <span className="h-4 w-10 rounded-full bg-gradient-brand" />
      </div>
      <div className="mt-3 grid grid-cols-[1.3fr_1fr] gap-3">
        <div className="space-y-2 pt-1">
          <span className="block h-2.5 w-11/12 rounded-full bg-ink/80" />
          <span className="block h-2.5 w-3/4 rounded-full bg-ink/80" />
          <span className="block h-1.5 w-full rounded-full bg-line" />
          <span className="block h-1.5 w-5/6 rounded-full bg-line" />
          <span className="mt-1 block h-4 w-16 rounded-full bg-blue" />
        </div>
        <div className="rounded-lg bg-gradient-to-br from-cyan/30 to-blue/40" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((card) => (
          <span key={card} className="h-10 rounded-lg border border-line bg-mist transition-transform duration-500 group-hover:-translate-y-1" style={{ transitionDelay: `${card * 70}ms` }} />
        ))}
      </div>
    </div>
  );
}

function AppIllustration() {
  const bars = [48, 72, 56, 88, 64, 96, 80];
  return (
    <div className="flex h-full min-h-[260px] overflow-hidden rounded-xl border border-white/10 bg-navy shadow-[0_24px_48px_-24px_rgb(7_21_46/0.6)]">
      <div className="flex w-12 flex-col items-center gap-3 border-r border-white/10 py-4">
        <span className="h-5 w-5 rotate-45 rounded-[5px] bg-gradient-brand" />
        {[0, 1, 2, 3].map((dot) => <span key={dot} className={`h-1.5 w-5 rounded-full ${dot === 0 ? 'bg-cyan' : 'bg-white/15'}`} />)}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="grid grid-cols-3 gap-2">
          {['bg-cyan', 'bg-blue', 'bg-[#4ade80]'].map((tone) => (
            <div key={tone} className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
              <span className="block h-1.5 w-8 rounded-full bg-white/20" />
              <span className={`mt-2 block h-2.5 w-10 rounded-full ${tone}`} />
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3">
          {bars.map((height, index) => (
            <motion.span
              key={index}
              className="flex-1 rounded-t-[4px] bg-gradient-to-t from-blue to-cyan"
              initial={{ height: '8%' }}
              whileInView={{ height: `${height}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.2 + index * 0.07, ease }}
            />
          ))}
        </div>
        <div className="space-y-1.5">
          {[0, 1].map((row) => (
            <div key={row} className="flex items-center gap-2 rounded-md bg-white/[0.04] px-2.5 py-2">
              <span className="h-4 w-4 rounded-full bg-white/15" />
              <span className="h-1.5 w-20 rounded-full bg-white/20" />
              <span className="ml-auto h-3.5 w-10 rounded-full bg-cyan/25" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShopIllustration() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 rounded-xl border border-line bg-white p-2.5 shadow-[0_16px_32px_-20px_rgb(7_21_46/0.3)]">
        <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-cyan/25 to-blue/35" />
        <span className="mt-2.5 block h-1.5 w-3/4 rounded-full bg-ink/70" />
        <div className="mt-2 flex items-center justify-between">
          <span className="h-2 w-8 rounded-full bg-blue" />
          <span className="flex h-6 items-center rounded-full bg-ink px-2.5 text-[9px] font-semibold text-white transition-colors duration-300 group-hover:bg-blue">Add to cart</span>
        </div>
      </div>
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-white">
        <span className="h-5 w-6 rounded-b-md border-2 border-t-0 border-ink/70" />
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-brand font-mono text-[10px] font-medium text-white transition-transform duration-300 group-hover:scale-125">1</span>
      </div>
    </div>
  );
}

function SpeedIllustration() {
  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 120 70" className="w-40" aria-hidden="true">
        <defs>
          <linearGradient id="gauge" x1="0" x2="1">
            <stop offset="0" stopColor="#35c7ff" />
            <stop offset="1" stopColor="#1677ff" />
          </linearGradient>
        </defs>
        <path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="#e2e8f2" strokeWidth="9" strokeLinecap="round" />
        <motion.path
          d="M10 62 A50 50 0 0 1 110 62"
          fill="none"
          stroke="url(#gauge)"
          strokeWidth="9"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 0.92 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.2, ease }}
        />
        <motion.g initial={{ rotate: -90 }} whileInView={{ rotate: 75 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.2, ease }} style={{ originX: 0.5, originY: 1 }}>
          <line x1="60" y1="62" x2="60" y2="24" stroke="#07152e" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
        <circle cx="60" cy="62" r="5" fill="#07152e" />
      </svg>
    </div>
  );
}

const illustrations = [WebIllustration, AppIllustration, ShopIllustration, SpeedIllustration];
const layout = ['lg:col-span-2', 'lg:row-span-2', '', ''];

function ServiceTile({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const Illustration = illustrations[index];
  const tall = index === 1;
  return (
    <Spotlight className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 transition-[border-color,box-shadow] duration-500 hover:border-blue/30 hover:shadow-[0_30px_60px_-30px_rgb(22_119_255/0.35)] ${index === 0 ? 'lg:flex-row lg:items-center lg:gap-10' : ''}`}>
      <div className={index === 0 ? 'lg:w-[44%]' : ''}>
        <div className="flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-mist text-blue transition-all duration-500 group-hover:border-transparent group-hover:bg-gradient-brand group-hover:text-white">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="font-mono text-[11px] text-muted">0{index + 1}</span>
        </div>
        <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{service.desc}</p>
      </div>
      <div className={`mt-8 ${index === 0 ? 'lg:mt-0 lg:flex-1' : ''} ${tall ? 'flex-1' : ''}`}>
        <Illustration />
      </div>
    </Spotlight>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative isolate overflow-hidden bg-mist py-28 sm:py-36">
      <div className="dots-ink fade-edges absolute inset-0 -z-10" />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <FadeIn><p className="label">Our services · [02]</p></FadeIn>
            <h2 className="mt-5 text-4xl font-bold leading-[1.08] sm:text-[3.4rem]">
              <RevealLines inView lines={['Everything you need', 'to succeed online.']} />
            </h2>
          </div>
          <FadeIn delay={0.15} className="max-w-sm text-muted">
            From a polished company website to a full custom platform, we handle design, development and launch.
          </FadeIn>
        </div>

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.1}>
          {services.map((service, index) => (
            <Item key={service.title} className={layout[index]}>
              <ServiceTile service={service} index={index} />
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

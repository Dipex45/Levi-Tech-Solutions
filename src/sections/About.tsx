import { projects } from '../data/projects';
import { values } from '../data/content';
import { Diamond, FadeIn, Item, ScrollText, Stagger } from '../components/ui/motion';

const stack = [...new Set(projects.flatMap((project) => project.tech))];

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <FadeIn className="lg:col-span-3">
          <p className="label">About us</p>
          <p className="mt-4 font-mono text-xs text-muted">[01]</p>
        </FadeIn>
        <div className="lg:col-span-9">
          <ScrollText
            className="font-display text-[1.75rem] font-semibold leading-[1.3] tracking-[-0.03em] sm:text-4xl sm:leading-[1.25] lg:text-[2.75rem]"
            segments={[
              { text: 'Levi Tech Solutions is a' },
              { text: 'digital product development', className: 'text-gradient' },
              { text: 'company. We design and develop professional websites and custom web applications, and help businesses turn ideas into' },
              { text: 'working products', className: 'text-gradient' },
              { text: 'that look sharp, work reliably and grow with them.' },
            ]}
          />

          <Stagger className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {values.map((value, index) => (
              <Item key={value.title} className="group bg-white p-7 transition-colors duration-500 hover:bg-mist">
                <Diamond className="h-11 w-11 text-blue">
                  <span className="font-mono text-[11px] font-medium">0{index + 1}</span>
                </Diamond>
                <h3 className="mt-6 text-xl font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.desc}</p>
              </Item>
            ))}
          </Stagger>

          <FadeIn className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center" delay={0.1}>
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Our stack</span>
            <span className="hidden h-px w-10 bg-line sm:block" />
            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => <span key={tech} className="chip-mono border-line bg-mist text-ink/75">{tech}</span>)}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

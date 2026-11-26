import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { reasons } from '../data/content';
import { FadeIn, Item, Magnetic, RevealLines, Stagger } from '../components/ui/motion';

export default function Why() {
  return (
    <section id="why" className="relative bg-mist py-28 sm:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <FadeIn><p className="label">Why choose us · [05]</p></FadeIn>
            <h2 className="mt-5 text-4xl font-bold leading-[1.08] sm:text-[3.4rem]">
              <RevealLines inView lines={['Built properly,', 'from the first line.']} />
            </h2>
            <FadeIn delay={0.1} className="mt-6 max-w-sm text-muted">We treat every website and app as a product that has to perform, not a page that just has to exist.</FadeIn>
            <FadeIn delay={0.2} className="mt-9">
              <Magnetic>
                <Link to="/#contact" className="btn-ink">Start a project <ArrowRight className="h-4 w-4" /></Link>
              </Magnetic>
            </FadeIn>
          </div>
        </div>

        <Stagger className="border-b border-line lg:col-span-7" gap={0.07}>
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Item key={reason.title}>
                <div className="group relative grid grid-cols-[auto_1fr] gap-6 border-t border-line py-8 sm:gap-10">
                  <span className="absolute inset-y-0 -left-4 -right-4 -z-0 origin-left scale-x-0 rounded-2xl bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 sm:-left-6 sm:-right-6" />
                  <span className="relative font-mono text-sm text-muted transition-colors duration-300 group-hover:text-blue">/{String(index + 1).padStart(2, '0')}</span>
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-blue" strokeWidth={1.75} />
                      <h3 className="text-xl font-semibold sm:text-2xl">{reason.title}</h3>
                    </div>
                    <p className="mt-2 max-w-lg leading-relaxed text-muted">{reason.desc}</p>
                  </div>
                </div>
              </Item>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

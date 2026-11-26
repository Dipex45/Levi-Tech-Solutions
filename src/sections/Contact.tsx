import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, MessageCircle } from 'lucide-react';
import { site, whatsappUrl } from '../lib/site';
import ContactForm from '../components/ContactForm';
import { FadeIn, RevealLines, Spotlight } from '../components/ui/motion';

const nextSteps = ['Tell us about your project.', 'We discuss scope, features and timeline.', 'You get a clear quote before any work begins.'];

function EmailCard() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };
  return (
    <Spotlight className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 [--spot:rgb(53_199_255/0.12)]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-cyan"><Mail className="h-5 w-5" strokeWidth={1.75} /></span>
      <a href={`mailto:${site.email}`} className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">Email</span>
        <span className="block truncate font-medium text-white hover:text-cyan">{site.email}</span>
      </a>
      <button type="button" onClick={copy} className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-white/10 px-3 font-mono text-[11px] text-white/60 transition-colors hover:border-white/25 hover:text-white" aria-label="Copy email address">
        {copied ? <><Check className="h-3.5 w-3.5 text-[#4ade80]" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
      </button>
    </Spotlight>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-navy py-28 text-white sm:py-36">
      <div className="dots fade-edges absolute inset-0 -z-10 opacity-70" />
      <div className="absolute -left-40 top-1/3 -z-10 h-[34rem] w-[34rem] animate-drift rounded-full bg-blue/20 blur-[130px]" />
      <div className="absolute -right-40 bottom-0 -z-10 h-[28rem] w-[28rem] animate-drift rounded-full bg-cyan/10 blur-[130px] [animation-delay:-7s]" />

      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <FadeIn><p className="label label-light">Start a project · [06]</p></FadeIn>
          <h2 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-6xl">
            <RevealLines inView lines={['Let’s build', <span key="t" className="text-gradient">together.</span>]} />
          </h2>
          <FadeIn delay={0.1} className="mt-6 max-w-md text-lg text-white/60">Tell us what you have in mind. We’ll talk it through and send you a clear quote.</FadeIn>

          <FadeIn delay={0.15} className="mt-10 space-y-3">
            <EmailCard />
            <Spotlight className="rounded-2xl border border-white/10 bg-white/[0.03] [--spot:rgb(53_199_255/0.12)]">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#4ade80]"><MessageCircle className="h-5 w-5" strokeWidth={1.75} /></span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">WhatsApp</span>
                  <span className="block font-medium text-white group-hover:text-cyan">{site.phoneDisplay}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-white/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </a>
            </Spotlight>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">What happens next</p>
            <ol className="mt-5 space-y-4">
              {nextSteps.map((text, index) => (
                <li key={text} className="flex items-center gap-4 text-white/70">
                  <span className="relative flex h-8 w-8 shrink-0 items-center justify-center font-mono text-[11px] text-white">
                    <span className="bg-gradient-brand absolute inset-[15%] rotate-45 rounded-[5px]" />
                    <span className="relative">{index + 1}</span>
                  </span>
                  {text}
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <div className="gradient-border rounded-[28px] bg-white/[0.04] p-6 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-9">
            <h3 className="text-2xl font-semibold">Project enquiry</h3>
            <p className="mt-1.5 text-sm text-white/50">A few details help us give you an accurate quote.</p>
            <div className="mt-8"><ContactForm /></div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

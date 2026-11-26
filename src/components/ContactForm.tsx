import { type FormEvent, useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { projectTypes } from '../data/content';
import { site, whatsappLink } from '../lib/site';

/**
 * Project enquiry form. The site has no server, so sending opens the visitor's email app
 * or WhatsApp with the enquiry already written out.
 */
export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', type: projectTypes[0], message: '' });
  const [sent, setSent] = useState<'email' | 'whatsapp' | null>(null);
  const update = (key: keyof typeof form) => (event: { target: { value: string } }) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const channel = ((event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.dataset.channel === 'whatsapp' ? 'whatsapp' : 'email';
    const body = `Hi ${site.name},\n\nName: ${form.name}\nEmail: ${form.email}\nProject type: ${form.type}\n\n${form.message}`;
    if (channel === 'whatsapp') window.open(whatsappLink(body), '_blank', 'noopener');
    else window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry: ${form.type}`)}&body=${encodeURIComponent(body)}`;
    setSent(channel);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label-dark">Your name</label>
          <input id="contact-name" required autoComplete="name" value={form.name} onChange={update('name')} placeholder="Jane Doe" className="field-dark" />
        </div>
        <div>
          <label htmlFor="contact-email" className="field-label-dark">Email address</label>
          <input id="contact-email" type="email" required autoComplete="email" value={form.email} onChange={update('email')} placeholder="jane@company.com" className="field-dark" />
        </div>
      </div>

      <fieldset>
        <legend className="field-label-dark">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <label key={type} className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cyan ${form.type === type ? 'border-transparent bg-gradient-brand text-white shadow-[0_8px_20px_-8px_rgb(22_119_255/0.7)]' : 'border-white/10 bg-white/[0.03] text-white/65 hover:border-white/25 hover:text-white'}`}>
              <input type="radio" name="project-type" value={type} checked={form.type === type} onChange={update('type')} className="sr-only" />
              {type}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="contact-message" className="field-label-dark">Tell us about your project</label>
        <textarea id="contact-message" required rows={5} value={form.message} onChange={update('message')} placeholder="What you want to build, who it’s for, and any deadline." className="field-dark resize-y" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" data-channel="email" className="btn-primary flex-1 py-4">Send enquiry <ArrowRight className="h-4 w-4" /></button>
        <button type="submit" data-channel="whatsapp" className="btn-ghost-dark flex-1 py-4"><MessageCircle className="h-4 w-4" /> Send on WhatsApp</button>
      </div>

      {sent && (
        <p role="status" className="rounded-xl border border-cyan/20 bg-cyan/[0.06] p-3.5 text-sm text-white/75">
          {sent === 'email'
            ? <>Your email app should open with the message ready to send. If it doesn’t, write to <a href={`mailto:${site.email}`} className="font-semibold text-cyan underline-offset-2 hover:underline">{site.email}</a>.</>
            : 'WhatsApp should open in a new tab with your message ready to send.'}
        </p>
      )}
    </form>
  );
}

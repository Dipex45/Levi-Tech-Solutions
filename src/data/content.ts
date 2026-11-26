import { Cpu, Gauge, Globe, LayoutDashboard, LifeBuoy, MonitorSmartphone, ShieldCheck, ShoppingBag, Zap, type LucideIcon } from 'lucide-react';

/** Copy for the home-page sections. Web design and development only. */

export interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const services: Service[] = [
  { icon: Globe, title: 'Website design & development', desc: 'Fast, responsive business websites designed around your brand and built to turn visitors into customers.' },
  { icon: LayoutDashboard, title: 'Custom web applications', desc: 'Booking systems, dashboards, portals and SaaS platforms, built around how your business actually works.' },
  { icon: ShoppingBag, title: 'E-commerce solutions', desc: 'Online stores with secure payments, product management and a smooth checkout on every device.' },
  { icon: Gauge, title: 'Maintenance & optimisation', desc: 'Updates, fixes, speed improvements and security care to keep your website or app at its best.' },
];

export const steps = [
  { title: 'Discovery', desc: 'We learn your business, your customers and what the project needs to achieve.' },
  { title: 'Planning', desc: 'We agree the scope, pages, features, timeline and cost before any building starts.' },
  { title: 'Development', desc: 'We design and build in stages, sharing progress so you see the work as it grows.' },
  { title: 'Testing', desc: 'We check every page and feature on phones, tablets and desktops before launch.' },
  { title: 'Deployment', desc: 'We launch on fast, reliable hosting and connect your domain.' },
  { title: 'Support', desc: 'We stay on hand after launch for updates, fixes and improvements.' },
];

export const reasons: Service[] = [
  { icon: Cpu, title: 'Modern technology', desc: 'Built with current, proven tools such as React, TypeScript and Node.js.' },
  { icon: Zap, title: 'Performance-focused', desc: 'Pages that load quickly and stay smooth, because speed affects sales.' },
  { icon: MonitorSmartphone, title: 'Responsive interfaces', desc: 'Layouts that look and work right on every screen size.' },
  { icon: ShieldCheck, title: 'Reliable delivery', desc: 'Clear plans, honest updates and working software at the end.' },
  { icon: LifeBuoy, title: 'Ongoing support', desc: 'Help after launch, so your site keeps improving instead of going stale.' },
];

export const values = [
  { title: 'Craft', desc: 'Clean design and solid engineering in every detail.' },
  { title: 'Clarity', desc: 'Plain communication and no surprises on scope or cost.' },
  { title: 'Ownership', desc: 'We treat your project as if our name is on it, because it is.' },
];

export const projectTypes = ['Business website', 'Web application', 'E-commerce store', 'Maintenance', 'Something else'];

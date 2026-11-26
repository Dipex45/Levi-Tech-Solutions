import { site } from '../lib/site';

/** The Levi Tech Solutions logo. White artwork, so only place it on navy or other dark backgrounds. */
export default function Logo({ full = false, className = '' }: { full?: boolean; className?: string }) {
  return <img src={full ? site.logo : site.logoCompact} alt={site.name} width={full ? 1000 : 800} height={full ? 274 : 219} className={`w-auto object-contain ${className}`} />;
}

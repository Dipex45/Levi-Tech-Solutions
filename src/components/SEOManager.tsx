import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '../lib/site';
import { findProject } from '../data/projects';

const siteUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '');

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

/** Keeps the page title, description, canonical link and social preview in step with the route. */
export default function SEOManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const project = pathname.startsWith('/work/') ? findProject(pathname.split('/')[2]) : undefined;
    const title = project ? `${project.name} | ${site.name}` : `${site.name} | ${site.slogan}`;
    const description = project ? project.tagline : site.summary;
    const image = `${siteUrl}${project?.image || '/brand/og-image.png'}`;
    const url = `${siteUrl}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [pathname]);

  return null;
}

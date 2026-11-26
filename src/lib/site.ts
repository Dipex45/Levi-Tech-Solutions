/** Business details shown across the site. Change them here only. */
export const site = {
  name: 'Levi Tech Solutions',
  slogan: 'Building Digital Excellence',
  /** Full logo (with slogan) and a navbar version without it. Both are white artwork for dark backgrounds. */
  logo: '/brand/logo.png',
  logoCompact: '/brand/logo-compact.png',
  summary: 'Levi Tech Solutions designs and develops professional websites and custom web applications for businesses that want to grow online.',
  email: 'dipex.do@gmail.com',
  /** International format, used for WhatsApp links. */
  whatsapp: '+2349038272014',
  phoneDisplay: '+234 903 827 2014',
};

export const whatsappLink = (message: string) =>
  site.whatsapp ? `https://wa.me/${site.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}` : '';

export const whatsappUrl = whatsappLink(`Hi ${site.name}, I'd like to talk about a project.`);

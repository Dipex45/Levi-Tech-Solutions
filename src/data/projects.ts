import { Archive, Fingerprint, MessagesSquare, Webhook, Workflow } from 'lucide-react';

/**
 * Portfolio case studies, in display order. Only real web projects go here:
 * `live` = deployed and public, `in-development` = actively being built.
 * To add one: copy an entry, give it a unique slug, and drop a 1440x900 screenshot in /public/projects.
 */
export type ProjectStatus = 'live' | 'in-development';

export const statusLabel: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-development': 'In development',
};

export interface Project {
  slug: string;
  name: string;
  category: string;
  year: string;
  status: ProjectStatus;
  tagline: string;
  challenge: string;
  solution: string;
  features: string[];
  outcome: string;
  tech: string[];
  url?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    slug: 'blm-motors',
    name: 'BLM Motors',
    category: 'Transport & logistics platform',
    year: '2026',
    status: 'live',
    tagline: 'A booking platform for passenger and goods transport across West Africa.',
    challenge:
      'A transport company running passenger trips, car hire, tours and goods deliveries across Nigeria, Benin, Togo and Ghana needed one place where customers could see a price, book and pay, and where the team could run the whole operation.',
    solution:
      'We designed and built a full booking platform: a public website that presents each service and route, booking flows for passengers and goods with live pricing, online payment, trip tracking, and a staff dashboard for bookings, drivers, payments and prices.',
    features: [
      'Passenger and goods booking workflows',
      'Live pricing from real road distances and exchange rates',
      'Online payments by card and Paystack',
      'Trip tracking with a booking number',
      'Staff dashboard for bookings, drivers, payments and prices',
      'Google and email sign-in, English and French, multiple currencies',
    ],
    outcome: 'Deployed and live, serving routes from Lagos to Cotonou, Lomé and Accra.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Firebase', 'Stripe', 'Vercel'],
    url: 'https://blm-v1.vercel.app',
    image: '/projects/blm-motors.png',
  },
  {
    slug: 'aurelia',
    name: 'Aurelia',
    category: 'Business operations SaaS',
    year: '2026',
    status: 'in-development',
    tagline: 'A multi-tenant platform for customer support and business operations.',
    challenge:
      'Growing teams handle customer conversations across WhatsApp, email and personal notes. Replies get missed, context is lost between teammates, and there is no clear record of who did what.',
    solution:
      'Aurelia brings conversations, customer profiles, team notes and saved answers into one shared workspace, with role-based access, audit history and AI replies grounded in each business’s own knowledge base.',
    features: [
      'Workspace management with multiple teams',
      'Shared inbox, ticketing and support workflows',
      'Role-based access control',
      'Audit logs and search',
      'Real-time updates across the team',
      'WhatsApp, AI-assisted replies and payment integrations',
    ],
    outcome: 'In active development. A working preview is online while features are completed and tested.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Socket.IO', 'OpenAI'],
    url: 'https://aurelia-v1-zqup.vercel.app',
    image: '/projects/aurelia.png',
  },
];

/** Planned web products, shown as "Coming soon". Not presented as built or launched. */
export const upcoming = [
  {
    name: 'Levi Solutions Command Centre',
    icon: Workflow,
    brief: 'An AI-assisted platform for client acquisition and business automation: lead discovery, outreach, CRM follow-ups and proposal pipelines.',
  },
  {
    name: 'Atlas API',
    icon: Webhook,
    brief: 'Shared API infrastructure to connect the products in the Levi Tech ecosystem.',
  },
  {
    name: 'Sentinel ID',
    icon: Fingerprint,
    brief: 'Identity, authentication and security infrastructure for web applications.',
  },
  {
    name: 'Pulse Collab',
    icon: MessagesSquare,
    brief: 'A collaboration and team communication product.',
  },
  {
    name: 'Nova Archive',
    icon: Archive,
    brief: 'A digital storage and archiving product for documents and files.',
  },
];

export const findProject =(slug: string | undefined) => projects.find((project) => project.slug === slug);

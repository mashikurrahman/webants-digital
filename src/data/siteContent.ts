// DEMO CONTENT — REPLACE BEFORE PUBLISHING

export interface ClientLogo {
  id: string;
  name: string;
  tagline: string;
  industry: string;
}

export interface PartnerLogo {
  id: string;
  name: string;
  type: string;
}

export interface PlatformItem {
  name: string;
  category: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  headline: string;
  shortDesc: string;
  items: string[];
  image: string;
  route: string;
  packages?: {
    name: string;
    desc: string;
    price: string;
    features: string[];
  }[];
  workflowExample?: {
    title: string;
    steps: string[];
  };
}

export interface CaseStudyAsset {
  name: string;
  type: 'Design Spec' | 'Brand Kit' | 'Code Blueprint' | 'Video Reel' | 'Analytics Report' | 'PDF Deck';
  size: string;
  format: string;
  description: string;
  previewUrl?: string;
}

export interface CaseStudyGalleryItem {
  url: string;
  caption: string;
  tag: string;
}

/**
 * How far a claim about a project can be trusted. Taken from the portfolio's own
 * evidence policy, which is deliberately stricter than a normal case study:
 * a polished demonstration interface is not automatically a production backend,
 * and a repository containing deployment components is not automatically a
 * currently operating public service.
 */
export type ProjectEvidence = 'source-verified' | 'deployment-verified' | 'reconstructed';

export const EVIDENCE_META: Record<ProjectEvidence, { label: string; short: string; note: string }> = {
  'deployment-verified': {
    label: 'Deployment-verified',
    short: 'Deployed',
    note: 'The feature is observable in the live application.'
  },
  'source-verified': {
    label: 'Source-verified',
    short: 'Source',
    note: 'The implementation is visible in a public repository or notebook.'
  },
  reconstructed: {
    label: 'Reconstructed',
    short: 'Reconstructed',
    note: 'No source was supplied; the architecture is an informed reconstruction.'
  }
};

export interface ProjectStackItem {
  name: string;
  /** Which part of the system this technology is responsible for. */
  layer: string;
}

export interface ProjectBuildStep {
  title: string;
  detail: string;
  /** The stack entry this step brings online, matched by name. */
  stack?: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  category: 'Growth' | 'Creative' | 'Technology' | 'AI & Automation' | 'Digital Operations';
  industry: string;
  services: string[];
  results: string[];
  /** Product screenshot. Absent where the artifact has no public interface. */
  image?: string;
  summary: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  timeline?: string;
  squad?: string[];
  techStack?: string[];
  gallery?: CaseStudyGalleryItem[];
  video?: {
    title: string;
    url: string;
    poster: string;
    duration: string;
  };
  assets?: CaseStudyAsset[];

  // ── Project record ────────────────────────────────────────────────────────
  /** Display index, renumbered 01–13 for the site. */
  number?: string;
  evidence?: ProjectEvidence;
  liveUrl?: string;
  repoUrl?: string;
  notebookUrl?: string;
  /** How the evidence is cited when no public URL is available. */
  sourceLabel?: string;
  /** What the artifact actually is today, stated without upgrade. */
  maturity?: string;
  /** What the work proves, and what it does not prove yet. */
  outcome?: string;
  /** Section accent — sampled from the project's own interface where one is live. */
  accent?: string;
  stack?: ProjectStackItem[];
  buildSteps?: ProjectBuildStep[];
  /** One line per layer of the system, top to bottom. Connectors are drawn by the UI. */
  architecture?: string[];
  /** What the build had to do, in the user's terms. */
  requirements?: string[];
  /** The non-functional bar the work had to clear. */
  qualityBar?: { label: string; items: string[] };
  /** How it ships today, and what a production release would additionally demand. */
  deployment?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  platform: 'Google' | 'Upwork' | 'Clutch' | 'LinkedIn' | 'Facebook';
  quote: string;
  date: string;
}

export interface VideoTestimonial {
  id: string;
  client: string;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
  videoUrlPlaceholder: string;
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  salary: string;
  hours: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
}

export interface InsightArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string;
  date: string;
  image: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  challenge: string;
  relevantServices: string[];
  caseStudyTitle: string;
  caseStudyResult: string;
  testimonialQuote: string;
  testimonialAuthor: string;
  image: string;
}

export const siteContent = {
  // DEMO CONTENT — REPLACE BEFORE PUBLISHING
  company: {
    name: 'Webants Digital',
    tagline: 'Digital Growth, Technology, AI, Automation and Operations Partner',
    email: 'hello@webantsdigital.com',
    location: 'Dhaka, Bangladesh',
    coverage: 'Serving international clients remotely',
    workHours: 'Primary sync hours include 8:00 PM to 4:00 AM Bangladesh time (BST) for US & European overlap.',
    stats: [
      { label: 'Service Departments', value: '5' },
      { label: 'Digital Capabilities', value: '20+' },
      { label: 'Delivery Model', value: 'Global Remote' },
      { label: 'Domain Expertise', value: 'Multi-Industry' }
    ],
    socials: {
      linkedin: 'https://linkedin.com/company/webants-digital',
      facebook: 'https://facebook.com/webantsdigital',
      instagram: 'https://instagram.com/webantsdigital',
      youtube: 'https://youtube.com/@webantsdigital'
    }
  },

  clientLogos: [
    { id: 'northpeak', name: 'NorthPeak Moving', tagline: 'Logistics & Relocation', industry: 'Moving Companies' },
    { id: 'harborline', name: 'Harborline Services', tagline: 'Home & HVAC Solutions', industry: 'Home Services' },
    { id: 'bloomcart', name: 'BloomCart', tagline: 'D2C Consumer Goods', industry: 'E-commerce' },
    { id: 'evernest', name: 'Evernest Realty', tagline: 'Residential & Commercial', industry: 'Real Estate' },
    { id: 'vitalis', name: 'Vitalis Health', tagline: 'Modern Care & Wellness', industry: 'Healthcare' },
    { id: 'apex', name: 'Apex Athletics', tagline: 'Performance Gear', industry: 'Sports & Consumer' },
    { id: 'oakline', name: 'Oakline Legal', tagline: 'Corporate Advisory', industry: 'Professional Services' },
    { id: 'bluenest', name: 'BlueNest Commerce', tagline: 'Global Storefronts', industry: 'E-commerce' }
  ] as ClientLogo[],

  partnerLogos: [
    { id: 'bluearc', name: 'BlueArc Systems', type: 'Cloud Infrastructure' },
    { id: 'novacrm', name: 'NovaCRM', type: 'Sales & CRM Platform' },
    { id: 'growthbridge', name: 'GrowthBridge', type: 'Analytics & Data' },
    { id: 'pixelforge', name: 'PixelForge', type: 'Digital Asset Hub' },
    { id: 'cloudharbor', name: 'CloudHarbor', type: 'Hosting Partner' },
    { id: 'flowworks', name: 'FlowWorks', type: 'Automation Stack' }
  ] as PartnerLogo[],

  platforms: [
    { name: 'WordPress', category: 'CMS & Web' },
    { name: 'Shopify', category: 'E-commerce' },
    { name: 'Webflow', category: 'Design Engine' },
    { name: 'Figma', category: 'UI/UX & Design' },
    { name: 'Adobe', category: 'Creative Suite' },
    { name: 'Canva', category: 'Quick Design' },
    { name: 'Google', category: 'Ads & SEO' },
    { name: 'Meta', category: 'Social Ads' },
    { name: 'GoHighLevel', category: 'CRM & Funnels' },
    { name: 'Zapier', category: 'Workflow Automation' },
    { name: 'Make', category: 'Scenario Engine' },
    { name: 'GitHub', category: 'Code Management' }
  ] as PlatformItem[],

  serviceLines: [
    {
      id: 'growth',
      title: 'Growth',
      headline: 'Turn attention into measurable opportunities.',
      shortDesc: 'SEO, paid advertising, lead generation, direct mail and marketing analytics designed for ROI.',
      items: ['SEO & Local Search', 'Google Ads Management', 'Meta Ads Campaigns', 'B2B Lead Generation', 'Direct Mail Campaigns', 'Analytics & Reporting'],
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      route: 'growth',
      packages: [
        {
          name: 'Visibility Package',
          desc: 'Organic search performance and local business presence.',
          price: '$1,500/mo',
          features: ['Technical SEO Audit', 'Local Map Pack Optimization', 'Monthly Keyword Tracking', '4 High-Intent Blog Posts']
        },
        {
          name: 'Acquisition Package',
          desc: 'Paid media acquisition with conversion-optimized landing pages.',
          price: '$2,200/mo',
          features: ['Google & Meta Ads Setup', 'Custom High-Converting Landing Page', 'Weekly A/B Testing', 'ROAS Dashboard']
        },
        {
          name: 'Growth System',
          desc: 'Full-funnel SEO, paid ads, CRM tracking, and attribution.',
          price: '$3,500/mo',
          features: ['Omnichannel Growth Strategy', 'Full CRM Attribution Setup', 'Direct Mail & Retargeting', 'Dedicated Growth Strategist']
        }
      ]
    },
    {
      id: 'creative',
      title: 'Creative',
      headline: 'Creative built for real business goals.',
      shortDesc: 'Branding, graphic design, video production, motion graphics, and high-impact campaign assets.',
      items: ['Brand Identity Systems', 'Graphic Design & Ads', 'Motion Graphics', 'Video Editing & Reels', 'Direct Mail Design', 'Presentation Decks'],
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
      route: 'creative',
      packages: [
        {
          name: 'Essential Creative Subscription',
          desc: 'Turnkey graphic design and ad creative for active marketing teams.',
          price: '$1,200/mo',
          features: ['Unlimited Graphic Requests', '48-Hour Turnaround', 'Social Media & Ad Banners', 'Brand Guidelines Compliance']
        },
        {
          name: 'Pro Motion & Video Subscription',
          desc: 'Complete video editing, motion graphics, and visual branding.',
          price: '$2,400/mo',
          features: ['Short-Form Video Reels', 'Custom Motion Graphics', 'Product Video Assets', 'Dedicated Lead Designer']
        }
      ]
    },
    {
      id: 'technology',
      title: 'Technology',
      headline: 'Digital platforms built to perform.',
      shortDesc: 'Custom websites, Shopify storefronts, WordPress, Webflow, systems integration, and technical maintenance.',
      items: ['Custom Website Design', 'WordPress Solutions', 'Shopify Store Development', 'Webflow Platforms', 'Landing Page Systems', 'Technical Maintenance'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      route: 'technology',
      packages: [
        {
          name: 'Business Website System',
          desc: 'Ultra-fast high-converting company website.',
          price: '$4,500',
          features: ['Responsive 8-Page Build', 'CMS Integration', 'Core Web Vitals Speed Tier', 'SEO Foundations']
        },
        {
          name: 'Shopify E-commerce Engine',
          desc: 'Custom Shopify theme, upsell workflows, and checkout optimization.',
          price: '$5,500',
          features: ['Custom Shopify Store', 'Payment & Shipping Integration', 'Speed & UX Audit', 'Staff Training']
        }
      ]
    },
    {
      id: 'ai-automation',
      title: 'AI & Automation',
      headline: 'Automate repetitive work. Improve every response.',
      shortDesc: 'AI chatbots, virtual assistants, CRM automation, lead routing, and custom workflow engineering.',
      items: ['AI Lead Chatbots', 'CRM Pipeline Automation', 'Instant Lead Routing', 'Email & SMS Workflows', 'Appointment Scheduling', 'Automated Executive Reports'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      route: 'ai-automation',
      workflowExample: {
        title: 'Instant Lead Conversion Pipeline',
        steps: ['New Inbound Lead', 'CRM Auto-Ingest', 'AI Lead Qualification', 'Instant Rep Assignment', 'Automated SMS/Email Intro', 'Real-Time Executive Alert']
      }
    },
    {
      id: 'digital-operations',
      title: 'Digital Operations',
      headline: 'Ongoing digital support without building a large internal team.',
      shortDesc: 'Social media, content management, CRM support, email marketing, and ongoing website management.',
      items: ['Social Media Management', 'Email Marketing Support', 'CRM Pipeline Maintenance', 'Website Content Updates', 'E-commerce Operations', 'Monthly Performance Audits'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      route: 'digital-operations'
    }
  ] as ServiceDetail[],

  caseStudies: [
    {
      id: 'white-lighting',
      number: '01',
      client: 'White Lighting',
      title: 'Premium Spirits Storefront',
      category: 'Technology',
      industry: 'Premium Spirits / DTC Commerce',
      evidence: 'deployment-verified',
      liveUrl: 'https://ecommerceshop-six.vercel.app',
      accent: '#C8A44D',
      image: '/projects/white-lighting.webp',
      maturity: 'A high-fidelity commerce front end. The catalogue, cart, and account screens run in the browser; no commerce API, payment, identity, or fulfilment service is processing real transactions behind them.',
      services: ['Front-End Engineering', 'Design System', 'Information Architecture', 'Interaction Design', 'Motion Design'],
      results: [
        'Catalogue, product detail, cart, favourites and account routes',
        'Cart and favourites state survives navigation and page refresh',
        'Scroll and entrance motion that never delays a purchase action'
      ],
      summary: 'A premium spirits storefront where brand storytelling and the purchase flow share one interface.',
      overview: 'White Lighting is a premium direct-to-consumer spirits storefront that treats visual storytelling and the transaction flow as one experience. The deployed application covers product discovery, bottle detail pages, favourites, cart and order screens, profile and authentication, reviews, notifications, support, and store-location content. The brand is established before the user is asked to buy. Because no source repository or operating commerce API was supplied, the live site is verified as a front end only.',
      challenge: 'Premium beverages are difficult to sell through a generic grid. A buyer needs to understand flavour, provenance, bottle character, social proof, and availability, and still move quickly from discovery to a cart. The build had to satisfy two competing needs at once: an aspirational brand and familiar e-commerce interaction patterns.',
      solution: 'A content-led landing experience establishes the brand, then hands off to catalogue and product-detail journeys. Product information carries flavour descriptors such as dried fruit, green apple, and sea salt rather than technical attributes alone. Explicit actions - View Details, Add to Cart, View Cart, My Favourites, My Orders - keep the next step unambiguous. React Router separates the public shopping flow from account screens, and context-style providers organise authentication, notification, and shop state. Local storage keeps cart and favourites continuous in the browser, GSAP handles scroll and entrance animation, and Lucide supplies one icon language.',
      requirements: [
        'Present a curated catalogue with imagery, flavour cues, pricing and best-seller states',
        'Provide detailed product views with a direct path to add an item to the cart',
        'Support search, favourites, cart review, orders, account profile flows and notifications',
        'Provide customer reviews, brand-story content, support, and a store finder with directions',
        'Preserve route-level navigation so products and account areas are distinct destinations'
      ],
      qualityBar: {
        label: 'Quality Requirements',
        items: [
          'Feel premium without hiding primary actions behind decorative animation',
          'Stay usable with touch, keyboard, reduced motion and smaller viewports',
          'Keep product and cart state stable across navigation and page refreshes',
          'Load large visual assets efficiently and avoid layout shift'
        ]
      },
      architecture: [
        'Product and content data',
        'React catalogue -> product detail -> cart and wishlist state',
        'Brand and review content / browser persistence',
        'Account and order screens -> React Router -> responsive UI'
      ],
      stack: [
        { name: 'React', layer: 'Interface' },
        { name: 'React Router', layer: 'Routing' },
        { name: 'GSAP', layer: 'Motion' },
        { name: 'Lucide', layer: 'Icons' },
        { name: 'Browser storage', layer: 'Storage' },
        { name: 'Vite', layer: 'Delivery' },
        { name: 'Vercel', layer: 'Platform' }
      ],
      buildSteps: [
        { title: 'Define the catalogue model', detail: 'Establish product IDs, names, bottle imagery, price, availability, categories, tasting notes, reviews, and store availability before any component work.' },
        { title: 'Map the journeys', detail: 'Diagram discovery to detail to cart, guest to account, wishlist, order history, and store finder. Define the empty, loading, error, and out-of-stock states.' },
        { title: 'Build the design system', detail: 'Create colour, typography, spacing, button, card, badge, form, and motion tokens so premium styling is reusable rather than copied page by page.' },
        { title: 'Implement the application shell', detail: 'Add routes, responsive navigation, footer, focus management, and page-level metadata.', stack: 'React Router' },
        { title: 'Create commerce state', detail: 'Implement cart quantity rules, favourites, derived totals, persistence, and notifications behind typed interfaces so a real API can replace mock data later.', stack: 'Browser storage' },
        { title: 'Build features incrementally', detail: 'Catalogue and filters first, detail pages second, cart and account flows third, editorial content and store discovery last.', stack: 'React' },
        { title: 'Add restrained motion', detail: 'Animate opacity and transform only, respect prefers-reduced-motion, and never delay a transaction action for a visual effect.', stack: 'GSAP' },
        { title: 'Test the purchase path', detail: 'Cover cart state, route transitions, input validation, keyboard navigation, responsive layouts, and a complete purchase journey against a test backend.' }
      ],
      deployment: 'The observed build is a Vite-generated static React bundle served on Vercel. A typical release installs locked dependencies, lints and tests, runs the Vite production build, publishes the generated assets, and attaches the custom domain and analytics, with preview deployments used for product and content approval. A real store additionally requires environment-managed API keys, a commerce backend, payment-provider webhooks, inventory reservation, tax and shipping rules, transactional email, audit logs, rate limiting, a content-security policy, and monitoring; none of that should be inferred from the current public front end.',
      outcome: 'The work proves premium visual direction, reusable commerce interaction patterns, client-side routing, persistent UI state, and animation discipline. It does not yet prove the transactional layer: payment, inventory, identity, and fulfilment are not handling real orders. The next increment is to connect a sandbox commerce API, validate stock on the server, replace demo authentication with secure sessions, and add automated checkout tests.'
    },
    {
      id: 'nexus-workspace',
      number: '02',
      client: 'NEXUS',
      title: 'Secure Investigative Workspace',
      category: 'Technology',
      industry: 'Forensics / Public Safety',
      evidence: 'deployment-verified',
      liveUrl: 'https://dash-board-nexus.vercel.app',
      accent: '#06B6D4',
      image: '/projects/nexus-workspace.webp',
      maturity: 'An interactive dashboard prototype. The workspace shell, navigation, and analytics are live; role-based authorization, encryption, and audit trails are not verified in the public deployment.',
      services: ['Information Architecture', 'Front-End Engineering', 'Data Visualization', 'Design System', 'Interaction Design'],
      results: [
        'Seven record domains under one persistent navigation shell',
        'Cross-sector monthly analytics rendered with Chart.js',
        'Operational labels and case counts on every workspace category'
      ],
      summary: 'An information-dense workspace that makes very different investigative record types discoverable in one system.',
      overview: 'NEXUS is an information-dense workspace for investigative teams. The live product organises personnel and subjects, forensic reports, biometrics, evidence, active cases, network analysis, cold storage, and monthly analytics inside one navigation system. The design achievement is information architecture: record types with different sensitivity and lifecycles stay discoverable without routing users through unrelated workflows.',
      challenge: 'Investigative work produces fragmented records with different sensitivity, lifecycles, and relationships. A user may need to move from a subject to biometric verification, then to evidence, case activity, and a relationship graph without losing context. Ordinary dashboards optimise for attractive summary charts; this product needs traceability, permission boundaries, rapid retrieval, and confidence in data provenance.',
      solution: 'A persistent workspace shell carries bucket-driven navigation. Each category shows an operational label and case count while the dashboard holds a cross-sector analytics view, so the system reads at two levels: trends for oversight, direct entry to a record domain for investigators. Next.js server-renders or pre-renders the workspace and the browser enhances it, Material UI supplies the structural components, and Chart.js draws the visualisations. The loading sequence, Initializing Secure Environment, sets the product tone; actual secure initialization still requires verified server sessions and authorization rather than presentation alone.',
      requirements: [
        'Give users an overview of workload and recent activity',
        'Organize workspace buckets for subjects, reports, biometrics, evidence, cases and storage',
        'Present monthly analytics with cross-section filters',
        'Support persistent navigation, workspace settings, help, logout, privacy and terms',
        'Make record status, ownership, timestamps and relationships immediately understandable'
      ],
      qualityBar: {
        label: 'Security and Quality Requirements',
        items: [
          'Apply least-privilege role-based access to every record and action',
          'Encrypt sensitive data in transit and at rest, and keep forensic data out of browser storage',
          'Maintain immutable audit events for view, export, edit and custody changes',
          'Meet keyboard, contrast, responsive and dense-data readability requirements',
          'Define retention, legal hold, cold-storage and deletion policies explicitly'
        ]
      },
      architecture: [
        'Identity provider -> session and API gateway -> authorization policy',
        'Case service / personnel / evidence / biometrics metadata',
        'Relational database / object store / append-only audit log',
        'Analytics jobs -> search index / reporting views',
        'Next.js workspace'
      ],
      stack: [
        { name: 'Next.js', layer: 'Serving' },
        { name: 'React', layer: 'Interface' },
        { name: 'Material UI', layer: 'Interface' },
        { name: 'Chart.js', layer: 'Visualization' },
        { name: 'Browser storage', layer: 'Storage' },
        { name: 'Vercel', layer: 'Platform' }
      ],
      buildSteps: [
        { title: 'Model the domain and threats', detail: 'Define cases, people, reports, artifacts, biometric references, evidence custody, links, users, roles, and retention rules, and produce a threat model before any interface work.' },
        { title: 'Set authorization boundaries', detail: 'Decide who can list, view, annotate, export, transfer, archive, or delete each resource, enforce those policies on the server, and test the negative cases.' },
        { title: 'Prototype the information architecture', detail: 'Validate bucket labels and record relationships against representative tasks, and test dense views at realistic data volume.' },
        { title: 'Build the workspace shell', detail: 'Implement authenticated layouts, navigation, loading and error boundaries, accessible tables, filters, and URL-addressable views.', stack: 'Next.js' },
        { title: 'Separate the services', detail: 'Split case metadata, file storage, search, and audit into distinct responsibilities, and use short-lived signed URLs for permitted file access.' },
        { title: 'Build analytics safely', detail: 'Produce aggregate reporting from scheduled jobs or read replicas so charts cannot leak restricted counts or identities.', stack: 'Chart.js' },
        { title: 'Test security and operations', detail: 'Add policy tests, audit-integrity tests, upload scanning, concurrency checks for custody transitions, accessibility tests, and incident-recovery exercises.' }
      ],
      deployment: 'The current Next.js application is deployed on Vercel, which suits the presentation layer and preview environments. A production investigative system additionally needs an approved hosting region, private networking, centralised secrets, managed identity, encrypted databases and object storage, tamper-evident logs, backups with recovery tests, dependency scanning, WAF and rate limits, and alerting. CI should block a release unless type checks, unit tests, policy tests, dependency scans, and end-to-end access-control tests pass; migrations need forward and rollback plans, and demo data should be synthetic.',
      outcome: 'The build proves dashboard hierarchy, complex navigation, data-visualization integration, and a credible domain vocabulary. The public deployment verifies the workspace experience, not compliance or real forensic processing. The best next increment is one complete audited vertical slice: authenticate a role, create a case, attach an artifact, transfer custody, search it, and verify every event in an immutable audit trail.'
    },
    {
      id: 'zack-kaseler',
      number: '03',
      client: 'Zack Kaseler',
      title: 'Athlete Portfolio',
      category: 'Creative',
      industry: 'Sport / Personal Brand',
      evidence: 'deployment-verified',
      liveUrl: 'https://zack-kalesar.vercel.app',
      accent: '#FF5A1F',
      image: '/projects/zack-kaseler.webp',
      maturity: 'A deployed recruiting and marketing site. Content ships with the build; there is no editor-facing publishing workflow or source and date labelling behind the statistics yet.',
      services: ['Front-End Engineering', 'Content Strategy', 'Information Architecture', 'Design System', 'Motion Design'],
      results: [
        'Film, measurements, statistics, awards and news as routed sections',
        'Responsive layout that keeps core evidence usable at phone width',
        'Contact actions that avoid exposing unnecessary personal data'
      ],
      summary: 'A recruiting site for an offensive lineman that puts film, measurables and contact within a short scan.',
      overview: "The site packages an athlete's film, physical profile, performance statistics, awards, news, and recruiting information into one narrative for coaches, scouts, media, and supporters. It works as a recruiting document rather than a biography, so the strongest evidence - film, measurable data, and achievements - has to be reachable quickly on a phone as well as a desktop.",
      challenge: 'Athlete information is usually scattered across social posts, video services, team pages, and PDFs. A recruiter may spend only a short time evaluating a prospect, often from a phone. The site has to answer four questions immediately: who the athlete is, what position he plays, what evidence supports the claim, and how an evaluator makes contact. College coaches and scouts lead the content hierarchy; media, teammates, family, and fans come second.',
      solution: 'A dramatic sports visual language and controlled page movement carry the energy, while route-based sections separate the evidence types. The content set covers highlight material, a physical profile, statistics, awards, news, recruiting information, FAQs, training updates, and visit stories, which supports both a fast scan and a deeper evaluation. React Router gives each section a distinct destination, Lenis handles smooth scrolling, and Lucide supplies the interface icons. The load-bearing decision is the content model: film entries, statistics, awards, news, and contact details should be data objects rendered through reusable components rather than hard-coded layout fragments.',
      requirements: [
        'Establish identity, jersey number, position and current team above the fold',
        'Embed or link highlight film with a reliable fallback',
        'Present verified measurements, statistics, awards, eligibility information and recent news',
        'Provide recruiting and contact actions without exposing unnecessary personal data',
        'Allow content updates without redesigning the application'
      ],
      qualityBar: {
        label: 'Quality Requirements',
        items: [
          'Keep core evidence usable on small screens and slower connections',
          'Support accessible media labels, keyboard operation and meaningful headings',
          'Provide page metadata and social-sharing previews for shared links',
          'Verify every factual number and outbound link before publishing'
        ]
      },
      architecture: [
        'Structured athlete content / optimized media',
        'React page and section components',
        'React Router / responsive navigation',
        'Vite static build -> Vercel CDN'
      ],
      stack: [
        { name: 'React', layer: 'Interface' },
        { name: 'React Router', layer: 'Routing' },
        { name: 'Lenis', layer: 'Motion' },
        { name: 'Lucide', layer: 'Icons' },
        { name: 'Vite', layer: 'Delivery' },
        { name: 'Vercel', layer: 'Platform' }
      ],
      buildSteps: [
        { title: 'Run a content audit', detail: 'Collect authoritative measurements, statistics, awards, film URLs, dates, captions, contact rules, and image permissions, marking each item with its source and verification date.' },
        { title: 'Design for the recruiter task', detail: 'Prototype the short path from landing to highlight film, key measurements, and contact, then validate it at phone width.' },
        { title: 'Create the visual system', detail: 'Use athlete and team branding, a consistent type scale, high-contrast calls to action, and reusable cards. Motion reinforces pacing instead of concealing content.', stack: 'Lenis' },
        { title: 'Build data-driven sections', detail: 'Define schemas for statistics, achievements, media, news, and FAQs, then map them into components and routes.', stack: 'React' },
        { title: 'Engineer media delivery', detail: 'Generate responsive images, posters, lazy loading, and aspect-ratio placeholders, and embed video with privacy-conscious defaults and a direct fallback link.' },
        { title: 'Add discovery metadata', detail: 'Include canonical URLs, athlete and article structured data where accurate, Open Graph images, a sitemap, robots rules, and descriptive titles.' },
        { title: 'Verify facts and access', detail: 'Check every factual number and outbound link, then keyboard focus, reduced motion, contrast, responsive breakpoints, performance, and social-card rendering.' }
      ],
      deployment: 'The observed application is a Vite React bundle deployed to Vercel. The release pipeline should run linting, tests, a production build, and a broken-link check before publishing, and every pull request can carry a preview URL so the athlete or a representative approves facts and media first. Production work is content-oriented: renew the domain, monitor uptime, preserve contact deliverability, review analytics without invasive tracking, and set a schedule for updating statistics; a contact form would need a serverless handler with validation, spam protection, rate limits, and minimal retention.',
      outcome: 'The work proves audience-aware storytelling, media presentation, responsive sports branding, client-side routing, and smooth interaction. Success should be read through highlight-film plays, contact actions, recruiting-profile visits, and content freshness rather than decorative engagement, and none of that is instrumented yet. The next increment is a small verified-content workflow with source and date labels on the statistics, a downloadable one-page player card, event analytics, and automated link and accessibility checks.'
    },
    {
      id: 'luma-travel',
      number: '04',
      client: 'Luma',
      title: 'AI Travel Architect',
      category: 'AI & Automation',
      industry: 'Travel / Itinerary Planning',
      evidence: 'deployment-verified',
      liveUrl: 'https://ai-itenary-trip-generator.vercel.app',
      accent: '#7C5CFC',
      image: '/projects/luma-travel.webp',
      maturity: 'A high-fidelity travel-planning front end and prototype. The public deployment on its own does not show a production AI model, live flight or hotel inventory, a booking engine or a payment system running behind the screens.',
      services: ['Product Design', 'Front-End Engineering', 'AI Product Workflow', 'Information Architecture', 'Data Visualization'],
      results: ['Captures destination, dates, travelers, budget and interests', 'Presents day-level plans with estimated costs and alternatives', 'Keeps saved trips, map selection and itinerary in sync'],
      summary: 'A travel planning front end that turns destination, date, budget and interest constraints into an editable day-by-day itinerary.',
      overview: 'Luma converts a broad travel intention into a structured itinerary. The deployed experience gathers destination, dates, traveler count, budget and activity preferences, then presents destination information, day-level planning, estimated costs, flight and hotel choices, map context and saved trips. Itinerary actions cover editing, sharing, downloading and map synchronization. The live interface demonstrates the planning experience; the AI, inventory, booking and payment integrations are treated as production requirements rather than claimed capabilities.',
      challenge: 'Travel planning is a constraint-satisfaction problem dressed up as inspiration. A traveler has to reconcile dates, geography, opening hours, transit time, budget, interests and the preferences of everyone else on the trip. Search results give fragments and leave the person to assemble a feasible sequence. The opening is to turn preferences into an editable plan while keeping cost and uncertainty visible.',
      solution: 'The interface splits planning into a funnel: provide constraints, receive a structured plan, inspect cost and destination context, then refine. Saved trips turn a one-off generator into a continuing workspace. Alternative options and reorder-style editing matter because model output should arrive as a draft, not a fixed answer. The deployed bundle uses Redux for shared state, React Router for the workflow routes, Recharts for cost and planning visualization, and Mapbox functionality for geography, with Lenis and motion treatment carrying the branded feel. Sample destination content, including Bali and Indonesia, lets the whole journey be evaluated without waiting on an external service.',
      requirements: ['Capture destination, dates, travelers, budget and activities with validation', 'Generate or present a day-by-day itinerary with destination context and alternatives', 'Surface estimated costs and hotel and flight candidates without stating them as fixed prices', 'Let users save, revisit, reorder, edit, share and download trips', 'Show locations on a map and keep itinerary and map selection synchronized', 'Handle incomplete prompts, impossible date ranges, missing data and generation failures'],
      qualityBar: { label: 'Quality and Safety Requirements', items: ['Explain why a recommendation fits the stated constraints and allow manual override', 'Treat generated content as suggestions and verify prices, schedules, visas and safety data', 'Protect account and trip data and minimize location retention', 'Make complex timelines and maps usable with keyboard and non-map alternatives', 'Control API cost, latency, retries and rate limits'] },
      architecture: ['Trip form -> validation -> itinerary API and orchestrator', 'LLM with destination and search tools', 'Schema validation / safety rules', 'Postgres trip store -> normalized itinerary -> React and Redux UI', 'Map and geocoding API / hotel and flight providers'],
      stack: [{ name: 'React', layer: 'Interface' }, { name: 'React Router', layer: 'Routing' }, { name: 'Redux', layer: 'State' }, { name: 'Recharts', layer: 'Visualization' }, { name: 'Mapbox', layer: 'Data' }, { name: 'Lenis', layer: 'Motion' }, { name: 'Vite', layer: 'Delivery' }, { name: 'Vercel', layer: 'Platform' }],
      buildSteps: [{ title: 'Define the itinerary schema', detail: 'Set the trust model first: which fields are generated, fetched, user-entered, estimated or verified. Provenance and last-updated labels are designed in at this point, not added later.' }, { title: 'Prototype the constraint form', detail: 'Validate date logic, traveler counts, budget ranges, interests, accessibility needs, pace and error recovery.', stack: 'React' }, { title: 'Build a deterministic slice', detail: 'Implement the full form-to-itinerary-to-save flow against fixture data before adding any AI or provider dependency.' }, { title: 'Add state and persistence', detail: 'Normalize trips in Redux, keep draft separate from saved state, support optimistic edits and resolve version conflicts on the server.', stack: 'Redux' }, { title: 'Move generation behind an API', detail: 'Construct a bounded prompt, call approved tools, validate the response schema, reject unsafe or invalid output and return partial results gracefully.' }, { title: 'Integrate geography and suppliers', detail: 'Geocode activities, calculate realistic travel time and label inventory and price timestamps. Deep-link to providers rather than transacting.', stack: 'Mapbox' }, { title: 'Test at three levels', detail: 'Unit-test constraints and cost calculations, contract-test AI and provider responses, and end-to-end test generate, edit, save, share and failure recovery. Score itinerary feasibility against a curated benchmark set.' }, { title: 'Instrument the funnel', detail: 'Measure completion, regeneration, edit rate, save rate, provider errors, latency and estimated cost per generated trip without logging sensitive travel detail.' }],
      deployment: 'The Vite React client is deployed on Vercel. A production release would pair that CDN-hosted client with serverless or containerized APIs, a relational database, queues for longer generation jobs, managed secrets, map and model usage quotas, structured logs and error tracing, with preview deployments on fake supplier data and separate keys. CI should check types, tests, bundle size, schema compatibility and accessibility, and prompt or model versions should roll out in stages because a model change can alter product behaviour while the front-end code stays identical.',
      outcome: 'The build demonstrates complex-form design, stateful planning, data visualization, map-oriented UX and a credible AI product workflow. What it does not yet demonstrate is verifiability: the deployment alone does not show a production model, live flight or hotel inventory, or authenticated persistence. The next increment is to connect one generator to a strict schema, cite authoritative place data, label every estimate, save trips through authenticated APIs and measure whether users keep or heavily rewrite the generated schedule.'
    },
    {
      id: 'cool-breeze-cars',
      number: '05',
      client: 'Cool Breeze Cars',
      title: 'Rental Booking Front End',
      category: 'Technology',
      industry: 'Mobility / Vehicle Rental',
      evidence: 'deployment-verified',
      liveUrl: 'https://car-rental-frontend-rose-nu.vercel.app',
      accent: '#3B82F6',
      image: '/projects/cool-breeze-cars.webp',
      maturity: 'A high-fidelity booking front end and prototype. Source was not supplied, and no live search, authoritative quote, expiring vehicle hold or payment provider is proven behind the deployed journey.',
      services: ['Front-End Engineering', 'Product Design', 'Conversion Journey Design', 'Motion Design', 'Information Architecture'],
      results: ['Filters a fleet by vehicle class and specific model', 'Compares rate, seats, transmission, power type and availability', 'Moves pickup, drop-off, dates and customer details toward checkout'],
      summary: 'A premium vehicle rental front end covering fleet discovery, comparison, pickup and drop-off selection, and the path to checkout.',
      overview: 'Cool Breeze Cars presents luxury, sports, SUV and electric vehicles through a complete rental journey: discover the fleet, compare vehicle characteristics, select pickup and drop-off locations and dates, provide customer details and move toward checkout. Supporting content explains delivery, insurance, age rules, corporate and airport services, concierge support and the three-step booking process. The deployment shows the presentation and form tier; the reservation and payment tier behind it is a production requirement.',
      challenge: 'Rental products combine editorial persuasion with strict availability constraints. The customer wants to imagine the vehicle experience, while the business has to validate location, dates, driver eligibility, rate rules, deposits, protection, inventory and identity. The design problem is to hold a premium atmosphere while collecting enough information to produce an honest quote.',
      solution: 'The site opens on a search and booking surface rather than making a visitor hunt for availability. It then states the process - Choose Your Ride, Book Dates, Hit the Road - and presents a structured fleet including the Tesla Model S Plaid, Porsche 911 GT3, Mercedes-AMG G63, Audi RS e-tron GT, Lamborghini Huracan and Rolls-Royce Cullinan. Each card exposes the attributes needed for comparison and keeps Details separate from Book Now. Service proof is layered after discovery: digitized rental, keyless access, concierge support, extensions, preparation, safety, testimonials and FAQs, so aspiration is addressed first and practical risk second. The Next.js output gives the page indexable HTML and motion is added in the browser.',
      requirements: ['Browse and filter vehicles by class and specific model', 'Show rate, seats, transmission, power type, rating, imagery, description and availability', 'Capture pickup and drop-off location, date and time with timezone-aware validation', 'Provide customer details, protection choices, a pricing breakdown, terms and confirmation', 'Support delivery, long-term, corporate and airport-transfer enquiries', 'Explain insurance, minimum age, additional drivers, cancellation, mileage and deposit rules'],
      qualityBar: { label: 'Quality Requirements', items: ['Prevent double booking and reprice on the server before payment', 'Never trust pricing or availability from client state', 'Issue a short-lived quote and reservation identifier from the server', 'Remain accessible and responsive despite image-rich cards and animated presentation'] },
      architecture: ['Next.js catalogue and search UI -> availability and quote API', 'Fleet / location / rate database', 'Temporary vehicle reservation', 'Identity and licence checks -> payment -> confirmed booking', 'Email and SMS / operations / pickup and return events'],
      stack: [{ name: 'Next.js', layer: 'Serving' }, { name: 'React', layer: 'Interface' }, { name: 'Tailwind-style utility CSS', layer: 'Interface' }, { name: 'Framer Motion', layer: 'Motion' }, { name: 'Vercel', layer: 'Platform' }],
      buildSteps: [{ title: 'Model rental operations', detail: 'Separate vehicle from vehicle class, then define location, availability blocks, maintenance, rates, mileage, extras, driver, quote, reservation, payment, pickup, return, damage and cancellation.' }, { title: 'Map the booking state machine', detail: 'Search, quote, hold, identity and payment, confirmed, active, returned or cancelled, with expiry and failure transitions written down before any screen is built.' }, { title: 'Build catalogue and detail', detail: 'Optimized responsive images, consistent specifications, transparent rate qualifiers and cards that can actually be compared side by side.', stack: 'React' }, { title: 'Implement the search form', detail: 'Location autocomplete, local timezone rules, sensible defaults, validation and an edit-search path that preserves the context already entered.', stack: 'Next.js' }, { title: 'Build server-authoritative checkout', detail: 'Recheck inventory and totals, place a time-limited hold, process payment idempotently and confirm only after trusted provider status.' }, { title: 'Add operations and messaging', detail: 'Staff views for preparation, delivery, return, extensions and incidents, with transactional email and SMS sent from server events.' }, { title: 'Test collisions and edge cases', detail: 'Cover overlapping reservations, daylight-saving boundaries, failed payments, expired holds, duplicate callbacks, cancellation windows and responsive accessibility.' }],
      deployment: 'The public Next.js application is hosted on Vercel. Production would combine that presentation tier with an authenticated booking API, a transactional database, a payment provider, object storage for vehicle and inspection media, an email and SMS provider and background workers, with secrets in managed environment variables and payment callbacks verified by signature and idempotency key. Database constraints or serializable reservation logic would stop two users confirming the same vehicle, alongside health checks, error tracing, availability alerts, backup and restore tests, privacy controls and preview data kept separate from real fleet inventory.',
      outcome: 'The project demonstrates premium product presentation, responsive booking forms, fleet comparison, Next.js rendering and motion-led storytelling. It does not yet prove the hardest operational path, which is the next increment: live search, an authoritative quote, an expiring vehicle hold, sandbox payment, confirmation and a staff-visible reservation. Claims on the current site such as ratings, carbon neutrality, availability, keyless access and crypto payment need backing services or a clear demo-content label.'
    },
    {
      id: 'motorsport-team',
      number: '06',
      client: 'Modern Motorsport',
      title: 'Race Team Digital Home',
      category: 'Creative',
      industry: 'Motorsport / Fan Engagement',
      evidence: 'deployment-verified',
      liveUrl: 'https://racing-team-frontend.vercel.app',
      accent: '#E11D2E',
      image: '/projects/motorsport-team.webp',
      maturity: 'A deployed multi-section media and brand prototype for a fictional racing organization. The dates, statistics, contact details, social counts and partner names on the public site read as placeholder content rather than real records.',
      services: ['Information Architecture', 'Brand System', 'Front-End Engineering', 'Editorial Design', 'Media Delivery'],
      results: ['Groups a large sitemap into six navigable sections', 'Reuses cards across domains, stories, images, partners and posts', 'Renders substantial page content into the initial HTML'],
      summary: 'A digital home for a fictional race team, grouping racing, team, technology, media, fan and company content under one navigation.',
      overview: 'Modern Motorsport Team is a broad digital home for a fictional racing organization. The deployed product spans race calendar and standings, circuits, drivers, management, academy, esports, the race car and its technology, partners, news, galleries, fan club, games, hospitality, careers, sustainability and diversity. The core challenge is scale: many content domains have to read as one brand without turning navigation into an unstructured list.',
      challenge: 'A modern racing organization communicates with fans, sponsors, media, prospective staff, hospitality customers and technically curious visitors. Those audiences arrive with very different tasks, and race-week information changes quickly. The product needs a stable hierarchy, fast editorial publishing, accurate live or near-live data, rich media delivery and clear commercial paths.',
      solution: 'The live navigation groups content into Racing, Team, Technology, Media, Fans and Company. That grouping is the load-bearing UX decision, because it reduces a large sitemap to six stable mental models. The home page combines a race hub, legacy statistics, gateways into major sections, latest updates, a gallery, partner marks and a social-style feed. The deployed content shows component reuse: repeated cards carry domains, stories, images, partners and posts, while editorial labels keep long pages scannable. Next.js renders substantial page content into the initial HTML, which supports discoverability and a resilient first paint.',
      requirements: ['Publish race schedules, next-race state, session times, results, standings and track guides', 'Present drivers, leadership, academy, esports, careers, technical specifications and suppliers', 'Provide news, video, galleries, social updates, downloads, fan club, games and hospitality', 'Give partners visible placements and provide credible B2B and sponsorship routes', 'Communicate sustainability and inclusion commitments with measurable evidence'],
      qualityBar: { label: 'Quality Requirements', items: ['Handle timezones, event status changes, content scheduling and archival pages', 'Deliver media efficiently across mobile networks and support reduced motion', 'Keep a large navigation usable with keyboard and screen readers', 'Show stale and error states honestly when the race data feed fails', 'Absorb traffic spikes around sessions and results with server-side caching'] },
      architecture: ['Headless CMS / editorial workflow / media service and CDN', 'Image and video variants -> normalized content -> Next.js pages', 'Official data feed and cache -> timing and results adapter', 'Newsletters / fan accounts / hospitality and partner enquiries'],
      stack: [{ name: 'Next.js', layer: 'Serving' }, { name: 'React', layer: 'Interface' }, { name: 'Turbopack', layer: 'Delivery' }, { name: 'Vercel', layer: 'Platform' }],
      buildSteps: [{ title: 'Define audiences and sitemap', detail: 'Rank race-week tasks above secondary corporate information, then validate the mega-navigation with fans and media users before any page is designed.' }, { title: 'Model the content types', detail: 'Event, session, circuit, season, standing, driver, team member, car specification, article, gallery, partner, campaign and policy each get their own model.' }, { title: 'Build the brand system', detail: 'Type, colour, grid, motion, image treatment, data cards, sponsor placement and accessibility rules are set once and reused across every section.', stack: 'React' }, { title: 'Create reusable route patterns', detail: 'Listing and detail patterns generate metadata, canonical URLs, structured data, sitemap entries and social images from the content itself.', stack: 'Next.js' }, { title: 'Integrate race data', detail: 'Normalize provider output behind an adapter, attach source and update time, convert event times per user, cache aggressively and show stale or error states honestly.' }, { title: 'Engineer media delivery', detail: 'Responsive image derivatives, poster-first video, lazy loading, captions, consent-aware embeds and CDN caching.' }, { title: 'Add publishing and governance', detail: 'Draft, review and publish roles with scheduled releases, partner approval, expiry dates and correction history.' }, { title: 'Test peak race-day load', detail: 'Load-test race-day pages, validate timezone boundaries, check broken embeds, run the large navigation with keyboard and screen readers and simulate a feed outage.' }],
      deployment: 'The current application is deployed on Vercel as a Next.js site. A production platform would add preview deployments connected to CMS drafts, webhook-triggered revalidation, protected editorial credentials, cached race-data routes, CDN-hosted media, monitoring and rollback-ready releases. Newsletter and enquiry endpoints need validation, consent records, spam protection and provider retry handling.',
      outcome: 'The work demonstrates large-scale information architecture, a branded component system, server and static rendering, editorial layouts and fan-oriented storytelling. It is a concept build: the placeholder dates, statistics, contact details, social counts and partner names must not be presented as real records. The strongest next increment is to connect a headless CMS and one authoritative race schedule, add timezone-aware event pages, and measure journeys to calendar, driver, fan club, hospitality and partner actions.'
    },
    {
      id: 'handwritten-digit',
      number: '07',
      client: 'Handwritten Digit Recognition',
      title: 'Interactive MNIST Digit Classifier',
      category: 'AI & Automation',
      industry: 'Computer Vision / Education',
      evidence: 'source-verified',
      repoUrl: 'https://github.com/Girishiam/Handwritten-Digit-Recognition',
      accent: '#A855F7',
      maturity: 'A local desktop proof of concept for teaching and demonstration. It is not a web deployment, and known source defects mean it is not yet portable across machines.',
      services: ['Model Training', 'Computer Vision Engineering', 'Inference Pipeline Engineering', 'Desktop Application Delivery'],
      results: [
        'Turns a mouse-drawn stroke into a normalized 28x28 model tensor',
        'Runs a saved Keras model and displays the predicted digit',
        'Repository reports approximately 99% MNIST accuracy'
      ],
      summary: 'A Pygame drawing canvas that crops and normalizes a hand-drawn stroke, then classifies it with a saved MNIST-trained Keras model.',
      overview: 'The project closes the gap between an offline image-classification model and an interactive application. A user draws a digit on a Pygame canvas; the program isolates the drawn region, converts it to a normalized 28x28 image, runs it through a saved Keras model, and shows the predicted class. The repository describes approximately 99% MNIST accuracy, but the interactive pipeline is the more significant engineering contribution, because real user strokes differ from clean dataset samples.',
      challenge: 'MNIST tutorials often stop at validation accuracy. That does not show whether a model can handle a mouse-drawn input with arbitrary scale, position, stroke width, and whitespace. The application has to capture input, transform it into the same representation used during training, run inference quickly, and present a stable result.',
      solution: 'app.py creates a 720x480 Pygame surface and records mouse strokes. NumPy represents the captured pixels, OpenCV crops the drawn region and resizes it to 28x28, and pixel values are normalized by dividing by 255. The Keras model is loaded from bestmodel.h5 and its output is converted into a digit prediction. Preprocessing is where interactive accuracy is won or lost, so a stronger version centers the digit by its center of mass, preserves aspect ratio with padding, matches MNIST polarity, and applies the exact training transform.',
      requirements: [
        'Provide a low-latency drawing canvas with clear and reset controls',
        'Detect the non-empty stroke bounds and refuse to predict on an empty canvas',
        'Convert the crop to a consistent grayscale format and resize it to 28x28',
        'Normalize to the training range and preserve the foreground and background convention',
        'Return the top class and, where available, confidence and alternative classes'
      ],
      qualityBar: {
        label: 'Quality Requirements',
        items: [
          'Load the trained model once rather than on every prediction',
          'Run on a documented Python environment with no machine-specific paths',
          'Test preprocessing separately from the neural network'
        ]
      },
      architecture: [
        'Mouse strokes -> Pygame drawing canvas',
        'Bounding crop -> 28x28 resize',
        'NumPy pixel array -> normalization by 255',
        'Saved Keras model (bestmodel.h5) -> argmax over class scores',
        'Predicted digit displayed in the UI'
      ],
      stack: [
        { name: 'Python', layer: 'Language' },
        { name: 'Keras', layer: 'Model' },
        { name: 'TensorFlow', layer: 'Model' },
        { name: 'NumPy', layer: 'Data' },
        { name: 'OpenCV', layer: 'Data' },
        { name: 'Pygame', layer: 'Interface' },
        { name: 'bestmodel.h5', layer: 'Storage' }
      ],
      buildSteps: [
        { title: 'Prepare the MNIST data', detail: 'Load MNIST, inspect class balance, normalize consistently, and split train, validation, and test partitions.', stack: 'NumPy' },
        { title: 'Train a baseline network', detail: 'Start from a compact dense or convolutional model. Record configuration, seeds, learning curves, confusion matrix, per-class results, and the final untouched test score.', stack: 'Keras' },
        { title: 'Export a reproducible artifact', detail: 'Save the model format, class mapping, input shape, normalization contract, framework version, and evaluation metadata together.', stack: 'bestmodel.h5' },
        { title: 'Build preprocessing as pure functions', detail: 'Given an image, return a deterministic model tensor. Test empty, tiny, off-center, thick, and edge-touching strokes.', stack: 'OpenCV' },
        { title: 'Add the event loop', detail: 'Separate rendering, input collection, preprocessing, inference, and result display so each part can change independently.', stack: 'Pygame' },
        { title: 'Run real-drawing evaluation', detail: 'Collect and label multiple drawings per digit from several users, then measure the complete pipeline instead of quoting MNIST test accuracy alone.' },
        { title: 'Package the desktop app', detail: 'Use a relative resource path, pinned dependencies, and startup error messages, with an optional PyInstaller standalone build.', stack: 'Python' }
      ],
      deployment: 'The repository runs as a local desktop application from source; there is no web deployment. A release would place the model under a versioned models directory, resolve it relative to the script or package, pin dependencies, add automated preprocessing tests, and publish a tagged desktop artifact. Exposing inference through FastAPI or converting the model for TensorFlow.js is a recommended extension rather than current functionality.',
      outcome: 'The build proves the full inference loop of capture, transform, predict, and display rather than model training alone. It does not yet prove portability or real-drawing accuracy: the current code carries a hard-coded Linux model path, a likely font-extension typo, an incorrect display label for digit 8, a fragile array-slicing statement, and a README file structure that differs from the checked repository. The next increment is to correct those defects, make the environment reproducible, report real-drawing results alongside the MNIST figure with calibrated confidence, and keep a small regression corpus of difficult hand-drawn examples.'
    },
    {
      id: 'movie-recommender',
      number: '08',
      client: 'Movie Recommender',
      title: 'Content-Based Similarity Engine',
      category: 'AI & Automation',
      industry: 'Media / Recommendation',
      evidence: 'source-verified',
      repoUrl: 'https://github.com/Girishiam/Content-Based-Movie-Recommendation',
      accent: '#DB2777',
      maturity: 'A local Streamlit data-product prototype that runs from source. No public deployment configuration was verified.',
      services: ['Data Engineering', 'Feature Engineering', 'Recommendation Engineering', 'API Integration', 'Data Product Delivery'],
      results: [
        'Returns five related titles for a selected film',
        'Precomputes cosine similarity to keep online inference simple',
        'Resolves poster art for each recommendation through TMDB'
      ],
      summary: 'A Streamlit application that turns one selected film into five content-similar titles using a precomputed cosine similarity matrix.',
      overview: 'The recommender moves a user from one known film to five related films. It draws content signals from the TMDB 5000 dataset (genres, cast, director, keywords, and related metadata), precomputes a similarity matrix, and serves results through Streamlit with poster images retrieved from TMDB.',
      challenge: 'Popularity lists do not account for what a user wants right now, and collaborative filtering performs poorly without user history. Content-based recommendation is a pragmatic answer to the cold start: the selected film becomes the preference signal, and recommendations follow from descriptive similarity. The tradeoff is overspecialization, since a content model can repeatedly suggest near-duplicates and cannot learn that two apparently different films appeal to the same audience.',
      solution: 'The repository holds a preprocessing notebook and a Streamlit application, mr.py. The application loads movie_list.pkl and similarity.pkl, lets the user choose a title, locates its row, sorts the corresponding similarity values, skips the source film, and displays five recommendations in columns. Poster paths are fetched through the TMDB API. Expensive vectorization and pairwise comparison run ahead of time, which keeps online inference simple. That works for a small, mostly static catalogue but requires regeneration whenever the dataset changes.',
      requirements: [
        'Normalize inconsistent metadata for cast, crew, genres, and keywords',
        'Build one weighted textual representation per film',
        'Vectorize that representation and compute a reproducible similarity score',
        'Return the top relevant titles and exclude the selected title itself',
        'Resolve poster art for each recommended title through TMDB'
      ],
      qualityBar: {
        label: 'Security and Quality Requirements',
        items: [
          'Keep the TMDB credential out of source and load it from an environment secret',
          'Load heavy artifacts once and keep response time interactive',
          'Give useful errors for missing posters and network failure',
          'Evaluate relevance beyond a single anecdotal search',
          'Do not load untrusted pickle files'
        ]
      },
      architecture: [
        'TMDB 5000 CSVs -> clean and merge metadata -> weighted text tags',
        'Vectorization -> cosine similarity matrix',
        'movie_list.pkl / similarity.pkl',
        'Selected title -> row lookup -> top-five neighbours',
        'TMDB poster API -> Streamlit result columns'
      ],
      stack: [
        { name: 'Python', layer: 'Language' },
        { name: 'Pandas', layer: 'Data' },
        { name: 'NumPy', layer: 'Data' },
        { name: 'scikit-learn', layer: 'Model' },
        { name: 'TMDB 5000 dataset', layer: 'Data' },
        { name: 'Serialized pickle artifacts', layer: 'Storage' },
        { name: 'Requests', layer: 'API' },
        { name: 'Streamlit', layer: 'Interface' }
      ],
      buildSteps: [
        { title: 'Ingest and validate data', detail: 'Join movie and credits records on a stable ID, parse structured columns, handle duplicates and nulls, and document dataset version and licensing.', stack: 'Pandas' },
        { title: 'Engineer content features', detail: 'Select top cast, director, genres, and keywords, normalize names, standardize tokens, and weight the high-value signals deliberately.', stack: 'Pandas' },
        { title: 'Vectorize and compare', detail: 'Fit a count or TF-IDF vectorizer, calculate cosine similarity, and retain the mapping from movie ID to title.', stack: 'scikit-learn' },
        { title: 'Evaluate recommendation quality', detail: 'Build a small labelled query set across genres and eras, then measure precision at five, catalogue coverage, duplicates, diversity, and qualitative failure cases.' },
        { title: 'Serialize versioned artifacts', detail: 'Save artifacts with a manifest recording preprocessing code version, dataset checksum, feature settings, and library versions.', stack: 'Serialized pickle artifacts' },
        { title: 'Build the interface', detail: 'Cache artifacts, offer search instead of a long select list, render poster fallbacks, and explain why each film was recommended.', stack: 'Streamlit' },
        { title: 'Add regression tests', detail: 'Verify selected-title exclusion, deterministic ordering, missing metadata, API failure, duplicate titles, and artifact compatibility.', stack: 'Requests' }
      ],
      deployment: 'No public deployment configuration was verified; the application runs locally with Streamlit when its serialized model files and dependencies are present. A practical hosted path is Streamlit Community Cloud or a container on Render, Fly, or Azure, with artifacts stored in the image or fetched from versioned object storage. Production would also need timeouts, caching, and fallbacks on network calls, a lockfile or pinned requirements, a health check, structured error logging, and a scheduled offline pipeline to refresh artifacts.',
      outcome: 'The work proves feature engineering, vector-space similarity, artifact-based inference, third-party API integration, and rapid ML presentation with Streamlit. It does not prove hosted operation or measured relevance, and the source still contains a TMDB API credential directly in code, which must be revoked and replaced with an environment secret before deployment. The next increment is to rotate that credential and publish a real evaluation report, alongside explanation labels such as shared director or similar genres, hybrid quality controls, and diversity reranking.'
    },
    {
      id: 'image-steganography',
      number: '09',
      client: 'Image Steganography',
      title: 'LSB Payload Embedding Tool',
      category: 'Technology',
      industry: 'Security / Desktop Tooling',
      evidence: 'source-verified',
      repoUrl: 'https://github.com/Girishiam/Image-Steganography',
      accent: '#10B981',
      maturity: 'A local Java desktop application for hiding and recovering text in images. It conceals the presence of a message and is not encryption.',
      services: ['Desktop Application Delivery', 'Image Processing Engineering', 'Interface Engineering', 'Test Strategy'],
      results: [
        'Hides a text message in the low bits of image pixels',
        'Checks payload capacity against available pixels before encoding',
        'Restricts output to lossless formats for exact recovery'
      ],
      summary: 'A Java desktop tool that encodes a text message into the least-significant bits of image pixels and recovers it from a lossless file.',
      overview: 'The tool demonstrates data concealment by encoding a text message into the least-significant bits of image pixels. A Swing interface lets a user open an image, enter and encode a message, inspect the result, and save it in a lossless format. Reopening an encoded image recovers the text.',
      challenge: 'The application has to change image data slightly enough to stay visually unobtrusive while preserving enough structure to decode the message exactly. It also has to protect users from destructive format choices, because JPEG compression can rewrite pixel values and destroy the payload. Steganography is not encryption: this implementation hides the presence of text but does not protect its content or authenticity from a knowledgeable analyst, and that limitation has to be explicit.',
      solution: 'Encryption.java and Decryption.java implement the Swing windows, and Main.java launches the splash and menu flow. The encoder writes a 32-bit message-length header followed by eight bits per message byte, using the lowest bit in successive packed pixel values. Before encoding it checks whether the message length times eight plus 32 exceeds the available pixels. The save workflow restricts output to PNG, BMP, and DIB-style lossless choices. The decoder reads the first 32 bits to reconstruct the length, then consumes the requested message bytes.',
      requirements: [
        'Load common source images through a desktop file chooser',
        'Calculate payload capacity before modifying the image',
        'Encode message length and content deterministically',
        'Save only to lossless formats suitable for exact recovery',
        'Provide clear open, encode, decode, save, and reset states'
      ],
      qualityBar: {
        label: 'Security and Quality Requirements',
        items: [
          'Decode safely and reject impossible or corrupted length headers',
          'Preserve image dimensions and give useful errors for unsupported or corrupt files',
          'Run slow image work off the Event Dispatch Thread',
          'State the security boundary plainly: hiding text is not encryption'
        ]
      },
      architecture: [
        'Menu flow -> encode window / decode window',
        'Text -> bytes -> 32-bit length header plus payload bits',
        'Capacity check -> lowest bit of successive pixel values',
        'Lossless save to PNG or BMP',
        'Encoded image -> pixel LSBs -> length header read',
        'Payload bytes -> recovered text'
      ],
      stack: [
        { name: 'Java 17', layer: 'Language' },
        { name: 'Swing', layer: 'Interface' },
        { name: 'AWT', layer: 'Desktop' },
        { name: 'ImageIO', layer: 'Data' },
        { name: 'Least-significant-bit encoding', layer: 'Data' },
        { name: 'PNG and BMP', layer: 'Storage' }
      ],
      buildSteps: [
        { title: 'Specify the payload container', detail: 'Define magic bytes, format version, payload length, character encoding, checksum, and flags. The current length-only header is simple but weak against corrupt input.' },
        { title: 'Build pure codec functions', detail: 'Encode and decode image objects independently of the interface, and unit-test exact round trips before any UI exists.', stack: 'Least-significant-bit encoding' },
        { title: 'Add capacity and integrity checks', detail: 'Reserve bits for the header, use UTF-8 explicitly, validate every length, and include a checksum or authenticated tag.' },
        { title: 'Implement UI state', detail: 'Separate file selection, preview, text entry, encode and decode, save, reset, and error messages, and keep slow image work off the Event Dispatch Thread.', stack: 'Swing' },
        { title: 'Protect the output format', detail: 'Accept many input formats once decoded into pixels, but make lossless output mandatory and explain why.', stack: 'PNG and BMP' },
        { title: 'Test the codec systematically', detail: 'Cover empty and Unicode messages, exact-capacity and oversized payloads, tiny and transparent images, corrupted headers, repeated saves, and alpha channels.', stack: 'ImageIO' },
        { title: 'Package a runnable JAR', detail: 'Produce a reproducible Gradle or Maven build, version metadata, and platform-neutral launch instructions.', stack: 'Java 17' }
      ],
      deployment: 'This is a desktop application, so deployment means distributing a signed, reproducible JAR or runtime image rather than operating a server. Java 17 should be documented or bundled with jpackage, and release artifacts should include checksums and an open-source licence. Confidentiality would additionally require encrypting the message with an authenticated cipher before embedding, deriving keys from a password with a modern KDF, using a random salt and nonce, authenticating the header, and using a keyed pseudo-random pixel order - recommended improvements, not capabilities of the present LSB implementation.',
      outcome: 'The work proves binary manipulation, capacity calculation, Java image processing, desktop state management, and lossless-format reasoning. It does not provide confidentiality: the tool hides the presence of text but does not protect its content or authenticity from a knowledgeable analyst, and the length-only header is weak against corrupt input. The next increment is to separate the codec from the UI and add a versioned, integrity-checked payload header with explicit UTF-8, better exception reporting, tests, and an unmistakable statement of the security boundary.'
    },
    {
      id: 'brain-tumor-cnn',
      number: '10',
      client: 'Brain Tumor Classification',
      title: 'MRI Classification CNN',
      category: 'AI & Automation',
      industry: 'Medical Imaging / Research',
      evidence: 'source-verified',
      sourceLabel: 'Kaggle notebook',
      accent: '#0EA5E9',
      maturity: 'A reproducible-notebook candidate, not a clinical or deployed diagnostic system.',
      services: ['Model Training', 'Data Pipeline Engineering', 'Computer Vision Research', 'Model Evaluation', 'Research Documentation'],
      results: [
        'Trains a six-convolution CNN on 256x256 RGB MRI images',
        'Partitions data 70/15/15 with a fixed shuffle seed',
        'Plots learning curves and predictions with confidence values'
      ],
      summary: 'A Kaggle notebook that trains and evaluates a convolutional network on brain MRI images as a research experiment, not a diagnostic tool.',
      overview: 'The notebook trains a convolutional neural network to classify brain MRI images. It loads a directory-based image dataset, partitions it into training, validation and test data, builds an augmented six-convolution network, trains with Adam and sparse categorical cross-entropy, then evaluates on the test partition and visualizes predicted classes with confidence values. It is an educational image-classification experiment rather than a medical device, and it must not be presented as a diagnosis system.',
      challenge: 'MRI categories can differ subtly, and image sets can carry dataset-specific artefacts, so the learning task is to find discriminative patterns while controlling overfitting and data leakage. A credible result needs more than a high accuracy figure: class balance, patient-level splitting, per-class sensitivity and recall, confusion patterns, calibration, external validation and dataset provenance all matter. Representing such a model as a diagnosis system would additionally require clinical validation, representative data, governance, explainability and regulatory review.',
      solution: 'Images enter as 256x256 RGB through image_dataset_from_directory at batch size 32, and a partition function splits the loaded dataset 70/15/15 under shuffle seed 12. The input pipeline caches, shuffles and prefetches with AUTOTUNE. A preprocessing head resizes and rescales, then augments with random horizontal and vertical flips and random rotation. The network stacks six Conv2D stages of 64 filters at 3x3 with ReLU, each followed by max pooling, then flattens into a 64-unit dense layer and a softmax output. Training uses Adam with sparse categorical cross-entropy against a 100-epoch target, and the run closes with test evaluation, learning-curve plots and prediction examples annotated with confidence.',
      requirements: [
        'Ingest a directory-based image dataset at 256x256 RGB with image_dataset_from_directory',
        'Train at batch size 32 against a 100-epoch target',
        'Partition the loaded dataset 70/15/15 with shuffle seed 12',
        'Cache, shuffle and prefetch the input pipeline with AUTOTUNE',
        'Resize and rescale, then apply random horizontal and vertical flips and random rotation',
        'Stack six 64-filter 3x3 Conv2D and max-pool stages, then dense 64 and softmax output'
      ],
      qualityBar: {
        label: 'Success Criteria',
        items: [
          'Control overfitting and data leakage rather than optimizing a single accuracy number',
          'Split at patient level so no patient appears in more than one partition',
          'Report class balance and dataset provenance alongside any accuracy figure',
          'Report per-class sensitivity and recall, confusion patterns and calibration',
          'Validate against data from another source before publishing a result'
        ]
      },
      architecture: [
        'MRI folders -> directory loader',
        'Shuffled 70/15/15 training / validation / test batches',
        'Resize and rescale -> augmentation',
        'Six Conv2D and max-pool stages',
        'Flatten -> Dense(64) -> Softmax (four classes in the notebook)',
        'Test evaluation / learning-curve plots / prediction visuals'
      ],
      stack: [
        { name: 'Python', layer: 'Language' },
        { name: 'TensorFlow/Keras', layer: 'Model' },
        { name: 'NumPy', layer: 'Data' },
        { name: 'Pandas', layer: 'Data' },
        { name: 'Matplotlib', layer: 'Visualization' },
        { name: 'Seaborn', layer: 'Visualization' },
        { name: 'scikit-learn', layer: 'Model' },
        { name: 'Kaggle GPU notebook', layer: 'Platform' }
      ],
      buildSteps: [
        { title: 'Set intended use and exclusions', detail: 'Define the task as research and education work, name the target labels, and rule out clinical decision-making.' },
        { title: 'Audit the data', detail: 'Record dataset source and licence, scanner and site information, patient identity boundaries, duplicates, class counts and image quality.', stack: 'Pandas' },
        { title: 'Freeze patient-level splits', detail: 'Build train, validation and test manifests before experimentation. Stratify where possible and checksum files so duplicates cannot cross partitions.' },
        { title: 'Build a simple baseline', detail: 'Compare a majority-class baseline, a small CNN and a transfer-learning model with preprocessing held identical across all three.', stack: 'TensorFlow/Keras' },
        { title: 'Train reproducibly on GPU', detail: 'Seed libraries, record environment and hardware, checkpoint the best validation model, use early stopping and log every hyperparameter.', stack: 'Kaggle GPU notebook' },
        { title: 'Evaluate on held-out data', detail: 'Report the confusion matrix, per-class precision, recall and F1, macro averages, confidence intervals and calibration. Keep the test set for one final evaluation.', stack: 'scikit-learn' },
        { title: 'Stress-test the model', detail: 'Evaluate images from a different source, perturb brightness and cropping, inspect saliency, and have domain experts check that the model attends to anatomy rather than text or scanner artefacts.', stack: 'Matplotlib' },
        { title: 'Package research artifacts', detail: 'Version the dataset manifest, notebook, environment lock, model card, metrics JSON, checkpoint checksum and stated limitations.' }
      ],
      deployment: 'The verified deployment is the public Kaggle notebook, configured for GPU and internet access. There is no verified patient-facing API or clinical application, which is the appropriate maturity level until stronger validation exists. A non-clinical demonstration would additionally need a locked inference container, strict file validation, no retention by default, a clear disclaimer, model and version metadata, and monitoring for drift and failures; clinical use would require a fundamentally different validation and regulatory programme.',
      outcome: 'The work demonstrates TensorFlow input pipelines, augmentation, CNN design, GPU training, evaluation and prediction visualization. It does not yet demonstrate a defensible result: the notebook snapshot preserves no cell outputs, so no final test score can be quoted, the portfolio describes three tumour categories while the notebook sets n_classes to 4, and the training-loss chart is plotted from the accuracy history instead of the loss history. The next increment is to reconcile the actual labels, correct the loss plot and rerun with patient-level splits and preserved metrics, then publish a model card covering data, intended use and limitations.'
    },
    {
      id: 'potato-disease',
      number: '11',
      client: 'Potato Disease Classification',
      title: 'Leaf Classifier Across Web, API and Mobile',
      category: 'AI & Automation',
      industry: 'Agriculture / Crop Health',
      evidence: 'source-verified',
      repoUrl: 'https://github.com/Girishiam/Potato-Disease-Classification',
      accent: '#65A30D',
      maturity: 'A multi-client machine-learning prototype with deployment components; no active public service was verified.',
      services: ['Model Training', 'API Engineering', 'Front-End Engineering', 'Mobile Delivery', 'Cloud Deployment'],
      results: [
        'Classifies leaves as Early Blight, Late Blight or Healthy',
        'Exposes a FastAPI /predict route with a TensorFlow Serving variant',
        'Covers web, mobile and on-device TFLite delivery paths'
      ],
      summary: 'A potato leaf disease classifier carried from training through REST inference to web, mobile and on-device clients.',
      overview: 'The repository goes beyond a training notebook. It holds a CNN workflow that classifies potato leaves as Early Blight, Late Blight or Healthy, versioned saved models, a FastAPI prediction service, a TensorFlow Serving client, a React upload interface, a React Native application, TensorFlow Lite conversion and inference work, and Google Cloud function variants. Together these explore the full path from training to several delivery targets, with deployment components present but no operating public service.',
      challenge: 'Leaf symptoms can be confused visually, and delayed identification affects how a crop is managed. The product goal is narrow: a user submits a clear potato leaf image and receives a class with a confidence value. The likely users are learners, agritech demonstrators, or growers inside an advisory workflow, so the output has to be framed as decision support rather than definitive agronomic diagnosis. Poor image quality and non-target diseases can make a confident answer wrong.',
      solution: 'The FastAPI service loads a TensorFlow SavedModel, exposes a health-style /ping, accepts an uploaded file at /predict, opens it with PIL, converts it to an array, runs inference and returns the class with a confidence value. An alternative service routes the same request to TensorFlow Serving. The React client pairs Material UI with a dropzone-style upload, and the React Native application handles image picking and device permissions. Google Cloud function code downloads potatoes.h5 from Cloud Storage on cold start. Separate notebooks and artifacts cover TensorFlow Lite conversion for the on-device path.',
      requirements: [
        'Accept an image, validate type and size, convert to RGB, and apply the training preprocessing',
        'Return one of the three repository classes with a confidence value and model version',
        'Provide responsive web upload and mobile image-selection experiences',
        'Keep class ordering identical across training, SavedModel, TFLite, server and clients',
        'Handle unsupported plants, poor images, uncertain predictions, service errors and timeouts',
        'Version data, model, preprocessing contract, metrics and deployment artifact together'
      ],
      qualityBar: {
        label: 'Quality Requirements',
        items: [
          'Avoid storing farm, location or image data unless explicitly required and consented',
          'Test SavedModel, H5, TensorFlow Serving and TFLite against a golden image set',
          'Set an acceptable numerical difference threshold between exported artifacts',
          'Unit-test preprocessing, contract-test API responses and scan malformed images',
          'Track latency, error rate, class distribution and low-confidence rate'
        ]
      },
      architecture: [
        'Training notebook -> dataset and preprocessing contract',
        'SavedModel / H5 export -> TensorFlow Lite conversion',
        'Versioned model inference',
        'FastAPI predict route / TensorFlow Serving adapter / Cloud function',
        'React web upload client / React Native on-device client',
        'Class and confidence returned to the user'
      ],
      stack: [
        { name: 'Python', layer: 'Language' },
        { name: 'TensorFlow/Keras', layer: 'Model' },
        { name: 'FastAPI', layer: 'API' },
        { name: 'TensorFlow Serving', layer: 'Serving' },
        { name: 'React', layer: 'Interface' },
        { name: 'React Native', layer: 'Mobile' },
        { name: 'TensorFlow Lite', layer: 'Mobile' },
        { name: 'Google Cloud Storage', layer: 'Storage' }
      ],
      buildSteps: [
        { title: 'Define and audit classes', detail: 'Establish image inclusion criteria, source, consent and licence, duplicates, class balance and field conditions. Write an explicit policy for unsupported or uncertain inputs.' },
        { title: 'Version the preprocessing contract', detail: 'Fix target size, channel order, scaling, augmentation and class map, then share that contract with every inference target.', stack: 'Python' },
        { title: 'Split and train the model', detail: 'Prevent near-duplicate and same-plant leakage, train baselines, checkpoint the best model, and report per-class confusion and recall alongside accuracy.', stack: 'TensorFlow/Keras' },
        { title: 'Export and compare artifacts', detail: 'Test SavedModel, H5, TensorFlow Serving and TFLite against a golden image set and agree an acceptable numerical difference threshold.', stack: 'TensorFlow Lite' },
        { title: 'Build one API contract', detail: 'Return class, confidence, model version, request ID and warnings. Validate upload size and type, set timeouts, and apply an uncertainty threshold.', stack: 'FastAPI' },
        { title: 'Develop clients against fixtures', detail: 'Cover select and capture, preview, upload progress, result, retry and privacy messaging before relying on the live endpoint.', stack: 'React' },
        { title: 'Automate the test suite', detail: 'Unit-test preprocessing, contract-test API responses, compare artifact outputs, scan malformed images, and run end-to-end success and failure paths.' },
        { title: 'Observe the service responsibly', detail: 'Track latency, error rate, class distribution and low-confidence rate without retaining raw images by default.' }
      ],
      deployment: 'The repository documents Google Cloud and includes cloud-function code, but no current public endpoint was verified. A production path could run a containerized FastAPI service on Cloud Run with the model baked into a versioned image, or TensorFlow Serving behind a small authenticated API, with the TFLite model running on-device for low-connectivity use once output parity is tested. Shipping it would mean CI that builds and scans the image, runs golden-set parity tests, deploys a canary, verifies a smoke prediction and rolls back by immutable model and container version, with secrets and bucket configuration held outside code.',
      outcome: 'The project covers a wide span of machine-learning delivery: training, model serialization, REST inference, model serving, responsive web upload, mobile integration, cloud storage and functions, and TFLite conversion. What it does not yet show is one operating endpoint, and several source details need correcting first - the cloud function creates image but calls tf.expand_dims on an undefined img, upload validation and production CORS need tightening, the README and API requirements name different TensorFlow versions, bucket and model names are placeholders, and model and class metadata are not returned. The next increment is to consolidate these paths behind a single versioned inference contract, pin environments, add out-of-domain and uncertainty handling, and deploy one monitored demonstration endpoint with reproducible metrics and a model card.'
    },
    {
      id: 'nlp-chatbot',
      number: '12',
      client: 'NLP Chatbot',
      title: 'Intent Classification Assistant',
      category: 'AI & Automation',
      industry: 'Conversational AI / Support',
      evidence: 'source-verified',
      repoUrl: 'https://github.com/Girishiam/chatbot_nlp',
      accent: '#14B8A6',
      maturity: 'A local desktop chatbot built for teaching and demonstration. It is not a hosted web service and does not run behind a production API.',
      services: ['Natural Language Processing', 'Model Training', 'Inference Engineering', 'Data Schema Design', 'Desktop Application Delivery'],
      results: [
        'Maps phrasing variants of a known request to a controlled reply',
        'Rejects predictions below the 0.75 probability threshold',
        'Saves vocabulary, class order and weights as one artifact'
      ],
      summary: 'A desktop assistant that classifies a message into a known intent and answers from a controlled response set, or declines when unsure.',
      overview: 'The assistant implements a complete classical intent-response pipeline. It tokenizes and stems example phrases, converts them into bag-of-words vectors, trains a small feed-forward PyTorch classifier, serializes the vocabulary, class list and model state together, and runs inference behind a Tkinter chat window. When a prediction clears a 0.75 probability threshold it returns a response from the matched intent, and otherwise it returns a fallback message.',
      challenge: 'Rule-only chatbots are brittle, and a generative model is unnecessary for a narrow set of frequently asked questions while adding cost, nondeterminism and safety concerns. Intent classification sits between the two: many phrasings of a known request map to one controlled response set. The tradeoff is that coverage is bounded by the quality of the intent file, and the assistant cannot answer arbitrary questions.',
      solution: 'The training script reads intents.json, tokenizes with NLTK, applies Porter stemming, and builds a bag-of-words vocabulary. It trains a three-layer network with ReLU between the linear layers for 1,000 epochs at batch size 8, hidden size 8 and learning rate 0.001, using Adam and cross-entropy loss. Input and output sizes, hidden size, words, tags and weights are written together into a single data.pth artifact, so inference reads the same vocabulary and class order that training wrote. The chat module rebuilds the model, transforms each message with the saved vocabulary, applies softmax, and uses the predicted tag only above 0.75. The desktop layer wraps that call in a Tkinter window with a scrollable transcript, a text input and a send action.',
      requirements: [
        'Maintain a clear intent schema with tags, training patterns and controlled responses',
        'Normalize input identically during training and inference',
        'Train a reproducible classifier and keep vocabulary, class order and weights together',
        'Return a response from the matched intent, or a fallback when nothing matches',
        'Provide an accessible desktop conversation interface that does not block on inference'
      ],
      qualityBar: {
        label: 'Quality Requirements',
        items: [
          'Reject uncertain or out-of-scope messages rather than forcing a confident answer',
          'Treat a raw softmax score as an uncalibrated signal, not measured confidence',
          'Log and evaluate errors without collecting sensitive conversation content by default',
          'Keep training code, inference code, model artifact and documentation consistent'
        ]
      },
      architecture: [
        'intents.json intent schema',
        'NLTK tokenizer -> Porter stemmer -> bag-of-words vocabulary',
        'PyTorch feed-forward classifier -> data.pth artifact',
        'Saved words / tags / weights',
        'Message -> same preprocessing -> softmax -> 0.75 threshold',
        'Matched intent response / fallback message'
      ],
      stack: [
        { name: 'Python', layer: 'Language' },
        { name: 'PyTorch', layer: 'Model' },
        { name: 'NLTK', layer: 'Data' },
        { name: 'NumPy', layer: 'Data' },
        { name: 'JSON intent schema', layer: 'Storage' },
        { name: 'Tkinter', layer: 'Desktop' }
      ],
      buildSteps: [
        { title: 'Define the scope', detail: 'List the supported user goals, the disallowed and sensitive topics, the fallback and escalation behaviour, and what counts as a successful response.' },
        { title: 'Design the intent data', detail: 'Use distinct, non-overlapping tags with varied patterns, keep response wording separate from training examples, and reserve unseen paraphrases as a test set.', stack: 'JSON intent schema' },
        { title: 'Build preprocessing', detail: 'Normalize case and punctuation, tokenize, then stem or lemmatize. Assert that training and inference produce identical vectors.', stack: 'NLTK' },
        { title: 'Train a baseline', detail: 'Compare rules and logistic regression against the network. Record seeds, dependency versions, loss, held-out accuracy, per-intent precision and recall, and the confusion matrix.', stack: 'PyTorch' },
        { title: 'Tune the rejection rule', detail: 'Evaluate threshold behaviour on both known messages and deliberately out-of-scope ones, since a raw softmax score is not calibrated confidence.' },
        { title: 'Integrate the interface', detail: 'Keep inference off the UI thread where it can block, and support send and Enter, focus handling, copyable text, readable contrast and clear fallback wording.', stack: 'Tkinter' },
        { title: 'Package and test', detail: 'Pin dependencies and NLTK resources, unit-test preprocessing, and test artifact compatibility, empty and unicode messages, threshold boundaries and every intent.' }
      ],
      deployment: 'What exists today is local desktop software. Distribution can use a virtual environment plus a requirements file, or a packaged executable that carries the model and the NLTK resources with it. A later web deployment would put the response function behind a small FastAPI service with rate limiting, schema validation, versioned artifacts, privacy-aware telemetry and a web client, which is a recommended path rather than the current implementation.',
      outcome: 'The work demonstrates NLP preprocessing, supervised intent classification, PyTorch training and inference, confidence-based rejection, artifact serialization and desktop integration. It does not yet report held-out per-intent metrics or a calibrated rejection threshold, and the repository README describes Django, database, payments and OpenAI-oriented capabilities that the inspected source does not contain. The next increment is to correct that README so reviewers are not misled, then add held-out intent metrics and calibrate the threshold before improving the fallback and escalation path.'
    },
    {
      id: 'greatkart',
      number: '13',
      client: 'GreatKart',
      title: 'Django Commerce Platform',
      category: 'Technology',
      industry: 'E-commerce / Retail',
      evidence: 'source-verified',
      repoUrl: 'https://github.com/Girishiam/GreatKart',
      accent: '#EA580C',
      maturity: 'A substantial Django application that runs locally. No production deployment was verified, and development settings are still in place.',
      services: ['Back-End Engineering', 'Domain Modelling', 'Authentication Engineering', 'Checkout and Payments Integration', 'Transactional Email Delivery'],
      results: [
        'Separates accounts, catalogue, cart and orders into bounded apps',
        'Carries a guest session cart through login into an account',
        'Transfers cart items and their variations into OrderProduct lines'
      ],
      summary: 'A server-rendered Django retail platform with email accounts, product variations, carts, order placement and payment records.',
      overview: 'GreatKart is the most conventional full-stack build in this collection. The repository separates accounts, categories, store and catalogue, cart, and orders into distinct Django apps. It covers email-first custom accounts, registration and activation, login and password recovery, products and categories, colour and size variations, ratings and reviews, session and user carts, order placement, payment records, order lines, stock handling and transactional email templates.',
      challenge: 'Correctness in retail depends on coordinated state. The catalogue can show a product while the cart holds one particular variation, inventory can change before checkout, a payment callback can arrive twice, a guest can authenticate midway through a purchase, and a completed order has to preserve the product name, price, quantity and variations exactly as they were at purchase time. The app boundaries in this build follow those responsibilities rather than page structure.',
      solution: 'The Product model stores slug, description, price, image, stock, availability, category and timestamps, Variation carries the active colour and size values, and ReviewRating records rating, subject, review text, user, IP, status and dates with helpers for average and count. The custom Account model uses email as the primary login identity and exposes role and status fields. Account views cover registration, token-based email activation, authentication, guest-cart merging, logout and password reset. Order state is split across three models: Payment, Order and OrderProduct. The placement and payment views create an order number, retain billing, tax and status data, transfer cart items and their variations into order lines, clear the cart, and send a confirmation email.',
      requirements: [
        'Browse categories and products with price, availability, images and review summary',
        'Select active colour and size variations and manage cart quantities as guest or user',
        'Register with email, activate the account, authenticate, reset password and merge a guest cart',
        'Validate billing details, calculate totals and tax, create the order and record payment',
        'Move cart lines to order lines and show confirmation and account order history',
        'Allow eligible users to review products according to a defined policy'
      ],
      qualityBar: {
        label: 'Correctness and Security Requirements',
        items: [
          'Treat totals, stock, order status and payment status as server-authoritative',
          'Process payments idempotently and verify provider signature, amount and currency',
          'Prevent overselling with database transactions and conditional inventory updates',
          'Keep secrets out of source and enforce HTTPS, CSRF, secure cookies and host limits',
          'Preserve immutable order-line snapshots even if products later change'
        ]
      },
      architecture: [
        'Category -> Product -> Variation / Review',
        'Guest session cart / authenticated account cart',
        'Server-side totals -> Order -> verified Payment',
        'OrderProduct line snapshots',
        'Inventory update / confirmation email / account order history'
      ],
      stack: [
        { name: 'Python', layer: 'Language' },
        { name: 'Django 3.2', layer: 'Platform' },
        { name: 'Django templates', layer: 'Interface' },
        { name: 'HTML, CSS and JavaScript', layer: 'Interface' },
        { name: 'SQLite development database', layer: 'Data' },
        { name: 'PayPal-oriented order flow', layer: 'Payments' }
      ],
      buildSteps: [
        { title: 'Model the invariants first', detail: 'Define money and currency, stock rules, product variants and SKUs, guest cart identity, tax, shipping, order and payment states, refunds, and review eligibility before writing views.' },
        { title: 'Create bounded Django apps', detail: 'Keep accounts, catalogue, carts, orders and payments, and communication separate, and avoid circular business logic inside views.', stack: 'Django 3.2' },
        { title: 'Build catalogue and admin', detail: 'Add database constraints and indexes, media validation, a slug strategy, variant availability, and efficient list and detail queries.', stack: 'SQLite development database' },
        { title: 'Implement the carts', detail: 'Use stable cart IDs for guests, a unique line constraint per product and variation combination, server-side price lookup, and a tested merge policy at login.' },
        { title: 'Build transactional checkout', detail: 'In one controlled transaction, re-read prices, validate and decrement stock atomically, create the order and its line snapshots, and initialize payment. Browser totals are never trusted.' },
        { title: 'Integrate payment safely', detail: 'Create provider orders server-side, verify signed callbacks, compare amount, currency and order ID, store provider event IDs, and keep handlers idempotent so fulfilment follows only trusted status.', stack: 'PayPal-oriented order flow' },
        { title: 'Add transactional email', detail: 'Send email from committed order events through a queue, and make retries idempotent.' },
        { title: 'Test the hard paths', detail: 'Cover permissions, cart merges, concurrent last-item purchases, duplicate callbacks, failed and abandoned payment, tax rounding, refunds, email retry, reviews, and end-to-end checkout.' }
      ],
      deployment: 'The README mentions Heroku, but no active deployment was verified and the repository does not show a complete production release setup. Development settings use SQLite with DEBUG enabled, host restrictions and sensitive configuration still need hardening, and a Django secret present in settings should be rotated and moved into managed environment variables. A production target would run Gunicorn in a container or a managed Python service with PostgreSQL, queue workers where needed, object storage and a CDN for media, environment-based secrets, an approved payment integration, and CI that runs migration checks, tests and security scanning into staging before promotion, with tested backups.',
      outcome: 'The build demonstrates Django domain modelling, custom authentication, session and account cart continuity, product variations, reviews, order persistence, payment-oriented workflows and transactional email. It does not yet prove commercial correctness: in the inspected payment flow, stock appears to be assigned to the purchased quantity rather than decremented by it, and payment verification needs server-to-provider validation so that a client-submitted payment ID or status cannot mark an order paid. The next increment is to correct that stock mutation behind an atomic database update and cover it with a concurrency and idempotency test suite, before any feature expansion.'
    },
  ] as CaseStudy[],

  testimonials: [
    {
      id: 'jordan',
      author: 'Jordan Lee',
      role: 'Operations Director',
      company: 'NorthPeak Moving',
      quote: 'Webants connected our website, campaigns and lead follow-up into one clear workflow.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'morgan',
      author: 'Morgan Taylor',
      role: 'Marketing Manager',
      company: 'BloomCart',
      quote: 'The subscription model gave us reliable creative support without managing several freelancers.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'alex',
      author: 'Alex Morgan',
      role: 'Director',
      company: 'Harborline Services',
      quote: 'The team understood both our marketing needs and our operational challenges.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'casey',
      author: 'Casey Bennett',
      role: 'Growth Manager',
      company: 'Evernest Realty',
      quote: 'Communication was clear, delivery was organized and every project had a clear owner.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    }
  ] as Testimonial[],

  reviews: [
    {
      id: 'r1',
      author: 'Taylor R.',
      rating: 5,
      platform: 'Google',
      quote: 'Professional, reliable and very easy to work with.',
      date: '2 weeks ago'
    },
    {
      id: 'r2',
      author: 'Chris M.',
      rating: 5,
      platform: 'Google',
      quote: 'Our website and CRM workflow became much more organized.',
      date: '1 month ago'
    },
    {
      id: 'r3',
      author: 'Jamie K.',
      rating: 5,
      platform: 'Google',
      quote: 'Excellent design quality and consistent communication.',
      date: '2 months ago'
    },
    {
      id: 'r4',
      author: 'Robin S.',
      rating: 5,
      platform: 'Google',
      quote: 'The automation system saved our team several hours each week.',
      date: '3 months ago'
    },
    {
      id: 'r5',
      author: 'Dana P.',
      rating: 5,
      platform: 'Upwork',
      quote: 'Top-tier technical capability paired with outstanding responsiveness.',
      date: 'Top Rated Plus Partner'
    },
    {
      id: 'r6',
      author: 'Soren B.',
      rating: 5,
      platform: 'Clutch',
      quote: '5.0 Star verified client review for web engineering and workflow automation.',
      date: 'Verified Review'
    },
    {
      id: 'r7',
      author: 'Micah T.',
      rating: 5,
      platform: 'LinkedIn',
      quote: 'Seamless collaboration and fast delivery across design and tech sprints.',
      date: 'Executive Endorsement'
    },
    {
      id: 'r8',
      author: 'Quinn V.',
      rating: 5,
      platform: 'Facebook',
      quote: 'Recommend Webants to any business needing connected digital systems.',
      date: 'Recommended Page'
    }
  ] as ReviewItem[],

  videoTestimonials: [
    {
      id: 'v1',
      client: 'NorthPeak Moving',
      title: 'How We Improved Lead Follow-Up',
      duration: '1:24',
      description: 'Operations Director Jordan Lee shares how automated CRM workflows sped up estimate quotes.',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
      videoUrlPlaceholder: 'sample_video_northpeak'
    },
    {
      id: 'v2',
      client: 'BloomCart',
      title: 'Why We Chose Subscription Creative',
      duration: '1:06',
      description: 'Marketing Manager Morgan Taylor explains how daily visual assets scaled their e-commerce store.',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      videoUrlPlaceholder: 'sample_video_bloomcart'
    },
    {
      id: 'v3',
      client: 'Harborline Services',
      title: 'Building a Connected Marketing System',
      duration: '1:42',
      description: 'Director Alex Morgan describes replacing three disjointed agencies with one Webants team.',
      thumbnail: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=800&q=80',
      videoUrlPlaceholder: 'sample_video_harborline'
    }
  ] as VideoTestimonial[],

  pricing: {
    disclaimer: 'Transparent monthly billing with flexible sprint adjustments.',
    subscriptions: [
      {
        id: 'creative-sub',
        title: 'Creative',
        badge: '',
        price: '$1,200',
        period: '/month',
        shortDesc: 'Turnkey brand design, graphic assets, video editing and ad creative.',
        features: ['Unlimited design requests', '48-hour turnarounds', 'Social & ad banners', 'Dedicated designer']
      },
      {
        id: 'digital-ops-sub',
        title: 'Digital Operations',
        badge: '',
        price: '$1,800',
        period: '/month',
        shortDesc: 'Social media, content management, CRM updates and email campaigns.',
        features: ['Social channel management', 'Email campaign builds', 'CRM contact hygiene', 'Monthly analytics']
      },
      {
        id: 'growth-sub',
        title: 'Growth',
        badge: 'Recommended',
        price: '$2,500',
        period: '/month',
        shortDesc: 'SEO, local search, paid media management and conversion funnels.',
        features: ['Google & Meta Ads management', 'Technical & Local SEO', 'Landing page builds', 'Attribution dashboards']
      },
      {
        id: 'integrated-partner-sub',
        title: 'Integrated Partner',
        badge: 'Full Suite',
        price: 'From $4,500',
        period: '/month',
        shortDesc: 'Dedicated cross-functional team across Creative, Growth, Tech & Automation.',
        features: ['Full multi-department squad', 'Custom AI & CRM workflows', 'Priority response SLA', 'Weekly executive sync']
      }
    ],
    fixedRates: [
      { service: 'Brand Identity System', price: '$2,500', timeline: '2-3 Weeks' },
      { service: 'Business Website', price: '$4,500', timeline: '3-4 Weeks' },
      { service: 'Shopify Website', price: '$5,500', timeline: '4-5 Weeks' },
      { service: 'Automation Setup', price: '$3,500', timeline: '2 Weeks' },
      { service: 'Custom System / Portal', price: 'Custom Quote', timeline: 'Scoped per project' }
    ],
    hourlyRate: 'From $45/hour',
    hourlyDesc: 'Flexible support for evolving requirements, quick fixes, and ad-hoc engineering.',
    enterpriseQuote: 'Custom Pricing',
    enterpriseDesc: 'Dedicated systems, specialized teams, compliance needs and multi-brand regional deployments.'
  },

  freeTrial: {
    eligibleServices: [
      'Graphic design (Ad banners, social graphics)',
      'Social-media creative assets',
      'Basic video editing & Reel cuts',
      'Content updates & formatting',
      'CRM contact support & basic clean-up',
      'Website content and copy adjustments'
    ],
    excludedServices: [
      'Paid advertising media spend',
      'Physical printing & direct mail fees',
      'Full website redesigns or custom code builds',
      'Complex custom backend/portal architectures',
      'Large multi-step automation scenario engineering',
      'Paid 3rd-party software licenses',
      'Unlimited scope volume'
    ],
    conditions: [
      'Qualified service-driven businesses only',
      'Strict limit of one 7-day trial per company',
      'Defined initial task scope agreed before kick-off',
      'Subject to team schedule & onboarding availability',
      'Requires selection of an active monthly plan after trial completion'
    ]
  },

  industries: [
    {
      id: 'moving',
      name: 'Moving Companies',
      challenge: 'High cost per lead, missed phone calls during transit, and slow estimate turnaround times.',
      relevantServices: ['Website Systems', 'Google Ads', 'Instant Lead Automation', 'Review Generation'],
      caseStudyTitle: '32% Faster Lead Response for NorthPeak Moving',
      caseStudyResult: 'Unified call, web form, and map leads into a centralized mobile sales app with auto-reply SMS.',
      testimonialQuote: 'Webants connected our website, campaigns and lead follow-up into one clear workflow.',
      testimonialAuthor: 'Jordan Lee, NorthPeak Moving',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'home-services',
      name: 'Home Services',
      challenge: 'Inconsistent dispatching, delayed field quotes, and low online review visibility.',
      relevantServices: ['Local SEO', 'CRM Automation', 'SMS Follow-Ups', 'Meta Ads'],
      caseStudyTitle: 'Automated Service Dispatching for Harborline',
      caseStudyResult: 'Eliminated manual phone tag by auto-assigning zip-code leads directly to field technicians.',
      testimonialQuote: 'The team understood both our marketing needs and our operational challenges.',
      testimonialAuthor: 'Alex Morgan, Harborline Services',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      challenge: 'Rising customer acquisition costs and slow creative production cycles for product promotions.',
      relevantServices: ['Shopify Development', 'Creative Subscriptions', 'Email Flows', 'Meta & TikTok Ads'],
      caseStudyTitle: '90 Monthly Creative Assets for BloomCart',
      caseStudyResult: 'Scaled ad catalog velocity to maintain fresh ad creative and cut customer acquisition costs.',
      testimonialQuote: 'The subscription model gave us reliable creative support without managing several freelancers.',
      testimonialAuthor: 'Morgan Taylor, BloomCart',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      challenge: 'Unqualified buyer inquiries and disconnected agent CRM follow-up systems.',
      relevantServices: ['Landing Page Funnels', 'Meta Ads', 'GoHighLevel CRM', 'Video Tours'],
      caseStudyTitle: 'Connected Agent Funnel for Evernest Realty',
      caseStudyResult: 'Automated pre-qualification survey for prospective buyers before scheduling site viewings.',
      testimonialQuote: 'Communication was clear, delivery was organized and every project had a clear owner.',
      testimonialAuthor: 'Casey Bennett, Evernest Realty',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      challenge: 'Outdated practice websites, low mobile conversion rates, and complicated appointment booking.',
      relevantServices: ['Healthcare Web Platforms', 'SEO & Local Search', 'Patient Communication', 'Content Management'],
      caseStudyTitle: 'Mobile-First Patient Portal for Vitalis Health',
      caseStudyResult: 'Simplified appointment scheduling for mobile users, resulting in higher online booking adoption.',
      testimonialQuote: 'Modern, clean design that boosted our patient online scheduling immediately.',
      testimonialAuthor: 'Clinical Operations Team, Vitalis Health',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'sports',
      name: 'Sports & Consumer Brands',
      challenge: 'High competition across social media and slow turnaround for new collection campaign launch assets.',
      relevantServices: ['Motion Design', 'Short-Form Video', 'Ad Creative', 'Brand Strategy'],
      caseStudyTitle: 'Multi-Channel Campaign Production for Apex Athletics',
      caseStudyResult: 'Created a unified 60-piece motion and video campaign kit delivered in under 10 business days.',
      testimonialQuote: 'Rapid turnarounds that kept our seasonal launch campaigns looking world-class.',
      testimonialAuthor: 'Brand Team, Apex Athletics',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'professional-services',
      name: 'Professional Services',
      challenge: 'Difficulty communicating complex value propositions and generating high-intent corporate inquiries.',
      relevantServices: ['Webflow Websites', 'Content & Thought Leadership', 'Search Optimization', 'CRM Tracking'],
      caseStudyTitle: 'Corporate Advisory Portal for Oakline Legal',
      caseStudyResult: 'Positioned practice areas clearly with intuitive consultation intake forms and top search rankings.',
      testimonialQuote: 'Webants elevated our digital footprint to match our senior advisory reputation.',
      testimonialAuthor: 'Partner Advisory, Oakline Legal',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
    }
  ] as IndustryItem[],

  jobs: [
    {
      id: 'graphic-designer',
      title: 'Multidisciplinary Graphic Designer',
      department: 'Creative',
      type: 'Full-Time Remote',
      location: 'Global (Remote)',
      salary: 'Negotiable',
      hours: '8:00 PM – 4:00 AM Bangladesh Time (BST)',
      overview: 'We are seeking an exceptionally sharp, multidisciplinary Graphic Designer to craft high-converting ad graphics, brand visual systems, pitch decks, and digital campaign marketing assets.',
      responsibilities: [
        'Design high-converting paid social ad creative for Meta, Google, and LinkedIn.',
        'Develop brand identity systems, typography guidelines, and logo lockups.',
        'Collaborate with motion designers and copywriters to execute unified campaign toolkits.',
        'Maintain high design standards and deliver pixel-perfect Figma/Adobe source files.'
      ],
      requirements: [
        '2+ years of agency or remote D2C/B2B graphic design experience.',
        'Expert command of Figma, Photoshop, and Illustrator.',
        'Strong understanding of visual hierarchy, marketing layout, and conversion principles.',
        'Ability to work BST night shift sync hours (8:00 PM to 4:00 AM BST).'
      ]
    },
    {
      id: 'video-editor',
      title: 'Video Editor',
      department: 'Creative',
      type: 'Full-Time Remote',
      location: 'Global (Remote)',
      salary: 'Negotiable',
      hours: '8:00 PM – 4:00 AM Bangladesh Time (BST)',
      overview: 'Join Webants as a Video Editor specializing in short-form Reels, TikToks, YouTube shorts, and promotional brand video edits for international client accounts.',
      responsibilities: [
        'Edit engaging short-form marketing videos with clean cuts, captions, and sound design.',
        'Optimize video assets for various aspect ratios (9:16, 16:9, 1:1).',
        'Incorporate visual hooks, dynamic typography, and brand motion overlays.',
        'Organize raw footage and maintain clean project archives.'
      ],
      requirements: [
        'Proficiency in Adobe Premiere Pro or DaVinci Resolve.',
        'Portfolio demonstrating high-engagement short-form video content.',
        'Understanding of pacing, audio mixing, and visual storytelling for digital ads.'
      ]
    },
    {
      id: 'motion-designer',
      title: 'Motion Designer',
      department: 'Creative',
      type: 'Full-Time Remote',
      location: 'Global (Remote)',
      salary: 'Negotiable',
      hours: '8:00 PM – 4:00 AM Bangladesh Time (BST)',
      overview: 'Create sleek, modern 2D and 3D motion graphics, kinetic typography, UI animations, and logo stingers for tech and growth brands.',
      responsibilities: [
        'Animate UI product walkthroughs, system diagrams, and brand logos.',
        'Develop motion graphic templates for recurring marketing campaigns.',
        'Partner with web developers to export lightweight Lottie animations.'
      ],
      requirements: [
        'Advanced expertise in Adobe After Effects and illustrator asset preparation.',
        'Strong sense of timing, easing, keyframe velocity, and visual physics.',
        'Experience with UI animation or tech product explainer graphics is a plus.'
      ]
    },
    {
      id: 'marketing-specialist',
      title: 'Digital Marketing Specialist',
      department: 'Growth',
      type: 'Full-Time Remote',
      location: 'Global (Remote)',
      salary: 'Negotiable',
      hours: '8:00 PM – 4:00 AM Bangladesh Time (BST)',
      overview: 'Manage performance media campaigns across Google Ads and Meta, oversee technical SEO tasks, and optimize lead conversion funnels.',
      responsibilities: [
        'Build, monitor, and optimize Google Search, Display, and Meta Ad campaigns.',
        'Perform technical SEO audits, keyword research, and page-level optimizations.',
        'Analyze conversion data and construct weekly client performance reports.',
        'Collaborate with landing page developers to improve conversion rates.'
      ],
      requirements: [
        'Hands-on experience managing ad spend and Google Analytics 4 / Google Tag Manager.',
        'Proven track record in B2B or service business lead generation.',
        'Data-driven mindset with clear English written communication skills.'
      ]
    },
    {
      id: 'hr-intern',
      title: 'HR Intern',
      department: 'Digital Operations',
      type: 'Internship (Remote)',
      location: 'Dhaka / Remote',
      salary: 'Stipend + Growth Path',
      hours: 'Flexible / Sync Hours',
      overview: 'Support talent acquisition, remote employee onboarding, team culture initiatives, and HR documentation for our growing digital agency.',
      responsibilities: [
        'Assist in screening resumes and organizing candidate interview schedules.',
        'Draft job descriptions and manage applicant tracking listings.',
        'Support remote team onboarding and internal documentation upkeep.',
        'Coordinate team engagement and feedback channels.'
      ],
      requirements: [
        'Current student or recent graduate in Business, HR, or related discipline.',
        'Strong organizational and communication skills.',
        'Enthusiasm for fast-paced remote work culture.'
      ]
    }
  ] as JobPosition[],

  insights: [
    {
      id: 'moving-lead-followup',
      title: 'Improving Lead Follow-Up for Moving Companies',
      category: 'Growth & Automation',
      readTime: '4 min read',
      date: 'July 18, 2026',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      summary: 'How moving businesses can cut response times from hours to under 2 minutes using instant SMS auto-replies and centralized CRM pipelines.',
      content: 'In the moving and relocation industry, speed to lead dictates close rate. Studies show that responding to an inquiry within 5 minutes increases conversion probability by over 300%. By implementing automated lead routing from Google Local Services Ads, Meta forms, and web quote calculators into a single app, sales teams never miss an estimate request.'
    },
    {
      id: 'marketing-automation-when',
      title: 'When to Use Marketing Automation',
      category: 'AI & Automation',
      readTime: '3 min read',
      date: 'July 12, 2026',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      summary: 'Key indicators that your team is ready to replace manual copy-pasting with automated CRM workflows and instant lead notifications.',
      content: 'Automation should clarify operations, not create chaos. You are ready for marketing automation when your team performs repetitive manual tasks more than 5 times daily, leads are dropping through cracks during weekends, or lead attribution data is scattered across spreadsheets.'
    },
    {
      id: 'website-conversion-mistakes',
      title: 'Website Mistakes That Reduce Conversions',
      category: 'Technology',
      readTime: '5 min read',
      date: 'June 28, 2026',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      summary: 'Nine common web design oversights—from slow mobile load times to ambiguous call-to-action buttons—that quietly leak qualified leads.',
      content: 'A high-converting website needs clear visual hierarchy, single-line mobile button text, fast loading times, and instant trust indicators like client ratings and verified badges right near the primary action.'
    },
    {
      id: 'creative-subscriptions-explained',
      title: 'How Creative Subscriptions Work',
      category: 'Creative',
      readTime: '4 min read',
      date: 'June 20, 2026',
      image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=800&q=80',
      summary: 'Why growing companies are transitioning from unpredictable project billing and slow freelancers to predictable monthly creative teams.',
      content: 'Creative subscription models give marketing directors access to a coordinated squad of graphic designers, video editors, and motion animators for a flat monthly fee with consistent turnarounds and no surprise scope fees.'
    },
    {
      id: 'crm-automation-service-biz',
      title: 'CRM Automation for Service Businesses',
      category: 'AI & Automation',
      readTime: '4 min read',
      date: 'June 11, 2026',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
      summary: 'Streamlining appointment booking, automated quote follow-ups, and review collection for home and field service operators.',
      content: 'Connecting GoHighLevel or NovaCRM to Zapier or Make allows field operators to automatically trigger pre-appointment SMS reminders, post-service review requests, and re-engagement campaigns without lifting a finger.'
    },
    {
      id: 'direct-mail-digital-marketing',
      title: 'Combining Direct Mail and Digital Marketing',
      category: 'Growth',
      readTime: '3 min read',
      date: 'May 29, 2026',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
      summary: 'How physical mailers with personalized QR codes amplify Meta retargeting and local search campaigns in regional markets.',
      content: 'Physical direct mail cuts through inbox noise. When paired with digital retargeting pixels and dynamic landing page QR codes, direct mail response rates increase by up to 40% over standalone direct mailers.'
    },
    {
      id: 'ai-without-losing-brand-quality',
      title: 'Using AI Without Losing Brand Quality',
      category: 'AI & Automation',
      readTime: '5 min read',
      date: 'May 19, 2026',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      summary: 'Best practices for deploying AI customer assistants, lead qualification bots, and automated copy drafts while preserving human brand tone.',
      content: 'AI is most powerful as an operational accelerator, not a total human replacement. Guardrails, fine-tuned prompt instructions, and rapid human fallback ensure AI assistants represent your business with professional poise.'
    },
    {
      id: 'shopify-ops-growing-brands',
      title: 'Shopify Operations for Growing Brands',
      category: 'Digital Operations',
      readTime: '4 min read',
      date: 'May 04, 2026',
      image: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=800&q=80',
      summary: 'Essential store back-office habits, automated email flow sequences, and catalog updates to scale e-commerce revenue seamlessly.',
      content: 'Growing beyond $50k/month requires operational discipline: automated abandon-cart SMS, back-in-stock alerts, zero-lag inventory updates, and high-frequency promotional email deployment.'
    },
    {
      id: 'building-connected-growth-system',
      title: 'Building a Connected Growth System',
      category: 'Growth',
      readTime: '6 min read',
      date: 'April 22, 2026',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      summary: 'Why replacing fragmented agencies with a single coordinated growth partner delivers better ROI, speed, and communication.',
      content: 'When your designer talks directly to your ad specialist and your developer aligns with your CRM automation engineer, campaigns deploy faster, messaging stays consistent, and marketing investment translates into measurable growth.'
    }
  ] as InsightArticle[],

  faqs: [
    {
      q: 'How does the 7-Day Free Trial work?',
      a: 'Qualified service businesses can test our creative or digital operations workflow for 7 days with zero upfront payment. We agree on a specific limited task scope (e.g. ad banners, social assets, copy edits, CRM audit) so you can evaluate our speed and quality.'
    },
    {
      q: 'Do you replace our internal team or work alongside them?',
      a: 'We do both. Some clients use Webants as their entire outsourced growth and technical department, while others plug us in as a specialized execution partner for their existing Marketing Director or Operations Lead.'
    },
    {
      q: 'How do you handle team communication and timezone overlap?',
      a: 'Our core sync hours include 8:00 PM to 4:00 AM Bangladesh Time (BST), which aligns directly with US morning/afternoon and European working hours. We communicate via Slack/Teams, manage tasks in ClickUp/Asana, and hold weekly video progress syncs.'
    },
    {
      q: 'Is there a long-term contract for monthly subscriptions?',
      a: 'Our subscription plans operate month-to-month after an initial 30-day onboarding period. You can adjust your tier or pause services with 14 days notice before the next billing cycle.'
    },
    {
      q: 'Can we hire Webants for a one-off fixed project instead of a monthly subscription?',
      a: 'Yes! We build fixed-scope website systems ($4,500+), brand identity guidelines ($2,500+), Shopify storefronts ($5,500+), and custom automation architecture ($3,500+) with defined timelines and deliverables.'
    }
  ]
};

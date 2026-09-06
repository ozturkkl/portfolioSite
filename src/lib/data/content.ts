export const profile = {
  name: 'Kemal Ozturk',
  handle: 'Kemal_Ozt',
  role: 'Software Engineer',
  location: 'Wheeling, Illinois',
  email: '97kemalozturk@gmail.com',
  title: 'I engineer the path from an idea to a system people can trust.',
  status: 'On-call for recording reliability'
};

export const resumeUrl = '/Kemal-Ozturk-Resume-2026.pdf';

export const site = {
  url: 'https://kozturk.com',
  title: `${profile.name} | ${profile.role}`,
  description:
    'Kemal Ozturk is a software engineer who owns products from RFC through production. TypeScript, platform systems, and AI-assisted development with Cursor, Claude Code, and Codex.',
  shareDescription:
    'End-to-end product ownership, platform work, and AI-assisted development. Explore Kemal\'s work, open-source projects, and links.',
  imagePath: '/images/other/kemal.jpg',
  themeColor: '#171815'
};

export const heroQuotes = [
  {
    text: 'The purpose of software engineering is to control complexity, not to create it.',
    attribution: 'Pamela Zave'
  },
  {
    text: 'Complexity is the enemy of reliability.',
    attribution: 'John Allspaw'
  },
  {
    text: 'The only way to go fast is to go well.',
    attribution: 'Robert C. Martin'
  },
  {
    text: 'A complex system that works is invariably found to have evolved from a simple system that worked.',
    attribution: 'John Gall'
  }
];

export const heroFacts = [
  { label: 'Current role', value: `${profile.role} · Descript` },
  { label: 'Status', value: profile.status },
  { label: 'Scope', value: '7 years · RFC through production' },
  { label: 'Ownership', value: 'Technical DRI · Recording' },
  { label: 'AI tools', value: 'Cursor · Claude Code · Codex' }
];

export const copy = {
  hero: {
    kicker: 'SIGNAL / 001',
    photoWallLabel: 'PROJECT WALL / SELECT A FRAME'
  },
  experience: {
    kicker: 'Experience / 002',
    title: 'End-to-end ownership, from first RFC to production.',
    intro:
      'Seven years as the engineer who writes the plan, sequences the rollout, and stays on the hook after launch. I use Cursor, Claude Code, Codex, and Copilot to move faster without handing the quality bar to the model. Descript and SquadCast for product and platform work; Peel9 before that, shipping records software used by police departments.'
  },
  projects: {
    kicker: 'Projects / 003',
    title: 'Systems I designed and still operate.',
    intro:
      'Framework Control is a full-stack laptop control service I architected and still maintain. Cihan Radyo is a volunteer PWA in production. Repository details on this page refresh from GitHub.',
    defaultEyebrow: 'Recent repository',
    fallbackDescription: 'Details are being documented.'
  },
  toolkit: {
    kicker: 'Toolkit / 004',
    title: 'TypeScript in product. Agents in the loop.',
    intro:
      'Cursor, Claude Code, Codex, Copilot, and Zed are how I plan, implement, and review. I still write the RFC, own the rollout, and keep the quality bar. Rust and Nix when the machine has to be close to the metal and reproducible.',
    labPrefix: 'LAB'
  },
  links: {
    kicker: 'Links / 005',
    profileKicker: 'Profile / Personal',
    studioLabel: 'Off the clock / Piano',
    studioVideoUrl: 'https://www.youtube.com/embed/b2C7c3MK9wY',
    studioVideoTitle: 'Kemal Ozturk performing a piano cover'
  },
  contact: {
    kicker: 'Contact / 006',
    title: 'Need an owner from RFC through launch?',
    intro:
      'If you need someone to take a product from design through rollout, send a note. It lands in my inbox. LinkedIn and the resume are here if that is easier.',
    asideKicker: 'Also / Direct',
    placeholder: 'What you are shipping, and where you need an owner.',
    hint: 'Ctrl/Cmd + Enter also sends.',
    success: {
      kicker: 'Sent',
      title: 'Thanks. I’ll write back.',
      body: 'Your note is in my inbox. If it is time-sensitive, LinkedIn is the faster ping.'
    },
    errors: {
      unconfigured: `The form is not configured yet. Email ${profile.email} directly.`,
      sendFailed: `Something went wrong sending that. Email ${profile.email} directly.`
    }
  },
  footer: {
    credit: `Designed and built by ${profile.name}.`
  }
};

export type ContentImage = {
  src: string;
  alt: string;
  caption: string;
};

export type PhotoWallItem = ContentImage & {
  href?: string;
};

const workImages = {
  descriptRooms: {
    src: '/images/experience/descript-rooms.png',
    alt: 'Descript Rooms interface showing a remote recording and production controls',
    caption: 'Descript Rooms'
  },
  descriptApp: {
    src: '/images/experience/descript-app.png',
    alt: 'Descript main app surrounded by examples of the UI components',
    caption: 'Descript App'
  },
  descriptEditor: {
    src: '/images/experience/descript-editor.png',
    alt: 'Descript project editor with its script, scene, timeline, and sidebar labeled',
    caption: 'Descript Editor'
  },
  squadCastApp: {
    src: '/images/experience/squadcast.png',
    alt: 'SquadCast recording studio shown across desktop, tablet, and phone',
    caption: 'SquadCast App'
  },
  squadCastStudio: {
    src: '/images/experience/squadcast-studio.png',
    alt: 'SquadCast recording studio shown across desktop, tablet, and phone',
    caption: 'SquadCast Studio'
  },
  peel9Platform: {
    src: '/images/experience/peel9.png',
    alt: 'Peel9 records management and analytics website',
    caption: 'Peel9 RMS'
  }
} satisfies Record<string, ContentImage>;

export const experience = [
  {
    company: 'Descript',
    role: 'Software Engineer',
    dates: 'June 2023 - Present',
    summary:
      'Technical DRI at Descript. I own architecture, RFCs, and delivery across Rooms, the web capture platform, and the APIs around them — from the first design through flagged rollout and production operations, including the work that made the SquadCast sunset possible.',
    highlights: [
      'Led architecture and delivery of Scheduled Rooms across Drive, Rooms, APIs, and the recording stack; took invites from RFC through 100% rollout, then shipped hostless recording to GA and link-based hosting behind a dedicated safety flag, reaching 500+ weekly creations, over 50% conversion, and about 25% of Rooms recordings.',
      'Designed room-to-project mapping and invite-scoped authorization, including opaque invite links, server-checked host permission, project-scoped delegate credentials, failure modes, and migration plans, then coordinated phased rollouts to reduce risk during the SquadCast sunset.',
      'Original author of the Web Recorder platform: TypeScript engine, Recorder class, and Redux-Saga orchestration for multi-track audio, 4K/30 FPS video, and screen capture across Editor, Media Library, Quick Recorder, and Rooms.',
      'Built a segmented upload manager with Web Worker offloading, smart timeouts and retries, duplicate-upload protection, and recovery handoff, so in-progress recordings could play back as chunks uploaded.',
      'Shipped script-state visualization, cross-surface cancel/restart, and pre-roll/live playback to GA; tightened A/V sync from about 700 ms to 50 ms while eliminating lifecycle races and lingering media references.',
      'Owned high-severity recording reliability and on-call across web and desktop: data-loss recovery, device failures, authorization paths, memory telemetry, deploy guards, and Support diagnostics.',
      'Raised delivery velocity with reusable AI-assisted review workflows, coding guidelines, and agent instructions that other engineers and agents picked up beyond personal use.'
    ],
    tools: ['TypeScript', 'Redux-Saga', 'WebRTC', 'Temporal', 'LaunchDarkly', 'Cursor'],
    images: [workImages.descriptRooms, workImages.descriptApp, workImages.descriptEditor]
  },
  {
    company: 'SquadCast',
    role: 'Software Engineer',
    dates: 'January 2022 - August 2023',
    summary:
      'Owned a full browser recording product through acquisition: capture, session UX, account lifecycle, and the generators that kept the team moving. That product became Descript Rooms.',
    highlights: [
      'Built and owned the product across Angular, TypeScript, Next.js, Firebase, and GCP, spanning the recording engine, notifications, account lifecycle, integrations, onboarding, scheduling, and authentication.',
      'Led Canvas and SquadShots releases, and shipped dark mode, mobile-first layouts, accessibility work, and reusable UI across Studio.',
      'Wrote Nx executors and generators that cut feature scaffolding from 30 minutes to 5, then profiled and fixed CPU usage and memory leaks in Studio, Chat, Dashboard, and audio metering.'
    ],
    tools: ['Angular', 'TypeScript', 'Next.js', 'Firebase', 'Nx'],
    images: [workImages.squadCastApp, workImages.squadCastStudio]
  },
  {
    company: 'Peel9',
    role: 'Software Engineer',
    dates: 'August 2019 - September 2021',
    summary:
      'On a small team, I designed and shipped records-management features used by 10+ police departments, and ran reviews, mentoring, and the GitHub repo.',
    highlights: [
      'Shipped approval workflows, crash diagrams, modular forms, analytics, and account recovery in Node.js, Express, and Handlebars.',
      'Led code reviews, maintained the GitHub repository, mentored junior engineers, and wrote a Leaflet plugin for dynamic crash-map markers.'
    ],
    tools: ['Node.js', 'Express', 'Handlebars', 'Leaflet'],
    images: [workImages.peel9Platform]
  }
];

export const photoWallItems: PhotoWallItem[] = [
  { ...workImages.descriptRooms, href: '#experience-descript' },
  { ...workImages.squadCastStudio, href: '#experience-squadcast' },
  { ...workImages.peel9Platform, href: '#experience-peel9' }
];

export const skillGroups = [
  {
    label: 'AI',
    skills: ['Cursor', 'Claude Code', 'OpenAI Codex', 'Microsoft Copilot', 'Zed']
  },
  {
    label: 'Product',
    skills: ['TypeScript', 'JavaScript', 'React', 'Svelte', 'Node.js', 'Redux-Saga']
  },
  {
    label: 'Media',
    skills: ['WebRTC', 'MediaRecorder', 'WebCodecs', 'WebAssembly', 'Web Workers', 'Electron']
  },
  {
    label: 'Platform',
    skills: ['Temporal', 'GCP', 'AWS', 'Firebase', 'Sentry', 'LaunchDarkly', 'GitHub CI']
  },
  {
    label: 'Systems',
    skills: ['Rust', 'Tokio', 'Poem', 'Python', 'C/C++', 'Nix/NixOS']
  }
];

export const linksQuote = {
  text: "The greatest thing you'll ever learn is just to love and be loved in return.",
  attribution: 'Nat King Cole'
};

export const artworks: ContentImage[] = [
  {
    src: '/art/piano.jpg',
    alt: 'Photograph of two miniature grand pianos sitting on a piano',
    caption: 'Piano'
  },
  {
    src: '/art/mustang.jpg',
    alt: 'Artwork of a mustang',
    caption: 'Mustang'
  },
  {
    src: '/art/latrodectus.jpg',
    alt: 'Artwork of a Latrodectus spider',
    caption: 'Latrodectus'
  }
];

export const links = [
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ozturkkl/',
    description: 'Roles, dates, and a direct way to reach me.',
    icon: '/images/links/LinkedIn.webp'
  },
  {
    title: 'GitHub',
    url: 'https://github.com/ozturkkl',
    description: 'Framework Control, this site, and the rest of the public work.',
    icon: '/images/links/GitHub.webp'
  },
  {
    title: 'YouTube',
    url: 'https://www.youtube.com/@kemal_ozturk/featured',
    description: 'Music videos and covers. Piano is my main instrument.',
    icon: '/images/links/YouTube.svg'
  },
  {
    title: 'Steam',
    url: 'https://steamcommunity.com/id/kemal_ozt/',
    description: 'For the occasional game and a break from building.',
    icon: '/images/links/Steam.webp'
  },
  {
    title: 'Instagram',
    url: 'https://www.instagram.com/kemal.ozt/',
    description: 'A quieter feed, but messages are welcome.',
    icon: '/images/links/Instagram.svg'
  }
];

export const featuredProjects: Record<
  string,
  { eyebrow: string; impact: string; liveUrl?: string }
> = {
  'framework-control': {
    eyebrow: 'Featured open source',
    impact:
      'I designed and still maintain the full stack: a Rust service (Tokio, Poem, OpenAPI) and a Svelte/Vite UI for live telemetry, fan curves, battery charging, and AMD power controls. Windows MSI, Linux systemd/udev, AUR, nixpkgs, and NixOS. Solo-maintained, 220+ stars.'
  },
  RadioWebApp: {
    eyebrow: 'Volunteer production system',
    impact:
      'I built and still operate this Svelte/TypeScript PWA for Cihan Radyo. About 1.4K daily visitors, 334K requests, and 20 GB/day through Cloudflare, with 61% cached.',
    liveUrl: 'https://cihanradyo.com'
  }
};

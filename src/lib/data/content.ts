export const profile = {
  name: 'Kemal Ozturk',
  role: 'Software Engineer',
  headline: 'Product, Platform & Technical Leadership',
  location: 'Wheeling, Illinois',
  email: '97kemalozturk@gmail.com',
  title: 'I engineer the path from an idea to a system people can trust.',
  summary: 'The purpose of software engineering is to control complexity, not to create it.',
  summaryAttribution: 'Pamela Zave',
  status: 'On-call for recording reliability'
};

export const heroFacts = [
  { label: 'Current role', value: `${profile.role} · Descript` },
  { label: 'Status', value: profile.status },
  { label: 'Scope', value: '7 years · RFC through production' },
  { label: 'Ownership', value: 'Technical DRI · Recording' },
  { label: 'AI tools', value: 'Cursor · Claude Code · Codex' }
];

export const copy = {
  experience: {
    kicker: '01 / Experience',
    title: 'End-to-end ownership, from first RFC to production.',
    intro:
      'Seven years taking ambiguous requirements from architecture through staged rollout and production operations. Recording products at Descript and SquadCast; records software for police departments before that.'
  },
  projects: {
    kicker: '02 / Projects',
    title: 'Useful systems, built in the open.',
    intro:
      'Framework Control, a volunteer radio PWA, and smaller tools. Repository details refresh from GitHub.'
  },
  toolkit: {
    kicker: '03 / Toolkit',
    title: 'TypeScript for product work. Rust when the metal matters.',
    intro:
      'Nix when I want the machine to be reproducible. Cursor and Claude Code when I want the loop to stay short.'
  },
  links: {
    kicker: '04 / Links',
    title: 'Work, piano, and a few other tabs.',
    intro: 'The old link tree, minus the noise.'
  },
  contact: {
    kicker: '05 / Contact',
    title: 'Have a recording stack, or a product worth simplifying?',
    intro: 'Email is the most reliable way to reach me. The resume is here if you want the longer version.'
  }
};

export type ContentImage = {
  src: string;
  alt: string;
  caption: string;
};

export type PhotoWallItem = ContentImage & {
  href: string;
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
      'Technical DRI for recording products at Descript: Rooms, the web capture engine, and the reliability work that followed the SquadCast sunset. I take that work from RFC through guarded releases and production operations.',
    highlights: [
      'Led architecture and delivery of Scheduled Rooms and hostless recording across Drive, Rooms, APIs, and the recording stack; took invite management and scheduling from RFC through 100% rollout, reaching 500+ weekly creations, over 50% conversion, and about 25% of Rooms recordings.',
      'Designed room-to-project mapping and invite-scoped authorization, including delegate tokens, project permissions, failure modes, and migration plans, then coordinated phased rollouts to reduce risk during the SquadCast sunset.',
      'Original author of the Web Recorder platform: TypeScript engine, Recorder class, and Redux-Saga orchestration for multi-track audio, 4K/30 FPS video, and screen capture across Editor, Media Library, Quick Recorder, and Rooms.',
      'Built a segmented upload manager with Web Worker offloading, smart timeouts and retries, duplicate-upload protection, and recovery handoff, so in-progress recordings could play back as chunks uploaded.',
      'Shipped script-state visualization, cross-surface cancel/restart, and pre-roll/live playback to GA; tightened A/V sync from about 700 ms to 50 ms while eliminating lifecycle races and lingering media references.',
      'Owned high-severity recording reliability and on-call across web and desktop: data-loss recovery, device failures, authorization paths, memory telemetry, deploy guards, and Support diagnostics.'
    ],
    tools: ['TypeScript', 'Redux-Saga', 'WebRTC', 'Web Workers', 'Temporal'],
    images: [workImages.descriptRooms, workImages.descriptApp, workImages.descriptEditor]
  },
  {
    company: 'SquadCast',
    role: 'Software Engineer',
    dates: 'January 2022 - August 2023',
    summary:
      'Built the browser-based remote recording product that later became Descript Rooms, from capture engine through the surfaces around a live session, including through the acquisition.',
    highlights: [
      'Contributed across the recording engine, notifications, account lifecycle, integrations, onboarding, scheduling, and authentication using Angular, TypeScript, Next.js, Firebase, and GCP.',
      'Led Canvas and SquadShots releases, and shipped dark mode, mobile-first layouts, accessibility work, and reusable UI across Studio.',
      'Wrote Nx executors and generators that cut feature scaffolding from 30 minutes to 5, then profiled and fixed CPU usage and memory leaks in Studio, Chat, Dashboard, and audio metering.'
    ],
    tools: ['Angular', 'TypeScript', 'Next.js', 'Firebase', 'GCP'],
    images: [workImages.squadCastApp, workImages.squadCastStudio]
  },
  {
    company: 'Peel9',
    role: 'Software Engineer',
    dates: 'August 2019 - September 2021',
    summary:
      'Delivered records management and analytics used by more than ten police departments, from feature design through review and mentoring on a small team.',
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
    label: 'Product',
    skills: ['TypeScript', 'JavaScript', 'React', 'Svelte', 'Node.js', 'Redux-Saga']
  },
  {
    label: 'Media',
    skills: ['WebRTC', 'MediaRecorder', 'WebCodecs', 'Web Workers', 'Electron']
  },
  {
    label: 'Platform',
    skills: ['Temporal', 'GCP', 'AWS', 'Firebase', 'Sentry', 'GitHub CI', 'Cursor', 'Claude Code']
  },
  {
    label: 'Systems',
    skills: ['Rust', 'Tokio', 'Poem', 'Python', 'C/C++', 'Nix/NixOS']
  }
];

export const links = [
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ozturkkl/',
    description: 'Work history and a direct way to connect.',
    icon: '/images/links/LinkedIn.webp'
  },
  {
    title: 'GitHub',
    url: 'https://github.com/ozturkkl',
    description: 'Framework Control, experiments, and this site.',
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
      'A Rust service and Svelte UI for Framework laptops: live telemetry, fan curves, battery charging, and AMD power controls. Windows MSI, Linux, AUR, nixpkgs, and NixOS packaging. Solo-maintained, 220+ stars.'
  },
  RadioWebApp: {
    eyebrow: 'Volunteer production system',
    impact:
      'A Svelte radio and podcast PWA for Cihan Radyo. About 1.4K daily visitors, 334K requests, and 20 GB/day through Cloudflare, with 61% cached.',
    liveUrl: 'https://cihanradyo.com'
  }
};

export const profile = {
  name: 'Kemal Ozturk',
  role: 'Software Engineer',
  location: 'Wheeling, Illinois',
  email: '97kemalozturk@gmail.com',
  title: 'I engineer the path from an idea to a system people can trust.'
};

export const resumeUrl = '/Kemal-Ozturk-Resume-2026.pdf';

export const site = {
  url: 'https://kozturk.com',
  title: `${profile.name} | ${profile.role}`,
  description:
    'Kemal Ozturk is a fullstack software engineer who designs, ships, and operates systems end to end. TypeScript product work, APIs, security, reliability, and open source. Uses Cursor, Claude Code, Codex, Copilot, and Zed to move faster without lowering the quality bar.',
  shareDescription:
    'Fullstack engineer: system design, secure APIs, recording and reliability, open source, and AI-assisted delivery. Explore Kemal\'s work, projects, and links.',
  imagePath: '/images/other/kemal.jpg',
  themeColor: '#171815'
};

export const heroQuotes = [
  {
    text: 'The purpose of software engineering is to control complexity, not to create it.',
    attribution: 'Pamela Zave'
  },
  {
    text: 'Security is a process, not a product.',
    attribution: 'Bruce Schneier'
  },
  {
    text: 'Make it work, make it right, make it fast.',
    attribution: 'Kent Beck'
  },
  {
    text: 'The only way to go fast is to go well.',
    attribution: 'Robert C. Martin'
  },
  {
    text: 'Complexity is the enemy of reliability.',
    attribution: 'John Allspaw'
  },
  {
    text: 'A distributed system is one in which the failure of a computer you didn’t even know existed can render your own computer unusable.',
    attribution: 'Leslie Lamport'
  },
  {
    text: 'A complex system that works is invariably found to have evolved from a simple system that worked.',
    attribution: 'John Gall'
  },
];

export const heroFacts = [
  { label: 'Tenure', value: '7 years · fullstack' },
  { label: 'Status', value: 'Open source maintainer' },
  { label: 'Ownership', value: 'Design · ship · operate' },
  { label: 'Surfaces', value: 'Browser · desktop · APIs' },
  { label: 'Daily driver', value: 'Linux · NixOS · Arch' },
  { label: 'AI tools', value: 'Cursor · Claude · Codex · Copilot · Zed' }
];

export const copy = {
  hero: {
    kicker: 'Intro / 001',
    photoWallLabel: 'PROJECT WALL / SELECT A FRAME'
  },
  experience: {
    kicker: 'Experience / 002',
    title: 'Full-stack systems, from capture to production.',
    intro:
      'Seven years owning products across the stack: management software used by police departments, a web recording studio, then Descript’s video editor, recorder, and Rooms platform. I design the architecture, ship the client and the APIs, and operate what I launch: security, analytics, reliability, and rollout included.'
  },
  projects: {
    kicker: 'Projects / 003',
    title: 'The same craft, kept after hours and still upkept with care.',
    intro:
      'Dedicated to my craft: getting the details right, keeping a quality bar I will not lower, and building things that genuinely help other people.',
    defaultEyebrow: 'Public repository',
    fallbackDescription: 'Details are being documented.'
  },
  toolkit: {
    kicker: 'Toolkit / 004',
    title: 'Using the latest and greatest to move faster without lowering the quality bar.',
    intro:
      'Tools follow the problem, not the other way around. TypeScript for product surfaces, platform services for rollout and reliability, and Rust or Nix when the work has to sit close to hardware. Agents speed drafting and review. The cards below mention some of them but are not strict limits.',
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
    title: 'Building something that has to be dependable and stay up?',
    intro:
      'If you need an engineer who can take a system across client, API, and production, send a note. It lands in my inbox. LinkedIn and the resume are here if that is easier.',
    asideKicker: 'Also / Direct',
    placeholder: 'Want me to join your team? Tell me about what you are shipping, and where you need help.',
    hint: 'Ctrl/Cmd + Enter also sends.',
    success: {
      kicker: 'Sent',
      title: 'Thanks. I’ll get back to you.',
      body: 'Your note is in my inbox. If it is time-sensitive, ping me on LinkedIn.'
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
    dates: 'June 2023 - September 2026',
    summary:
      'Technical DRI for recording at Descript. I authored the Rooms architecture RFC and led the capture platform end to end: APIs, invite-scoped security, web and desktop clients, staged rollout, and production operations.',
    highlights: [
      'Led Scheduled Rooms from architecture RFC through 100% rollout across Drive, Rooms, APIs, and the recording stack; shipped hostless recording to GA and link-based hosting behind a dedicated safety flag, reaching 500+ weekly creations, over 50% conversion, and about 25% of Rooms recordings.',
      'Designed invite-scoped authorization as delegated capability, not impersonation: opaque invite links, server-checked host permission, project-scoped credentials, and isolated sessions so a link-holder can record without project membership. Overhauled in-call app messaging with serialization, coalescing, and retries; coordinated mixed-version API and client rollouts, rate limits, and security review.',
      'Architect and first engineer on the Web Recorder platform: a UI-independent React/TypeScript engine and Redux-Saga orchestration for multi-track camera, microphone, screen, and system audio at 4K/30 FPS, with hot-swappable devices during capture, reused across Editor, Media Library, Quick Recorder, and Rooms.',
      'Delivered instant playback end to end: re-architected async segment queues to eliminate race conditions, then built a Web Worker upload manager with progressive chunk demuxing, progress-aware timeouts, duplicate protection, and recovery into Temporal workflows, so people could review a take while chunks were still uploading.',
      'Shipped script-state visualization, cancel/restart, and pre-roll/live playback to GA; tightened A/V sync from about 700 ms to 50 ms. Built an internal WebAssembly denoise effect that preserves voice character without per-use server inference.',
      'Owned recording reliability and incidents across web and desktop: data-loss recovery, MediaRecorder container and device failures, authorization paths, memory telemetry, deploy guards that keep local config out of production bundles, and Support diagnostics.',
      'Raised delivery velocity with reusable AI-assisted review workflows, coding guidelines, and agent instructions that other engineers and agents picked up beyond personal use.'
    ],
    website: 'https://www.descript.com',
    tools: [
      'TypeScript',
      'React',
      'Redux-Saga',
      'WebRTC',
      'Daily',
      'MediaRecorder',
      'Web Workers',
      'WebAssembly',
      'Electron',
      'Temporal',
      'Sentry',
      'LaunchDarkly'
    ],
    images: [workImages.descriptRooms, workImages.descriptApp, workImages.descriptEditor]
  },
  {
    company: 'SquadCast',
    role: 'Software Engineer',
    dates: 'January 2022 - August 2023',
    summary:
      'Owned a remote browser recording product end to end through acquisition: capture engine, auth, onboarding, integrations, account lifecycle, and the Nx tooling that kept the team shipping.',
    highlights: [
      'Built and owned core product surfaces across Angular, TypeScript, Next.js, Firebase, and GCP: recording engine, notifications, auth, onboarding, third-party integrations, org and user lifecycle, and scheduling.',
      'Led Canvas and SquadShots releases; shipped dark mode, mobile-first layouts, accessible custom components, and reusable UI across Studio.',
      'Authored Nx executors and generators that cut feature scaffolding from 30 minutes to 5, and cleaned up services to reduce technical debt across the app.',
      'Profiled CPU and memory across Studio, Chat, Dashboard, and recording UI; fixed leaks including one in the VU meter visualization that was steadily degrading session performance.'
    ],
    website: 'https://squadcast.fm',
    tools: ['Angular', 'RxJS', 'Tailwind', 'TypeScript', 'Next.js', 'Firebase', 'GCP', 'Nx', 'GitHub CI', 'Google Cloud Functions'],
    images: [workImages.squadCastApp, workImages.squadCastStudio]
  },
  {
    company: 'Peel9',
    role: 'Software Engineer',
    dates: 'August 2019 - September 2021',
    summary:
      'On a small team, I designed and shipped records-management features used by 10+ police departments, and ran reviews, mentoring, and the GitHub repo.',
    highlights: [
      'Delivered Node.js, Express, and Handlebars features for records management and analytics: approval workflows, crash diagrams, modular forms, and account recovery. Software that had to be correct when the records mattered.',
      'Led code reviews, maintained the GitHub repository, mentored junior engineers, and built a Leaflet plugin for dynamic crash-map markers.'
    ],
    website: 'https://www.peel9.com',
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
    skills: [
      'TypeScript',
      'JavaScript',
      'React',
      'Svelte',
      'Angular',
      'Next.js',
      'Node.js',
      'Redux-Saga',
      'Vite',
      'Nx',
      'Turborepo'
    ]
  },
  {
    label: 'Media',
    skills: ['WebRTC', 'Daily', 'MediaRecorder', 'WebCodecs', 'WebAssembly', 'Web Workers', 'Electron']
  },
  {
    label: 'Platform',
    skills: [
      'Temporal',
      'GCP',
      'AWS',
      'Firebase',
      'Sentry',
      'LaunchDarkly',
      'Cloudflare',
      'Retool'
    ]
  },
  {
    label: 'Systems',
    skills: ['Rust', 'Tokio', 'Poem', 'OpenAPI', 'Python', 'C/C++', 'Nix/NixOS', 'GitHub CI']
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

export const featuredProjects: Record<string, { eyebrow: string; liveUrl?: string }> = {
  'framework-control': {
    eyebrow: 'Featured open source',
    liveUrl: 'https://ozturkkl.github.io/framework-control/'
  },
  RadioWebApp: {
    eyebrow: 'Volunteer production system',
    liveUrl: 'https://cihanradyo.com'
  },
  RGBPiano: {
    eyebrow: 'Most interesting hardware project',
  }
};

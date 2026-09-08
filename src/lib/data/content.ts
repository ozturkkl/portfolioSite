export const profile = {
  name: 'Kemal Ozturk',
  role: 'Software Engineer',
  location: 'Wheeling, Illinois',
  email: '97kemalozturk@gmail.com',
  title: 'Hi, I’m Kemal.'
};

export const resumeUrl = '/Kemal-Ozturk-Resume-2026.pdf';

export const site = {
  url: 'https://kozturk.com',
  title: `${profile.name} | ${profile.role}`,
  description:
    'Kemal Ozturk is a software engineer, open-source maintainer, Linux tinkerer, and pianist building products across web, desktop, backend services, and hardware.',
  shareDescription:
    'Software engineer building products, platforms, and hardware tools. Explore Kemal’s experience, open-source work, and side projects.',
  imagePath: '/images/other/kemal.jpg',
  themeColor: '#171815'
};

export const heroTypingLines = [
  'huge nerd riding on the edge of awkward',
  'open-source maintainer',
  'pianist, artist, tea addict',
  'Linux enjoyer, I use Nix BTW',
  'Mancho\'s (my cat) direct report'
];

export const heroFacts = [
  { label: 'Work', value: 'Software engineer · 7 years' },
  { label: 'Builds', value: 'Product · platform · systems' },
  { label: 'Side quests', value: 'Rust · hardware · radio' },
  { label: 'Daily driver', value: 'Linux · NixOS · Arch' },
  { label: 'Off the clock', value: 'Piano · art · swimming' }
];

export const copy = {
  hero: {
    kicker: 'Intro / 001',
    intro:
      'I like building useful things and sweating the details: from remote recording tools at Descript, to a system service that controls my laptop fans. Oh, and I also make my piano light up when I play. Welcome, and thanks for checking out my portfolio!',
    terminalPrompt: 'kemal@workstation:~$ whoami',
    photoWallLabel: 'BUILT, SHIPPED & TINKERED WITH / PICK A FRAME'
  },
  experience: {
    kicker: 'Experience / 002',
    title: 'Software across product, platform, and systems.',
    intro:
      'Seven years designing, shipping, and operating software across web, desktop, and backend services from records management to remote recording and production systems. I lead projects from technical design through rollout, with a focus on reusable architecture, authorization, concurrency, and reliability.'
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
    studioVideoUrl: 'https://www.youtube.com/embed/xPM4-vwgMBc?si=BBRh8Z6edg7iDuD3',
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

export type PhotoWallContentItem = PhotoWallItem | { projectName: string };

const workstationImage: ContentImage = {
  src: '/images/other/workstation.jpg',
  alt: 'A black cat sitting in front of a programming workstation with an ultrawide monitor',
  caption: 'The boss, reviewing my code'
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
      'Led projects across Descript’s web, desktop, API, and recording platforms, from technical design and implementation through rollout and production operations.',
    highlights: [
      'Led Scheduled Rooms from architecture RFC and phased implementation through full rollout, coordinating changes across APIs, permissions, and recording clients. Adoption reached 500+ weekly creations and roughly 25% of Rooms recordings.',
      'Designed invite-scoped authorization with server-enforced permissions, project-scoped credentials, and isolated sessions, enabling guests to record without project membership. Coordinated security review and staged releases, including hostless recording to general availability.',
      'Architected the initial Web Recorder engine in TypeScript with Redux-Saga orchestration, separating capture logic from the UI. Reused across Editor, Media Library, Quick Recorder, and Rooms for multi-track camera capture at 4K/30 FPS, microphone, screen, system audio, and device switching.',
      'Delivered instant playback so users could review takes while recording chunks were still uploading. Built a Web Worker upload manager with progressive uploads and progress-aware timeouts; resolved asynchronous queue races and implemented in-call message serialization and coalescing.',
      'Shipped recording visualization, cancel/restart, and pre-roll/live playback; improved A/V synchronization from approximately 700 ms to 50 ms. Built an internal RNNoise-backed WebAssembly denoise prototype and profiled capture performance to improve frame rate and bitrate.',
      'Owned production incident response and recording recovery across web and desktop. Built analytics dashboards, alerts, memory telemetry, deployment safeguards, and Support diagnostics; investigated device failures, authorization errors, and rate-limit issues.'
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
      'Built a remote-recording product through its acquisition by Descript, working across capture, product UI, cloud services, performance, and developer tooling.',
    highlights: [
      'Built core remote-recording product features using Angular, TypeScript, Next.js, Firebase, and GCP, spanning capture, authentication, account lifecycle, third-party integrations, and onboarding. Migrated selected microservices to serverless cloud functions to reduce costs and support scaling.',
      'Designed and delivered Canvas and SquadShots features, app-wide dark mode, mobile-first layouts, and accessibility improvements. Profiled CPU usage and fixed memory leaks across Studio, Chat, Dashboard, and audio metering.',
      'Created Nx executors and generators that reduced feature scaffolding time from 30 minutes to 5, standardizing setup for new features.'
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
      'Built records-management and analytics software for police departments on a small product team.',
    highlights: [
      'Delivered records-management features used by 10+ police departments around Cincinnati, including incident approval, traffic-crash diagrams, modular forms, and account recovery, using Node.js, Express, and Handlebars.',
      'Led code reviews and mentored junior engineers; maintained the GitHub repository and built a Leaflet plugin for dynamic crash-map markers.'
    ],
    website: 'https://www.peel9.com',
    tools: ['Node.js', 'Express', 'Handlebars', 'Leaflet'],
    images: [workImages.peel9Platform]
  }
];

export type ExperienceRole = (typeof experience)[number];

export const photoWallItems: PhotoWallContentItem[] = [
  { ...workstationImage, href: '#links' },
  { ...workImages.descriptRooms, href: '#experience-descript' },
  { ...workImages.squadCastStudio, href: '#experience-squadcast' },
  { ...workImages.peel9Platform, href: '#experience-peel9' },
  { projectName: 'RadioWebApp' },
  { projectName: 'RGBPiano' },
  { projectName: 'framework-control' },
  { projectName: 'portfolioSite' },
  { projectName: 'portfolioSitePhotography' }
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
  workstationImage,
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

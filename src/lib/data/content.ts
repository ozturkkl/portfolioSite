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
  'curious by nature, nerdy by choice',
  'open-source maintainer',
  'pianist, artist, loving husband, tea addict',
  'Linux enjoyer, I use Nix BTW',
  `Mancho's (my cat's) direct report`
];

export const heroFacts = [
  { label: 'Work', value: 'Full-stack engineer · 7 years' },
  { label: 'Builds', value: 'Apps · Systems · Experiences' },
  { label: 'Side quests', value: 'Make Tea · Learn Rust · Pet Cat' },
  { label: 'Daily driver', value: 'Dygma Defy · NixOS · Framework Laptop' },
  { label: 'Off the clock', value: 'Piano · Art · Swimming' },
  { label: 'Passion', value: 'Open-source · Linux · Gaming' }
];

type CopySegment = {
  text: string;
  href?: string;
  color?: string;
};

export const copy = {
  hero: {
    kicker: 'Intro / 001',
    intro: [
      [
        { text: 'I like building useful things and sweating the details: from ' },
        {
          text: 'remote recording ',
          href: '#experience-descript',
          color: 'hsl(10, 100%, 65%)'
        },
        { text: 'tools at Descript, to a ' },
        {
          text: 'system service',
          href: '#project-framework-control',
          color: 'hsl(152, 100%, 55%)'
        },
        { text: ' that controls my laptop fans.' },
        { text: ' I have an ' },
        {
          text: 'RGB Piano ',
          href: '#project-RGBPiano',
          color: 'hsl(275, 100%, 75%)'
        },
        { text: 'that lights up when I play.' }
      ],
      [{ text: 'Welcome, and thanks for checking out my portfolio!' }]
    ] satisfies CopySegment[][],
    terminalPrompt: 'kemal@workstation:~$ whoami',
    photoWallLabel: 'PHOTO WALL / PICK A FRAME'
  },
  experience: {
    kicker: 'Experience / 002',
    title: 'I build software, but you already know that',
    intro:
      'Seven years designing, shipping, and operating software across web, desktop, and backend services. I lead projects from technical design through rollout. I love what I build, and build what I love.'
  },
  projects: {
    kicker: 'Projects / 003',
    title: 'The same craft, after hours, with care, and you guessed it, tea...',
    intro:
      `AI is part of my daily toolkit, but I still own the architecture, the tradeoffs, and the tech debt. With this many side projects to keep alive, quality is not an optional argument (pun intended).`,
    defaultEyebrow: 'Public repository',
    fallbackDescription: 'Details are being documented.'
  },
  toolkit: {
    kicker: 'Toolkit / 004',
    title: `You've read this far? I'm impressed. Unless you're a bot that is`,
    intro:
      `A good tool is an underrated blessing; you only notice its worth in its absence. Once in a while, you discover a new tool and the excitement of learning is rekindled. There's no better feeling.`,
    labPrefix: 'KIT'
  },
  links: {
    kicker: 'Links / 005',
    profileKicker: `OTHER PLACES I TURN UP`,
    studioLabel: `A story that will break your heart / Piano`,
    studioVideoUrl: 'https://www.youtube.com/embed/xPM4-vwgMBc?si=BBRh8Z6edg7iDuD3',
    studioVideoTitle: 'Kemal Ozturk performing a piano cover'
  },
  contact: {
    kicker: 'Contact / 006',
    title: `Well, not much left, just a form for contact`,
    intro:
      `If you need an engineer who can take a system across client, API, and production, send a note. Or maybe just send a note to see if the form works, you can say: "I'm testing the form, please disregard" and I'll know what to do.`,
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
  src: '/images/other/workstation.webp',
  alt: 'A black cat sitting in front of a programming workstation with an ultrawide monitor',
  caption: 'The boss, reviewing my code'
};

const workImages = {
  descriptRooms: {
    src: '/images/experience/descript-rooms.webp',
    alt: 'Descript Rooms interface showing a remote recording and production controls',
    caption: 'Descript Rooms'
  },
  descriptApp: {
    src: '/images/experience/descript-app.webp',
    alt: 'Descript main app surrounded by examples of the UI components',
    caption: 'Descript App'
  },
  descriptEditor: {
    src: '/images/experience/descript-editor.webp',
    alt: 'Descript project editor with its script, scene, timeline, and sidebar labeled',
    caption: 'Descript Editor'
  },
  squadCastApp: {
    src: '/images/experience/squadcast.webp',
    alt: 'SquadCast recording studio shown across desktop, tablet, and phone',
    caption: 'SquadCast App'
  },
  squadCastStudio: {
    src: '/images/experience/squadcast-studio.webp',
    alt: 'SquadCast recording studio shown across desktop, tablet, and phone',
    caption: 'SquadCast Studio'
  },
  peel9Platform: {
    src: '/images/experience/peel9.webp',
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
      `Led projects across Descript's web, desktop, API, and recording platforms, from technical design and implementation through rollout and production operations.`,
    highlights: [
      'Architected the Web Recorder engine with Redux-Saga as a reusable TypeScript package. Editor, Media Library, Quick Recorder, and Rooms were built on top of the engine. It supported multi-track recording and device switching. Inputs included 4K/30 FPS camera video, microphone and system audio, and screen capture.',
      'Led Scheduled Rooms from technical design through phased rollout, coordinating work across APIs, permissions, and recording clients. The feature reached 500+ creations per week and roughly 25% of Rooms recordings.',
      "Designed guest access for Scheduled Rooms so invitees could record without joining or accessing the host's project. Enforced tightly scoped permissions on the server. Coordinated the security review and staged rollout to general availability.",
      'Built a Web Worker upload manager with upload chunking and progress-aware timeouts. Fixed an asynchronous race in the segment counter logic to improve upload reliability.',
      'Owned and shipped recording-script visualization, recording cancel and restart, and pre-roll/live playback.',
      'Added an internal denoise audio effect using an RNNoise-backed WebAssembly package.',
      'Reduced the drift between audio and screen video capture from about 700 ms to 50 ms by profiling capture timings and adding delay-compensation logic.',
      'Led response to recording failures across web and desktop. Investigated recovery paths, device failures, authorization errors, and rate limits.',
      'Built dashboards, alerts, browser-memory telemetry, preflight deployment checks, and tools that helped Support diagnose recording failures.',
      'Volunteered as the engineering contact for an at-risk enterprise trial. Shipped 2 fixes and joined a customer meeting with Product, Support, and Marketing. The customer converted after the team addressed nearly all concerns.'
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
      'Built remote-recording features in Angular, TypeScript, Next.js, Firebase, and GCP across capture, authentication, account management, third-party integrations, and onboarding.',
      'Migrated selected microservices to serverless cloud functions to reduce costs and support scaling.',
      'Designed and shipped Canvas and SquadShots. Added app-wide dark mode, mobile-first layouts, and accessibility improvements.',
      'Profiled CPU use and fixed memory leaks across Studio, Chat, Dashboard, and audio metering.',
      'Cut new-feature scaffolding time from 30 minutes to 5 by building Nx executors and generators that standardized setup.'
    ],
    website: 'https://squadcast.fm',
    tools: ['Angular', 'RxJS', 'Tailwind', 'TypeScript', 'Next.js', 'Firebase', 'GCP', 'Nx', 'GitHub Actions', 'Google Cloud Functions'],
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
      'Led code reviews, mentored new hires, and maintained the GitHub repository.',
      'Built a Leaflet plugin for dynamic crash-map markers.'
    ],
    website: 'https://www.peel9.com',
    tools: ['Node.js', 'Express', 'Handlebars', 'Leaflet'],
    images: [workImages.peel9Platform]
  }
];

export type ExperienceRole = (typeof experience)[number];

export const photoWallItems: PhotoWallContentItem[] = [
  { ...workImages.descriptRooms, href: '#experience-descript' },
  { ...workImages.squadCastStudio, href: '#experience-squadcast' },
  { ...workImages.peel9Platform, href: '#experience-peel9' },
  { projectName: 'RadioWebApp' },
  { projectName: 'framework-control' },
  { projectName: 'portfolioSite' },
  { projectName: 'RGBPiano' },
  { projectName: 'portfolioSitePhotography' },
  { ...workstationImage, href: '#links' },

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
      'HTML',
      'CSS/SCSS',
      'Tailwind',
      'Figma',
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
      'REST APIs',
      'Postgres',
      'Temporal',
      'GCP',
      'AWS',
      'S3',
      'Firebase',
      'Sentry',
      'Grafana',
      'LaunchDarkly',
      'Cloudflare',
      'Retool'
    ]
  },
  {
    label: 'Systems',
    skills: ['Rust', 'Tokio', 'Poem/OpenAPI', 'Python', 'C', 'C++', 'Linux', 'Nix/NixOS', 'Arch Linux', 'GitHub Actions']
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

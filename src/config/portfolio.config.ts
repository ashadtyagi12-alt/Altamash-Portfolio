import { PortfolioConfig } from '../types/portfolio';

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: 'Altamash',
    brandName: 'ALTAMASH.',
    profession: 'WEBSITE DEVELOPER | PYTHON DEVELOPER | BACKEND ARCHITECT',
    professionShort: 'Website Developer • Python Developer • Backend Architect',
    location: 'Pilkhuwa, Hapur, UP, India',
    facebook: 'https://www.facebook.com/profile.php?id=61595826993899',
    instagram: 'https://www.instagram.com/developer_altamash/',
    youtube: 'https://www.youtube.com/@developer_altamash',
    github: 'https://github.com/ashadtyagi12-alt',
    githubUsername: 'ashadtyagi12-alt',
    linkedin: 'https://www.linkedin.com/in/altamash-choudhary-6269b2421/',
    email: 'altamishkhan123pkw@gmail.com',
    whatsapp: '917452819619',
    whatsappFormatted: '+91 7452819619',
    handle: '@developer_altamash',
    heroGreeting: "Hello, I'm",
    heroHeadline: 'WEBSITE & PYTHON DEVELOPER',
    heroBio:
      'Crafting code. Building digital experiences. I transform ideas into modern, high-performance web applications, from initial concept to final deployment.',
    quoteText:
      'The modern web is not a static brochure. It is a living, high-concurrency system where architecture, clean code, and kinetic UX orchestrate every millisecond.',
  },

  media: {
    portrait: '/media/altamash-portrait.png',
    editorPreview: '/media/editor-preview.png',
    showreelVideo: '/media/showreel.mp4',
    showreelPoster: '/media/showreel-poster.jpg',
    rawImage: '/media/raw-project.svg',
    realImage: '/media/real-project.svg',
    ogImage: '/media/og-preview.svg',
  },

  stats: {
    label1: 'Websites Built',
    value1: 15,
    suffix1: '+',
    isSample1: true,
    label2: 'Client Precision',
    value2: 100,
    suffix2: '%',
    isSample2: true,
  },

  projects: [
    {
      id: 'stockguard-ai',
      number: '01',
      title: 'StockGuard AI',
      category: 'Inventory AI',
      categoryLabel: 'INVENTORY & EXPIRY MANAGEMENT',
      badgeWord: 'GUARD.',
      tagline: 'Flet • Django • WhatsApp API',
      year: '2026',
      shortDescription:
        'Intelligent inventory telemetry and automated expiry forecasting. Monitors critical SKU lifecycles and dispatches automated restock notices via the WhatsApp Business API.',
      fullDescription:
        'StockGuard AI is an automated warehouse and inventory management platform. Built with a responsive Flet interface and a robust Django/Python backend, it forecasts product expiration dates, minimizes perishable waste, and dispatches instant replenishment alerts directly to suppliers and floor managers over WhatsApp API.',
      image: '/media/showreel-poster.jpg',
      tools: ['Flet', 'Django', 'Python', 'WhatsApp API'],
      metrics: 'Zero-Waste Algorithm • Sub-second WhatsApp Webhooks',
      liveUrl: 'https://github.com/ashadtyagi12-alt',
      githubUrl: 'https://github.com/ashadtyagi12-alt',
      isSample: false,
      featured: true,
    },
    {
      id: 'corepulse-api-gateway',
      number: '02',
      title: 'CorePulse API Gateway',
      category: 'Python APIs',
      categoryLabel: 'PYTHON BACKEND & APIS',
      badgeWord: 'PULSE.',
      tagline: 'FastAPI • Celery • Redis',
      year: '2026',
      shortDescription:
        'High-concurrency asynchronous API routing gateway engineered with sub-15ms throughput, distributed Celery background task queues, and atomic Redis caching.',
      fullDescription:
        'CorePulse is an enterprise-grade Python microservices gateway designed for demanding workloads. Built on FastAPI and AsyncIO, it coordinates distributed Celery task queues, Redis in-memory pub/sub, JWT authentication, and automated rate-limiting to deliver rock-solid sub-15ms response times.',
      image: '/media/showreel-poster.jpg',
      tools: ['FastAPI', 'Celery', 'Redis', 'Python'],
      metrics: 'Sub-15ms Latency • 100K+ Req/Min Flow',
      liveUrl: 'https://github.com/ashadtyagi12-alt',
      githubUrl: 'https://github.com/ashadtyagi12-alt',
      isSample: false,
      featured: true,
    },
    {
      id: 'zenith-saas-web',
      number: '03',
      title: 'Altamash Portfolio Platform',
      category: 'Websites',
      categoryLabel: 'MODERN WEBSITE DEVELOPMENT',
      badgeWord: 'CREATE.',
      tagline: 'React 19 • Tailwind CSS • TypeScript',
      year: '2026',
      shortDescription:
        'Interactive developer portfolio engineered with React 19, Tailwind CSS, TypeScript, custom canvas agent fleet mechanics, and dark kinetic SaaS architecture.',
      fullDescription:
        'The official portfolio codebase of Altamash. Built with React 19, Tailwind CSS, and Framer Motion. Engineered with custom canvas cursor swarm agent mechanics, interactive contact orchestration, responsive SaaS grid cards, and sub-second load times.',
      image: '/media/showreel-poster.jpg',
      tools: ['React 19', 'Tailwind CSS', 'TypeScript', 'Vite'],
      metrics: '99.8% Lighthouse Score • 60 FPS Kinetic Flow',
      liveUrl: 'https://github.com/ashadtyagi12-alt/Altamash-Portfolio',
      githubUrl: 'https://github.com/ashadtyagi12-alt/Altamash-Portfolio',
      isSample: false,
      featured: true,
    },
    {
      id: 'novastream-ai',
      number: '04',
      title: 'NovaStream AI',
      category: 'AI & Automation',
      categoryLabel: 'ARTIFICIAL INTELLIGENCE & VIDEO',
      badgeWord: 'STREAM.',
      tagline: 'Python • OpenAI • ElevenLabs',
      year: '2026',
      shortDescription:
        'Multimodal generative AI pipeline orchestrating automated script analysis, OpenAI GPT-4o intelligence, and ElevenLabs neural voice cloning for programmatic media production.',
      fullDescription:
        'NovaStream AI bridges large language models and neural speech synthesis into an automated video content pipeline. Powered by Python and FastAPI, it transforms raw concepts and articles into scripted, voice-cloned, and render-ready audiovisual productions with zero human overhead.',
      image: '/media/showreel-poster.jpg',
      tools: ['Python', 'OpenAI', 'ElevenLabs', 'FastAPI'],
      metrics: 'Automated AI Pipeline • Sub-60s Synthesis',
      liveUrl: 'https://github.com/ashadtyagi12-alt',
      githubUrl: 'https://github.com/ashadtyagi12-alt',
      isSample: false,
      featured: true,
    },
    {
      id: 'library-management-system',
      number: '05',
      title: 'Library Management System',
      category: 'Python OOP',
      categoryLabel: 'OBJECT-ORIENTED ARCHITECTURE & PERSISTENCE',
      badgeWord: 'BOOKS.',
      tagline: 'Python • OOP • File Handling Architecture',
      year: '2026',
      shortDescription:
        'Object-Oriented Python application with persistent file-handling data structures for book catalogs, member registrations, and issue/return ledger workflows.',
      fullDescription:
        'Library Management System is a modular Python-engineered architecture designed to digitize and automate library operations. Built with structured OOP design principles, it features persistent flat-file data structures, automated book issue/return tracking, member identity management, stock availability telemetry, and clean CLI menu interfaces.',
      image: '/media/showreel-poster.jpg',
      tools: ['Python 3.12', 'Object-Oriented Programming', 'File I/O', 'Data Modeling'],
      metrics: 'Zero-Loss Persistence • Clean Modular OOP • Instant Record Fetch',
      liveUrl: 'https://github.com/ashadtyagi12-alt/LIBRARY-MAMAGEMENT-SYSTEM',
      githubUrl: 'https://github.com/ashadtyagi12-alt/LIBRARY-MAMAGEMENT-SYSTEM',
      isSample: false,
      featured: true,
    },
  ],

  toolsMarquee: [
    { name: 'FastAPI', category: 'High-Performance API' },
    { name: 'Django', category: 'Web Framework' },
    { name: 'Database', category: 'SQL & NoSQL' },
    { name: 'Python', category: 'Core Language' },
    { name: 'Antigravity', category: 'AI Architecture' },
  ],

  skills: [
    {
      title: 'Website Development',
      role: 'Backend & Python Web Architecture',
      description:
        'Creating modern, responsive, ultra-fast websites and web applications powered by high-performance Python backends.',
      highlights: [
        'Django, FastAPI & Flask frameworks',
        'High-performance asynchronous REST & GraphQL APIs',
        'Clean database schemas (PostgreSQL / SQLite / Redis)',
        'Mobile-first responsive fluid layouts',
      ],
      icon: 'Layout',
    },
    {
      title: 'Python Development',
      role: 'Backend Engineering & Automation Systems',
      description:
        'Architecting high-throughput data pipelines, asynchronous web scrapers, REST APIs, and automated scripting solutions.',
      highlights: [
        'AsyncIO, Aiohttp & multi-threaded task queues',
        'FastAPI & lightweight microservices',
        'Data cleaning, transformation & persistence',
        'Headless browser automation with Playwright',
      ],
      icon: 'Code2',
    },
    {
      title: 'Backend & API Architecture',
      role: 'Database & Cloud Deployment Systems',
      description:
        'Designing end-to-end web architectures, connecting resilient database layers, and deploying containerized services.',
      highlights: [
        'RESTful APIs & GraphQL endpoint design',
        'PostgreSQL, SQLite, and Redis caching layers',
        'Authentication, JWT tokens & route guarding',
        'Docker containerization & cloud CI/CD pipelines',
      ],
      icon: 'Layers',
    },
  ],

  creativeToolkit: [
    'Python',
    'Django',
    'FastAPI',
    'Flask',
    'PostgreSQL',
    'Redis',
    'Celery',
    'React',
    'Tailwind CSS',
    'Docker',
    'Git / GitHub',
    'Playwright',
  ],

  processTimeline: [
    {
      number: '01',
      title: 'THE ARCHITECTURE',
      subtitle: 'Discovery & Schema Design',
      description:
        'Deconstructing technical requirements, database relationships, and API endpoints to engineer a robust blueprint.',
    },
    {
      number: '02',
      title: 'THE PROTOTYPE',
      subtitle: 'Interface & Responsive Wireframes',
      description:
        'Mapping user journeys, responsive UI grids, kinetic interaction curves, and state management flows.',
    },
    {
      number: '03',
      title: 'THE BUILD',
      subtitle: 'Frontend & Python Backend Synthesis',
      description:
        'Writing clean, typed components, orchestrating smooth GSAP scroll interactions, and wiring asynchronous Python APIs.',
    },
    {
      number: '04',
      title: 'THE OPTIMIZATION',
      subtitle: 'Sub-100ms Latency & Benchmarking',
      description:
        'Optimizing SQL queries, Redis cache hits, lighthouse web vitals, and asset delivery for maximum throughput.',
    },
    {
      number: '05',
      title: 'THE DEPLOY',
      subtitle: 'Production Launch & Monitoring',
      description:
        'Deploying to production cloud containers, verifying SSL/security headers, and monitoring real-time server health.',
    },
  ],

  journey: [
    {
      year: '2026',
      projectName: 'Backend Web Engineering & Python Systems',
      role: 'Backend Developer',
      description:
        'Building modern web applications with React, Django, and high-efficiency asynchronous tools with Python and FastAPI.',
      tag: 'Current Phase',
      isSample: false,
    },
    {
      year: '2026',
      projectName: 'FastAPI Microservices & API Gateway',
      role: 'Backend Architect & Developer',
      description:
        'Engineering resilient asynchronous Python microservices with Celery task queues, Redis caching, and PostgreSQL database clustering.',
      tag: 'Milestone',
      isSample: false,
    },
    {
      year: '2026',
      projectName: 'Python Automation & Database Architecture',
      role: 'Backend & Automation Developer',
      description:
        'Building asynchronous web scrapers, data pipelines, API integrations, and Antigravity agents focusing on speed and clean code.',
      tag: 'Core Focus',
      isSample: false,
    },
  ],

  milestones: [
    {
      number: '01',
      title: 'High-Performance Code Architecture',
      description:
        'Architecting clean, modular codebases with sub-100ms response targets and 99%+ Lighthouse ratings.',
      metric: 'Modern Standard',
      isSample: true,
    },
    {
      number: '02',
      title: 'Modern Stack Mastery',
      description:
        'Zero compromise on performance — powered by Django, FastAPI, asynchronous Python, and kinetic UI motion.',
      metric: 'Scalable Core',
      isSample: true,
    },
    {
      number: '03',
      title: 'Python Backend Systems',
      description:
        'Building high-concurrency asynchronous engines, headless scrapers, and reliable APIs for automated workloads.',
      metric: 'High Throughput',
      isSample: true,
    },
  ],

  manualRepos: [
    {
      id: 1,
      name: 'Altamash-Portfolio',
      description:
        "👨‍💻 Altamash Portfolio — Website & Python Backend Developer. Built with React 19, Tailwind CSS, TypeScript, and modern kinetic UI architecture.",
      html_url: 'https://github.com/ashadtyagi12-alt/Altamash-Portfolio',
      language: 'TypeScript',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-11-06',
      isSample: false,
    },
    {
      id: 2,
      name: 'LIBRARY-MAMAGEMENT-SYSTEM',
      description:
        '📚 Library Management System | Python Project built to strengthen skills in object-oriented programming and file handling.',
      html_url: 'https://github.com/ashadtyagi12-alt/LIBRARY-MAMAGEMENT-SYSTEM',
      language: 'Python',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-11-06',
      isSample: false,
    },
    {
      id: 3,
      name: 'Student_managment_system',
      description:
        'Python console application for managing student records, tracking topper detection, pass/fail status, and menu-driven data persistence.',
      html_url: 'https://github.com/ashadtyagi12-alt/Student_managment_system',
      language: 'Python',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-07-27',
      isSample: false,
    },
  ],
};

import React from 'react';

interface ToolItem {
  name: string;
  category: string;
  logo: React.ReactNode;
}

export const ToolsMarquee: React.FC = () => {
  // Pure Backend Development Technologies
  const backendTools: ToolItem[] = [
    {
      name: 'Python',
      category: 'Core Language',
      logo: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none">
          <path
            d="M11.922 1.25c-4.47 0-4.195 1.938-4.195 1.938l.005 2.01h4.258v.603H6.012S3.25 5.513 3.25 9.992c0 4.48 2.41 4.316 2.41 4.316h1.442v-2.032s-.078-2.42 2.378-2.42h4.117s2.3.037 2.3-2.27V4.032S16.592 1.25 11.922 1.25zm-2.316 1.344a.82.82 0 110 1.64.82.82 0 010-1.64z"
            fill="#387EB8"
          />
          <path
            d="M12.078 22.75c4.47 0 4.195-1.938 4.195-1.938l-.005-2.01h-4.258v-.603h5.978s2.762.288 2.762-4.191c0-4.48-2.41-4.316-2.41-4.316h-1.442v2.032s.078 2.42-2.378 2.42H10.45s-2.3-.037-2.3 2.27v3.559s-.695 2.787 3.928 2.787zm2.316-1.344a.82.82 0 110-1.64.82.82 0 010 1.64z"
            fill="#FFE052"
          />
        </svg>
      ),
    },
    {
      name: 'Django',
      category: 'Web Framework',
      logo: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
          <path
            fill="#092E20"
            className="fill-[#092E20] dark:fill-[#44B78B]"
            d="M11.146 0h3.425v16.71c-.702.105-1.432.158-2.19.158-4.337 0-6.723-2.105-6.723-6.195 0-3.931 2.37-6.265 5.488-6.265.86 0 1.457.106 2.001.299V0zm0 7.371a3.02 3.02 0 00-1.632-.421c-1.895 0-3.054 1.35-3.054 3.861 0 2.422 1.07 3.738 2.949 3.738.544 0 1.158-.07 1.737-.21V7.371zM18.887 4.79v11.905c-.86.386-2.124.632-3.265.632V4.79h3.265zM18.887 0v3.089h-3.265V0h3.265z"
          />
        </svg>
      ),
    },
    {
      name: 'FastAPI',
      category: 'Async API Hub',
      logo: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none">
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="#009688"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12 12l4-2.5-3-1.5 2-4-7 6.5 4 1-2 4.5 2-3.5z" fill="#009688" />
        </svg>
      ),
    },
    {
      name: 'Flask',
      category: 'Microservices',
      logo: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
          <path
            fill="#ffffff"
            d="M10 2v2.5a6.5 6.5 0 00-4.636 6.223A7.5 7.5 0 0012 18.25a7.5 7.5 0 006.636-7.527A6.5 6.5 0 0014 4.5V2h-4zm1.5 2h1v3.293l.354.353a4.5 4.5 0 011.314 3.182 5.5 5.5 0 01-11 0 4.5 4.5 0 011.314-3.182l.354-.353V4h1v2h1V4h4v2h1V4z"
          />
        </svg>
      ),
    },
    {
      name: 'PostgreSQL',
      category: 'Database SQL',
      logo: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.93V15.5c2.32-.23 4-1.39 4-3 0-1.87-2.31-3.23-5.5-3.46V7h-1v2.04c-3.19.23-5.5 1.59-5.5 3.46 0 1.61 1.68 2.77 4 3v3.43C6.72 17.8 4 15.22 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 3.22-2.72 5.8-6 6.93z"
            fill="#336791"
          />
        </svg>
      ),
    },
    {
      name: 'SQLite',
      category: 'Embedded Database',
      logo: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none">
          <path
            d="M12 2C6.5 2 2 4.2 2 7v10c0 2.8 4.5 5 10 5s10-2.2 10-5V7c0-2.8-4.5-5-10-5zm0 3c4.4 0 8 1.4 8 2s-3.6 2-8 2-8-1.4-8-2 3.6-2 8-2zm0 14c-4.4 0-8-1.4-8-2v-2.2c1.9 1.4 4.8 2.2 8 2.2s6.1-.8 8-2.2V17c0 .6-3.6 2-8 2zm0-5c-4.4 0-8-1.4-8-2V9.8c1.9 1.4 4.8 2.2 8 2.2s6.1-.8 8-2.2V12c0 .6-3.6 2-8 2z"
            fill="#0078D7"
          />
        </svg>
      ),
    },
    {
      name: 'REST APIs',
      category: 'Architecture',
      logo: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none">
          <path
            d="M4 12h16M14 6l6 6-6 6M10 18l-6-6 6-6"
            stroke="#FF3B47"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: 'Celery',
      category: 'Task Queue',
      logo: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
          <path
            fill="#37814A"
            d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm1 14.93V17a1 1 0 01-2 0v-.07A8.006 8.006 0 015.07 11H5a1 1 0 010-2h.07A8.006 8.006 0 0111 5.07V5a1 1 0 012 0v.07A8.006 8.006 0 0118.93 11H19a1 1 0 010 2h-.07A8.006 8.006 0 0113 16.93zM12 8a4 4 0 104 4 4 4 0 00-4-4z"
          />
        </svg>
      ),
    },
    {
      name: 'JWT & Auth',
      category: 'Security',
      logo: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none">
          <path
            d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"
            stroke="#F59E0B"
            strokeWidth="2"
            fill="rgba(245, 158, 11, 0.15)"
          />
          <path
            d="M12 8a2 2 0 00-2 2c0 .74.4 1.39 1 1.73V15h2v-3.27c.6-.34 1-.99 1-1.73a2 2 0 00-2-2z"
            fill="#F59E0B"
          />
        </svg>
      ),
    },
    {
      name: 'Git & GitHub',
      category: 'Version Control',
      logo: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
          <path
            fill="#ffffff"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
  ];

  // Repeat for a continuous seamless loop
  const marqueeList = [...backendTools, ...backendTools, ...backendTools];

  return (
    <section
      data-build-id="tech-stack-marquee"
      data-build-type="marquee-row"
      data-build-label="Backend Tech Stack Marquee Bar"
      className="relative w-full bg-[#070913] border-y border-white/5 py-3.5 sm:py-4 overflow-hidden select-none z-20"
      aria-label="Backend Technology Stack"
    >
      {/* Edge Vignette Blur / Linear Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#07080D] via-[#07080D]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#07080D] via-[#07080D]/80 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track Container */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-3 sm:gap-4">
        {marqueeList.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#0C101C] hover:bg-[#121728] border border-white/5 hover:border-coral/50 transition-all duration-300 shadow-sm cursor-default flex-shrink-0 group"
          >
            {/* Glowing Red Pulse Indicator */}
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-coral shadow-[0_0_8px_rgba(255,59,71,0.9)]" />
            </span>

            {/* Official Real Brand Logo */}
            <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-115">
              {item.logo}
            </div>

            {/* Tool Name */}
            <span className="font-display tracking-wider text-xs sm:text-sm font-bold text-white group-hover:text-coral transition-colors">
              {item.name}
            </span>

            {/* Sub-Category Label */}
            <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase ml-0.5">
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

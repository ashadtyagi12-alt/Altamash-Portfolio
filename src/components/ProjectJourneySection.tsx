import React, { useRef, useEffect } from 'react';
import { portfolioConfig } from '../config/portfolio.config';
import { Milestone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProjectJourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const journeyLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Long scroll-linked vertical line fill
      if (journeyLineRef.current) {
        gsap.fromTo(
          journeyLineRef.current,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: '#journey-timeline-track',
              start: 'top 75%',
              end: 'bottom 75%',
              scrub: 0.6,
            },
          }
        );
      }

      // Stagger fade-in of journey items
      const items = gsap.utils.toArray<HTMLElement>('.journey-entry-item');
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="project-journey"
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-[#07080D] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-bold tracking-widest text-coral uppercase">
            06 / EVOLUTION &amp; ROADMAP
          </span>
          <span className="w-12 h-[1px] bg-coral/40" />
        </div>

        {/* 2-Line Heading */}
        <div className="mb-16">
          <h2
            data-build-id="journey-headline"
            data-build-type="heading"
            data-build-label="Evolution & Roadmap"
            className="font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight uppercase"
          >
            <span className="text-white block">KEEP MOVING.</span>
            <span className="text-coral block">KEEP CREATING.</span>
          </h2>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (7 cols): Long Red Scroll-Linked Timeline */}
          <div
            id="journey-timeline-track"
            data-build-id="journey-timeline"
            data-build-type="timeline"
            data-build-label="Journey Milestones Timeline"
            className="lg:col-span-7 relative pl-8 sm:pl-12"
          >
            {/* Background line track */}
            <div className="absolute left-3.5 sm:left-5 top-2 bottom-2 w-[2px] bg-white/10" />

            {/* Red Fill Line */}
            <div
              ref={journeyLineRef}
              className="absolute left-3.5 sm:left-5 top-2 w-[2px] bg-coral shadow-[0_0_12px_#FF3B47]"
              style={{ height: '0%' }}
            />

            {/* Entries */}
            <div className="flex flex-col gap-12 sm:gap-16">
              {portfolioConfig.journey.map((entry, idx) => (
                <div key={idx} className="journey-entry-item relative group">
                  {/* Pin Dot on Timeline */}
                  <div className="absolute -left-8 sm:-left-12 top-1.5 w-7 h-7 -translate-x-1/2 rounded-full bg-[#07080D] border-2 border-coral flex items-center justify-center shadow-[0_0_15px_rgba(255,59,71,0.6)] group-hover:scale-125 transition-transform">
                    <span className="w-2 h-2 rounded-full bg-coral" />
                  </div>

                  {/* Content Box */}
                  <div className="bg-[#0C0F1A] p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-coral/40 transition-colors">
                    <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
                      <span className="font-mono text-xs font-bold text-coral">
                        {entry.year}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-white/5 text-text-muted border border-white/5">
                        {entry.tag}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl text-white uppercase mb-2 group-hover:text-coral transition-colors">
                      {entry.projectName}
                    </h3>

                    <p className="text-xs uppercase tracking-wider font-semibold text-text-secondary mb-4">
                      {entry.role}
                    </p>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Sticky "LITTLE WINS. BIG MEANING." */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-[#0B0E18] p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
              {/* Corner Aura */}
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-coral/15 filter blur-3xl pointer-events-none" />

              <div className="flex items-center gap-2 text-coral text-xs font-mono font-bold uppercase tracking-widest mb-3">
                <Milestone size={16} />
                <span>PROGRESS PRINCIPLE</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl text-white leading-tight uppercase mb-2">
                <span>LITTLE WINS.</span>{' '}
                <span className="text-coral">BIG MEANING.</span>
              </h3>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-8">
                Building without shortcuts. These milestones represent focused daily execution, experimentation, and steady evolution.
              </p>

              {/* Milestones List */}
              <div className="flex flex-col gap-5">
                {portfolioConfig.milestones.map((ms) => (
                  <div
                    key={ms.number}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-coral/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-coral">
                        {ms.number}
                      </span>
                      {ms.metric && (
                        <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-coral/10 text-coral border border-coral/20">
                          {ms.metric}
                        </span>
                      )}
                    </div>
                    <h4 className="font-display text-lg text-white uppercase mb-1">
                      {ms.title}
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {ms.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-text-muted">
                <span>PROJECT PERSPECTIVE</span>
                <span className="text-coral">SAMPLE / EDITABLE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

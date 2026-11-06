import React, { useRef, useEffect, useState } from 'react';
import { portfolioConfig } from '../config/portfolio.config';
import { Layout, Code2, Layers, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutSkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineLineRef = useRef<HTMLDivElement | null>(null);
  const quoteCardRef = useRef<HTMLDivElement | null>(null);

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline vertical line drawing on scroll
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: '#process-timeline-container',
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: 0.5,
              onUpdate: (self) => {
                const stepCount = portfolioConfig.processTimeline.length;
                const active = Math.min(
                  stepCount - 1,
                  Math.floor(self.progress * stepCount)
                );
                setActiveStepIndex(active);
              },
            },
          }
        );
      }

      // Quote Card slide up, tilt and float
      if (quoteCardRef.current) {
        gsap.fromTo(
          quoteCardRef.current,
          {
            y: 80,
            opacity: 0,
            rotation: -5,
          },
          {
            y: 0,
            opacity: 1,
            rotation: -1.5,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteCardRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="text-coral" size={24} />;
      case 'Code2':
        return <Code2 className="text-coral" size={24} />;
      case 'Video':
        return <Layers className="text-coral" size={24} />;
      case 'Layers':
        return <Layers className="text-coral" size={24} />;
      default:
        return <Code2 className="text-coral" size={24} />;
    }
  };

  return (
    <section
      id="about-skills"
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-[#07080D] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-bold tracking-widest text-coral uppercase">
            04 / PHILOSOPHY &amp; PROCESS
          </span>
          <span className="w-12 h-[1px] bg-coral/40" />
        </div>

        {/* 2-Line Heading */}
        <div className="mb-16">
          <h2
            data-build-id="about-headline"
            data-build-type="heading"
            data-build-label="Philosophy Headline"
            className="font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight uppercase"
          >
            <span className="text-white block">NOT JUST CODE.</span>
            <span className="text-coral block">A DISCIPLINE OF SCALABILITY.</span>
          </h2>
        </div>

        {/* 3 Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Column 1 (5 cols): Intro, 3 Skills, Toolkit */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Bio intro */}
            <div
              data-build-id="about-bio"
              data-build-type="paragraph"
              data-build-label="Craft Narrative"
              className="bg-[#0C0F19] p-6 rounded-2xl border border-white/5"
            >
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                Operating at the intersection of modern frontend code and robust Python backends. Whether architecting high-throughput REST APIs in FastAPI, building responsive web interfaces, or orchestrating asynchronous automation, I bring strict engineering discipline, sub-100ms latency targets, and clean maintainable architecture to every deployment.
              </p>
            </div>

            {/* The 3 Core Skills */}
            <div
              data-build-id="about-disciplines"
              data-build-type="project-card"
              data-build-label="Core Disciplines"
              data-canvas-target="skills-disciplines"
              data-canvas-name="Core Disciplines (Dev & Content)"
              className="flex flex-col gap-4"
            >
              <h3 className="text-xs uppercase tracking-widest font-mono text-text-muted font-bold">
                // CORE DISCIPLINES
              </h3>

              {portfolioConfig.skills.map((skill) => (
                <div
                  key={skill.title}
                  className="group bg-[#0C0F1A] hover:bg-[#111624] p-6 rounded-2xl border border-white/5 hover:border-coral/40 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="p-3 rounded-xl bg-coral/10 group-hover:bg-coral/20 transition-colors">
                      {getSkillIcon(skill.icon)}
                    </div>
                    <div>
                      <h4 className="font-display text-xl text-white group-hover:text-coral transition-colors uppercase">
                        {skill.title}
                      </h4>
                      <p className="text-xs font-mono text-coral/90 font-medium">
                        {skill.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                    {skill.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-white/5">
                    {skill.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-text-muted">
                        <span className="w-1 h-1 rounded-full bg-coral" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 (4 cols): Systematic Architecture to Deployment Timeline */}
          <div
            id="process-timeline-container"
            data-build-id="about-timeline"
            data-build-type="timeline"
            data-build-label="Process Timeline"
            className="lg:col-span-4 bg-[#090C16] p-6 sm:p-8 rounded-2xl border border-white/5"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-coral uppercase font-bold block">
                  SYSTEMATIC BLUEPRINT
                </span>
                <h3 className="font-display text-2xl text-white uppercase">
                  FROM IDEA TO PRODUCTION DEPLOY
                </h3>
              </div>
              <Layers className="text-coral" size={22} />
            </div>

            {/* Relative track */}
            <div className="relative pl-8">
              {/* Vertical Base Line */}
              <div className="absolute left-2.5 top-2 bottom-2 w-[2px] bg-white/10" />

              {/* Red Fill Line */}
              <div
                ref={timelineLineRef}
                className="absolute left-2.5 top-2 w-[2px] bg-coral shadow-[0_0_12px_#FF3B47] transition-all"
                style={{ height: '0%' }}
              />

              {/* Steps */}
              <div className="flex flex-col gap-10">
                {portfolioConfig.processTimeline.map((step, idx) => {
                  const isCurrent = idx <= activeStepIndex;
                  return (
                    <div key={step.number} className="relative group">
                      {/* Red Square Marker Numbered 01 to 05 */}
                      <div
                        className={`absolute -left-8 top-0 w-6 h-6 rounded-sm flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-300 ${
                          isCurrent
                            ? 'bg-coral text-white shadow-[0_0_15px_rgba(255,59,71,0.8)] scale-110'
                            : 'bg-[#151927] text-white/40 border border-white/10'
                        }`}
                      >
                        {step.number}
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex items-baseline gap-2 mb-1">
                          <h4
                            className={`font-display text-lg tracking-wide uppercase transition-colors ${
                              isCurrent ? 'text-coral' : 'text-white'
                            }`}
                          >
                            {step.title}
                          </h4>
                          <span className="text-[10px] font-mono text-text-muted">
                            // {step.subtitle}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 3 (3 cols): Tall Red Quote Card with Script Signature */}
          <div className="lg:col-span-3 flex justify-center">
            <div
              ref={quoteCardRef}
              className="relative w-full max-w-sm bg-gradient-to-b from-[#FF3B47] to-[#CC1F2A] text-white rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(255,59,71,0.35)] flex flex-col justify-between min-h-[480px] animate-float-slow"
            >
              {/* Subtle texture / pattern */}
              <div
                className="absolute inset-0 rounded-3xl opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Quote Mark */}
              <div className="relative z-10">
                <Quote size={40} className="text-white/60 mb-6" />
                <p className="font-display text-2xl sm:text-3xl leading-[1.15] tracking-tight uppercase mb-6 text-white drop-shadow-sm">
                  "{portfolioConfig.personal.quoteText}"
                </p>
              </div>

              {/* Signature & Author info */}
              <div className="relative z-10 pt-6 border-t border-white/20">
                {/* Script Signature */}
                <div className="font-script text-4xl sm:text-5xl text-white mb-1 select-none font-bold">
                  {portfolioConfig.personal.name}
                </div>
                <p className="text-xs uppercase tracking-widest text-white/80 font-mono font-semibold">
                  Backend &amp; Python Developer
                </p>
                <p className="text-[11px] text-white/60 font-mono">
                  {portfolioConfig.personal.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

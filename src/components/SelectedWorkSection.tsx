import React, { useState, useEffect } from 'react';
import { portfolioConfig } from '../config/portfolio.config';
import { ProjectItem } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Activity,
  Layers,
  ShieldCheck,
  Cpu,
  BookOpen,
} from 'lucide-react';

export const SelectedWorkSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const tabs: string[] = [
    'All',
    'Inventory AI',
    'Python APIs',
    'Websites',
    'AI & Automation',
    'Python OOP',
  ];

  const filteredProjects = portfolioConfig.projects.filter((p) => {
    if (activeTab === 'All') return true;
    return p.category === activeTab;
  });

  const handleNext = () => {
    setActiveCardIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
  };

  useEffect(() => {
    setActiveCardIndex(0);
  }, [activeTab]);

  const handleCardMouseEnter = (id: string, idx: number) => {
    setHoveredProjectId(id);
    setActiveCardIndex(idx);
  };

  const handleCardMouseLeave = () => {
    setHoveredProjectId(null);
  };

  // Render high-tech architectural card preview header (Replacer for raw videos)
  const renderCardGraphicPreview = (project: ProjectItem) => {
    switch (project.id) {
      case 'stockguard-ai':
        return (
          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-[#09131B] via-[#0C1924] to-[#060D14] border border-emerald-500/20 group-hover:border-coral/50 transition-all duration-500 flex flex-col justify-between p-4 select-none">
            {/* Background Grid & Ambient Glow */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Telemetry Chips */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono tracking-wider">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>EXPIRY RADAR</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 text-gray-300 border border-white/10">
                WHATSAPP API v21
              </span>
            </div>

            {/* Center High-Contrast Bold Typography */}
            <div className="relative z-10 text-center my-auto">
              <h4 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                GUARD<span className="text-coral">.</span>
              </h4>
              <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/90 font-semibold mt-1">
                // AUTOMATED INVENTORY TELEMETRY
              </p>
            </div>

            {/* Bottom Graphic Nodes Bar */}
            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono text-gray-400">
              <span className="flex items-center gap-1 text-gray-300">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span>ZERO-WASTE ACTIVE</span>
              </span>
              <span className="text-coral font-bold">FLET + DJANGO</span>
            </div>
          </div>
        );

      case 'corepulse-api-gateway':
        return (
          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-[#160B12] via-[#1E0F19] to-[#0A050B] border border-coral/30 group-hover:border-coral transition-all duration-500 flex flex-col justify-between p-4 select-none">
            {/* Background Grid & Ambient Glow */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #ff3b47 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-coral/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Telemetry Chips */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono tracking-wider">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-coral border border-coral/40">
                <span className="w-1.5 h-1.5 rounded-full bg-coral animate-ping" />
                <span>SUB-15MS ROUTING</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 text-gray-300 border border-white/10">
                REDIS + CELERY
              </span>
            </div>

            {/* Center High-Contrast Bold Typography */}
            <div className="relative z-10 text-center my-auto">
              <h4 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                PULSE<span className="text-coral">.</span>
              </h4>
              <p className="text-[10px] font-mono uppercase tracking-widest text-coral/90 font-semibold mt-1">
                // ASYNC PYTHON BACKEND HUB
              </p>
            </div>

            {/* Bottom Graphic Nodes Bar */}
            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono text-gray-400">
              <span className="flex items-center gap-1 text-gray-300">
                <Activity size={12} className="text-coral" />
                <span>100K+ REQ/MIN</span>
              </span>
              <span className="text-cyan-400 font-bold">FASTAPI ASYNC</span>
            </div>
          </div>
        );

      case 'zenith-saas-web':
        return (
          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-[#111626] via-[#161D32] to-[#0A0D17] border border-cyan-500/20 group-hover:border-coral transition-all duration-500 flex flex-col justify-between p-4 select-none">
            {/* Background Grid & Ambient Glow */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-coral/25 rounded-full blur-3xl pointer-events-none" />

            {/* Top Telemetry Chips */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono tracking-wider">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>60 FPS MOTION</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 text-gray-300 border border-white/10">
                LIGHTHOUSE 99.8%
              </span>
            </div>

            {/* Center High-Contrast Bold Typography (Exact Match to User Reference) */}
            <div className="relative z-10 text-center my-auto">
              <h4 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
                CREATE<span className="text-coral">.</span>
              </h4>
              <p className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold mt-1">
                // MODERN SaaS WEB PLATFORM
              </p>
            </div>

            {/* Bottom Graphic Nodes Bar */}
            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono text-gray-400">
              <span className="flex items-center gap-1 text-gray-300">
                <Layers size={12} className="text-cyan-400" />
                <span>REACT 19 + TAILWIND</span>
              </span>
              <span className="text-coral font-bold">FRAMER MOTION</span>
            </div>
          </div>
        );

      case 'library-management-system':
        return (
          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-[#1A130A] via-[#221A0F] to-[#0D0A05] border border-amber-500/25 group-hover:border-coral transition-all duration-500 flex flex-col justify-between p-4 select-none">
            {/* Background Grid & Ambient Glow */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Telemetry Chips */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono tracking-wider">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-amber-400 border border-amber-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>CATALOG ENGINE</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 text-gray-300 border border-white/10">
                PERSISTENT I/O
              </span>
            </div>

            {/* Center High-Contrast Bold Typography */}
            <div className="relative z-10 text-center my-auto">
              <h4 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                LIBRARY<span className="text-coral">.</span>
              </h4>
              <p className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-semibold mt-1">
                // OBJECT-ORIENTED PYTHON SYSTEM
              </p>
            </div>

            {/* Bottom Graphic Nodes Bar */}
            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono text-gray-400">
              <span className="flex items-center gap-1 text-gray-300">
                <BookOpen size={12} className="text-amber-400" />
                <span>ACTIVE RECORD LOGS</span>
              </span>
              <span className="text-coral font-bold">PYTHON OOP + FILES</span>
            </div>
          </div>
        );

      case 'novastream-ai':
      default:
        return (
          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-[#150D24] via-[#1F1235] to-[#0A0713] border border-purple-500/25 group-hover:border-coral transition-all duration-500 flex flex-col justify-between p-4 select-none">
            {/* Background Grid & Ambient Glow */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #a855f7 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Telemetry Chips */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono tracking-wider">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-purple-300 border border-purple-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                <span>NEURAL VOICE SYNTH</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 text-gray-300 border border-white/10">
                GPT-4o PIPELINE
              </span>
            </div>

            {/* Center High-Contrast Bold Typography */}
            <div className="relative z-10 text-center my-auto">
              <h4 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                STREAM<span className="text-coral">.</span>
              </h4>
              <p className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-semibold mt-1">
                // MULTIMODAL AI VIDEO ORCHESTRATION
              </p>
            </div>

            {/* Bottom Graphic Nodes Bar */}
            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono text-gray-400">
              <span className="flex items-center gap-1 text-gray-300">
                <Cpu size={12} className="text-purple-400" />
                <span>SUB-60S SYNTHESIS</span>
              </span>
              <span className="text-coral font-bold">PYTHON + ELEVENLABS</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="selected-work" className="relative py-28 bg-[#07080D] overflow-hidden">
      {/* Background Architectural Canvas Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* Subtle Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label: 02 / SELECTED WORK */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-bold tracking-widest text-coral uppercase">
            02 / SELECTED WORK
          </span>
          <span className="w-12 h-[1px] bg-coral/40" />
        </div>

        {/* Big 2-Line Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2
              data-build-id="selected-work-title"
              data-build-type="heading"
              data-build-label="Work That Speaks"
              className="font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight uppercase"
            >
              <span className="text-white block">WORK THAT</span>
              <span className="text-coral block">SPEAKS.</span>
            </h2>
          </div>

          {/* Navigation Controls: Arrows, View All */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project card"
                className="w-11 h-11 rounded-full border border-white/10 hover:border-coral flex items-center justify-center text-white hover:text-coral transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project card"
                className="w-11 h-11 rounded-full border border-white/10 hover:border-coral flex items-center justify-center text-white hover:text-coral transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <a
              href={portfolioConfig.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-text-secondary hover:text-coral transition-colors ml-2 py-2"
            >
              <span>VIEW ALL</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div
          data-build-id="selected-work-tabs"
          data-build-type="tool-chip"
          data-build-label="Category Tabs"
          className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-4 mb-10 border-b border-white/5 scrollbar-none"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-coral text-white shadow-[0_0_15px_rgba(255,59,71,0.4)]'
                  : 'bg-white/5 text-text-secondary hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Responsive Grid Layout (Zero raw videos, exact styling to reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 relative items-stretch">
          {filteredProjects.map((project, idx) => {
            const isActive = idx === activeCardIndex || hoveredProjectId === project.id;

            return (
              <div
                key={project.id}
                data-build-id={`project-card-${project.id}`}
                data-build-type="project-card"
                data-build-label={`Card 0${project.number} (${project.title})`}
                className="relative flex flex-col h-full"
              >
                {/* Real Card Component with Glowing Red Neon Border on Active/Hover */}
                <div
                  onMouseEnter={() => handleCardMouseEnter(project.id, idx)}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative flex flex-col justify-between bg-[#0C0F19] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 border-2 cursor-pointer h-full ${
                    isActive
                      ? 'border-coral shadow-[0_0_35px_rgba(255,59,71,0.35),inset_0_0_15px_rgba(255,59,71,0.06)]'
                      : 'border-white/10 hover:border-coral/80 hover:shadow-[0_0_25px_rgba(255,59,71,0.2)]'
                  }`}
                >
                  <div>
                    {/* Architectural Graphic Showcase Preview (Replacing Raw Video) */}
                    {renderCardGraphicPreview(project)}

                    {/* Category Label (Crimson Red / High Contrast) */}
                    <span className="text-[11px] font-mono uppercase tracking-widest text-coral font-bold block mb-1.5">
                      {project.categoryLabel}
                    </span>

                    {/* Project Title (Bold High-Contrast Uppercase Headline) */}
                    <h3 className="font-display text-2xl text-white uppercase tracking-wide group-hover:text-coral transition-colors mb-3 leading-tight">
                      {project.title}
                    </h3>

                    {/* SaaS-Oriented Punchy Description */}
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 font-sans line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Bottom Footer: Proper Tech Tags (Left) + Interactive INSPECT Button (Right) */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto gap-3">
                    {/* Tech tags styling at bottom left */}
                    <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-gray-300 border border-white/10 group-hover:border-white/20 transition-colors"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Interactive INSPECT ↗ Button at bottom right */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-bold text-white group-hover:text-coral transition-all duration-300 group-hover:translate-x-0.5 flex-shrink-0"
                    >
                      <span>INSPECT</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone / Achievements Row */}
        <div
          data-build-id="selected-work-achievements"
          data-build-type="repo-row"
          data-build-label="Track Record & Achievements"
          className="bg-[#0B0E19] p-7 sm:p-9 rounded-2xl border border-white/5 mb-16"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <div>
              <span className="text-xs font-mono text-coral font-bold uppercase tracking-widest">
                // ACHIEVEMENTS &amp; MILESTONES
              </span>
              <h3 className="font-display text-2xl text-white uppercase mt-1">
                ENGINEERING EXCELLENCE
              </h3>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted px-2.5 py-1 rounded bg-white/5 border border-white/5">
              Verified Record
            </span>
          </div>

          <div className="flex flex-col divide-y divide-white/5">
            <div className="py-4 flex items-center justify-between group cursor-default">
              <div>
                <h4 className="font-display text-lg text-white group-hover:text-coral transition-colors uppercase">
                  1st Place — Web Application Engineering Showcase
                </h4>
                <p className="text-xs text-text-secondary">High-speed Python (FastAPI &amp; Django) Web Architecture</p>
              </div>
              <span className="font-display text-2xl text-coral tracking-tight">2026</span>
            </div>

            <div className="py-4 flex items-center justify-between group cursor-default">
              <div>
                <h4 className="font-display text-lg text-white group-hover:text-coral transition-colors uppercase">
                  Scalable Python Automation &amp; Microservices Showcase
                </h4>
                <p className="text-xs text-text-secondary">High-throughput asynchronous routing with Celery and Redis</p>
              </div>
              <span className="font-display text-2xl text-coral tracking-tight">2026</span>
            </div>

            <div className="py-4 flex items-center justify-between group cursor-default">
              <div>
                <h4 className="font-display text-lg text-white group-hover:text-coral transition-colors uppercase">
                  Modern Backend &amp; API Architecture Honor
                </h4>
                <p className="text-xs text-text-secondary">Architecting resilient sub-15ms Python APIs and React web platforms</p>
              </div>
              <span className="font-display text-2xl text-coral tracking-tight">2026</span>
            </div>

            <div className="py-4 flex items-center justify-between group cursor-default">
              <div>
                <h4 className="font-display text-lg text-white group-hover:text-coral transition-colors uppercase">
                  Open-Source Python Architecture Release
                </h4>
                <p className="text-xs text-text-secondary">Library Management System: Modular OOP, file persistence &amp; ledger tracking</p>
              </div>
              <span className="font-display text-2xl text-coral tracking-tight">2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

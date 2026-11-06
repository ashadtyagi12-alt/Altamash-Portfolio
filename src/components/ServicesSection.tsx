import React, { useState } from 'react';
import { useLenis } from '../context/LenisContext';
import {
  Store,
  Database,
  Video,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  number: string;
  telemetry: string;
  badge: string;
  title: string;
  concept: string;
  highlights: string[];
  tags: string[];
  icon: React.ReactNode;
  accentGlow: string;
  borderHover: string;
}

export const ServicesSection: React.FC = () => {
  const { scrollTo } = useLenis();
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);

  const services: ServiceItem[] = [
    {
      id: 'local-business-web',
      number: '01',
      telemetry: 'LOCAL COMMERCE // HIGH CONVERSION',
      badge: 'Local & Modern Brands',
      title: 'Website Development for Businesses',
      concept:
        'Helping local shops, medical stores, kirana stores, and retail businesses go digital. Crafting high-converting, fully responsive websites tailored to increase local customers, optimize Google Maps visibility, and showcase services professionally.',
      highlights: [
        'Google Maps & Local SEO discoverability setup',
        'Mobile-first responsive fluid layouts for fast browsing',
        'Direct WhatsApp ordering & instant customer inquiries',
        'Digital product catalogs & localized service showcases',
      ],
      tags: ['Backend', 'UI/UX', 'Local SEO', 'Responsive Design'],
      icon: <Store className="text-coral" size={24} />,
      accentGlow: 'from-coral/10 to-transparent',
      borderHover: 'hover:border-coral hover:shadow-[0_4px_20px_rgba(255,59,71,0.15)]',
    },
    {
      id: 'django-backend-arch',
      number: '02',
      telemetry: 'ENTERPRISE INFRA // DJANGO 5.0',
      badge: 'Scalable Systems',
      title: 'Robust Django Backend Systems',
      concept:
        'Developing secure, scalable, and enterprise-grade backend infrastructures using Django. Features include complex database modeling, robust user authentication, automated notifications (like WhatsApp/Email alerts), and seamless dashboard integrations.',
      highlights: [
        'Complex relational modeling & PostgreSQL optimization',
        'Role-based JWT authentication & encrypted security rules',
        'Automated real-time WhatsApp & Email transactional webhooks',
        'High-speed admin reporting & custom analytics dashboards',
      ],
      tags: ['Python', 'Django', 'PostgreSQL', 'REST APIs'],
      icon: <Database className="text-cyan-400" size={24} />,
      accentGlow: 'from-cyan-500/10 to-transparent',
      borderHover: 'hover:border-cyan-400 hover:shadow-[0_4px_20px_rgba(56,189,248,0.15)]',
    },
    {
      id: 'ai-ads-video-growth',
      number: '03',
      telemetry: 'AI MEDIA // BUSINESS GROWTH',
      badge: 'High-Impact Video',
      title: 'AI Ads & Video Creation to Grow Businesses',
      concept:
        'Crafting high-converting, attention-grabbing AI commercial ads and video campaigns engineered to scale business revenues. From viral short-form reels to professional ad creatives with realistic AI avatars, studio voiceovers, and high-CTR hooks that convert viewers into loyal paying customers.',
      highlights: [
        'High-converting video ads for Instagram, Meta, YouTube & Local reach',
        'Studio-grade AI voiceovers, dynamic captions & cinematic pacing',
        'Compelling scriptwriting & high-retention marketing hooks',
        'Tailored creative assets to scale brand authority & drive sales',
      ],
      tags: ['AI Video Ads', 'Business Growth', 'Motion Graphics', 'High-CTR Creatives'],
      icon: <Video className="text-emerald-400" size={24} />,
      accentGlow: 'from-emerald-500/10 to-transparent',
      borderHover: 'hover:border-emerald-400 hover:shadow-[0_4px_20px_rgba(52,211,153,0.15)]',
    },
  ];

  const handleDiscussClick = (e: React.MouseEvent, _serviceTitle?: string) => {
    e.preventDefault();
    scrollTo('#contact-section', { offset: -40 });
  };

  return (
    <section
      id="services"
      className="relative py-28 md:py-36 bg-[#07080D] border-t border-white/5 overflow-hidden"
    >
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* Ambient Lighting Spheres (Subtle, zero text washout) */}
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-coral/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-cyan-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Pill Label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-bold tracking-widest text-coral uppercase">
            03 / SERVICES &amp; CAPABILITIES
          </span>
          <span className="w-12 h-[1px] bg-coral/40" />
        </div>

        {/* Section Header: Bold 2-Line Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2
              data-build-id="services-heading"
              data-build-type="heading"
              data-build-label="Services Headline"
              className="font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight uppercase"
            >
              <span className="text-white block">ENGINEERED FOR GROWTH.</span>
              <span className="text-coral block">SERVICES I OFFER.</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
            Bridging high-performance Python architectures with accessible, conversion-driven web interfaces. Tailored for local enterprises, scaling retail businesses, and modern microservices.
          </p>
        </div>

        {/* 3-Card Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service) => {
            const isHovered = hoveredServiceId === service.id;

            return (
              <div
                key={service.id}
                data-build-id={`service-card-${service.id}`}
                data-build-type="project-card"
                data-build-label={`Service 0${service.number} (${service.title})`}
                className="relative flex flex-col h-full"
              >
                {/* Main Premium Card Container */}
                <div
                  onMouseEnter={() => setHoveredServiceId(service.id)}
                  onMouseLeave={() => setHoveredServiceId(null)}
                  className={`group relative flex flex-col justify-between bg-[#0C0F19] rounded-2xl p-7 sm:p-8 transition-all duration-300 hover:-translate-y-2 border-2 h-full cursor-default ${
                    isHovered
                      ? service.borderHover
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Top Bar: Telemetry & Service Index */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono border-b border-white/5 pb-3 mb-6 select-none">
                    <span className="flex items-center gap-2 text-cyan-400 font-semibold tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span>[{service.telemetry}]</span>
                    </span>
                    <span className="font-display text-2xl font-black text-coral tracking-tighter">
                      {service.number}
                    </span>
                  </div>

                  {/* Body: Icon, Badge, Title, Description, and Bullet Highlights */}
                  <div className="relative z-10 flex-1">
                    {/* Icon Badge & Category Pill */}
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-white/20 group-hover:scale-105 transition-all duration-300 shadow-inner">
                        {service.icon}
                      </div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
                        {service.badge}
                      </span>
                    </div>

                    {/* Service Title - Clean, elegant & highly legible modern typography */}
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-3.5">
                      {service.title}
                    </h3>

                    {/* Punchy SaaS Concept Description - High-contrast readable gray */}
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans mb-6">
                      {service.concept}
                    </p>

                    {/* Scannable Bullet Highlights */}
                    <div className="flex flex-col gap-2.5 pt-4 border-t border-white/5 mb-8">
                      {service.highlights.map((item, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-200 font-sans"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-coral flex-shrink-0 mt-0.5"
                          />
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Footer: Tech Tags (Left) + Action Button (Right) */}
                  <div className="relative z-10 pt-5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                    {/* Aligned Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 max-w-full sm:max-w-[65%]">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-gray-300 border border-white/10 group-hover:border-white/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Action Button */}
                    <button
                      type="button"
                      onClick={(e) => handleDiscussClick(e, service.title)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-wider font-bold text-white group-hover:text-coral transition-all duration-300 self-end sm:self-center group-hover:translate-x-0.5"
                      aria-label={`Discuss ${service.title}`}
                    >
                      <span>Discuss Project</span>
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-coral"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Banner */}
        <div
          data-build-id="services-cta-banner"
          data-build-type="tool-chip"
          data-build-label="Services Guarantee Banner"
          className="mt-16 bg-[#0B0E19] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-coral/10 border border-coral/30 text-coral flex-shrink-0">
              <Sparkles size={22} />
            </div>
            <div>
              <h4 className="font-sans text-lg text-white font-bold">
                Have a Custom Business Requirement?
              </h4>
              <p className="text-xs text-text-secondary mt-0.5">
                Whether you need a local store website, custom Django database modeling, or rapid Flask integrations, let's architect a solution.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => handleDiscussClick(e, 'Custom Requirement')}
            className="px-6 py-3 rounded-sm bg-coral hover:bg-coral-hover text-white text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(255,59,71,0.4)] hover:shadow-[0_4px_30px_rgba(255,59,71,0.65)] flex items-center gap-2 flex-shrink-0"
          >
            <span>Get a Custom Quote</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};

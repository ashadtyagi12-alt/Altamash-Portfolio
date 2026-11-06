import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, MoveHorizontal, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Inline Self-Contained Vector Graphic for "STAGE 01: RAW DRAFT"
const RawDraftGraphic: React.FC = () => (
  <svg
    viewBox="0 0 1000 650"
    className="w-full h-full object-cover select-none pointer-events-none"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="rawGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      </pattern>
    </defs>

    <rect width="1000" height="650" fill="#0C0E17" />
    <rect width="1000" height="650" fill="url(#rawGrid)" />

    {/* Window Header */}
    <rect x="50" y="40" width="900" height="40" rx="8" fill="#151926" stroke="rgba(255,255,255,0.1)" />
    <circle cx="80" cy="60" r="5" fill="#4B5563" />
    <circle cx="100" cy="60" r="5" fill="#4B5563" />
    <circle cx="120" cy="60" r="5" fill="#4B5563" />
    <text x="500" y="65" fontFamily="monospace" fontSize="13" fill="#6B7280" textAnchor="middle">
      draft-backend-spec-v0.2.wireframe
    </text>

    {/* Top Nav Wireframe */}
    <rect x="70" y="105" width="860" height="45" fill="none" stroke="rgba(255,255,255,0.12)" strokeDasharray="4 4" />
    <rect x="90" y="120" width="90" height="15" fill="#2A3042" />
    <rect x="720" y="120" width="60" height="15" fill="#2A3042" />
    <rect x="800" y="120" width="100" height="15" fill="#2A3042" />

    {/* Architecture Box Wireframe with X cross */}
    <g transform="translate(70, 175)">
      <rect x="0" y="0" width="500" height="260" fill="none" stroke="rgba(255,255,255,0.18)" strokeDasharray="6 6" />
      <line x1="0" y1="0" x2="500" y2="260" stroke="rgba(255,255,255,0.08)" />
      <line x1="0" y1="260" x2="500" y2="0" stroke="rgba(255,255,255,0.08)" />

      <text x="40" y="80" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="28" fontWeight="700" fill="#64748B">
        RAW SCHEMA &amp; LOGIC
      </text>
      <rect x="40" y="110" width="380" height="12" fill="#22283A" />
      <rect x="40" y="135" width="300" height="12" fill="#22283A" />
      <rect x="40" y="160" width="220" height="12" fill="#22283A" />
      <rect x="40" y="195" width="130" height="36" fill="#323B52" rx="4" />
    </g>

    {/* Sidebar Components */}
    <g transform="translate(600, 175)">
      <rect x="0" y="0" width="330" height="115" fill="none" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
      <rect x="25" y="25" width="120" height="14" fill="#2A3042" />
      <rect x="25" y="55" width="270" height="8" fill="#1C2130" />
      <rect x="25" y="75" width="220" height="8" fill="#1C2130" />

      <rect x="0" y="135" width="330" height="125" fill="none" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
      <rect x="25" y="160" width="140" height="14" fill="#2A3042" />
      <rect x="25" y="190" width="250" height="8" fill="#1C2130" />
      <rect x="25" y="210" width="180" height="8" fill="#1C2130" />
    </g>

    {/* Code / Script Notes */}
    <g transform="translate(70, 465)">
      <rect x="0" y="0" width="860" height="140" fill="#10131F" stroke="rgba(255,255,255,0.08)" rx="6" />
      <text x="30" y="38" fontFamily="monospace" fontSize="14" fill="#6B7280">
        // Step 1: Draft backend spec &amp; database entity relations
      </text>
      <text x="30" y="66" fontFamily="monospace" fontSize="14" fill="#4B5563">
        const arch = &#123; endpoints: &quot;unindexed&quot;, p99: &quot;840ms&quot;, status: &quot;prototype&quot; &#125;;
      </text>
      <text x="30" y="94" fontFamily="monospace" fontSize="14" fill="#FF3B47" opacity="0.8">
        /* Ready to transform into high-throughput production API engine */
      </text>
    </g>

    {/* Stamp */}
    <g transform="translate(80, 520) rotate(-6)">
      <rect x="0" y="0" width="160" height="40" rx="4" fill="none" stroke="#6B7280" strokeWidth="2" strokeDasharray="6 3" />
      <text x="80" y="26" fontFamily="'Anton', sans-serif" fontSize="20" fill="#6B7280" textAnchor="middle" letterSpacing="2">
        STAGE 01: RAW
      </text>
    </g>
  </svg>
);

// Inline Self-Contained Vector Graphic for "STAGE 02: REAL RESULT"
const RealProductionGraphic: React.FC = () => (
  <svg
    viewBox="0 0 1000 650"
    className="w-full h-full object-cover select-none pointer-events-none"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="neonBgReal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#121626" />
        <stop offset="50%" stopColor="#07080D" />
        <stop offset="100%" stopColor="#190F16" />
      </linearGradient>
      <linearGradient id="coralGlowReal" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FF3B47" />
        <stop offset="100%" stopColor="#FF6B75" />
      </linearGradient>
      <filter id="glowFiltReal" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="12" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <rect width="1000" height="650" fill="url(#neonBgReal)" />

    {/* Window Header */}
    <rect x="50" y="40" width="900" height="40" rx="8" fill="#141824" stroke="rgba(255, 59, 71, 0.3)" />
    <circle cx="80" cy="60" r="5" fill="#FF3B47" />
    <circle cx="100" cy="60" r="5" fill="#FBBF24" />
    <circle cx="120" cy="60" r="5" fill="#34D399" />
    <text x="500" y="65" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" fontSize="13" fill="#E5E7EB" textAnchor="middle">
      api.production-deploy.altamash.dev
    </text>

    {/* Top Real Bar */}
    <g transform="translate(70, 105)">
      <rect x="0" y="0" width="860" height="50" rx="8" fill="#121522" stroke="rgba(255,255,255,0.08)" />
      <text x="25" y="32" fontFamily="'Anton', sans-serif" fontSize="20" fill="#FFFFFF" letterSpacing="2">
        FASTAPI &amp; DJANGO<tspan fill="#FF3B47">.</tspan>
      </text>
      <rect x="710" y="10" width="125" height="30" rx="15" fill="url(#coralGlowReal)" />
      <text x="772" y="30" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12" fontWeight="700" fill="#FFFFFF" textAnchor="middle">
        LIVE ENGINE
      </text>
    </g>

    {/* Main Showcase Dashboard */}
    <g transform="translate(70, 175)">
      {/* Big Real Card with Glow */}
      <rect x="0" y="0" width="510" height="260" rx="12" fill="#111422" stroke="rgba(255, 59, 71, 0.4)" filter="url(#glowFiltReal)" opacity="0.4" />
      <rect x="0" y="0" width="510" height="260" rx="12" fill="#111422" stroke="rgba(255, 59, 71, 0.5)" />

      {/* Card Inner */}
      <text x="35" y="55" fontFamily="'Anton', sans-serif" fontSize="36" fill="#FFFFFF" letterSpacing="1">
        HIGH-CONCURRENCY SCALE<tspan fill="#FF3B47">.</tspan>
      </text>
      <text x="35" y="90" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="14" fill="#9CA3AF">
        Sub-24ms Response • Async Pool • Redis Cache • Clean Schemas
      </text>

      {/* Visual Interactive Graph */}
      <path d="M 35 210 Q 120 120, 200 170 T 360 110 T 475 80" fill="none" stroke="url(#coralGlowReal)" strokeWidth="4" />
      <path d="M 35 210 Q 120 120, 200 170 T 360 110 T 475 80 L 475 220 L 35 220 Z" fill="url(#coralGlowReal)" opacity="0.12" />
      <circle cx="475" cy="80" r="7" fill="#FF3B47" stroke="#FFFFFF" strokeWidth="2" />
      <text x="445" y="60" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12" fontWeight="700" fill="#FF3B47">
        +328% REACH
      </text>
    </g>

    {/* Real Metric Cards */}
    <g transform="translate(605, 175)">
      <rect x="0" y="0" width="325" height="120" rx="10" fill="#131726" stroke="rgba(255,255,255,0.1)" />
      <text x="25" y="38" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12" fontWeight="600" letterSpacing="2" fill="#9CA3AF">
        LIGHTHOUSE SPEED
      </text>
      <text x="25" y="85" fontFamily="'Anton', sans-serif" fontSize="44" fill="#34D399">
        100<tspan fontSize="20" fill="#9CA3AF">/100</tspan>
      </text>
      <circle cx="270" cy="60" r="28" fill="none" stroke="#34D399" strokeWidth="4" strokeDasharray="160 20" />

      <rect x="0" y="140" width="325" height="120" rx="10" fill="#131726" stroke="rgba(255, 59, 71, 0.3)" />
      <text x="25" y="178" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12" fontWeight="600" letterSpacing="2" fill="#FF3B47">
        THROUGHPUT VOLUME
      </text>
      <text x="25" y="225" fontFamily="'Anton', sans-serif" fontSize="44" fill="#FFFFFF">
        140<tspan fontSize="24" fill="#FF3B47">K/m</tspan>
      </text>
    </g>

    {/* Bottom Real Telemetry */}
    <g transform="translate(70, 465)">
      <rect x="0" y="0" width="860" height="140" rx="10" fill="#0F121C" stroke="rgba(255,255,255,0.08)" />
      <text x="35" y="45" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="14" fontWeight="700" fill="#FFFFFF">
        CORE STACK: PYTHON • DJANGO • FASTAPI • POSTGRESQL • REACT 19
      </text>
      <text x="35" y="75" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="13" fill="#9CA3AF">
        Automated migrations, secure JWT authentication, and resilient CI/CD pipelines.
      </text>
      <rect x="35" y="95" width="80" height="24" rx="4" fill="rgba(52, 211, 153, 0.15)" />
      <text x="75" y="111" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="11" fontWeight="700" fill="#34D399" textAnchor="middle">
        VERIFIED
      </text>
    </g>

    {/* Real Stamp */}
    <g transform="translate(850, 520) rotate(-6)">
      <rect x="-10" y="-5" width="170" height="42" rx="6" fill="#FF3B47" filter="drop-shadow(0 0 15px rgba(255,59,71,0.5))" />
      <text x="75" y="24" fontFamily="'Anton', sans-serif" fontSize="22" fill="#FFFFFF" textAnchor="middle" letterSpacing="2">
        STAGE 02: REAL
      </text>
    </g>
  </svg>
);

export const RawToRealSection: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Auto-slide animation when scrolled into view
  useEffect(() => {
    let ctx = gsap.context(() => {
      const obj = { val: 75 };
      gsap.to(obj, {
        val: 35,
        duration: 1.8,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
        },
        onUpdate: () => {
          setSliderPos(obj.val);
        },
        onComplete: () => {
          gsap.to(obj, {
            val: 50,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => {
              setSliderPos(obj.val);
            },
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Dragging logic for mouse & touch
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <section
      id="transformation"
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-[#07080D] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-bold tracking-widest text-coral uppercase">
            03 / TRANSFORMATION
          </span>
          <span className="w-12 h-[1px] bg-coral/40" />
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-5">
            <h2
              data-build-id="raw-to-real-title"
              data-build-type="heading"
              data-build-label="From Raw To Real"
              className="font-display text-4xl sm:text-6xl md:text-7xl leading-[0.92] tracking-tight uppercase mb-6"
            >
              <span className="text-white block">FROM RAW.</span>
              <span className="text-coral block">TO REAL.</span>
            </h2>

            <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
              Every production platform starts with raw complexity: unstructured data schemas, unoptimized backend endpoints, or rough sketches. My craft is bridging that gap — architecting clean Python APIs, modular React interfaces, and sub-100ms kinetic web systems that scale effortlessly in production.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-text-primary">
                <CheckCircle size={16} className="text-coral flex-shrink-0" />
                <span>Zero fluff architecture — typed, modular, and performant</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-text-primary">
                <CheckCircle size={16} className="text-coral flex-shrink-0" />
                <span>Resilient Python backends with Django &amp; FastAPI microservices</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-text-primary">
                <CheckCircle size={16} className="text-coral flex-shrink-0" />
                <span>Hyper-smooth 60 FPS transitions calibrated with Lenis &amp; GSAP</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-coral/80 bg-coral/10 px-4 py-2 rounded-full border border-coral/20">
              <Sparkles size={14} />
              <span>Drag the interactive handle on the right</span>
            </div>
          </div>

          {/* Right Column: Before/After Comparison Slider */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              data-build-id="raw-to-real-slider"
              data-build-type="media-frame"
              data-build-label="Transformation Compare Slider"
              data-canvas-target="raw-to-real-slider"
              data-canvas-name="Transformation Interactive Compare Slider"
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 select-none shadow-2xl bg-[#090C15] cursor-ew-resize"
              onMouseDown={(e) => {
                handleMouseDown();
                handleMove(e.clientX);
              }}
              onTouchStart={(e) => {
                handleTouchStart();
                if (e.touches[0]) handleMove(e.touches[0].clientX);
              }}
            >
              {/* "REAL" Polished Base (Full Width) */}
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <RealProductionGraphic />
              </div>

              {/* "RAW" Version (Clipped dynamically with CSS clipPath) */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <RawDraftGraphic />
              </div>

              {/* Labels for Stages */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none px-3 py-1 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-widest text-text-muted">
                STAGE 01: RAW DRAFT
              </div>
              <div className="absolute top-4 right-4 z-20 pointer-events-none px-3 py-1 rounded bg-coral/90 backdrop-blur-md text-[11px] font-mono tracking-widest text-white font-bold">
                STAGE 02: REAL RESULT
              </div>

              {/* Thin Vertical White Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Round Red Draggable Handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-coral flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,59,71,0.8)] border-2 border-white pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                  <MoveHorizontal size={18} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-text-muted mt-3 px-1">
              <span>◄ 01. UNREFINED CONCEPT</span>
              <span>02. PRODUCTION REALITY ►</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

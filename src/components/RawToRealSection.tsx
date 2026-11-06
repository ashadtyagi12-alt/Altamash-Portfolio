import React, { useState, useRef, useEffect, useCallback } from 'react';
import { portfolioConfig } from '../config/portfolio.config';
import { Sparkles, MoveHorizontal, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
              <img
                src={portfolioConfig.media.realImage}
                alt="Polished Final Reality"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* "RAW" Version (Clipped to sliderPos %) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={portfolioConfig.media.rawImage}
                  alt="Raw Concept & Wireframe"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: containerRef.current?.clientWidth || '100%' }}
                />
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

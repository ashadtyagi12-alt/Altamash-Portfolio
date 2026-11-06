import React, { useEffect, useRef } from 'react';
import { portfolioConfig } from '../config/portfolio.config';
import { useLenis } from '../context/LenisContext';
import {
  ArrowDown,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  Youtube,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  isLoaded: boolean;
  onOpenShowreel: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isLoaded }) => {
  const { scrollTo } = useLenis();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const giantTextRef = useRef<HTMLHeadingElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const leftContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Parallax on Giant Text "PORTFOLIO"
      if (giantTextRef.current) {
        gsap.to(giantTextRef.current, {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Parallax on Centered Portrait
      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          yPercent: 12,
          opacity: 0.2,
          scale: 0.96,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Parallax on Left Content
      if (leftContentRef.current) {
        gsap.to(leftContentRef.current, {
          yPercent: -10,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'center top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, [isLoaded]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[105vh] flex items-center justify-center overflow-hidden pt-32 sm:pt-36 md:pt-40 pb-16 lg:pb-24 bg-[#07080D]"
    >
      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Layer 1: Giant Background Title "PORTFOLIO" in deep crimson gradient */}
      <div
        ref={giantTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden"
      >
        <h1 className="hero-giant-text text-[22vw] leading-none font-black uppercase whitespace-nowrap opacity-90 transition-transform duration-1000">
          PORTFO<span style={{ letterSpacing: '0.06em' }}>L</span>IO
        </h1>
      </div>

      {/* Layer 2: Subject Portrait Cutout — DEAD CENTER (Blue backdrop 100% removed) */}
      <div
        ref={portraitRef}
        className="absolute inset-x-0 bottom-0 top-16 sm:top-20 flex justify-center items-end pointer-events-none z-10 overflow-hidden"
      >
        <div
          data-build-id="hero-portrait"
          data-build-type="media-frame"
          data-build-label="Altamash Portrait"
          className={`relative w-full max-w-[520px] sm:max-w-[600px] md:max-w-[680px] lg:max-w-[760px] xl:max-w-[840px] h-[72vh] sm:h-[78vh] lg:h-[85vh] transition-all duration-1000 ease-out transform ${
            isLoaded
              ? 'filter blur-0 scale-100 opacity-95'
              : 'filter blur-md scale-95 opacity-0'
          }`}
        >
          {/* Ambient red rim glow behind centered portrait */}
          <div className="absolute inset-0 bg-coral/20 blur-3xl rounded-full opacity-35 pointer-events-none" />

          {/* Clean transparent cutout image */}
          <img
            src={portfolioConfig.media.portrait}
            alt="Altamash - Website & Python Developer"
            className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
          />
        </div>
      </div>

      {/* Layer 3: Foreground Content (Left Column with exact Renando-style layout) */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 md:px-12 pointer-events-auto">
        <div
          ref={leftContentRef}
          className="max-w-xl flex flex-col items-start justify-center"
        >
          {/* 1. Handwritten Cursive Greeting */}
          <div
            data-build-id="hero-greeting"
            data-build-type="heading"
            data-build-label="Greeting Script"
            className="mb-1"
          >
            <span className="font-script text-white text-3xl sm:text-4xl md:text-5xl tracking-wide inline-block -rotate-2 origin-left drop-shadow-md">
              {portfolioConfig.personal.heroGreeting}
            </span>
          </div>

          {/* 2. Main Headline Name: "ALTAMASH ." */}
          <div
            data-build-id="hero-name"
            data-build-type="heading"
            data-build-label="Headline ALTAMASH"
            className="mb-3"
          >
            <h2 className="font-display text-6xl sm:text-7xl md:text-8xl xl:text-9xl text-white font-black tracking-tight leading-[0.88] uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)]">
              ALTAMASH<span className="text-coral">.</span>
            </h2>
          </div>

          {/* 3. Stacked Red Role / Profession */}
          <div
            data-build-id="hero-profession"
            data-build-type="heading"
            data-build-label="Profession Tags"
            className="mb-5"
          >
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-coral tracking-wider uppercase leading-tight drop-shadow-md">
              <span className="block">WEBSITE &amp;</span>
              <span className="block">PYTHON DEVELOPER</span>
            </h3>
          </div>

          {/* 4. Poetic 3-Line Bio */}
          <div
            data-build-id="hero-bio"
            data-build-type="paragraph"
            data-build-label="Intro Bio"
            className="mb-8 max-w-md"
          >
            <p className="text-xs sm:text-sm md:text-base text-gray-300 font-sans leading-relaxed drop-shadow-sm">
              Crafting code. Building digital experiences.
              <br />
              I transform ideas into modern, high-performance web applications,
              <br />
              from initial concept to final deployment.
            </p>
          </div>

          {/* 5. Solid Red CTA Button: [ View my work ↓ ] */}
          <div
            data-build-id="hero-cta"
            data-build-type="button"
            data-build-label="View My Work Button"
            className="mb-8"
          >
            <button
              type="button"
              onClick={() => scrollTo('#selected-work')}
              className="px-7 py-3.5 bg-coral hover:bg-coral-hover text-white font-sans text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-[0_4px_25px_rgba(255,59,71,0.45)] hover:shadow-[0_4px_35px_rgba(255,59,71,0.7)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 rounded-sm active:scale-95"
            >
              <span>View my work</span>
              <ArrowDown size={16} className="text-white" />
            </button>
          </div>

          {/* 6. Location Badge + Verified Social Links */}
          <div
            data-build-id="hero-location"
            data-build-type="tool-chip"
            data-build-label="Location & Socials"
            className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400"
          >
            <div className="flex items-center gap-1.5 text-white/80">
              <MapPin size={13} className="text-coral flex-shrink-0" />
              <span className="uppercase tracking-widest text-[11px] font-medium">
                PILKHUWA, HAPUR, UP, INDIA
              </span>
            </div>

            <div className="flex items-center gap-3 pl-2">
              <a
                href={portfolioConfig.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-coral transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={13} />
              </a>
              <a
                href={portfolioConfig.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-coral transition-colors"
                aria-label="GitHub"
              >
                <Github size={13} />
              </a>
              <a
                href={portfolioConfig.personal.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#1877F2] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={13} />
              </a>
              <a
                href={portfolioConfig.personal.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-coral transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={13} />
              </a>
              <a
                href={portfolioConfig.personal.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-coral transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

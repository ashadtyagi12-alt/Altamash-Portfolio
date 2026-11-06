import React from 'react';
import { portfolioConfig } from '../config/portfolio.config';
import { useLenis } from '../context/LenisContext';
import { ArrowUp, Facebook, Instagram, Youtube, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { scrollTo } = useLenis();

  const handleScrollToTop = () => {
    scrollTo(0, { duration: 1.6 });
  };

  return (
    <footer className="relative bg-[#05060A] border-t border-white/5 py-16 text-text-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between">
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/5">
          <div>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToTop();
              }}
              className="font-display text-4xl text-white tracking-wider block mb-2 group"
            >
              <span>ALTAMASH</span>
              <span className="text-coral group-hover:scale-125 inline-block transition-transform duration-300">
                .
              </span>
            </a>
            <p className="text-xs uppercase tracking-widest text-text-muted font-mono">
              {portfolioConfig.personal.professionShort}
            </p>
          </div>

          <div className="flex items-center gap-5 text-white">
            <a
              href={portfolioConfig.personal.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-3 rounded-full bg-white/5 hover:bg-[#1877F2] transition-colors"
            >
              <Facebook size={18} />
            </a>
            <a
              href={portfolioConfig.personal.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-3 rounded-full bg-white/5 hover:bg-coral transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href={portfolioConfig.personal.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-3 rounded-full bg-white/5 hover:bg-coral transition-colors"
            >
              <Youtube size={19} />
            </a>
            <a
              href={portfolioConfig.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full bg-white/5 hover:bg-coral transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href={portfolioConfig.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full bg-white/5 hover:bg-[#0A66C2] transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioConfig.personal.email}&su=Project%20Inquiry%20-%20Altamash`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct Email"
              className="p-3 rounded-full bg-white/5 hover:bg-coral transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>

          <button
            type="button"
            onClick={handleScrollToTop}
            aria-label="Back to Top"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-coral hover:text-coral text-white text-xs uppercase tracking-widest font-mono transition-colors group"
          >
            <span>TOP OF PAGE</span>
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Bottom Tier */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div>
            © 2026 Altamash. Built in {portfolioConfig.personal.location}.
          </div>

          <div className="flex items-center gap-4">
            <span>60 FPS SCROLL-DRIVEN FILM</span>
            <span>•</span>
            <span className="text-coral">HOT CORAL #FF3B47</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

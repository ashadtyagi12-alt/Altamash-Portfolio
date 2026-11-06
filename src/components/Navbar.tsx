import React, { useState, useEffect } from 'react';
import { portfolioConfig } from '../config/portfolio.config';
import { useLenis } from '../context/LenisContext';
import { Instagram, Youtube, Github, Linkedin, Facebook, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isLoaded: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoaded }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Demo', href: '#showreel' },
    { label: 'Work', href: '#selected-work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about-skills' },
    { label: 'GitHub', href: '#github-section' },
    { label: 'Contact', href: '#contact-section' },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href, { offset: -60 });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        } ${
          isScrolled
            ? 'bg-[#07080D]/85 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-1 font-display text-2xl tracking-wider text-white"
          >
            <span>ALTAMASH</span>
            <span className="text-coral group-hover:scale-125 transition-transform duration-300">
              .
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-text-secondary font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-white transition-colors duration-200 relative group py-1"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-coral transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Actions: Social Icons & CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-4 text-text-secondary">
              <a
                href={portfolioConfig.personal.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="hover:text-[#1877F2] transition-colors duration-200"
              >
                <Facebook size={18} />
              </a>
              <a
                href={portfolioConfig.personal.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="hover:text-coral transition-colors duration-200"
              >
                <Instagram size={18} />
              </a>
              <a
                href={portfolioConfig.personal.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                className="hover:text-coral transition-colors duration-200"
              >
                <Youtube size={19} />
              </a>
              <a
                href={portfolioConfig.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="hover:text-coral transition-colors duration-200"
              >
                <Github size={18} />
              </a>
              <a
                href={portfolioConfig.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="hover:text-coral transition-colors duration-200"
              >
                <Linkedin size={18} />
              </a>
            </div>

            <div className="h-4 w-[1px] bg-white/10" />

            <a
              href="#contact-section"
              onClick={(e) => handleNavClick(e, '#contact-section')}
              className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full border border-coral text-coral hover:bg-coral hover:text-white transition-all duration-300 group"
            >
              <span>Get in Touch</span>
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden text-white hover:text-coral p-2 focus:outline-none focus:ring-1 focus:ring-coral rounded"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-30 bg-[#07080D]/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 transition-all duration-500 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-widest text-text-muted">Navigation</p>
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-display text-4xl text-white hover:text-coral transition-colors flex items-center justify-between"
              style={{
                transitionDelay: `${idx * 50}ms`,
              }}
            >
              <span>{link.label}</span>
              <span className="text-xs font-mono text-text-muted">0{idx + 1}</span>
            </a>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-text-muted">Connect</span>
            <div className="flex items-center gap-5 text-white">
              <a
                href={portfolioConfig.personal.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-[#1877F2]"
              >
                <Facebook size={22} />
              </a>
              <a
                href={portfolioConfig.personal.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-coral"
              >
                <Instagram size={22} />
              </a>
              <a
                href={portfolioConfig.personal.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-coral"
              >
                <Youtube size={22} />
              </a>
              <a
                href={portfolioConfig.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-coral"
              >
                <Github size={22} />
              </a>
              <a
                href={portfolioConfig.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-coral"
              >
                <Linkedin size={22} />
              </a>
            </div>
          </div>
          <p className="text-xs text-text-muted">
            {portfolioConfig.personal.location}
          </p>
        </div>
      </div>
    </>
  );
};

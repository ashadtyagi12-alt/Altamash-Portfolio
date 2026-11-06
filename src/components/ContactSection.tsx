import React, { useState } from 'react';
import { portfolioConfig } from '../config/portfolio.config';
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  Github,
  Linkedin,
  ArrowUpRight,
  Send,
  CheckCircle2,
  AlertCircle,
  Play,
  Copy,
  Check,
} from 'lucide-react';

interface ContactSectionProps {
  onOpenShowreel: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenShowreel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Website Development',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(portfolioConfig.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const getEmailHref = () => {
    const email = portfolioConfig.personal.email;
    const subject = encodeURIComponent('Project Inquiry - Altamash');
    const body = encodeURIComponent(
      'Hi Altamash,\n\nI came across your portfolio and would like to discuss a project with you.\n\nProject details:\n'
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
  };

  const projectTypes = [
    'Website Development',
    'Python Automation',
    'FastAPI / REST APIs',
    'Backend Web Development',
    'AI Ads / Videos',
    'Other / Advisory',
  ];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your name or business (min 2 letters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please share a brief note about your project (min 10 chars).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Simulate real asynchronous submission network request
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Success feedback
      setSubmitSuccess(true);
    } catch {
      setErrorMessage('Something went wrong during submission. Please use WhatsApp or Direct Email below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hi Altamash, my name is ${formData.name || 'there'}. I'm interested in ${formData.projectType}. ${formData.message}`
    );
    window.open(`https://wa.me/${portfolioConfig.personal.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section
      id="contact-section"
      className="relative py-28 md:py-36 bg-[#07080D] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-bold tracking-widest text-coral uppercase">
            07 / INITIATE CONTACT
          </span>
          <span className="w-12 h-[1px] bg-coral/40" />
        </div>

        {/* Giant White Heading with Red Full Stop */}
        <div className="max-w-4xl mb-14">
          <h2
            data-build-id="contact-headline"
            data-build-type="heading"
            data-build-label="Contact Headline"
            className="font-display text-4xl sm:text-6xl md:text-8xl leading-[0.92] tracking-tight uppercase mb-6"
          >
            <span className="text-white">LET'S CREATE SOMETHING GREAT</span>
            <span className="text-coral">.</span>
          </h2>
          <p
            data-build-id="contact-desc"
            data-build-type="paragraph"
            data-build-label="Contact Intro"
            className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl"
          >
            Have a project in mind, an upcoming product launch, or a need for high-end website development and scalable Python backends? Send a message below or connect directly across my active channels.
          </p>
        </div>

        {/* Main Grid: Form (Col 1 & 2) and Interactive Finale Card (Col 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start mb-20">
          {/* Left Column (7 cols): Functional Contact Form */}
          <div
            data-build-id="contact-form-container"
            data-build-type="form-input"
            data-build-label="Direct Inquiry Form"
            data-canvas-target="contact-form"
            data-canvas-name="Inquiry Contact Form"
            className="lg:col-span-7 bg-[#0B0E18] p-7 sm:p-10 rounded-3xl border border-white/5 shadow-2xl"
          >
            {submitSuccess ? (
              <div className="py-8 flex flex-col items-center text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display text-3xl text-white uppercase mb-2">
                  MESSAGE READY TO TRANSMIT
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary max-w-md mb-6 leading-relaxed">
                  Thank you for reaching out, <span className="text-white font-semibold">{formData.name}</span>! Your inquiry has been logged. You can also send this directly via WhatsApp with one click:
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg"
                  >
                    <Phone size={15} />
                    <span>Send via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        projectType: 'Website Development',
                        message: '',
                      });
                    }}
                    className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-wider transition-colors"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="form-name"
                      className="block text-xs uppercase tracking-widest font-mono text-text-muted mb-2 font-semibold"
                    >
                      Your Name / Entity *
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#121624] border border-white/10 focus:border-coral focus:outline-none text-sm text-white placeholder-white/20 transition-colors"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-coral mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="form-email"
                      className="block text-xs uppercase tracking-widest font-mono text-text-muted mb-2 font-semibold"
                    >
                      Email Address *
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#121624] border border-white/10 focus:border-coral focus:outline-none text-sm text-white placeholder-white/20 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-coral mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Project Type Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-widest font-mono text-text-muted mb-2 font-semibold">
                    Project Domain
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 ${
                          formData.projectType === type
                            ? 'bg-coral text-white shadow-[0_0_15px_rgba(255,59,71,0.4)]'
                            : 'bg-[#121624] text-text-secondary hover:text-white border border-white/5'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="form-message"
                    className="block text-xs uppercase tracking-widest font-mono text-text-muted mb-2 font-semibold"
                  >
                    Project Details &amp; Goals *
                  </label>
                  <textarea
                    id="form-message"
                    rows={4}
                    placeholder="Tell me about your goals, timeline, and vision..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#121624] border border-white/10 focus:border-coral focus:outline-none text-sm text-white placeholder-white/20 transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-coral mt-1.5 flex items-center gap-1">
                      <AlertCircle size={12} />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {errorMessage && (
                  <p className="text-xs text-coral bg-coral/10 p-3 rounded-lg border border-coral/20">
                    {errorMessage}
                  </p>
                )}

                {/* Submit Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-coral hover:bg-coral-hover text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_25px_rgba(255,59,71,0.4)] hover:shadow-[0_0_35px_rgba(255,59,71,0.65)] hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>

                  <span className="text-[11px] font-mono text-text-muted">
                    Response typically in &lt; 24h
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Right Column (5 cols): Finale Orbiting Card & Direct Channels */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Finale Target Card: MAKE IT FEEL REAL (The cursor particles assemble and orbit around this!) */}
            <div
              id="contact-interactive-card"
              data-build-id="contact-interactive-card"
              data-build-type="final-card"
              data-build-label="Interactive Finale Card"
              data-canvas-target="contact-interactive-card"
              data-canvas-name="Interactive Finale Card"
              onClick={onOpenShowreel}
              className="relative bg-gradient-to-br from-[#121626] to-[#0A0D15] p-8 sm:p-10 rounded-3xl border border-coral/40 shadow-[0_0_40px_rgba(255,59,71,0.2)] group cursor-pointer overflow-hidden transition-all duration-500 hover:border-coral"
            >
              {/* Subtle background glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-coral/20 filter blur-3xl pointer-events-none" />

              {/* Top status */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-[11px] font-mono tracking-widest text-coral uppercase font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-coral animate-ping" />
                  <span>INTERACTIVE FINALE</span>
                </span>
                <span className="font-display text-lg text-white">ALTAMASH.</span>
              </div>

              {/* Big Text */}
              <h3 className="font-display text-4xl sm:text-5xl leading-[0.95] tracking-tight uppercase mb-6">
                <span className="text-white block">MAKE IT</span>
                <span className="text-coral block">FEEL REAL.</span>
              </h3>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-8">
                The interactive cursor fleet converges toward this card. Click to launch the full-screen platform demo and inspect the engineering in action.
              </p>

              {/* Round Red Play Button */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-coral flex items-center justify-center text-white shadow-[0_0_25px_rgba(255,59,71,0.6)] group-hover:scale-115 transition-transform duration-300">
                  <Play size={20} className="fill-white ml-0.5" />
                </div>
                <div>
                  <span className="font-display text-lg text-white uppercase block group-hover:text-coral transition-colors">
                    WATCH PLATFORM DEMO
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    Interactive Web &amp; Python Architecture
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Channels List with Icons */}
            <div className="bg-[#0B0E18] p-6 rounded-3xl border border-white/5 flex flex-col divide-y divide-white/5">
              {/* Email */}
              <a
                href={getEmailHref()}
                target="_blank"
                rel="noopener noreferrer"
                title="Click to compose email in Gmail"
                className="py-3.5 flex items-center justify-between group text-text-secondary hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-coral group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-xs text-text-muted font-mono block">EMAIL</span>
                    <span className="text-xs sm:text-sm text-white font-medium">
                      {portfolioConfig.personal.email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Copy Email Address"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors text-[11px] font-mono flex items-center gap-1"
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span className="text-[10px] text-emerald-400 font-sans">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span className="hidden sm:inline text-[10px] font-sans">Copy</span>
                      </>
                    )}
                  </button>
                  <ArrowUpRight size={15} className="group-hover:text-coral group-hover:translate-x-0.5 transition-all" />
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${portfolioConfig.personal.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 flex items-center justify-between group text-text-secondary hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-xs text-text-muted font-mono block">WHATSAPP</span>
                    <span className="text-xs sm:text-sm text-white font-medium">
                      {portfolioConfig.personal.whatsappFormatted}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={15} className="group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* Facebook */}
              <a
                href={portfolioConfig.personal.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 flex items-center justify-between group text-text-secondary hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-[#1877F2] group-hover:text-white transition-colors">
                    <Facebook size={16} />
                  </div>
                  <div>
                    <span className="text-xs text-text-muted font-mono block">FACEBOOK</span>
                    <span className="text-xs sm:text-sm text-white font-medium">
                      developer_altamash
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={15} className="group-hover:text-[#1877F2] group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* Instagram */}
              <a
                href={portfolioConfig.personal.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 flex items-center justify-between group text-text-secondary hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-coral group-hover:text-white transition-colors">
                    <Instagram size={16} />
                  </div>
                  <div>
                    <span className="text-xs text-text-muted font-mono block">INSTAGRAM</span>
                    <span className="text-xs sm:text-sm text-white font-medium">
                      {portfolioConfig.personal.handle}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={15} className="group-hover:text-coral group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* YouTube */}
              <a
                href={portfolioConfig.personal.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 flex items-center justify-between group text-text-secondary hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-coral group-hover:text-white transition-colors">
                    <Youtube size={16} />
                  </div>
                  <div>
                    <span className="text-xs text-text-muted font-mono block">YOUTUBE</span>
                    <span className="text-xs sm:text-sm text-white font-medium">
                      {portfolioConfig.personal.handle}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={15} className="group-hover:text-coral group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* GitHub */}
              <a
                href={portfolioConfig.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 flex items-center justify-between group text-text-secondary hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-coral group-hover:text-white transition-colors">
                    <Github size={16} />
                  </div>
                  <div>
                    <span className="text-xs text-text-muted font-mono block">GITHUB</span>
                    <span className="text-xs sm:text-sm text-white font-medium">
                      github.com/{portfolioConfig.personal.githubUsername}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={15} className="group-hover:text-coral group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* LinkedIn */}
              <a
                href={portfolioConfig.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 flex items-center justify-between group text-text-secondary hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                    <Linkedin size={16} />
                  </div>
                  <div>
                    <span className="text-xs text-text-muted font-mono block">LINKEDIN</span>
                    <span className="text-xs sm:text-sm text-white font-medium">
                      linkedin.com/in/altamash-choudhary
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={15} className="group-hover:text-[#0A66C2] group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

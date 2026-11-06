import React, { useEffect } from 'react';
import { ProjectItem } from '../types/portfolio';
import { X, ExternalLink, Github, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#0C0F18] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-coral text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header Tags */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="font-mono text-xs text-coral font-bold tracking-widest uppercase">
            {project.number} / {project.categoryLabel}
          </span>
          <span className="text-white/20">•</span>
          <span className="text-xs text-text-muted font-mono">{project.year}</span>
          {project.isSample && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-coral/15 text-coral border border-coral/30">
              Sample Project
            </span>
          )}
        </div>

        {/* Title */}
        <h3 id="modal-project-title" className="font-display text-3xl sm:text-5xl text-white mb-6 uppercase">
          {project.title}
        </h3>

        {/* Media Preview Video Box */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 mb-8 bg-[#07080D]">
          {project.videoPreview ? (
            <video
              src={project.videoPreview}
              controls
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
          )}
        </div>

        {/* Narrative & Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-text-muted mb-2 font-semibold">
              Project Overview
            </h4>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
              {project.fullDescription}
            </p>

            <h4 className="text-xs uppercase tracking-widest text-text-muted mb-2 font-semibold">
              Technical Stack &amp; Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-white/90"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#121624] p-5 rounded-xl border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-coral text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles size={14} />
                <span>Impact Metric</span>
              </div>
              <p className="font-display text-xl text-white mb-4">
                {project.metrics || 'High Performance'}
              </p>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Production Standard</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-col gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-coral hover:bg-coral-hover text-white text-xs uppercase font-semibold tracking-wider transition-colors"
                >
                  <span>Explore Live</span>
                  <ExternalLink size={14} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs uppercase font-semibold tracking-wider transition-colors"
                >
                  <Github size={14} />
                  <span>GitHub Source</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

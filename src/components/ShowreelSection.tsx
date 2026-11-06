import React, { useRef, useState, useCallback } from 'react';
import { portfolioConfig } from '../config/portfolio.config';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { useRegisterBuildItem } from '../hooks/useRegisterBuildItem';

interface ShowreelSectionProps {
  onOpenShowreel: () => void;
}

export const ShowreelSection: React.FC<ShowreelSectionProps> = ({ onOpenShowreel }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Play video automatically as soon as the cursor finishes building the frame
  const handleBuilt = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, []);

  const registerShowreelFrame = useRegisterBuildItem<HTMLDivElement>(
    'showreel-viewport',
    'media-frame',
    'Interactive Platform Demo Player',
    handleBuilt,
    10 // high priority
  );

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <section
      id="showreel"
      className="relative py-24 md:py-32 bg-[#07080D] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label: 01 / SHOWREEL */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-bold tracking-widest text-coral uppercase">
            01 / INTERACTIVE PLATFORM DEMO
          </span>
          <span className="w-12 h-[1px] bg-coral/40" />
        </div>

        {/* 2-Line Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2
              data-build-id="showreel-headline"
              data-build-type="heading"
              data-build-label="Engineering That Performs"
              className="font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight uppercase"
            >
              <span className="text-white block">ENGINEERING THAT</span>
              <span className="text-coral block">PERFORMS.</span>
            </h2>
          </div>
          <p
            data-build-id="showreel-desc"
            data-build-type="paragraph"
            data-build-label="Platform Demo Description"
            className="text-xs sm:text-sm text-text-secondary max-w-md font-sans"
          >
            A live visual demonstration showcasing production web architectures, responsive frontend systems, and high-concurrency Python backends engineered for speed and scale.
          </p>
        </div>

        {/* Top Blueprint Alignment Spec */}
        <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400/80 mb-3 px-2 select-none">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>[STAGE_SPEC: 01_INTERACTIVE_DEMO • PRODUCTION_WEB_VIEWPORT]</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-coral px-2.5 py-0.5 rounded bg-coral/10 border border-coral/30">
            AUTO-SNAPPED
          </span>
        </div>

        {/* Big Cinematic Auto-Playing Showreel Container */}
        <div
          ref={registerShowreelFrame}
          onClick={togglePlay}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-visible border-2 border-white/10 hover:border-coral/60 group cursor-pointer shadow-[0_20px_80px_rgba(0,0,0,0.9)] transition-all duration-500 bg-[#0A0D17]"
        >
          {/* Inner overflow container for video & overlays */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            {/* Real Looping Video Element */}
            <video
              ref={videoRef}
              src={portfolioConfig.media.showreelVideo}
              poster={portfolioConfig.media.showreelPoster}
              autoPlay
              muted
              loop
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Subtle dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Big Center Play/Pause Indicator (Shown when paused or hovered) */}
            <div
              className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
                !isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:opacity-60'
              }`}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-coral/90 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_50px_rgba(255,59,71,0.8)] border border-white/20">
                {isPlaying ? (
                  <Pause size={32} className="fill-white" />
                ) : (
                  <Play size={32} className="fill-white ml-1.5" />
                )}
              </div>
            </div>

            {/* Custom Bottom Controls Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-3 z-20 pointer-events-auto"
            >
              {/* Progress Bar Scrubber */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  if (videoRef.current && duration > 0) {
                    videoRef.current.currentTime = pos * duration;
                  }
                }}
                className="w-full h-1.5 hover:h-2.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden transition-all group/scrubber"
              >
                <div
                  className="h-full bg-coral transition-all duration-75 relative rounded-full"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/scrubber:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-white text-xs font-mono">
                {/* Left: Play/Pause + Time + Live Indicator */}
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="p-1.5 hover:text-coral transition-colors rounded-full hover:bg-white/10"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-bold tracking-wider text-emerald-400 hidden sm:inline">
                      LIVE
                    </span>
                    <span className="text-text-muted text-[11px]">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>

                {/* Right: Mute + Fullscreen + Launch Modal */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="p-1.5 hover:text-coral transition-colors rounded-full hover:bg-white/10"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label="Toggle Fullscreen"
                    className="p-1.5 hover:text-coral transition-colors rounded-full hover:bg-white/10 hidden sm:block"
                  >
                    <Maximize2 size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={onOpenShowreel}
                    className="px-3 py-1 rounded-full bg-white/10 hover:bg-coral text-white text-[11px] font-bold uppercase tracking-wider transition-colors ml-2"
                  >
                    Interactive View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

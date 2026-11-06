import React, { useRef, useState, useEffect } from 'react';
import { portfolioConfig } from '../config/portfolio.config';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoPlayerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoPlayerOverlay: React.FC<VideoPlayerOverlayProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasVideoError, setHasVideoError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm') {
        toggleMute();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Autoplay policy or video not found
          setIsPlaying(false);
        });
      }
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    onClose();
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    videoRef.current.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Platform Demo Player"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/95 backdrop-blur-xl animate-fade-in"
      onClick={handleClose}
    >
      <div
        ref={containerRef}
        className="relative max-w-5xl w-full aspect-video bg-[#07080D] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between z-30 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-coral animate-ping" />
            <span className="font-display text-sm tracking-widest text-white uppercase">
              ALTAMASH — INTERACTIVE PLATFORM DEMO
            </span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close showreel player"
            className="p-2.5 rounded-full bg-white/10 hover:bg-coral text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Element with Fallback Poster Loop */}
        <div className="relative w-full h-full flex items-center justify-center bg-[#07080D]">
          <video
            ref={videoRef}
            src={portfolioConfig.media.showreelVideo}
            poster={portfolioConfig.media.showreelPoster}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onError={() => setHasVideoError(true)}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Graceful Fallback if video file is not yet provided or still placeholder */}
          {hasVideoError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0A0D17]">
              <img
                src={portfolioConfig.media.showreelPoster}
                alt="Showreel Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-35"
              />
              <div className="relative z-10 max-w-md bg-[#07080D]/90 p-8 rounded-2xl border border-white/10">
                <span className="inline-block p-3 rounded-full bg-coral/20 text-coral mb-4">
                  <Play size={28} className="fill-coral ml-1" />
                </span>
                <h4 className="font-display text-2xl text-white mb-2 uppercase">
                  SHOWREEL PREVIEW READY
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed mb-4">
                  Place your actual video file at <code className="text-coral">public/media/showreel.mp4</code> to stream directly. The video player overlay is fully wired with custom play, mute, timeline scrubber and fullscreen controls.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Interactive Controller Active</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Custom Playback Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-30 flex flex-col gap-3">
          {/* Timeline Scrubber */}
          <div className="w-full flex items-center gap-3">
            <span className="text-[11px] font-mono text-white/70 min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress || 0}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-coral hover:h-2 transition-all"
            />
            <span className="text-[11px] font-mono text-white/70 min-w-[40px]">
              {formatTime(duration || 90)}
            </span>
          </div>

          {/* Buttons Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="p-2 rounded-full bg-coral text-white hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-white ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="text-white hover:text-coral transition-colors"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs uppercase font-mono tracking-widest text-text-muted hidden sm:inline-block">
                4K HDR • 60 FPS
              </span>
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="Fullscreen"
                className="text-white hover:text-coral transition-colors"
              >
                <Maximize size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

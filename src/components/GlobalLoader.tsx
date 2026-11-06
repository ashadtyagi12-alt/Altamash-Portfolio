import React, { useEffect, useState } from 'react';

interface GlobalLoaderProps {
  onComplete: () => void;
}

export const GlobalLoader: React.FC<GlobalLoaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [lettersVisible, setLettersVisible] = useState(0);
  const [isWiping, setIsWiping] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const word = "ALTAMASH";

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      setIsDone(true);
      return;
    }

    // Counter from 0 to 100 over ~1.8 seconds
    const duration = 1800;
    const intervalTime = 18;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setCount(progress);

      // Stagger letters based on counter progress (20% to 85%)
      if (progress >= 20) {
        const letterProgress = (progress - 20) / 65;
        const visibleCount = Math.min(word.length, Math.floor(letterProgress * word.length) + 1);
        setLettersVisible(visibleCount);
      }

      if (progress >= 100) {
        clearInterval(timer);
        // Start screen wipe
        setTimeout(() => {
          setIsWiping(true);
          setTimeout(() => {
            setIsDone(true);
            onComplete();
          }, 850);
        }, 200);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-14 bg-[#07080D] text-white transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isWiping ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Header in Loader */}
      <div className="flex justify-between items-center text-xs tracking-widest uppercase text-text-secondary font-mono">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-coral animate-ping" />
          <span>INITIALIZING DIGITAL EXPERIENCE</span>
        </div>
        <span>PILKHUWA, IN</span>
      </div>

      {/* Center Reveal */}
      <div className="flex flex-col items-center justify-center my-auto">
        {/* Letters staggered reveal */}
        <div className="overflow-hidden mb-6">
          <h1 className="font-display text-5xl sm:text-7xl md:text-9xl tracking-widest flex items-center select-none">
            {word.split('').map((char, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-300 transform ${
                  index < lettersVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-16 opacity-0'
                }`}
              >
                {char}
              </span>
            ))}
            <span className="text-coral">.</span>
          </h1>
        </div>

        {/* Thin Drawing Line */}
        <div className="w-64 sm:w-80 md:w-96 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
          <div
            className="absolute left-0 top-0 bottom-0 bg-coral transition-all duration-100 ease-out"
            style={{
              width: `${count}%`,
              boxShadow: '0 0 12px #FF3B47',
            }}
          />
        </div>
      </div>

      {/* Bottom Counter & Status */}
      <div className="flex justify-between items-end">
        <div className="text-xs uppercase tracking-widest text-text-muted">
          <span>PORTFOLIO SYSTEM</span>
          <p className="text-white/60">REACT 19 • GSAP • LENIS</p>
        </div>

        <div className="font-display text-4xl sm:text-6xl text-coral tracking-tight">
          {count.toString().padStart(3, '0')}
          <span className="text-xl sm:text-2xl text-white/50 font-sans ml-1">%</span>
        </div>
      </div>
    </div>
  );
};

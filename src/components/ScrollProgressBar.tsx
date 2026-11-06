import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentScroll = window.scrollY;
      const percentage = (currentScroll / totalScroll) * 100;
      setProgress(percentage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 bottom-0 w-[2px] z-50 pointer-events-none bg-white/5"
      aria-hidden="true"
    >
      <div
        className="w-full bg-coral transition-all duration-75 ease-out"
        style={{
          height: `${progress}%`,
          boxShadow: '0 0 10px #FF3B47',
        }}
      />
    </div>
  );
};

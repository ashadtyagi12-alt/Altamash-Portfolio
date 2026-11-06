import React, { useEffect, useState } from 'react';

interface BlueprintOverlayProps {
  active: boolean;
}

export const BlueprintOverlay: React.FC<BlueprintOverlayProps> = ({ active }) => {
  const [, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden font-mono text-[9px] text-cyan-400/50">
      {/* Top Subtle Ruler Track */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-[#07090F]/70 border-b border-white/5 flex items-center px-6 overflow-hidden">
        <div className="flex items-center gap-12 whitespace-nowrap opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="flex items-baseline gap-1">
              <span className="h-1.5 w-[1px] bg-cyan-400" />
              <span>{i * 100}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Left Subtle Ruler Track */}
      <div className="absolute top-3 left-0 bottom-0 w-3 bg-[#07090F]/70 border-r border-white/5 flex flex-col py-6 overflow-hidden items-center">
        <div className="flex flex-col gap-12 opacity-40">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="w-1.5 h-[1px] bg-cyan-400" />
              <span className="text-[6px] rotate-90 mt-1">{i * 100}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

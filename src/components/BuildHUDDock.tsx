import React from 'react';
import { RotateCcw, Volume2, VolumeX, FastForward, CheckCircle2, X } from 'lucide-react';
import { useBuildSystem } from '../context/BuildSystemContext';

export const BuildHUDDock: React.FC = () => {
  const {
    activeAgentCount,
    builtCount,
    totalCount,
    replayBuild,
    skipBuild,
    speedMultiplier,
    setSpeedMultiplier,
    isCompleted,
    elapsedTime,
    isDismissed,
    setIsDismissed,
    isMuted,
    toggleMute,
  } = useBuildSystem();

  if (isDismissed) {
    return (
      <button
        onClick={() => setIsDismissed(false)}
        title="Open Swarm Rebuild HUD"
        className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-[#0A0D18]/90 hover:bg-[#141A2E] text-coral border border-white/10 shadow-lg backdrop-blur-md transition-all active:scale-95"
      >
        <RotateCcw size={16} />
      </button>
    );
  }

  const percentage = totalCount > 0 ? Math.round((builtCount / totalCount) * 100) : 0;

  return (
    <aside
      aria-label="Swarm Rebuild status"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[94%] sm:w-auto px-4 py-2.5 rounded-full bg-[#0A0D18]/95 backdrop-blur-xl border border-white/10 shadow-[0_12px_45px_rgba(0,0,0,0.85)] flex items-center justify-between sm:justify-start gap-3 sm:gap-5 text-xs font-mono text-white select-none transition-all duration-300"
    >
      {/* 5 Overlapping Figma colored agent dots */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center -space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff2e2e] border border-[#0A0D18] shadow-[0_0_6px_#ff2e2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] border border-[#0A0D18] shadow-[0_0_6px_#38bdf8]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] border border-[#0A0D18] shadow-[0_0_6px_#34d399]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#a78bfa] border border-[#0A0D18] shadow-[0_0_6px_#a78bfa]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24] border border-[#0A0D18] shadow-[0_0_6px_#fbbf24]" />
        </div>
        <span className="text-[11px] text-text-secondary font-medium hidden xs:inline-block">
          <strong className="text-white font-bold">{isCompleted ? '26' : (activeAgentCount || 26)}</strong> agents
        </span>
      </div>

      <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

      {/* State Switch: Building vs Completed */}
      {isCompleted ? (
        <div className="flex items-center gap-2 text-emerald-400">
          <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
          <span className="text-white text-[11px] sm:text-xs">
            Rebuilt by <strong className="text-emerald-400">26 agents</strong> in{' '}
            <strong className="text-coral">{elapsedTime || '14.8'}s</strong>
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-text-primary text-[11px] sm:text-xs">
            <strong className="text-coral font-bold">{builtCount}</strong> / {totalCount || 36} Objects
          </span>
          <div className="w-12 sm:w-20 h-1.5 bg-white/10 rounded-full overflow-hidden relative hidden md:block">
            <div
              className="h-full bg-coral transition-all duration-200 ease-out shadow-[0_0_8px_#ff2e2e]"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-[10px] text-coral font-bold hidden sm:inline-block">
            {percentage}%
          </span>
        </div>
      )}

      <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

      {/* Control Actions */}
      <div className="flex items-center gap-2">
        {/* Speed toggle 1x / 2x */}
        {!isCompleted && (
          <button
            type="button"
            onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : 1))}
            title={`Build speed: ${speedMultiplier}x (click to switch)`}
            className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-[10px] font-bold text-text-secondary hover:text-white transition-colors"
          >
            {speedMultiplier}x
          </button>
        )}

        {/* Mute/Sound toggle */}
        <button
          type="button"
          onClick={toggleMute}
          title={isMuted ? 'Unmute procedural sound FX' : 'Mute sound FX'}
          className="p-1 rounded-md text-text-secondary hover:text-white hover:bg-white/10 transition-colors"
        >
          {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
        </button>

        {/* Skip button while building */}
        {!isCompleted && (
          <button
            type="button"
            onClick={skipBuild}
            title="Skip remaining build animations and reveal all elements"
            className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-text-primary hover:text-white text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-1 active:scale-95"
          >
            <FastForward size={10} />
            <span>Skip</span>
          </button>
        )}

        {/* Rebuild / REPLAY button */}
        <button
          type="button"
          onClick={replayBuild}
          title="Reset everything and rebuild page elements with cursor swarm"
          className="px-3.5 py-1 rounded-full bg-coral hover:bg-coral-hover text-white text-[10px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,46,46,0.45)] active:scale-95"
        >
          <RotateCcw size={11} />
          <span>{isCompleted ? 'Rebuild' : 'Replay'}</span>
        </button>

        {/* Dismiss button when completed */}
        {isCompleted && (
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            title="Dismiss HUD"
            className="p-1 rounded-full text-text-muted hover:text-white hover:bg-white/10 transition-colors ml-1"
          >
            <X size={12} />
          </button>
        )}
      </div>
    </aside>
  );
};

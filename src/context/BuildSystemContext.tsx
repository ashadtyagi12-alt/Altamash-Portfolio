import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { BuildItem, BuildItemType, BuildState, ChoreographyType } from '../types/buildSystem';
import { useLenis } from './LenisContext';
import { soundEngine } from '../utils/soundEngine';

interface BuildSystemContextValue {
  registerItem: (
    id: string,
    type: BuildItemType,
    label: string,
    element: HTMLElement,
    onBuilt?: () => void,
    priority?: number,
    choreography?: ChoreographyType,
    siblingIndex?: number
  ) => void;
  unregisterItem: (id: string) => void;
  getItem: (id: string) => BuildItem | undefined;
  getAllItems: () => BuildItem[];
  markItemState: (id: string, state: BuildState, agentId?: number | null, progress?: number) => void;
  builtCount: number;
  totalCount: number;
  activeAgentCount: number;
  setActiveAgentCount: (count: number) => void;
  replayBuild: () => void;
  skipBuild: () => void;
  replaySignal: number;
  isReducedMotion: boolean;
  speedMultiplier: number;
  setSpeedMultiplier: React.Dispatch<React.SetStateAction<number>>;
  isCompleted: boolean;
  elapsedTime: number;
  isDismissed: boolean;
  setIsDismissed: (dismissed: boolean) => void;
  isMuted: boolean;
  toggleMute: () => void;
  blueprintMode: boolean;
  toggleBlueprintMode: () => void;
}

const BuildSystemContext = createContext<BuildSystemContextValue | null>(null);

export const BuildSystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollTo } = useLenis();
  const itemsRef = useRef<Map<string, BuildItem>>(new Map());
  const [builtCount, setBuiltCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [activeAgentCount, setActiveAgentCount] = useState(0);
  const [replaySignal, setReplaySignal] = useState(0);
  const [blueprintMode, setBlueprintMode] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted());

  // Timing tracking
  const startTimeRef = useRef<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const updateCounts = useCallback(() => {
    let built = 0;
    const all = itemsRef.current;
    all.forEach((item) => {
      if (item.state === 'built') built++;
    });
    setBuiltCount(built);
    setTotalCount(all.size);

    if (all.size > 0 && built === all.size) {
      if (!isCompleted) {
        setIsCompleted(true);
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setElapsedTime(parseFloat(elapsed.toFixed(1)));
      }
    } else {
      setIsCompleted(false);
    }
  }, [isCompleted]);

  const registerItem = useCallback(
    (
      id: string,
      type: BuildItemType,
      label: string,
      element: HTMLElement,
      onBuilt?: () => void,
      priority = 0,
      choreography?: ChoreographyType,
      siblingIndex?: number
    ) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const pageTop = rect.top + window.scrollY;

      const existing = itemsRef.current.get(id);
      if (existing) {
        existing.element = element;
        existing.rect = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          pageTop,
        };
        existing.onBuilt = onBuilt;
        if (choreography) existing.choreography = choreography;
        if (siblingIndex !== undefined) existing.siblingIndex = siblingIndex;
        return;
      }

      // If reduced motion is requested, immediately reveal
      if (isReducedMotion) {
        element.style.clipPath = 'none';
        element.style.opacity = '1';
        element.style.transform = 'none';
        itemsRef.current.set(id, {
          id,
          type,
          label,
          element,
          state: 'built',
          assignedAgentId: null,
          progress: 1,
          rect: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            pageTop,
          },
          choreography,
          siblingIndex,
          onBuilt,
          priority,
        });
        updateCounts();
        return;
      }

      // Hide visually while keeping in DOM for layout measurement & accessibility
      if (type === 'heading' || type === 'paragraph' || type === 'button' || type === 'tool-chip' || type === 'repo-row') {
        element.style.clipPath = 'inset(0% 100% 0% 0%)';
      } else {
        element.style.clipPath = 'inset(0% 100% 100% 0% round 1rem)';
      }
      element.style.opacity = '0';
      element.style.willChange = 'clip-path, transform, opacity';

      itemsRef.current.set(id, {
        id,
        type,
        label,
        element,
        state: 'pending',
        assignedAgentId: null,
        progress: 0,
        rect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          pageTop,
        },
        choreography,
        siblingIndex,
        onBuilt,
        priority,
      });

      updateCounts();
    },
    [isReducedMotion, updateCounts]
  );

  const unregisterItem = useCallback(
    (id: string) => {
      itemsRef.current.delete(id);
      updateCounts();
    },
    [updateCounts]
  );

  const getItem = useCallback((id: string) => {
    return itemsRef.current.get(id);
  }, []);

  const getAllItems = useCallback(() => {
    return Array.from(itemsRef.current.values());
  }, []);

  const markItemState = useCallback(
    (id: string, state: BuildState, agentId: number | null = null, progress = 0) => {
      const item = itemsRef.current.get(id);
      if (!item) return;

      item.state = state;
      if (agentId !== undefined) item.assignedAgentId = agentId;
      item.progress = progress;

      if (state === 'building') {
        item.element.style.opacity = '1';
      }

      if (state === 'built') {
        item.element.style.clipPath = 'none';
        item.element.style.opacity = '1';
        item.element.style.transform = 'none';
        if (item.onBuilt) {
          try {
            item.onBuilt();
          } catch {
            // Safe fallback
          }
        }
        updateCounts();
      }
    },
    [updateCounts]
  );

  const skipBuild = useCallback(() => {
    itemsRef.current.forEach((item) => {
      item.state = 'built';
      item.progress = 1;
      item.element.style.clipPath = 'none';
      item.element.style.opacity = '1';
      item.element.style.transform = 'none';
      if (item.onBuilt) {
        try {
          item.onBuilt();
        } catch {}
      }
    });
    updateCounts();
    setIsCompleted(true);
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    setElapsedTime(parseFloat(elapsed.toFixed(1)));
  }, [updateCounts]);

  const replayBuild = useCallback(() => {
    startTimeRef.current = Date.now();
    setIsCompleted(false);
    setIsDismissed(false);

    // Reset all registered elements to unbuilt state
    itemsRef.current.forEach((item) => {
      item.state = 'pending';
      item.assignedAgentId = null;
      item.progress = 0;
      if (
        item.type === 'heading' ||
        item.type === 'paragraph' ||
        item.type === 'button' ||
        item.type === 'tool-chip' ||
        item.type === 'repo-row'
      ) {
        item.element.style.clipPath = 'inset(0% 100% 0% 0%)';
      } else {
        item.element.style.clipPath = 'inset(0% 100% 100% 0% round 1rem)';
      }
      item.element.style.opacity = '0';
    });

    setBuiltCount(0);
    setReplaySignal((prev) => prev + 1);

    // Scroll to top
    try {
      scrollTo(0, { duration: 1.2 });
    } catch {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollTo]);

  const toggleMute = useCallback(() => {
    const next = soundEngine.toggleMute();
    setIsMuted(next);
  }, []);

  const toggleBlueprintMode = useCallback(() => {
    setBlueprintMode((prev) => !prev);
  }, []);

  return (
    <BuildSystemContext.Provider
      value={{
        registerItem,
        unregisterItem,
        getItem,
        getAllItems,
        markItemState,
        builtCount,
        totalCount,
        activeAgentCount,
        setActiveAgentCount,
        replayBuild,
        skipBuild,
        replaySignal,
        isReducedMotion,
        speedMultiplier,
        setSpeedMultiplier,
        isCompleted,
        elapsedTime,
        isDismissed,
        setIsDismissed,
        isMuted,
        toggleMute,
        blueprintMode,
        toggleBlueprintMode,
      }}
    >
      {children}
    </BuildSystemContext.Provider>
  );
};

export const useBuildSystem = (): BuildSystemContextValue => {
  const ctx = useContext(BuildSystemContext);
  if (!ctx) {
    throw new Error('useBuildSystem must be used within a BuildSystemProvider');
  }
  return ctx;
};

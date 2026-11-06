export type BuildItemType =
  | 'heading'
  | 'paragraph'
  | 'button'
  | 'project-card'
  | 'media-frame'
  | 'tool-chip'
  | 'timeline'
  | 'repo-row'
  | 'form-input'
  | 'final-card';

export type BuildState = 'pending' | 'assigned' | 'building' | 'built';

export type ChoreographyType = 'rect' | 'media' | 'text' | 'guides' | 'duplicates' | 'lines';

export type CursorToolType = 'arrow' | 'crosshair' | 'ibeam' | 'pen' | 'duplicate';

export interface BuildItem {
  id: string;
  type: BuildItemType;
  label: string;
  element: HTMLElement;
  state: BuildState;
  assignedAgentId: number | null;
  progress: number;
  rect: {
    top: number;
    left: number;
    width: number;
    height: number;
    pageTop: number;
  };
  choreography?: ChoreographyType;
  siblingIndex?: number;
  onBuilt?: () => void;
  priority?: number;
}

export type AgentState = 'idle' | 'assigned' | 'traveling' | 'building' | 'committing';

export interface Agent {
  id: number;
  name: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  state: AgentState;
  targetItemId: string | null;
  buildProgress: number; // 0 to 1
  buildDuration: number; // in ms
  buildStartTime: number;
  tagText: string;
  toolType: CursorToolType;
  choreography: ChoreographyType;
  idleAngle: number;
  idleRadius: number;
  idleSpeed: number;
  commitTimer: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  life: number;
}

import React, { useEffect, useRef } from 'react';
import { useBuildSystem } from '../context/BuildSystemContext';
import { Agent, Particle, BuildItem, ChoreographyType } from '../types/buildSystem';
import { soundEngine } from '../utils/soundEngine';

const FIGMA_COLORS = [
  '#ff2e2e', // Hot Coral
  '#38bdf8', // Cyan / Sky
  '#34d399', // Emerald
  '#a78bfa', // Violet
  '#fbbf24', // Amber
  '#ffffff', // Crisp White
  '#f43f5e', // Rose
  '#06b6d4', // Teal
  '#818cf8', // Indigo
  '#f97316', // Orange
  '#4ade80', // Mint
  '#ec4899', // Pink
  '#e879f9', // Fuchsia
];

export const CursorAgentFleet: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {
    getAllItems,
    registerItem,
    markItemState,
    setActiveAgentCount,
    replaySignal,
    isReducedMotion,
    speedMultiplier,
    isCompleted,
  } = useBuildSystem();

  useEffect(() => {
    if (isReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const totalAgents = isMobile ? 8 : 26;

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    // Track real user cursor for Boids mouse-avoidance / flocking
    const userMouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      userMouse.x = e.clientX;
      userMouse.y = e.clientY;
      userMouse.active = true;
    };

    const handleMouseLeave = () => {
      userMouse.active = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollVelocity = (currentScroll - lastScrollY) * 0.5;
      lastScrollY = currentScroll;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize 26 agent fleet with Boids velocity
    const agents: Agent[] = [];
    for (let i = 0; i < totalAgents; i++) {
      const color = FIGMA_COLORS[i % FIGMA_COLORS.length];
      const startX = (i % 2 === 0 ? 50 : width - 50) + (Math.random() * 100 - 50);
      const startY = 80 + Math.random() * (height - 160);
      const numStr = String(i + 1).padStart(2, '0');

      agents.push({
        id: i + 1,
        name: `Agent ${numStr}`,
        color,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        targetX: startX,
        targetY: startY,
        startX,
        startY,
        state: 'idle',
        targetItemId: null,
        buildProgress: 0,
        buildDuration: 420,
        buildStartTime: 0,
        tagText: '',
        toolType: 'arrow',
        choreography: 'rect',
        idleAngle: Math.random() * Math.PI * 2,
        idleRadius: 40 + Math.random() * 80,
        idleSpeed: 0.015 + Math.random() * 0.015,
        commitTimer: 0,
      });
    }

    // Active particle bursts
    const particles: Particle[] = [];

    const spawnCommitParticles = (x: number, y: number, color: string) => {
      const count = isMobile ? 8 : 16;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = 1.5 + Math.random() * 3.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: 2 + Math.random() * 2.5,
          life: 0.85 + Math.random() * 0.3,
        });
      }
    };

    // Auto-discover DOM elements marked with [data-build-id]
    const autoDiscoverDOM = () => {
      const unassignedNodes = document.querySelectorAll<HTMLElement>('[data-build-id]');
      const items = getAllItems();
      const existingIds = new Set(items.map((it) => it.id));

      unassignedNodes.forEach((node) => {
        const id = node.getAttribute('data-build-id');
        if (!id || existingIds.has(id)) return;
        const type = (node.getAttribute('data-build-type') || 'project-card') as any;
        const label = node.getAttribute('data-build-label') || id;
        const choreo = node.getAttribute('data-build-choreo') as ChoreographyType | undefined;

        registerItem(id, type, label, node, undefined, 0, choreo);
      });
    };

    autoDiscoverDOM();

    // Rulers overlay sliding state
    let rulerAlpha = 0;

    // MAIN ANIMATION LOOP
    const loop = (currentTime: number) => {

      ctx.clearRect(0, 0, width, height);

      // Dampen scroll velocity
      scrollVelocity *= 0.91;

      // Speed Scaling
      const speedFactor = Math.min(4, Math.max(1, (1 + Math.abs(scrollVelocity) / 35) * speedMultiplier));

      // Max concurrent agents based on speed
      const maxConcurrent = Math.min(
        totalAgents,
        Math.max(isMobile ? 3 : 6, Math.round((isMobile ? 6 : 14) * speedFactor))
      );

      // Gather pending items
      const allItems = getAllItems();
      const pendingItems: BuildItem[] = [];

      for (let i = 0; i < allItems.length; i++) {
        const it = allItems[i];
        if (it.state === 'pending') {
          const r = it.element.getBoundingClientRect();
          it.rect = {
            top: r.top,
            left: r.left,
            width: r.width,
            height: r.height,
            pageTop: r.top + window.scrollY,
          };
          pendingItems.push(it);
        }
      }

      // Sort pending items: top-to-bottom on page, then left-to-right
      pendingItems.sort((a, b) => {
        const diffY = a.rect.pageTop - b.rect.pageTop;
        if (Math.abs(diffY) > 40) return diffY;
        return a.rect.left - b.rect.left;
      });

      // Lookahead window: from top of viewport (-200px) down to 1.6 screen heights
      const lookaheadBottom = height * 2.1;

      // Count active building agents
      let activeCount = 0;
      agents.forEach((ag) => {
        if (ag.state !== 'idle') activeCount++;
      });
      setActiveAgentCount(activeCount);

      // Find attraction target for idle finale: #contact-interactive-card
      const finaleCard = document.getElementById('contact-interactive-card');
      let finaleCenter: { x: number; y: number } | null = null;
      if (finaleCard) {
        const fr = finaleCard.getBoundingClientRect();
        if (fr.top < height && fr.bottom > 0) {
          finaleCenter = { x: fr.left + fr.width / 2, y: fr.top + fr.height / 2 };
        }
      }

      // 1. DISPATCH IDLE AGENTS
      for (let i = 0; i < agents.length; i++) {
        const agent = agents[i];
        if (agent.state !== 'idle') continue;
        if (activeCount >= maxConcurrent) break;

        const candidate = pendingItems.find((it) => {
          if (it.state !== 'pending') return false;
          return it.rect.top < lookaheadBottom && it.rect.top > -350;
        });

        if (candidate) {
          candidate.state = 'assigned';
          candidate.assignedAgentId = agent.id;
          markItemState(candidate.id, 'assigned', agent.id, 0);

          agent.state = 'traveling';
          agent.targetItemId = candidate.id;
          agent.startX = agent.x;
          agent.startY = agent.y;
          agent.targetX = candidate.rect.left;
          agent.targetY = candidate.rect.top;
          agent.buildProgress = 0;
          agent.tagText = `${agent.name} · ${candidate.label}`;

          // Assign Choreography & Tool type
          if (candidate.choreography) {
            agent.choreography = candidate.choreography;
          } else if (candidate.type === 'heading' || candidate.type === 'paragraph') {
            agent.choreography = 'text';
          } else if (candidate.type === 'timeline' || candidate.type === 'repo-row') {
            agent.choreography = 'lines';
          } else if (candidate.type === 'tool-chip') {
            agent.choreography = 'duplicates';
          } else {
            agent.choreography = 'rect';
          }

          if (agent.choreography === 'text') {
            agent.toolType = 'ibeam';
          } else if (agent.choreography === 'lines') {
            agent.toolType = 'pen';
          } else if (agent.choreography === 'duplicates') {
            agent.toolType = 'duplicate';
          } else {
            agent.toolType = 'crosshair';
          }

          // Compute duration scaled by speed factor
          let baseDuration = 450;
          if (agent.choreography === 'text') baseDuration = 380;
          else if (agent.choreography === 'duplicates') baseDuration = 340;
          else if (agent.choreography === 'lines') baseDuration = 320;
          else if (candidate.type === 'final-card') baseDuration = 550;

          // GUARANTEE: fast build if already on screen
          if (candidate.rect.top < height * 0.6 && candidate.rect.top > 0) {
            baseDuration = Math.min(baseDuration, 180);
          }

          agent.buildDuration = Math.max(100, Math.round(baseDuration / speedFactor));
          agent.buildStartTime = currentTime;

          // Play wireframe start click sound
          soundEngine.playClick(800 + (agent.id % 6) * 120);

          activeCount++;
        }
      }

      // 2. RULER GUIDES DRAWING
      if (activeCount > 0 && rulerAlpha < 0.8) {
        rulerAlpha = Math.min(0.8, rulerAlpha + 0.05);
      } else if (activeCount === 0 && rulerAlpha > 0) {
        rulerAlpha = Math.max(0, rulerAlpha - 0.03);
      }

      if (rulerAlpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = rulerAlpha * 0.4;
        ctx.fillStyle = '#0a0d18';
        // Top ruler bar (16px)
        ctx.fillRect(0, 0, width, 16);
        // Left ruler bar (16px)
        ctx.fillRect(0, 0, 16, height);

        // Ruler tick marks
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let rx = 20; rx < width; rx += 20) {
          const tickH = rx % 100 === 0 ? 10 : 5;
          ctx.moveTo(rx, 16 - tickH);
          ctx.lineTo(rx, 16);
        }
        for (let ry = 20; ry < height; ry += 20) {
          const tickW = ry % 100 === 0 ? 10 : 5;
          ctx.moveTo(16 - tickW, ry);
          ctx.lineTo(16, ry);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 3. UPDATE AGENTS & RENDER FIGMA CHOREOGRAPHY
      for (let i = 0; i < agents.length; i++) {
        const agent = agents[i];

        // --- IDLE STATE: BOIDS FLOCKING SIMULATION ---
        if (agent.state === 'idle') {
          agent.toolType = 'arrow';
          agent.tagText = '';

          // Boids parameters
          let steerX = 0;
          let steerY = 0;
          let neighborCount = 0;
          let avgVx = 0;
          let avgVy = 0;
          let centerX = 0;
          let centerY = 0;

          const perceptionRadius = 90;

          for (let j = 0; j < agents.length; j++) {
            if (i === j) continue;
            const other = agents[j];
            const dx = other.x - agent.x;
            const dy = other.y - agent.y;
            const dist = Math.hypot(dx, dy);

            if (dist < perceptionRadius && dist > 0) {
              neighborCount++;
              avgVx += other.vx;
              avgVy += other.vy;
              centerX += other.x;
              centerY += other.y;

              // Separation (steer away)
              if (dist < 40) {
                steerX -= (dx / dist) * (40 - dist) * 0.08;
                steerY -= (dy / dist) * (40 - dist) * 0.08;
              }
            }
          }

          if (neighborCount > 0) {
            // Alignment
            avgVx /= neighborCount;
            avgVy /= neighborCount;
            steerX += (avgVx - agent.vx) * 0.04;
            steerY += (avgVy - agent.vy) * 0.04;

            // Cohesion
            centerX /= neighborCount;
            centerY /= neighborCount;
            steerX += (centerX - agent.x) * 0.008;
            steerY += (centerY - agent.y) * 0.008;
          }

          // Mouse avoidance / Orbiting user's cursor
          if (userMouse.active) {
            const mdx = agent.x - userMouse.x;
            const mdy = agent.y - userMouse.y;
            const mdist = Math.hypot(mdx, mdy);
            if (mdist < 140 && mdist > 0) {
              // Smooth repulse & swirl
              steerX += (mdx / mdist) * 2.5;
              steerY += (mdy / mdist) * 2.5;
              // Swirl orbit
              steerX += (-mdy / mdist) * 1.2;
              steerY += (mdx / mdist) * 1.2;
            }
          }

          // Gravitation toward finale card if visible
          if (finaleCenter) {
            const fdx = finaleCenter.x - agent.x;
            const fdy = finaleCenter.y - agent.y;
            const fdist = Math.hypot(fdx, fdy);
            if (fdist > 80) {
              steerX += (fdx / fdist) * 0.8;
              steerY += (fdy / fdist) * 0.8;
            } else {
              // Orbit around card
              steerX += (-fdy / fdist) * 1.5;
              steerY += (fdx / fdist) * 1.5;
            }
          }

          // Edge boundaries repulsion
          const margin = 35;
          if (agent.x < margin) steerX += (margin - agent.x) * 0.05;
          if (agent.x > width - margin) steerX -= (agent.x - (width - margin)) * 0.05;
          if (agent.y < margin + 20) steerY += (margin + 20 - agent.y) * 0.05;
          if (agent.y > height - margin - 50) steerY -= (agent.y - (height - margin - 50)) * 0.05;

          // Apply steering to velocity
          agent.vx += steerX;
          agent.vy += steerY;

          // Limit max speed
          const maxSpeed = 2.4;
          const currentSpeed = Math.hypot(agent.vx, agent.vy);
          if (currentSpeed > maxSpeed) {
            agent.vx = (agent.vx / currentSpeed) * maxSpeed;
            agent.vy = (agent.vy / currentSpeed) * maxSpeed;
          }

          // Gentle drag/friction
          agent.vx *= 0.98;
          agent.vy *= 0.98;

          // Idle wandering wave
          agent.idleAngle += agent.idleSpeed;
          agent.x += agent.vx + Math.cos(agent.idleAngle) * 0.4;
          agent.y += agent.vy + Math.sin(agent.idleAngle) * 0.4;
        }

        // --- TRAVELING STATE ---
        else if (agent.state === 'traveling') {
          const item = agent.targetItemId ? allItems.find((it) => it.id === agent.targetItemId) : null;
          if (item) {
            const r = item.element.getBoundingClientRect();
            agent.targetX = r.left;
            agent.targetY = r.top;
          }

          // Smooth interpolation
          const travelSpeed = 0.28 * speedFactor;
          agent.x += (agent.targetX - agent.x) * travelSpeed;
          agent.y += (agent.targetY - agent.y) * travelSpeed;

          const dist = Math.hypot(agent.targetX - agent.x, agent.targetY - agent.y);
          if (dist < 12) {
            agent.x = agent.targetX;
            agent.y = agent.targetY;
            agent.state = 'building';
            agent.buildStartTime = currentTime;
            if (item) {
              markItemState(item.id, 'building', agent.id, 0);
              // Trigger ruler snap tick sound
              soundEngine.playSnapTick();
            }
          }
        }

        // --- BUILDING STATE ---
        else if (agent.state === 'building') {
          const item = agent.targetItemId ? allItems.find((it) => it.id === agent.targetItemId) : null;

          if (!item) {
            agent.state = 'idle';
            continue;
          }

          const r = item.element.getBoundingClientRect();
          const elapsed = currentTime - agent.buildStartTime;
          const progress = Math.min(1, elapsed / agent.buildDuration);
          agent.buildProgress = progress;

          // 1. RECT / MEDIA CHOREOGRAPHY: Crosshair drag + Wireframe box + WxH badge
          if (agent.choreography === 'rect' || agent.choreography === 'media') {
            agent.toolType = 'crosshair';
            const curW = Math.max(1, r.width * progress);
            const curH = Math.max(1, r.height * progress);

            agent.x = r.left + curW;
            agent.y = r.top + curH;

            // Draw Figma selection wireframe box
            ctx.save();
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(r.left, r.top, curW, curH);

            // Translucent fill
            ctx.fillStyle = 'rgba(59, 130, 246, 0.08)';
            ctx.fillRect(r.left, r.top, curW, curH);

            // 4 Corner resize handles
            const handleSize = 5;
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 1;

            const corners = [
              [r.left, r.top],
              [r.left + curW, r.top],
              [r.left, r.top + curH],
              [r.left + curW, r.top + curH],
            ];
            corners.forEach(([cx, cy]) => {
              ctx.fillRect(cx - handleSize / 2, cy - handleSize / 2, handleSize, handleSize);
              ctx.strokeRect(cx - handleSize / 2, cy - handleSize / 2, handleSize, handleSize);
            });

            // Live floating W × H dimension pill badge
            const badgeText = `${Math.round(curW)} × ${Math.round(curH)}`;
            ctx.font = '10px ui-monospace, monospace';
            const badgeW = ctx.measureText(badgeText).width + 12;
            const badgeX = r.left + curW + 8;
            const badgeY = r.top + curH + 4;

            ctx.fillStyle = '#3b82f6';
            ctx.beginPath();
            ctx.roundRect(badgeX, badgeY - 12, badgeW, 16, 4);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.fillText(badgeText, badgeX + 6, badgeY);
            ctx.restore();

            // Reveal real DOM item via top-to-bottom clip path
            const clipPct = Math.round((1 - progress) * 100);
            item.element.style.clipPath = `inset(0% 0% ${clipPct}% 0%)`;
            item.element.style.opacity = '1';
          }

          // 2. TEXT CHOREOGRAPHY: I-beam cursor + Blue text box + Typing click sound
          else if (agent.choreography === 'text') {
            agent.toolType = 'ibeam';
            const curW = Math.max(1, r.width * progress);
            agent.x = r.left + curW;
            agent.y = r.top + r.height / 2;

            // Draw thin blue text frame
            ctx.save();
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            ctx.strokeRect(r.left - 2, r.top - 2, curW + 4, r.height + 4);
            ctx.setLineDash([]);

            // Blinking caret vertical bar
            const showCaret = Math.floor(currentTime / 200) % 2 === 0;
            if (showCaret) {
              ctx.strokeStyle = '#38bdf8';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(agent.x + 2, r.top);
              ctx.lineTo(agent.x + 2, r.top + r.height);
              ctx.stroke();
            }
            ctx.restore();

            // Keyboard click audio
            if (Math.random() < 0.22) {
              soundEngine.playKeyClick();
            }

            // Reveal text with horizontal wipe
            const clipPct = Math.round((1 - progress) * 100);
            item.element.style.clipPath = `inset(0% ${clipPct}% 0% 0%)`;
            item.element.style.opacity = '1';
          }

          // 3. DUPLICATES CHOREOGRAPHY: Alt/Option duplicate + Red gap guide (24px)
          else if (agent.choreography === 'duplicates') {
            agent.toolType = 'duplicate';
            agent.x = r.left + r.width * progress;
            agent.y = r.top + r.height / 2;

            // Draw red Figma spacing line and distance badge
            ctx.save();
            ctx.strokeStyle = '#ff2e2e';
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 2]);

            // Red vertical spacing ruler line
            const midY = r.top + r.height / 2;
            ctx.beginPath();
            ctx.moveTo(r.left - 24, midY);
            ctx.lineTo(r.left, midY);
            ctx.stroke();

            // Gap badge
            ctx.fillStyle = '#ff2e2e';
            ctx.fillRect(r.left - 22, midY - 8, 20, 14);
            ctx.fillStyle = '#ffffff';
            ctx.font = '9px monospace';
            ctx.fillText('24', r.left - 18, midY + 2);
            ctx.restore();

            // Reveal
            const clipPct = Math.round((1 - progress) * 100);
            item.element.style.clipPath = `inset(0% ${clipPct}% 0% 0%)`;
            item.element.style.opacity = '1';
          }

          // 4. LINES / PEN CHOREOGRAPHY: Vector Pen Tool + Anchor nodes
          else if (agent.choreography === 'lines') {
            agent.toolType = 'pen';
            agent.x = r.left + r.width * progress;
            agent.y = r.top + r.height / 2;

            ctx.save();
            // Start square anchor node
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#ff2e2e';
            ctx.lineWidth = 1.5;
            ctx.fillRect(r.left - 3, r.top + r.height / 2 - 3, 6, 6);
            ctx.strokeRect(r.left - 3, r.top + r.height / 2 - 3, 6, 6);

            // Stretched rubber-band line
            ctx.strokeStyle = '#ff2e2e';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(r.left, r.top + r.height / 2);
            ctx.lineTo(agent.x, agent.y);
            ctx.stroke();

            // Current pen node
            ctx.fillRect(agent.x - 3, agent.y - 3, 6, 6);
            ctx.strokeRect(agent.x - 3, agent.y - 3, 6, 6);
            ctx.restore();

            const clipPct = Math.round((1 - progress) * 100);
            item.element.style.clipPath = `inset(0% ${clipPct}% 0% 0%)`;
            item.element.style.opacity = '1';
          }

          // Build finished -> Transition to COMMITTING
          if (progress >= 1) {
            agent.state = 'committing';
            agent.commitTimer = currentTime;
            agent.tagText = `${agent.name} · BUILT`;

            // Commit effects: audio chime stereo-panned to cursor X
            const normX = (agent.x / width) * 2 - 1;
            soundEngine.playChime(normX);

            // Particle burst at commit position
            spawnCommitParticles(agent.x, agent.y, agent.color);

            markItemState(item.id, 'built', agent.id, 1);
          }
        }

        // --- COMMITTING STATE ---
        else if (agent.state === 'committing') {
          const commitElapsed = currentTime - agent.commitTimer;
          // Hold "BUILT" pill for 220ms then return to idle
          if (commitElapsed > 220) {
            agent.state = 'idle';
            agent.targetItemId = null;
            agent.tagText = '';
            agent.toolType = 'arrow';
          }
        }

        // --- DRAW CURSOR AND TAG ---
        drawAgentCursor(ctx, agent, currentTime);
      }

      // 4. DRAW PARTICLES
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.alpha -= 0.035;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [
    isReducedMotion,
    getAllItems,
    registerItem,
    markItemState,
    setActiveAgentCount,
    replaySignal,
    speedMultiplier,
    isCompleted,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 w-full h-full"
    />
  );
};

// ============================================================================
// CUSTOM RED CEL-SHADED STICKER CURSOR (Simple, Non-Blinking, Compact Size)
// ============================================================================

function drawAgentCursor(
  ctx: CanvasRenderingContext2D,
  agent: Agent,
  _time: number
) {
  const { x, y, tagText, state } = agent;

  ctx.save();
  ctx.translate(x, y);

  // Compact size: scaled down to 72% for a sleek, non-bulky cursor
  const cursorScale = 0.72;
  ctx.scale(cursorScale, cursorScale);

  // 1. MAIN RED CEL-SHADED POINTER (Clean, solid red pointer with zero front arcs)
  drawRedCursorPointerShape(ctx, true);

  // 2. COMPACT AGENT PILL BADGE (Static, clear, neat)
  if (tagText || state === 'building' || state === 'committing' || state === 'traveling') {
    const label = tagText || agent.name;
    ctx.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const textWidth = ctx.measureText(label).width;
    const pillW = textWidth + 12;
    const pillH = 16;
    const pillX = 14;
    const pillY = 14;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 4;
    ctx.fillStyle = '#0f111a';
    ctx.strokeStyle = '#ff3b47';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 4);
    ctx.fill();
    ctx.stroke();

    // Red indicator dot
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ff3b47';
    ctx.beginPath();
    ctx.arc(pillX + 5.5, pillY + 8, 2, 0, Math.PI * 2);
    ctx.fill();

    // Label text
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, pillX + 11.5, pillY + 11.5);
    ctx.restore();
  }

  ctx.restore();
}

// Draw the exact cel-shaded red rounded arrow pointer
function drawRedCursorPointerShape(
  ctx: CanvasRenderingContext2D,
  drawGlossHighlights: boolean
) {
  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  // Subtle drop shadow for sticker depth
  ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 3;

  // 1. MAIN ARROW PATH (Exact geometry with rounded tips & concave notch)
  ctx.beginPath();
  // Rounded tip at (0, 0)
  ctx.moveTo(1.5, 0.5);
  // Slanted top edge down to right wing corner (24, 12)
  ctx.lineTo(24, 12);
  // Rounded right wing corner
  ctx.arcTo(26.5, 13.5, 25, 16.5, 2.8);
  // Scoop inward to concave notch at (13, 16)
  ctx.quadraticCurveTo(19, 14.5, 13, 16.5);
  // Notch down-left to bottom-left tail corner (4, 26)
  ctx.quadraticCurveTo(9.5, 20.5, 4.5, 26.5);
  // Rounded bottom-left tail corner
  ctx.arcTo(2.5, 28, 1.5, 25.5, 2.8);
  // Left edge straight back up to tip
  ctx.lineTo(0.5, 2);
  ctx.arcTo(0, 0, 2, 0, 2);
  ctx.closePath();

  // 2. VIBRANT RED CANDY GRADIENT FILL
  const redGrad = ctx.createLinearGradient(0, 0, 24, 26);
  redGrad.addColorStop(0, '#ff4757'); // bright candy coral-red
  redGrad.addColorStop(0.5, '#ff2e43');
  redGrad.addColorStop(1, '#dc2626'); // rich deep crimson

  ctx.fillStyle = redGrad;
  ctx.fill();

  // 3. BOLD DARK ESPRESSO OUTLINE
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.strokeStyle = '#1a060a'; // Dark espresso outline (as in reference image)
  ctx.lineWidth = 3.2;
  ctx.stroke();

  // 4. SPECULAR GLOSS HIGHLIGHTS (Pure white with rounded caps)
  if (drawGlossHighlights) {
    // Primary gloss shine curve along left edge
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(2.8, 3.8);
    ctx.lineTo(4.8, 18.5);
    ctx.stroke();

    // Secondary gloss shine pill dash along top edge
    ctx.beginPath();
    ctx.moveTo(13, 8);
    ctx.lineTo(19, 11);
    ctx.stroke();
  }

  ctx.restore();
}

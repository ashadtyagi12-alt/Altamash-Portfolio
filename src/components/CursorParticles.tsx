import React, { useEffect, useRef } from 'react';

interface AmbientAgent {
  id: number;
  name: string;
  color: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  actionTimer: number;
  role: 'ruler_guide' | 'laser_align' | 'spectator';
  laserTarget?: { x: number; y: number; label: string };
}

export const CursorParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const agentCount = isMobile ? 4 : 7;

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollVelocity = (currentScroll - lastScrollY) * 0.4;
      lastScrollY = currentScroll;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const agentConfigs = [
      { name: 'Agent #02 (Alex)', color: '#00E5FF', role: 'ruler_guide' as const },
      { name: 'Agent #05 (Maya)', color: '#FF3B47', role: 'laser_align' as const },
      { name: 'Agent #08 (Kai)', color: '#A855F7', role: 'ruler_guide' as const },
      { name: 'Agent #11 (Sara)', color: '#10B981', role: 'laser_align' as const },
      { name: 'Agent #14 (Leo)', color: '#F59E0B', role: 'spectator' as const },
      { name: 'Agent #18 (Elena)', color: '#38BDF8', role: 'laser_align' as const },
      { name: 'Agent #22 (Nina)', color: '#EC4899', role: 'spectator' as const },
    ];

    const agents: AmbientAgent[] = [];
    for (let i = 0; i < agentCount; i++) {
      const cfg = agentConfigs[i % agentConfigs.length];
      agents.push({
        id: i + 1,
        name: cfg.name,
        color: cfg.color,
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: Math.random() * (width - 160) + 80,
        targetY: Math.random() * (height - 160) + 80,
        speed: 0.025 + Math.random() * 0.02,
        actionTimer: Math.random() * 100,
        role: cfg.role,
      });
    }

    // Helper to draw Figma pointer
    const drawFigmaCursor = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      color: string,
      label: string,
      tag?: string
    ) => {
      context.save();
      context.translate(x, y);

      context.shadowColor = 'rgba(0, 0, 0, 0.7)';
      context.shadowBlur = 8;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 3;

      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(0, 16);
      context.lineTo(4.5, 12);
      context.lineTo(8.5, 19);
      context.lineTo(11.5, 17.5);
      context.lineTo(7.5, 10.5);
      context.lineTo(13, 10.5);
      context.closePath();

      context.fillStyle = color;
      context.fill();
      context.strokeStyle = '#FFFFFF';
      context.lineWidth = 1.2;
      context.stroke();

      context.shadowColor = 'transparent';

      if (!isMobile) {
        context.font = 'bold 9px monospace';
        const fullText = tag ? `${label} [${tag}]` : label;
        const textWidth = context.measureText(fullText).width;
        const paddingX = 5;
        const badgeX = 14;
        const badgeY = 12;

        context.fillStyle = color;
        context.beginPath();
        context.roundRect(badgeX, badgeY, textWidth + paddingX * 2, 16, 3);
        context.fill();

        context.fillStyle = '#000000';
        context.fillText(fullText, badgeX + paddingX, badgeY + 11);
      }

      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      scrollVelocity *= 0.92;

      agents.forEach((agent, idx) => {
        agent.actionTimer += 1;

        // Apply scroll momentum to agents so they fly towards scrolling content
        agent.y -= scrollVelocity * 0.4;

        // Wrap around screen bounds
        if (agent.x < -40) agent.x = width + 30;
        if (agent.x > width + 40) agent.x = -30;
        if (agent.y < -40) agent.y = height + 30;
        if (agent.y > height + 40) agent.y = -30;

        // Smooth glide towards target
        agent.x += (agent.targetX - agent.x) * agent.speed;
        agent.y += (agent.targetY - agent.y) * agent.speed;

        // New target destination periodically
        if (Math.hypot(agent.targetX - agent.x, agent.targetY - agent.y) < 25 || agent.actionTimer > 200) {
          agent.targetX = Math.random() * (width - 160) + 80;
          agent.targetY = Math.random() * (height - 160) + 80;
          agent.actionTimer = 0;
        }

        // Ambient design behavior: Draw laser alignment rulers between agents or across grid
        if (agent.role === 'laser_align' && !isMobile) {
          ctx.save();
          ctx.setLineDash([3, 4]);
          ctx.strokeStyle = `${agent.color}35`;
          ctx.lineWidth = 0.8;

          // Horizontal alignment ray
          ctx.beginPath();
          ctx.moveTo(agent.x - 90, agent.y);
          ctx.lineTo(agent.x + 90, agent.y);
          ctx.stroke();

          // Measurement chip
          ctx.fillStyle = agent.color;
          ctx.font = '8px monospace';
          ctx.fillText(`Y: ${Math.round(agent.y)}px`, agent.x + 10, agent.y - 6);

          ctx.restore();
        } else if (agent.role === 'ruler_guide' && idx < agents.length - 1 && !isMobile) {
          // Connect to next agent with a dynamic distance dimension line
          const next = agents[idx + 1];
          const dist = Math.hypot(next.x - agent.x, next.y - agent.y);
          if (dist > 80 && dist < 300) {
            ctx.save();
            ctx.setLineDash([2, 3]);
            ctx.strokeStyle = `${agent.color}25`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(agent.x, agent.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();

            // Distance chip at midpoint
            const midX = (agent.x + next.x) / 2;
            const midY = (agent.y + next.y) / 2;
            ctx.fillStyle = `${agent.color}90`;
            ctx.font = '8px monospace';
            ctx.fillText(`Δ: ${Math.round(dist)}px`, midX, midY - 4);
            ctx.restore();
          }
        }

        // Draw cursor pointer
        drawFigmaCursor(ctx, agent.x, agent.y, agent.color, agent.name, 'Grid Sync');
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
      aria-hidden="true"
    />
  );
};

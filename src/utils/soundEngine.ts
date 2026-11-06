// Web Audio API procedural sound synthesizer
// Zero external assets, 0-latency, stereo-panned sound effects

class ProceduralSoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private pentatonicNotes = [329.63, 369.99, 415.3, 493.88, 554.37, 659.25, 739.99, 830.61]; // E-Major pentatonic

  constructor() {
    // Check saved mute preference
    const saved = localStorage.getItem('swarm_sound_muted');
    if (saved !== null) {
      this.muted = saved === 'true';
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    localStorage.setItem('swarm_sound_muted', String(muted));
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  // Keyboard click/thock for I-beam text typing
  public playKeyClick() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pitch variation like mechanical keys
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180 + Math.random() * 80, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.03);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio fallback safe
    }
  }

  // UI Press / Wireframe start click
  public playClick(pitch = 1200) {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.025);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {}
  }

  // Snap tick for ruler guides
  public playSnapTick() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.015);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {}
  }

  // E-major pentatonic glass chime when an element commits, panned in stereo to cursor X position
  public playChime(xNorm: number = 0.5) {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const noteIdx = Math.floor(Math.random() * this.pentatonicNotes.length);
      const freq = this.pentatonicNotes[noteIdx];

      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(freq * 2, now); // 1 octave above for glass sparkle

      // Soft envelope
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

      // Stereo panning
      let destinationNode: AudioNode = this.ctx.destination;
      if (this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner();
        const panValue = Math.max(-1, Math.min(1, (xNorm - 0.5) * 2));
        panner.pan.setValueAtTime(panValue, now);
        panner.connect(this.ctx.destination);
        destinationNode = panner;
      }

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(destinationNode);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + 0.6);
      oscHarmonic.stop(now + 0.6);
    } catch {}
  }
}

export const soundEngine = new ProceduralSoundEngine();

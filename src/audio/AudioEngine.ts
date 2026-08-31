export class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private isPlaying = false;
  private isInitialized = false;

  async init(): Promise<boolean> {
    if (this.isInitialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      return true;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.isInitialized = true;
      return true;
    } catch (err) {
      console.warn('AudioContext initialization failed:', err);
      return false;
    }
  }

  startDrone() {
    if (!this.ctx || !this.masterGain || this.osc1 || this.osc2) return;

    try {
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 1.2);
      this.droneGain.connect(this.masterGain);

      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 note

      this.osc1.connect(this.droneGain);
      this.osc2.connect(this.droneGain);

      this.osc1.start();
      this.osc2.start();
      this.isPlaying = true;
    } catch (err) {
      console.warn('Failed to start ambient drone:', err);
    }
  }

  stopDrone() {
    if (!this.ctx || !this.droneGain) return;

    try {
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);

      setTimeout(() => {
        if (this.osc1) {
          try { this.osc1.stop(); this.osc1.disconnect(); } catch {}
          this.osc1 = null;
        }
        if (this.osc2) {
          try { this.osc2.stop(); this.osc2.disconnect(); } catch {}
          this.osc2 = null;
        }
        if (this.droneGain) {
          try { this.droneGain.disconnect(); } catch {}
          this.droneGain = null;
        }
      }, 500);

      this.isPlaying = false;
    } catch {}
  }

  playHoverTick() {
    if (!this.ctx || !this.masterGain || this.ctx.state !== 'running') return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  playClickSweep() {
    if (!this.ctx || !this.masterGain || this.ctx.state !== 'running') return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {}
  }

  playSubBass() {
    if (!this.ctx || !this.masterGain || this.ctx.state !== 'running') return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(45, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {}
  }

  async toggle(): Promise<boolean> {
    const initialized = await this.init();
    if (!initialized || !this.ctx) return false;

    if (this.isPlaying) {
      this.stopDrone();
      await this.ctx.suspend();
      return false;
    } else {
      await this.ctx.resume();
      this.startDrone();
      return true;
    }
  }

  dispose() {
    this.stopDrone();
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {}
      this.ctx = null;
      this.isInitialized = false;
    }
  }
}

export const audioEngine = new AudioEngine();

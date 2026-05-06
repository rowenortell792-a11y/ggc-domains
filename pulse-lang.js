// ==========================================
// pulse-lang.js — Gridlock Validation Kernel
// GGC V2 / PA Language Core
// ==========================================

const FREQUENCY_MAP = {
  1: 'RUMBLE', 2: 'PULSE', 3: 'SURGE', 4: 'WAVE',
  5: 'GRIDLOCK', 6: 'ZENITH', 7: 'GODHEAD'
};

const EVENT_FREQ_MAP = {
  'LINK_SHORTENED': 5, 'POST_CREATED': 4, 'PREMIUM_PURCHASED': 6,
  'GAME_WON': 5, 'REFUND_ISSUED': 2, 'USER_BANNED': 1,
  'COMMENT_REMOVED': 3, 'SUPPORT_GIVEN': 4
};

class PulseEngine {
  constructor(options = {}) {
    this.sigma = options.sigma || 1.15;
    this.history = [];
  }

  getFrequencyForEvent(eventType) {
    return EVENT_FREQ_MAP[eventType] || 4;
  }

  generateSimulatedBio(frequency = 5) {
    const f = Math.min(7, Math.max(1, frequency));
    const attention = (Math.random() * 0.6 + 0.2) * (f / 3);
    const timing    = Math.random() * 0.4 + 0.6;
    const intensity = Math.random() * 0.8 + 0.2 * (f / 4);
    const chaos     = (Math.random() - 0.5) * 2 * this.sigma;
    return {
      f,
      attention: attention + chaos * 0.1,
      timing:    timing    + chaos * 0.05,
      intensity: intensity + chaos * 0.08,
      timestamp: Date.now()
    };
  }

  validatePulse(bio) {
    const { f, attention, timing, intensity } = bio;
    const denominator = timing * 0.8 + (1 - intensity) * 0.2 + 0.01;
    let piScore = ((f * attention) / denominator) * this.sigma * 20;
    piScore = Math.min(100, Math.max(0, piScore));
    const isValid = piScore >= 15;
    return {
      piScore: Math.round(piScore * 100) / 100,
      isValid,
      level: this.getLevelFromPi(piScore),
      frequency: f,
      sigma: this.sigma,
      denominator: Math.round(denominator * 100) / 100
    };
  }

  getLevelFromPi(pi) {
    if (pi >= 85) return 'GODHEAD';
    if (pi >= 70) return 'ZENITH';
    if (pi >= 55) return 'GRIDLOCK';
    if (pi >= 40) return 'SURGE';
    if (pi >= 25) return 'PULSE';
    return 'RUMBLE';
  }

  authorizePacket(bio, report) {
    if (!report.isValid) {
      return { status: 'DENIED', reason: `Pi Score too low (${report.piScore} < 15)`, signature: null };
    }
    const freqName = FREQUENCY_MAP[bio.f] || 'RUMBLE';
    const hash = Date.now().toString(36).slice(-4).toUpperCase();
    return {
      status: 'AUTHORIZED',
      signature: `SIG-${freqName}-${bio.f}X-${hash}`,
      piScore: report.piScore,
      level: report.level
    };
  }

  runCycle(frequency = 5) {
    const bio    = this.generateSimulatedBio(frequency);
    const report = this.validatePulse(bio);
    const auth   = this.authorizePacket(bio, report);
    const result = { input: bio, validation: report, authorization: auth, timestamp: Date.now() };
    this.history.push(result);
    if (this.history.length > 100) this.history.shift();
    return result;
  }

  getHistory(limit = 20) { return this.history.slice(-limit); }
  getLastCycle()          { return this.history[this.history.length - 1] || null; }
}

module.exports = { PulseEngine };
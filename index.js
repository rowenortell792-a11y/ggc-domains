// ==========================================
// index.js — Gridlock Sovereign API
// ==========================================

const express = require('express');
const { PulseEngine } = require('./pulse-lang');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const gridlock = new PulseEngine({ sigma: 1.15 });

// Health
app.get('/health', (req, res) => {
  res.json({ status: 'Gridlock operational', sigma: gridlock.sigma });
});

// Validate a single event
app.post('/validate', (req, res) => {
  const { eventType, source, userId, metadata, frequency } = req.body;
  const freq  = frequency || gridlock.getFrequencyForEvent(eventType);
  const cycle = gridlock.runCycle(freq);
  console.log(`[VALIDATE] ${eventType} → ${cycle.authorization.status} | Pi: ${cycle.validation.piScore} | Sig: ${cycle.authorization.signature}`);
  res.json({
    piScore:   cycle.validation.piScore,
    status:    cycle.authorization.status,
    signature: cycle.authorization.signature || null,
    level:     cycle.validation.level,
    frequency: cycle.input.f,
    sigma:     gridlock.sigma,
    reason:    cycle.authorization.reason || null,
    event:     { eventType, source, userId, metadata }
  });
});

// Batch validate
app.post('/validate/batch', (req, res) => {
  const { events } = req.body;
  if (!Array.isArray(events)) return res.status(400).json({ error: 'events must be an array' });
  const results = events.map(e => {
    const cycle = gridlock.runCycle(e.frequency || gridlock.getFrequencyForEvent(e.eventType));
    return { eventId: e.eventId, piScore: cycle.validation.piScore, status: cycle.authorization.status, signature: cycle.authorization.signature || null, level: cycle.validation.level };
  });
  res.json({ results });
});

// Status (for dashboard widgets)
app.get('/status', (req, res) => {
  const last = gridlock.getLastCycle();
  res.json({
    sigma:         gridlock.sigma,
    lastPiScore:   last?.validation.piScore   || null,
    lastSignature: last?.authorization.signature || null,
    lastLevel:     last?.validation.level     || null,
    lastStatus:    last?.authorization.status || null,
    historyCount:  gridlock.getHistory(100).length
  });
});

// History (for battle reports)
app.get('/history', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  res.json({ history: gridlock.getHistory(limit) });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Gridlock API running on port ${PORT}`);
  console.log(`  sigma = ${gridlock.sigma} | GGC V2 active`);
});
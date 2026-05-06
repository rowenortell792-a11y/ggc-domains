const GRIDLOCK_URL = process.env.GRIDLOCK_API_URL; // e.g. https://your-gridlock.replit.app

async function emitPAEvent(eventType, source, userId, metadata = {}) {
  // 1. Ask Gridlock to validate this event
  const res = await fetch(`${GRIDLOCK_URL}/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventType, source, userId, metadata })
  });
  const { piScore, status, signature, level } = await res.json();

  // 2. Use Gridlock's Pi Score as the global pulse
  globalPulse = piScore;

  // 3. Store result in MongoDB
  const eventRecord = {
    eventType, source, userId, metadata,
    piScore, status, signature, level,
    timestamp: new Date()
  };
  await db.collection('pa_events').insertOne(eventRecord);

  // 4. Broadcast to all WebSocket clients
  broadcastToAll({ type: 'pulse_update', pulse: globalPulse, status, signature, level, lastEvent: eventType });

  return { piScore, status, signature };
}
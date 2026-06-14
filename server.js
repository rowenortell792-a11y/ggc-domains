const GRIDLOCK_URL = process.env.GRIDLOCK_API_URL;

/**
 * Emits a Ripple Event to the GGC Universe.
 * Validates through Gridlock, logs to the Ledger, and broadcasts resonance.
 */
async function emitRippleEvent(eventType, source, userId, metadata = {}) {
  // 1. Ask Gridlock to validate this event and generate a Ripple resonance score
  const res = await fetch(`${GRIDLOCK_URL}/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventType, source, userId, metadata })
  });
  
  const { piScore, status, signature, level } = await res.json();

  // 2. Update the Global Resonance Level
  globalResonance = piScore;

  // 3. Store the event in the GGC Ledger (MongoDB)
  const rippleRecord = {
    eventType, 
    source, 
    userId, 
    metadata,
    piScore, 
    status, 
    signature, 
    level,
    timestamp: new Date()
  };
  
  await db.collection('ripple_events').insertOne(rippleRecord);

  // 4. Broadcast the Ripple disturbance to all connected GGC entities
  broadcastToAll({ 
    type: 'ripple_update', 
    resonance: globalResonance, 
    status, 
    signature, 
    level, 
    lastEvent: eventType 
  });

  return { piScore, status, signature };
}

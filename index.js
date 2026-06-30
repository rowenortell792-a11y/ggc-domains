const express = require('express');
const { SovereignLaws, CitadelConstants } = require('./lawbook');
const constitution = require('./constitution');
const app = express();

app.use(express.json());

// 1. The Sovereign Gate: Mandatory audit for all incoming traffic
app.use((req, res, next) => {
    console.log(`[CITADEL_GATE] Incoming intent: ${req.method} ${req.originalUrl}`);
    // Lawful entry: Validation via the Fifth
    SovereignLaws.BridgeRealityToFaith(1); 
    next();
});

// 2. Marketplace Handshake: Constitutional enforcement for domain acquisitions
app.post('/api/assets/buy', (req, res) => {
    // Enforce sovereign laws on request body
    const securedData = constitution.enforce(req.body);
    
    // Process acquisition logic
    console.log(`[RIPPLE] Locking asset to GGC Canon: ${securedData.name}`);
    res.json({ status: "success", asset: securedData });
});

// 3. System Initialization
app.listen(process.env.PORT || 3000, () => {
    console.log(`[CITADEL_STATUS] Gateway Online. Governing at constant: ${CitadelConstants.THE_FIFTH}`);
});

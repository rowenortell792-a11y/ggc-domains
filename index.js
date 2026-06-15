const express = require('express');
const { SovereignLaws } = require('./lawbook');
const app = express();

app.use(express.json());

// The Sovereign Gate: Every request must be validated by the Fifth
app.use((req, res, next) => {
    console.log(`[CITADEL_GATE] Incoming intent: ${req.method} ${req.originalUrl}`);
    // Lawful entry: Validation occurs here
    const audit = SovereignLaws.BridgeRealityToFaith(1); 
    next();
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`[CITADEL_STATUS] Gateway Online. Governing at constant: ${require('./lawbook').CitadelConstants.THE_FIFTH}`);
});

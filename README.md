# Click-Net Marketplace
Sovereign identity & premium asset marketplace for the GGC universe. — browse, buy, and manage your handles in the GGC ecosystem.
### What It Is
**Click-Net** is a full-stack SaaS marketplace for purchasing premium assets and handles within the GGC ecosystem. Built from scratch with a contract-first API, real-time Ripple tracking, and deep integration across all GGC holdings.
### Stack
| Layer | Tech |
|---|---|
| **Frontend** | React + Vite + Tailwind + shadcn/ui |
| **Backend** | Express 5 (TypeScript) |
| **Database** | PostgreSQL + Drizzle ORM |
| **Auth** | Clerk (Google OAuth + email) |
| **API Contract** | OpenAPI 3.1 → Orval codegen |
| **Runtime** | Node.js 24 |
| **Hosting** | Production-grade deployment |
### Features
 * **Marketplace**: Premium asset & handle management at launch pricing; filter by status, TLD, price, and name; featured assets on homepage; secure buy flow.
 * **Auth**: Clerk authentication; protected dashboard for owned assets; admin role with full CRUD access.
 * **Admin Panel (/admin)**: Asset management (add, edit, delete, feature); user management (promote/revoke admin); purchase history; ClickDash integration.
 * **Ripple Engine (Resonance Feedback)**: Real-time GGC ecosystem resonance system. Actions emit weighted ripples that influence the wider GGC universe (ASSET_SOLD +12, PREMIUM_PURCHASED +10, etc.). Live stream via SSE at /api/ripple/stream.
 * **ClickDash Integration**: Auto-creates tracked short links for every asset via **clickdash.net**.
 * **Discord Integration**: Webhook notifications on asset purchase.
### API Endpoints
 * **Public**: GET /api/healthz, GET /api/assets, GET /api/assets/featured, GET /api/assets/:name, POST /api/assets/:name/buy, GET /api/stats, GET /api/activity/recent, GET /api/ripple, GET /api/ripple/stream
 * **User**: GET /api/me, GET /api/me/assets, GET /api/me/stats
 * **Admin**: POST /api/ripple/emit, GET /api/admin/stats, GET /api/admin/assets, POST /api/admin/assets, PATCH /api/admin/assets/:name, DELETE /api/admin/assets/:name, GET /api/admin/users, POST /api/admin/users/:id/make-admin, GET /api/admin/purchases, POST /api/admin/clickdash/sync, GET /api/admin/clickdash/stats
### GGC Ecosystem
 * **Click-Net**: This — premium asset marketplace
 * **ClickDash**: Link tracking & analytics (**clickdash.net**)
 * **Gridlock API**: Command center & validation telemetry
 * **Gridlock Logic**: Sovereign access system
 * **Ripple Protocol**: Resonance feedback system
*© GGC Holdings — All rights reserved. Built for the GGC ecosystem.*

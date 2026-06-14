# Click.io Marketplace
**Sovereign identity & premium asset marketplace for the GGC universe.** — browse, buy, and manage your handles in the GGC ecosystem.
Live: click.io
## What It Is
**Click.io** is a full-stack SaaS marketplace for purchasing premium assets and handles within the GGC ecosystem. Built from scratch with a contract-first API, real-time Ripple tracking, and deep integration across all GGC holdings.
## Stack
| Layer | Tech |
|---|---|
| Frontend | React + Vite + Tailwind + shadcn/ui |
| Backend | Express 5 (TypeScript) |
| Database | PostgreSQL + Drizzle ORM |
| Auth | Clerk (Google OAuth + email) |
| API Contract | OpenAPI 3.1 → Orval codegen |
| Runtime | Node.js 24 |
| Hosting | Production-grade deployment |
## Features
### Marketplace
 * Premium asset & handle management at launch pricing
 * Filter by status, TLD, price, and name
 * Featured assets on homepage
 * Secure buy flow
### Auth
 * Clerk authentication (Google + email)
 * Protected dashboard for owned assets
 * Admin role with full CRUD access
### Admin Panel (/admin)
 * Asset management (add, edit, delete, feature)
 * User management (promote/revoke admin)
 * Purchase history
 * ClickDash integration
 * Ripple Engine dashboard (live resonance)
### Ripple Engine (Resonance Feedback)
Real-time GGC ecosystem resonance system. Actions across the platform emit weighted ripples that influence the wider GGC universe:
```
ASSET_SOLD        +12
PREMIUM_PURCHASED +10
GAME_WON          +5
SUPPORT_GIVEN     +4
USER_REGISTERED   +3
POST_CREATED      +3
LINK_SHORTENED    +2
CLICKDASH_SYNC    +2
ADMIN_ACTION      +1
COMMENT_REMOVED   -2
USER_BANNED       -5
REFUND_ISSUED     -8

```
Resonance ranges: 0–100. Levels: CRITICAL → LOW → STABLE → ELEVATED → GODHEAD
Live stream via SSE at /api/ripple/stream
### ClickDash Integration
 * Auto-creates tracked short links for every asset
 * Click counts visible in admin panel
### Discord Integration
 * Discord banner on every page
 * Webhook notifications on asset purchase
## API Endpoints
```
GET    /api/healthz
GET    /api/assets
GET    /api/assets/featured
GET    /api/assets/:name
POST   /api/assets/:name/buy
GET    /api/stats
GET    /api/activity/recent
GET    /api/me
GET    /api/me/assets
GET    /api/me/stats
GET    /api/ripple
GET    /api/ripple/stream       (SSE)
POST   /api/ripple/emit
GET    /api/admin/stats
GET    /api/admin/assets
POST   /api/admin/assets
PATCH  /api/admin/assets/:name
DELETE /api/admin/assets/:name
GET    /api/admin/users
POST   /api/admin/users/:id/make-admin
GET    /api/admin/purchases
POST   /api/admin/clickdash/sync
GET    /api/admin/clickdash/stats

```
## Environment Variables
```env
DATABASE_URL=           # PostgreSQL connection string
SESSION_SECRET=         # Session signing secret
CLERK_PUBLISHABLE_KEY=  # Clerk public key
CLERK_SECRET_KEY=       # Clerk secret key
CLICKDASH_API_KEY=      # ClickDash API key (cdk_...)
DISCORD_WEBHOOK_URL=    # Discord webhook for sale notifications
APP_URL=https://click.io

```
## GGC Ecosystem
| Project | Description |
|---|---|
| **Click.io** | This — premium asset marketplace |
| **ClickDash** | Link tracking & analytics (clickdash.io) |
| **Gridlock API** | Command center & validation telemetry |
| **Gridlock Logic** | Sovereign access system |
| **Ripple Protocol** | Resonance feedback system — cross-app event system |
## Run Locally
```bash
pnpm install
pnpm --filter @workspace/db run push     # push DB schema
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/click-io run dev

```
© GGC Holdings — All rights reserved. Built for the GGC ecosystem.

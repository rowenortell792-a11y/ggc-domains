# GGC Domains

**Premium subdomain marketplace under `.ggc.site`** — browse, buy, and manage premium handles in the GGC universe.

Live: [ggc-domains.replit.app](https://ggc-domains.replit.app)

---

## What It Is

GGC Domains is a full-stack SaaS marketplace where users can purchase premium subdomains like `gaming.ggc.site`, `crypto.ggc.site`, etc. Built from scratch with a contract-first API, real-time pulse tracking, and integrations across the GGC ecosystem.

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite + Tailwind + shadcn/ui |
| Backend | Express 5 (TypeScript) |
| Database | PostgreSQL + Drizzle ORM |
| Auth | Clerk (Google OAuth + email) |
| API Contract | OpenAPI 3.1 → Orval codegen |
| Runtime | Node.js 24 |
| Hosting | Replit |

---

## Features

### Marketplace
- 36 premium `.ggc.site` domains at launch pricing ($4.99–$14.99)
- Filter by status, TLD, price, and name
- Featured domains on homepage
- Domain detail pages with buy flow

### Auth
- Clerk authentication (Google + email)
- Protected dashboard for owned domains
- Admin role with full CRUD access

### Admin Panel (`/admin`)
- Domain management (add, edit, delete, feature)
- User management (promote/revoke admin)
- Purchase history
- ClickDash integration (click tracking)
- PA Language Engine dashboard (live pulse)

### PA Language Engine (Pulse Awareness)
Real-time ecosystem health signal system. Events across the platform emit weighted pulses:

```
DOMAIN_SOLD       +12
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

Pulse ranges: 0–100. Levels: CRITICAL → LOW → STABLE → ELEVATED → GODHEAD

Live stream via SSE at `/api/pulse/stream`

### ClickDash Integration
- Auto-creates tracked short links (`clickda.sh/xxxxx`) for every domain
- Click counts visible in admin panel
- Purchased domains auto-archived in ClickDash

### Discord Integration
- Discord banner on every page
- Webhook notifications on domain purchase

---

## API Endpoints

```
GET    /api/healthz
GET    /api/domains
GET    /api/domains/featured
GET    /api/domains/:name
POST   /api/domains/:name/buy
GET    /api/tlds
GET    /api/stats
GET    /api/activity/recent
GET    /api/me
GET    /api/me/domains
GET    /api/me/stats
GET    /api/pulse
GET    /api/pulse/stream        (SSE)
POST   /api/pulse/emit
GET    /api/admin/stats
GET    /api/admin/domains
POST   /api/admin/domains
PATCH  /api/admin/domains/:name
DELETE /api/admin/domains/:name
GET    /api/admin/users
POST   /api/admin/users/:id/make-admin
GET    /api/admin/purchases
POST   /api/admin/clickdash/sync
GET    /api/admin/clickdash/stats
```

---

## Environment Variables

```env
DATABASE_URL=           # PostgreSQL connection string
SESSION_SECRET=         # Session signing secret
CLERK_PUBLISHABLE_KEY=  # Clerk public key
CLERK_SECRET_KEY=       # Clerk secret key
CLICKDASH_API_KEY=      # ClickDash API key (cdk_...)
DISCORD_WEBHOOK_URL=    # Discord webhook for sale notifications
```

---

## GGC Ecosystem

| Project | Description |
|---|---|
| **GGC Domains** | This — premium subdomain marketplace |
| **ClickDash** | Link tracking & analytics (clickdash.io) |
| **Gridlock API** | Command center & validation telemetry |
| **Gridlock Logic** | Sovereign access system |
| **Pulse Language Cycle** | PA Language Engine — cross-app event system |

---

## Run Locally

```bash
pnpm install
pnpm --filter @workspace/db run push     # push DB schema
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/ggc-domains run dev
```

---

© GGC Holdings — All rights reserved. Built for the GGC ecosystem.

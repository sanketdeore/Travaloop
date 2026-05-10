# ✈️ Traveloop — AI-Powered Travel Planning Platform

> A full-stack SaaS travel planning application with AI recommendations, itinerary builder, budget tracking, and beautiful UI.

![Traveloop](https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80)

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 (App Router), React, TypeScript |
| **Styling** | Tailwind CSS, Framer Motion, Glassmorphism |
| **State** | Zustand with persistence |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | JWT + bcrypt |
| **Charts** | Recharts |
| **DnD** | @hello-pangea/dnd |
| **AI** | OpenAI GPT-4 (optional) |
| **Maps** | Leaflet.js |

---

## 📁 Project Structure

```
Traveloop/
├── apps/
│   ├── frontend/           # Next.js 14 application
│   │   └── src/
│   │       ├── app/        # App Router pages
│   │       ├── components/ # Reusable UI components
│   │       ├── store/      # Zustand state stores
│   │       └── lib/        # API client, utilities
│   └── backend/            # Express.js API
│       └── src/
│           ├── routes/     # API route handlers
│           ├── middleware/  # Auth, error handling
│           └── lib/        # Prisma client
├── packages/
│   └── database/           # Prisma schema + seed
├── .env                    # Environment variables
└── package.json            # Monorepo root
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm 9+

### 1. Clone & Install

```bash
git clone https://github.com/your-username/traveloop.git
cd Traveloop

# Install frontend dependencies
cd apps/frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

### 2. Configure Environment

```bash
# Copy example env
cp .env.example .env

# Edit .env with your values:
# DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/traveloop"
# JWT_SECRET="your-secret-key"
```

### 3. Set Up Database

Make sure PostgreSQL is running, then:

```bash
cd packages/database

# Generate Prisma client
npx prisma generate

# Run migrations (creates tables)
npx prisma migrate dev --name init

# Seed with demo data
node prisma/seed.js
```

> **Demo credentials after seeding:**
> - User: `demo@traveloop.com` / `demo123`
> - Admin: `admin@traveloop.com` / `admin123`

### 4. Start Development Servers

**Terminal 1 — Backend:**
```bash
cd apps/backend
npm run dev
# API running at http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd apps/frontend
npm run dev
# App running at http://localhost:3000
```

### 5. Open the App

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🌟 Features

| Feature | Status |
|---|---|
| 🔐 JWT Authentication (Login/Signup/Logout) | ✅ |
| 🏠 Dashboard with stats & AI picks | ✅ |
| 📋 My Trips (Grid/List, Search, Filter) | ✅ |
| ✏️ Create/Edit Trip Wizard | ✅ |
| 🗺️ Drag-and-Drop Itinerary Builder | ✅ |
| 📅 Itinerary View with activity timeline | ✅ |
| 💰 Budget Manager with pie & bar charts | ✅ |
| 🧳 Packing Checklist with progress tracker | ✅ |
| 📓 Trip Notes / Journal | ✅ |
| 🔗 Public Share Links | ✅ |
| 🌍 City & Destination Explorer | ✅ |
| 👤 Profile & Settings | ✅ |
| 🛡️ Admin Dashboard | ✅ |
| 🤖 AI Recommendations (OpenAI) | ✅ (mock fallback) |
| 🌤️ Weather Integration | ✅ (mock fallback) |
| 🌙 Dark / Light Mode | ✅ |
| 📱 Fully Responsive | ✅ |

---

## 🔑 API Endpoints

```
POST   /api/auth/register       Create account
POST   /api/auth/login          Login
GET    /api/auth/me             Get current user

GET    /api/trips               List trips (search, filter, paginate)
POST   /api/trips               Create trip
GET    /api/trips/:id           Get trip with all relations
PUT    /api/trips/:id           Update trip
DELETE /api/trips/:id           Delete trip

POST   /api/trips/:id/stops     Add stop
PUT    /api/trips/:id/stops/:stopId
DELETE /api/trips/:id/stops/:stopId

POST   /api/trips/:id/stops/:stopId/activities
PUT    /api/trips/:id/stops/:stopId/activities/:actId
DELETE /api/trips/:id/stops/:stopId/activities/:actId

GET    /api/trips/:id/budget    Get budget
PUT    /api/trips/:id/budget    Update budget

GET    /api/trips/:id/packing   Get packing list
POST   /api/trips/:id/packing   Add item
PUT    /api/trips/:id/packing/:itemId
DELETE /api/trips/:id/packing/:itemId

GET    /api/trips/:id/notes     Get notes
POST   /api/trips/:id/notes     Add note
PUT    /api/trips/:id/notes/:noteId
DELETE /api/trips/:id/notes/:noteId

POST   /api/trips/:id/share     Generate share link
GET    /api/share/:token        View shared trip (public)

GET    /api/destinations        Search destinations
GET    /api/destinations/popular
GET    /api/destinations/:id/activities

POST   /api/ai/recommend        AI recommendations
GET    /api/weather/:city       Weather data

GET    /api/profile             Get profile
PUT    /api/profile             Update profile
PUT    /api/profile/password    Change password
DELETE /api/profile             Delete account

GET    /api/admin/stats         Platform analytics (admin only)
GET    /api/admin/users         All users (admin only)
```

---

## 🌐 Optional API Keys

Add these to `.env` to enable real integrations (mock data works without them):

| Service | Variable | Get Key |
|---|---|---|
| OpenAI | `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com) |
| Weather | `OPENWEATHER_API_KEY` | [openweathermap.org](https://openweathermap.org/api) |
| Currency | `EXCHANGE_RATE_API_KEY` | [exchangerate-api.com](https://exchangerate-api.com) |

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd apps/frontend
npm run build
# Deploy to Vercel: connect GitHub repo and set NEXT_PUBLIC_API_URL
```

### Backend (Railway / Render)
- Set `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`, `FRONTEND_URL`
- Run `npx prisma migrate deploy` on first deploy

---

## 📜 License

MIT © 2024 Traveloop

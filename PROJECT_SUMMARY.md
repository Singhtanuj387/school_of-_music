# Gandharva School of Music — Platform Project Summary

A live, 1-on-1 online music & dance learning platform designed and engineered for **[Gandharva School of Music](https://www.gandharvaschoolofmusic.com/)**. The platform combines real-time WebRTC studio-quality audio/video, teacher scheduling, automated booking, and an Indian classical & contemporary luxury music aesthetic.

---

## 1. Executive Overview

- **Product Name**: Gandharva School of Music Platform (formerly ToneRoom)
- **Target Audience**: Students seeking accredited 1:1 online training in instruments, vocals, and dance, and professional music instructors.
- **Accreditations Supported**: Trinity College London, ABRSM Graded Music Exams, and Gandharva Mahavidyalaya.
- **Primary Goal**: Deliver zero-latency, high-fidelity online music instruction with frictionless booking, calendar sync, and interactive lesson tools.

---

## 2. Technology Stack & Architecture

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16.3.5 (App Router, Turbopack, React 19) |
| **Language** | TypeScript (Strict type checking) |
| **Styling & Design** | Tailwind CSS v4 with `@theme inline` custom design tokens |
| **Typography** | `Vidaloka` (Display / Classical Serif) + `DM Sans` (Clean UI Sans) |
| **Database & ORM** | PostgreSQL 16 + Prisma ORM 7.10 |
| **Authentication** | Auth.js (NextAuth v5 beta) with Credentials provider, BCrypt, and Session Cookies |
| **Real-Time Video/Audio** | LiveKit WebRTC (`livekit-client`, `@livekit/components-react`, `livekit-server-sdk`) |
| **Email & Calendar** | Nodemailer (SMTP / Resend integration) + iCalendar (`.ics` invites) |
| **Networking & Tunnelling** | Cloudflare Tunnel (`cloudflared`) for secure public HTTPS & WebSocket access |
| **Local Environment** | Docker Compose for PostgreSQL (`toneroom-db`), Windows batch scripts |

---

## 3. Core Features Built

### A. Gandharva School of Music Brand & UI Overhaul
- **Brand Palette**:
  - **Saffron Orange (`#FF7703`) & Warm Gold (`#FF9E00`)**: Badges, high-impact value banners, and active states.
  - **Royal Purple (`#9506EE` / `#8200DA`)**: Primary action buttons ("Book Free Trial", Join Class).
  - **Midnight Violet (`#12072B` to `#220F4B`)**: Studio-grade dark theme surfaces.
  - **Soft Lavender (`#D8D1E8`)**: Borders, dividers, and secondary text.
- **Landing Page**:
  - Hero section featuring Vidaloka serif typography and accredited exam partner badges.
  - Saffron ribbon banner highlighting 1-on-1 mentorship, customized syllabus, and 24/7 support.
  - Four educational pillars ("Exclusively At Gandharva!").
  - Curated course grid across three disciplines:
    - **Instruments**: Piano, Electronic Keyboard, Acoustic Guitar, Electric Guitar, Classical Guitar, Tabla, Bansuri Flute, Violin.
    - **Singing & Vocals**: Western Vocals, Hindustani Classical, Carnatic Vocals, Bollywood Vocals.
    - **Classical & Modern Dance**: Bharatanatyam, Kathak, Bollywood Dance.

### B. User Management & Authentication
- **Multi-Role System**: Distinct roles for `STUDENT`, `TEACHER`, and `ADMIN`.
- **Sign Up & Sign In**: Secure BCrypt-hashed password authentication with remember-me sessions.
- **Email Verification Pipeline**:
  - Cryptographic verification tokens saved in DB.
  - Verification emails sent with single-click activation links.
- **Password Reset Flow**:
  - Time-limited password reset tokens with email notification.
  - Secure password update screen with confirmation validation.
- **Route Protection & Middleware**:
  - Next.js Proxy/Middleware enforcing role authorization for `/student/*` and `/teacher/*`.

### C. Teacher Availability & Booking Engine
- **Weekly Schedule Manager**:
  - Recurring day-of-week working hours (`AvailabilityRule`) configured in minutes from midnight.
- **Exceptions & Blackout Dates**:
  - One-off holiday blocks and emergency cancellations (`AvailabilityException`).
- **Real-Time Slot Generator**:
  - Timezone-aware slot generation algorithm with double-booking prevention.
  - Automatic collision checks against existing `SCHEDULED` lessons.
- **Teacher Discovery Directory (`/teachers`)**:
  - Filter by instrument/discipline and search query.
  - Rich teacher profile cards showing bio, instruments taught, years of experience, and hourly rates.
- **Direct Booking Flow**:
  - Dynamic date picker and slot selection with immediate database reservation.

### D. Live Studio Room (LiveKit WebRTC)
- **Pre-Join Green Room**:
  - Camera, microphone, and speaker device selection.
  - Real-time audio input level meter for soundcheck.
  - Hardware preview before joining live session.
- **In-Room Video & Audio**:
  - Multi-participant video grid with active speaker highlight.
  - Studio-grade audio configuration (high bitrate, stereo audio support, acoustic instrument optimization).
  - Screen sharing capabilities for digital sheet music and tabs.
- **Built-in Lesson Tools**:
  - Real-time in-room text chat.
  - Audio metronome with adjustable tempo (BPM) and time signatures.
  - Shared lesson notes and musical aids.
  - Lesson duration timer and automated status tracking (`SCHEDULED` -> `IN_PROGRESS` -> `COMPLETED`).

### E. Calendar & Notifications
- **Automated Email Confirmations**:
  - Lesson booking confirmation emails sent to both student and teacher.
- **iCalendar (`.ics`) Attachments**:
  - Auto-generated calendar invites compatible with Google Calendar, Apple Calendar, and Outlook.
- **Dynamic Meeting Link Generation**: Direct one-click entry to the classroom.

### F. Networking, Cloudflare Tunnel & Automation
- **Zero-Config Public Tunnel**:
  - `start-tunnel.bat` launches Cloudflare Tunnel (`cloudflared`) to expose the local dev server securely to the internet.
  - Dynamic host detection so Auth.js and WebSocket connections seamlessly operate over `*.trycloudflare.com`.
- **One-Click Automation Scripts**:
  - `start.bat`: Starts PostgreSQL in Docker and launches Next.js dev server.
  - `stop.bat`: Gracefully stops dev server and docker containers.
  - `start-tunnel.bat`: Automatically acquires a public tunnel URL and outputs it to the console.

---

## 4. Key Bugs Discovered & Resolved

1. **Hydration Mismatch Bug**:
   - *Problem*: Server-rendered timestamps differed from client local times, causing React hydration mismatches.
   - *Fix*: Created a centralized `synced-time.ts` utility and `suppressHydrationWarning` on root tags, guaranteeing deterministic SSR/client hydration.
2. **Teacher Filter "No Teachers Found" Bug**:
   - *Problem*: Case mismatch between search terms and database instrument arrays prevented published teachers from appearing.
   - *Fix*: Added canonical case-insensitive instrument normalization and multi-field search filtering in `src/app/teachers/page.tsx`.
3. **Email Verification Expiry Bug**:
   - *Problem*: Verification links threw invalid/expired errors due to UTC vs local timestamp drift and premature token cleanup.
   - *Fix*: Standardized token expiration calculations to UTC Timestamptz and added proper token grace periods in `src/app/(auth)/verify-email/page.tsx`.
4. **Booking Date Mismatch (17 vs 18 Sep)**:
   - *Problem*: Date picker initialized with server timezone rather than synced local user date.
   - *Fix*: Bound calendar date generation to synchronized local midnight calculations.
5. **Cloudflare Tunnel Auth & WebSocket Redirect**:
   - *Problem*: Auth.js redirected users to `localhost:3000` after signing in via the public Cloudflare tunnel, and LiveKit signal connections failed.
   - *Fix*: Added `AUTH_TRUST_HOST=true`, omitted static `AUTH_URL` to allow dynamic request origin inference, and passed proper tunnel headers.
6. **Smooth Scroll Route Transition Warning**:
   - *Problem*: Next.js 16 logged a warning about smooth scroll on `<html>`.
   - *Fix*: Added `data-scroll-behavior="smooth"` attribute to `<html lang="en">` in `src/app/layout.tsx`.

---

## 5. Project Directory Structure

```text
meet_platform/
├── prisma/
│   ├── schema.prisma          # PostgreSQL database schema (Users, Teachers, Lessons, Availability)
│   └── seed.ts                # Database seeder with sample teachers, instruments & schedules
├── public/                    # Static assets, logos, and audio samples
├── src/
│   ├── actions/               # Next.js Server Actions (booking, teacher profile, auth)
│   ├── app/
│   │   ├── (auth)/            # Auth routes: login, signup, verify-email, forgot-password, reset-password
│   │   ├── api/               # API routes: livekit token generator, webhooks, auth endpoints
│   │   ├── lesson/[id]/       # Live 1:1 LiveKit classroom page
│   │   ├── student/dashboard/ # Student dashboard (upcoming lessons, past recordings, find teachers)
│   │   ├── teacher/dashboard/ # Teacher dashboard (schedule management, student list, lesson history)
│   │   ├── teachers/          # Public teacher directory and individual teacher profile pages
│   │   ├── globals.css        # Tailwind v4 theme tokens (Gandharva color system)
│   │   ├── layout.tsx         # Root layout with Vidaloka & DM Sans Google fonts
│   │   └── page.tsx           # Gandharva School of Music homepage
│   ├── components/
│   │   ├── layout/            # Navbar, Footer, and Page Shells
│   │   ├── room/              # LiveKit classroom, PreJoinScreen, Metronome, Whiteboard, Chat
│   │   └── ui/                # Reusable UI components (buttons, modals, cards, badges)
│   ├── lib/
│   │   ├── auth.ts            # Auth.js / NextAuth configuration
│   │   ├── db.ts              # Prisma client singleton
│   │   ├── email.ts           # Nodemailer email notification service
│   │   ├── ical.ts            # iCalendar generation
│   │   └── synced-time.ts     # Client/server timestamp synchronization
│   └── types/                 # Shared TypeScript interfaces, instruments & disciplines
├── docker-compose.yml         # PostgreSQL 16 container definition
├── package.json               # Dependencies and scripts
├── start.bat                  # One-click startup script (Docker + Next.js)
├── start-tunnel.bat           # Cloudflare Tunnel runner for public access
└── stop.bat                   # Environment shutdown script
```

---

## 6. How to Run the Application

### 1. Prerequisites
- **Node.js**: v20+ installed
- **Docker Desktop**: Running for PostgreSQL database

### 2. Start PostgreSQL Database
```bash
docker compose up -d
```

### 3. Apply Schema & Seed Database (First time or reset)
```bash
npx prisma db push
npx prisma db seed
```

### 4. Start Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 5. Expose via Cloudflare Tunnel (Optional, for mobile / remote access)
Double-click `start-tunnel.bat` or run:
```bash
cloudflared tunnel --url http://localhost:3000
```
This produces a public HTTPS URL (e.g. `https://your-tunnel-name.trycloudflare.com`) accessible from any smartphone, tablet, or remote device.

---

## 7. Current Status & Verification
- **TypeScript**: `npx tsc --noEmit` passing with **0 errors**.
- **Production Build**: `npm run build` compiled all routes and server actions cleanly.
- **Theme**: Verified and visually previewed across all core landing and authentication views.

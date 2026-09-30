# Gandharva School of Music — Live 1:1 Learning Platform

Live 1:1 online music & dance learning platform built with Next.js 16, React 19, LiveKit WebRTC, Prisma ORM, and PostgreSQL. Rebranded with the visual identity and curriculum of **[Gandharva School of Music](https://www.gandharvaschoolofmusic.com/)**.

> 📖 **Full Project Documentation**: For an in-depth breakdown of features, architecture, bug fixes, design tokens, and operations, see **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)**.

---

## Quick Start

### 1. Start PostgreSQL (Docker)
```bash
docker compose up -d
```

### 2. Run Database Migrations & Seed
```bash
npx prisma db push
npx prisma db seed
```

### 3. Start Next.js Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## Features

- **Accredited Syllabus**: Trinity College London, ABRSM, and Gandharva Mahavidyalaya exam preparation.
- **Gandharva Design System**: Vidaloka serif typography, saffron orange (`#FF7703`), royal purple (`#9506EE`), and midnight-violet studio surfaces.
- **Studio-Grade Classroom**: LiveKit WebRTC room with stereo audio, echo cancellation toggle, metronome, shared whiteboard, and screen sharing.
- **Teacher Availability Engine**: Dynamic weekly hours, holiday exceptions, and automated conflict-free slot booking.
- **Calendar & Email Integration**: Automated iCalendar (`.ics`) invites and email notifications.
- **Remote Access (Cloudflare Tunnel)**: Pre-configured tunnel scripts (`start-tunnel.bat`) for secure HTTPS access from phones and tablets without port forwarding.

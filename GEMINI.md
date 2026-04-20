# TypeShift - Project Context

## Project Overview
**TypeShift** is a modern, web-based typing speed and accuracy tracker. It provides a highly interactive environment inspired by minimalist typing platforms, focusing on a clean aesthetic and smooth user experience.

- **Frontend:** React 19, Vite, JavaScript (ESM).
- **Backend:** Node.js (Express), Drizzle ORM, PostgreSQL.
- **Database:** PostgreSQL 15 (Running via Docker).
- **Routing:** React Router DOM for multi-page navigation (Home, Login, Profile).
- **Icons:** Lucide React for consistent and modern iconography.
- **Styling:** Modern Dark Mode with Purple accents (`--main-color: #ae81ff`).
- **Core Logic:** Real-time WPM and accuracy calculation with a dynamic caret that moves through the text.

## Project Status
- **Completed:** 
    - Core typing engine, real-time stats (WPM, Accuracy, Raw WPM), modern dark-mode UI.
    - Multi-page routing, test duration selection (30/60/120s), infinite typing support.
    - Fixed 4-line typing window with immediate line-scrolling.
    - **Backend Phase 1:** Node.js/Express scaffold, Drizzle ORM integration, and Dockerized PostgreSQL setup.
- **Ongoing:** Phase 2: User Authentication (JWT) and Profile management.
- **Planned:** Performance Dashboard, Global Leaderboard, and AWS Deployment.

## Building and Running

### Frontend
- **Start Development Server:** `npm run dev`
- **Build for Production:** `npm run build`

### Backend (server/)
The backend requires Docker for the database and Node.js for the API.
1. **Start Database:**
   ```bash
   cd server
   docker compose up -d
   ```
2. **Sync Database Schema:** (Run after schema changes)
   ```bash
   npm run db:push
   ```
3. **Start API Server:**
   ```bash
   npm run dev
   ```

## Development Conventions

### Backend & Database
- **ORM:** Drizzle ORM for type-safe SQL queries.
- **Architecture:** Express.js with a modular structure.
- **Data Persistence:** Managed via Docker volumes (`postgres_data`).
- **Schema:** Defined in `server/src/db/schema.js`.

### UI & Styling
- **Theme:** Dark mode by default (`#111111`) with purple highlights.
- **CSS Variables:** Standardized in `src/App.css`.

## Key Files
- `src/pages/Home.jsx`: Core typing experience.
- `server/src/index.js`: Backend entry point.
- `server/src/db/schema.js`: Database table definitions.
- `server/docker-compose.yml`: Database infrastructure.
- `package.json`: Frontend dependencies.
- `server/package.json`: Backend dependencies.

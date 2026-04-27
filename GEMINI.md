# TypeShift - Project Context

## Project Overview
**TypeShift** is a modern, web-based typing speed and accuracy tracker. It provides a highly interactive environment inspired by minimalist typing platforms, focusing on a clean aesthetic and smooth user experience.

- **Frontend:** React 19, Vite, JavaScript (ESM).
- **Backend:** Node.js (Express), Drizzle ORM, PostgreSQL.
- **Database:** PostgreSQL 15 (Running via Docker for Dev, RDS for Prod).
- **Routing:** React Router DOM for multi-page navigation.
- **Styling:** Modern Dark Mode with Purple accents (`--main-color: #ae81ff`).

## Project Status
- **Completed:** 
    - Core typing engine, real-time stats, and minimalist dark-mode UI.
    - Infinite typing support and 4-line windowed scrolling.
    - **Backend Phase 1-3:** JWT Authentication, PostgreSQL integration, and persistent test history.
    - **Backend Phase 4:** Production Dockerization and AWS Infrastructure setup.
    - **Feature Expansion:** 
        - **Global Leaderboard:** View top rankings by typing modes.
        - **Performance Dashboard:** Visualized progress graphs (WPM/Accuracy) using Recharts.
    - **AWS Deployment:**
        - **Amazon RDS:** Managed PostgreSQL database.
        - **Amazon EC2:** Backend API server hosting (Port 5000).
        - **Amazon S3:** Static website hosting for the frontend.
        - **CloudFront Integration:** Secured with HTTPS via ACM, handling SPA routing (403/404 redirects), and proxying `/api/*` requests to EC2.
- **Next Steps:**
    - **Final Production Launch.**
    - Post-launch monitoring and optimization.

## Building and Running

### Frontend
- **Start Development Server:** `npm run dev`
- **Build for Production:** `npm run build`

### Backend (server/)
1. **Start Database:** `cd server && docker-compose up -d`
2. **Sync Schema:** `npm run db:push`
3. **Start API Server:** `npm run dev`

## AWS Deployment Architecture
- **Frontend:** Hosted on **Amazon S3** and served via **Amazon CloudFront** for global CDN and HTTPS.
- **Backend:** Deployed on **Amazon EC2** (Ubuntu/Docker) with CloudFront routing `/api` traffic to it.
- **Database:** **Amazon RDS (PostgreSQL)**.
- **Security:** HTTPS enforced by CloudFront; API protected via JWT and restricted origin access.

## Key Files
- `server/Dockerfile`: Production container definition.
- `server/src/db/schema.js`: Database schema.
- `src/context/AuthContext.jsx`: Full-stack integration using relative `/api` paths.
- `src/pages/Leaderboard.jsx`: Global ranking implementation.
- `src/pages/Profile.jsx`: User performance graphs.

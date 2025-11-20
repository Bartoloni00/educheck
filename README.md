# EduCheck - MERN (ready scaffold)

This archive contains a minimal, ready-to-unzip scaffold for **EduCheck** (MERN).
It includes a backend (Express + Mongoose + Socket.io) and a frontend (React + Vite).

## Quick start

1. Unzip and open two terminals.
2. Backend:
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```
3. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Create users via POST `/api/auth/register` or use the frontend register page.

Default `.env.example` values:
- Backend runs on port 5000
- Frontend expects backend at http://localhost:5000

## Structure
- backend/: API, models, routes, sockets
- frontend/: React app (Vite), pages, socket client

If you want, I can also produce a `docker-compose.yml`. 

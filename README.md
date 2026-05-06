# Travel Booking Portal Fullstack

Modern travel booking portal with:
- React + Vite frontend
- Express backend API server
- MySQL database schema and seed data
- Booking submission, package list, and destination API routes

## Run locally

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in `server/` with your MySQL credentials by copying `server/.env.example`:

```bash
cd server
copy .env.example .env
```

Set `DB_USER`, `DB_PASSWORD`, and `DB_NAME` to match your MySQL server. If `DB_PASSWORD` is missing, the backend may fail with access denied.

3. Initialize the MySQL database using MySQL Workbench:

- Open `server/sql/travel_app_init.sql`
- Run the script against your MySQL server

If you already created the database earlier, run `server/sql/upgrade_bookings_add_traveler_details.sql` to add traveler registration columns.

4. Start the backend server

```bash
npm run start:server
```

5. Start the frontend

```bash
npm run dev
```

The Vite dev server proxies `/api` requests to `http://localhost:4000`.

## Build for production

```bash
npm run build
```

## Backend API routes

- `GET /api/packages` — list travel packages
- `GET /api/destinations` — list destination cards
- `POST /api/bookings` — create a new booking
- `GET /api/bookings` — retrieve recent bookings

## Included fullstack functionality

- API-driven package and destination rendering
- Booking submission saved to MySQL
- Environment-based database configuration
- Backend-ready project structure for future authentication and payment integrations

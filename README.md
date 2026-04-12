# PyQHub 2.0

A site for managing past year questions (PYQs) from the college. Built with React frontend and Express.js backend.

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL (Prisma ORM)
- **Storage**: Cloudinary (PDF hosting)
- **Authentication**: JWT (Access + Refresh tokens)

## Project Structure

```
pyqhub-2.0/
├── frontend/           # React application
│   ├── src/
│   ├── package.json
│   └── README.md
├── backend/            # Express.js API
│   ├── src/
│   ├── package.json
│   ├── index.js
│   └── README.md       (API documentation)
└── README.md           # This file
```

## Quick Start

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run dev
```

Backend runs on `http://localhost:8000`

See [Backend README](backend/README.md) for full API documentation.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## Features

- 📚 Browse past exam papers by semester, exam type, year, and batch
- 📤 Upload new papers (authenticated users)
- 🔐 Secure authentication with JWT
- 🖼️ Paper previews via Cloudinary
- ⚡ Rate limiting and caching

## Environment Configuration

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/pyqhub
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

## Development Scripts

### Backend
- `npm run dev` — Start with auto-reload
- `npm run format` — Format code with prettier
- `npm test` — Run tests
- `npm run db:migrate` — Run database migrations

### Frontend  
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — Run ESLint

## API Documentation

Full API documentation is in [Backend README](backend/README.md).

### Key Endpoints

- **Authentication**: `POST /api/token/` (login), `POST /api/token/refresh/` (refresh)
- **Papers**: `POST /api/papers` (get filtered papers)
- **Upload** (protected): `POST /api/upload`, `GET /api/upload/papers`, `PATCH /api/upload/papers/:id`, `DELETE /api/upload/papers/:id`

## Deployment

### Vercel (Frontend + Serverless API)

This repository is configured for single-project Vercel deployment:

- React frontend is built from `frontend/` into `frontend/dist`
- Express backend is served as a Vercel serverless function via `api/[...all].js`

Set these environment variables in Vercel project settings:

- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CORS_ALLOWED_ORIGINS` (include your Vercel domain)

Optional frontend variable on Vercel:

- `VITE_API_URL` (leave unset to use same-origin calls)

Deploy command flow is handled by `vercel.json`.

## License

Proprietary - All rights reserved

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
VITE_API_BASE_URL=http://localhost:8000
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
- **Papers**: `POST /` (get filtered papers)
- **Upload** (protected): `POST /upload`, `GET /upload/papers`, `PATCH /upload/papers/:id`, `DELETE /upload/papers/:id`

## Deployment

### Backend
Deploy to any Node.js hosting (Heroku, Railway, Render, etc.). Update environment variables.

### Frontend  
Build and deploy to static hosting (Vercel, Netlify, GitHub Pages).

## License

Proprietary - All rights reserved

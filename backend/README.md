# PyQHub Backend (Express + Prisma)

Express.js backend for PyQHub serving papers management and user authentication.

## Stack

- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Storage**: Cloudinary (PDF hosting)
- **Authentication**: JWT (Access + Refresh tokens)
- **Rate Limiting**: express-rate-limit

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Cloudinary account (for PDF storage)

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Server
PORT=8000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/pyqhub

# JWT Secrets
JWT_SECRET=your-long-random-secret-key
JWT_REFRESH_SECRET=your-long-random-refresh-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 3. Database Setup

```bash
# Create migrations
npm run db:migrate

# Generate Prisma client
npm run db:generate
```

### 4. Create Admin User

```bash
npm run create-admin
```

## Development

### Start Server
```bash
npm run dev       # with auto-reload (nodemon)
npm start         # production
```

### Format Code
```bash
npm run format    # prettier --write
```

### Testing
```bash
npm test          # run tests once
npm run test:watch # watch mode
```

## API Endpoints

### Authentication

#### POST `/api/token/` — Login
Get access and refresh tokens.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "access": "eyJhbGc...",
  "refresh": "eyJhbGc..."
}
```

**Errors:**
- `400`: Email and password required
- `401`: Invalid credentials

---

#### POST `/api/token/refresh/` — Refresh Token
Generate new access token.

**Request:**
```json
{
  "refresh": "eyJhbGc..."
}
```

**Response (200):**
```json
{
  "access": "eyJhbGc..."
}
```

**Errors:**
- `400`: Refresh token required
- `401`: Invalid or expired refresh token

---

### Papers

#### POST `/` — Get Papers (Filtered)
Retrieve papers with optional filters. No authentication required.

**Request Body (all optional):**
```json
{
  "semester": 3,
  "exam": "MIDSEM",
  "year": 2024,
  "batch": "IT"
}
```

**Query Parameters:**
- `semester` (number): Semester number
- `exam` (string): `MIDSEM` or `ENDSEM`
- `year` (number): Year of exam
- `batch` (string): `IT`, `DSA`, or `CSE`

**Response (200):**
```json
{
  "papers": [
    {
      "id": 1,
      "title": "Data Structures Exam",
      "semester": 3,
      "year": 2024,
      "exam_type": "MIDSEM",
      "batch": "IT",
      "pdf": "https://res.cloudinary.com/.../paper.pdf",
      "preview": "https://res.cloudinary.com/.../pg_1/id.jpg",
      "uploaded_at": "2024-04-12T10:30:00Z"
    }
  ]
}
```

**Caching:** Results cached for 24 hours.

---

### Upload (Protected Routes)

All upload routes require JWT authentication via `Authorization: Bearer <token>` header.

#### GET `/upload/papers` — List All Papers
Retrieve all papers (admin endpoint).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "Data Structures Exam",
    "semester": 3,
    "year": 2024,
    "examType": "MIDSEM",
    "batch": "IT",
    "pdf": "https://res.cloudinary.com/.../paper.pdf",
    "preview": "https://res.cloudinary.com/.../pg_1/id.jpg",
    "uploadedAt": "2024-04-12T10:30:00Z"
  }
]
```

---

#### POST `/upload` — Create Paper
Upload a new paper with PDF file.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Form Data:**
- `pdf` (file, required): PDF file (multipart file field)
- `title` (string, required): Paper title
- `semester` (number, required): Semester (1-8)
- `year` (number, required): Exam year
- `examType` (string, required): `MIDSEM` or `ENDSEM`
- `batch` (string, optional): `IT`, `DSA`, or `CSE` (defaults to `IT`)

**Response (201):**
```json
{
  "id": 1,
  "title": "Data Structures Exam",
  "semester": 3,
  "year": 2024,
  "examType": "MIDSEM",
  "batch": "IT",
  "pdf": "https://res.cloudinary.com/.../paper.pdf",
  "preview": "https://res.cloudinary.com/.../pg_1/id.jpg",
  "uploadedAt": "2024-04-12T10:30:00Z"
}
```

**Errors:**
- `400`: PDF file required, invalid file type, missing fields
- `401`: Authentication required

---

#### PATCH `/upload/papers/:id` — Update Paper
Update paper metadata (not file).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body (all optional):**
```json
{
  "title": "Updated Title",
  "semester": 4,
  "year": 2025,
  "examType": "ENDSEM",
  "batch": "DSA"
}
```

**Response (200):**
```json
{
  "id": 1,
  "title": "Updated Title",
  "semester": 4,
  "year": 2025,
  "examType": "ENDSEM",
  "batch": "DSA",
  "pdf": "https://res.cloudinary.com/.../paper.pdf",
  "preview": "https://res.cloudinary.com/.../pg_1/id.jpg",
  "uploadedAt": "2024-04-12T10:30:00Z"
}
```

**Errors:**
- `400`: Invalid field values
- `401`: Authentication required
- `404`: Paper not found

---

#### DELETE `/upload/papers/:id` — Delete Paper
Delete paper and Cloudinary files.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (204):** No content

**Errors:**
- `401`: Authentication required
- `404`: Paper not found

---

## Rate Limiting

Global rate limit: **60 requests per minute** per IP.

Response when exceeded:
```json
{
  "error": "Too many requests, please try again later."
}
```

## Authentication Flow

1. **Login**: `POST /api/token/` with email/password → get `access` + `refresh` tokens
2. **Access Token**: Use in `Authorization: Bearer <access>` header (expires in 15 minutes)
3. **Refresh**: When access expires, `POST /api/token/refresh/` with `refresh` token → get new `access` token
4. **Refresh Expiry**: Refresh token expires in 7 days (re-login required)

## Database Schema

Key tables (managed by Prisma):
- **User**: Stores user credentials
- **Paper**: Stores paper metadata and Cloudinary references

Run `npx prisma studio` to view/edit data.

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` in `.env`
- Check PostgreSQL is running
- Run `npm run db:migrate`

### Cloudinary Upload Failures
- Verify Cloudinary credentials
- Check file size limits (ensure PDFs < max configured)
- Validate API keys in `.env`

### Authentication Errors
- Expired tokens: refresh using `/api/token/refresh/`
- Invalid token: re-login at `/api/token/`

## Deployment

Update environment variables on deployment platform, then:
```bash
npm install --production
npm run db:push
npm start
```

See also: [Root README](../README.md)

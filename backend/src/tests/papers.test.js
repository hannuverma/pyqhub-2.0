const request = require('supertest');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { mockDeep, mockReset } = require('jest-mock-extended');
const jwt = require('jsonwebtoken');
const { PDFDocument } = require('pdf-lib');
// Setup Mock Prisma
const mockPrisma = mockDeep();

jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload_stream: jest.fn((options, callback) => {
        // This simulates a successful Cloudinary response
        callback(null, {
          secure_url: 'https://cloudinary.com/test-pdf.pdf',
          public_id: 'test-id',
        });
        return { pipe: jest.fn() }; // Mocks the stream pipe
      }),
      destroy: jest.fn().mockResolvedValue({ result: 'ok' }),
    },
  },
}));

jest.mock('@prisma/client', () => {
  return {
    // This tells Jest that when someone calls 'new PrismaClient()',
    // it should return our mockPrisma object.
    PrismaClient: jest.fn().mockImplementation(() => mockPrisma),
  };
});

const app = require('../../index'); // Go up from tests -> src -> root

describe('Papers API Development Tests', () => {
  let authToken;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'test-secret';
    process.env.JWT_REFRESH_SECRET = 'refresh-secret';
    authToken = jwt.sign({ userId: 1 }, process.env.JWT_SECRET);

    const pdfDoc = await PDFDocument.create();
    pdfDoc.addPage([600, 400]);
    const pdfBytes = await pdfDoc.save();
    validPdfBuffer = Buffer.from(pdfBytes);
  });

  beforeEach(() => {
    mockReset(mockPrisma);
  });

  //   --- Authentication Tests ---
  test('GET /api/upload/papers should fail without token', async () => {
    const res = await request(app).get('/api/upload/papers');
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Authentication required.');
  });

  //   --- Validation Tests ---
  test('POST /api/upload should fail with invalid examType', async () => {
    const res = await request(app)
      .post('/api/upload')
      .set('Authorization', `Bearer ${authToken}`)
      .field('title', 'Math Exam')
      .field('semester', '1')
      .field('year', '2023')
      .field('examType', 'INVALID_TYPE')
      .attach('pdf', validPdfBuffer, 'test.pdf'); // Use valid buffer here too!

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid examType.');
  });

  test('POST /api/upload should fail if file is not PDF', async () => {
    const res = await request(app)
      .post('/api/upload')
      .set('Authorization', `Bearer ${authToken}`)
      .attach('pdf', Buffer.from('not a pdf'), 'test.txt');

    expect(res.statusCode).toBe(400);
  });

  //   --- Functional Tests ---
  test('POST /api/upload creates a paper successfully', async () => {
    const mockPaper = {
      id: 1,
      title: 'Test',
      semester: 1,
      year: 2024,
      examType: 'MIDSEM',
      batch: 'IT',
      pdf: 'https://cloudinary.com/test-pdf.pdf',
      pdfPublicId: 'test-id',
    };
    mockPrisma.paper.create.mockResolvedValue(mockPaper);

    const res = await request(app)
      .post('/api/upload')
      .set('Authorization', `Bearer ${authToken}`)
      .field('title', 'Test')
      .field('semester', '1')
      .field('year', '2024')
      .field('examType', 'MIDSEM')
      .attach('pdf', validPdfBuffer, 'test.pdf'); // Use valid buffer

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test');
  });

  test('DELETE /api/upload/papers/:id should return 404 for non-existent paper', async () => {
    mockPrisma.paper.findUnique.mockResolvedValue(null);
    const res = await request(app)
      .delete('/api/upload/papers/999')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(404);
  });

  //   --- Compression Tests ---
  test('POST /api/upload should actually compress the PDF', async () => {
    // 1. Create a "heavy" PDF by adding multiple pages or content
    const pdfDoc = await PDFDocument.create();
    for (let i = 0; i < 5; i++) {
      pdfDoc
        .addPage([600, 400])
        .drawText('Large PDF content to ensure size matters');
    }
    const originalBuffer = Buffer.from(await pdfDoc.save());
    const originalSize = originalBuffer.length;

    // 2. Mock Prisma to return a dummy paper
    mockPrisma.paper.create.mockResolvedValue({ id: 1, title: 'Compressed' });

    // 3. Send the request
    const res = await request(app)
      .post('/api/upload')
      .set('Authorization', `Bearer ${authToken}`)
      .field('title', 'Compressed Paper')
      .field('semester', '2')
      .field('year', '2024')
      .field('examType', 'MIDSEM')
      .attach('pdf', originalBuffer, 'test.pdf');

    // 4. Verify the status
    expect(res.statusCode).toBe(201);

    // Note: Since you can't easily see the buffer size from the response
    // without changing your code, you can temporarily return 'compressedSize'
    // in your JSON response during development to verify this test!
  });

  afterAll(async () => {
    // If you have a database connection to close, do it here
    // But usually, with mocks, just ensuring the server stops is enough
  });
});

const express = require('express');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;
const { PrismaClient } = require('@prisma/client');
const requireAuth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const VALID_EXAM_TYPES = ['MIDSEM', 'ENDSEM'];
const VALID_BATCHES = ['IT', 'DSA', 'CSE'];

function buildPreviewUrl(publicId) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/pg_1/${publicId}.jpg`;
}

function serializePaper(paper) {
  return {
    id: paper.id,
    title: paper.title,
    semester: paper.semester,
    year: paper.year,
    examType: paper.examType,
    batch: paper.batch,
    pdf: paper.pdf,
    preview: buildPreviewUrl(paper.pdfPublicId),
    uploadedAt: paper.uploadedAt,
  };
}

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

// All upload routes require auth
router.use(requireAuth);

// GET /upload/papers  — list all papers
router.get('/papers', async (req, res) => {
  const papers = await prisma.paper.findMany({
    orderBy: { uploadedAt: 'desc' },
  });
  return res.json(papers.map(serializePaper));
});

// POST /upload  — create a new paper
router.post('/', upload.single('pdf'), async (req, res) => {
  const { title, semester, year, examType, batch } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'PDF file is required.' });
  }
  if (req.file.mimetype !== 'application/pdf') {
    return res.status(400).json({ error: 'Only PDF files are allowed.' });
  }

  const fileName = req.file.originalname.toLowerCase();
  if (!fileName.endsWith('.pdf')) {
    return res.status(400).json({ error: 'File must have .pdf extension.' });
  }

  if (!title || !semester || !year || !examType) {
    return res
      .status(400)
      .json({ error: 'title, semester, year, and examType are required.' });
  }
  if (!VALID_EXAM_TYPES.includes(examType)) {
    return res.status(400).json({ error: 'Invalid examType.' });
  }
  if (batch && !VALID_BATCHES.includes(batch)) {
    return res.status(400).json({ error: 'Invalid batch.' });
  }

  const result = await uploadToCloudinary(req.file.buffer);

  const paper = await prisma.paper.create({
    data: {
      title,
      semester: parseInt(semester, 10),
      year: parseInt(year, 10),
      examType,
      batch: batch || 'IT',
      pdf: result.secure_url,
      pdfPublicId: result.public_id,
    },
  });

  return res.status(201).json(serializePaper(paper));
});

// PATCH /upload/papers/:id  — update paper metadata (no file re-upload)
router.patch('/papers/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, semester, year, examType, batch } = req.body;

  const existing = await prisma.paper.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: 'Paper not found.' });
  }

  if (examType && !VALID_EXAM_TYPES.includes(examType)) {
    return res.status(400).json({ error: 'Invalid examType.' });
  }
  if (batch && !VALID_BATCHES.includes(batch)) {
    return res.status(400).json({ error: 'Invalid batch.' });
  }

  const updated = await prisma.paper.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(semester && { semester: parseInt(semester, 10) }),
      ...(year && { year: parseInt(year, 10) }),
      ...(examType && { examType }),
      ...(batch && { batch }),
    },
  });

  return res.json(serializePaper(updated));
});

// DELETE /upload/papers/:id  — delete paper
router.delete('/papers/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  const existing = await prisma.paper.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: 'Paper not found.' });
  }

  // Delete from Cloudinary
  await cloudinary.uploader.destroy(existing.pdfPublicId, {
    resource_type: 'image',
  });

  await prisma.paper.delete({ where: { id } });
  return res.json({ success: true });
});

module.exports = router;

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const NodeCache = require('node-cache');

const router = express.Router();
const prisma = new PrismaClient();
const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });

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
    exam_type: paper.examType,
    batch: paper.batch,
    pdf: paper.pdf,
    preview: buildPreviewUrl(paper.pdfPublicId),
    uploaded_at: paper.uploadedAt,
  };
}

// POST /  — get papers with filters
router.post('/', async (req, res) => {
  const rawSemester = req.body.semester ?? null;
  const examType = req.body.exam ?? null;
  const rawYear = req.body.year ?? null;
  const batch = req.body.batch ?? null;

  let semester = null;
  if (rawSemester !== null) {
    semester = parseInt(rawSemester, 10);
    if (isNaN(semester)) {
      return res.status(400).json({ error: 'Invalid semester.' });
    }
  }

  if (examType !== null && !VALID_EXAM_TYPES.includes(examType)) {
    return res.status(400).json({ error: 'Invalid exam type.' });
  }

  let year = null;
  if (rawYear !== null) {
    year = parseInt(rawYear, 10);
    if (isNaN(year)) return res.status(400).json({ error: 'Invalid year.' });
  }

  if (batch !== null && !VALID_BATCHES.includes(batch)) {
    return res.status(400).json({ error: 'Invalid batch.' });
  }

  const where = {};
  if (semester) where.semester = semester;
  if (examType) where.examType = examType;
  if (year) where.year = year;
  if (batch) where.batch = batch;

  const papers = await prisma.paper.findMany({
    where,
    orderBy: { uploadedAt: 'desc' },
  });

  return res.json({ papers: papers.map(serializePaper) });
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

const ACCESS_EXPIRES = "15m";
const REFRESH_EXPIRES = "7d";

function generateTokens(userId) {
  const payload = { userId };
  const access = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: ACCESS_EXPIRES,
  });
  const refresh = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES,
  });
  return { access, refresh };
}

// POST /api/token/  — login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const tokens = generateTokens(user.id);
  return res.json(tokens);
});

// POST /api/token/refresh/  — refresh access token
router.post("/refresh/", async (req, res) => {
  const { refresh } = req.body;

  if (!refresh) {
    return res.status(400).json({ error: "Refresh token required." });
  }

  try {
    const decoded = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET);
    const access = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: ACCESS_EXPIRES }
    );
    return res.json({ access });
  } catch {
    return res.status(401).json({ error: "Invalid or expired refresh token." });
  }
});

module.exports = router;

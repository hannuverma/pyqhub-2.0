require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const authRouter = require("./src/routes/auth");
const papersRouter = require("./src/routes/papers");
const uploadRouter = require("./src/routes/upload");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:5173",
    ],
    credentials: false,
  })
);

app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});
app.use(limiter);

app.use("/api/token", authRouter);
app.use("/upload", uploadRouter);
app.use("/", papersRouter);

const PORT = process.env.PORT || 8000;

// ONLY start the server if this file is run directly (node app.js)
// This prevents the server from starting during tests
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export the app for Supertest
module.exports = app;
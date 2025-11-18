// backend/server.js


import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";     // keep your existing DB helper
import studentRoutes from "./routes/studentRoutes.js"; // your API routes

dotenv.config();

// __dirname replacement for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- API routes (define API routes BEFORE static serving) ---
app.use("/api/students", studentRoutes);
// add other API routes here, e.g. authRoutes

// --- Serve frontend build (static files) ---

// For any route not handled by the server (and not starting with /api),
// send index.html so React Router can handle the route on client.


// Connect to DB and start server
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(); // your existing function connects using process.env.MONGO_URI
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

start();

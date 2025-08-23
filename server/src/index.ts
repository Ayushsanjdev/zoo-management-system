import express from "express";
import { errorHandler } from "./middleware/error";
import { corsMiddleware, securityHeaders } from "./middleware/auth";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user";
import animalRoutes from "./routes/animal.routes";
import enclosureRoutes from "./routes/enclosure.routes";
import enclosureStaffRoutes from "./routes/enclosureStaff.routes";
import feedingRoutes from "./routes/feedingRecord.routes";
import healthCheckRoutes from "./routes/healthRecord.routes";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

// Global security middleware (apply first)
//app.use(securityHeaders);
//app.use(corsMiddleware);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (no auth required)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// API routes
app.use(animalRoutes);
app.use(enclosureRoutes);
app.use(enclosureStaffRoutes);
app.use(feedingRoutes);
app.use(healthCheckRoutes);

// Auth and user routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Zoo Management System API");
});

// Error handling middleware (apply last)
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

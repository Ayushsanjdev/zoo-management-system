import { Router } from "express";
import { FeedingScheduleController } from "../controllers/feedingSchedule.controller";
import {
  authenticateToken,
  authorizeAdmin,
  authorizeStaff,
  rateLimit,
} from "../middleware/auth";

const router = Router();
const controller = new FeedingScheduleController();

router.use(rateLimit(15 * 60 * 1000, 200)); // 200 requests per 15 minutes

// Main CRUD routes
router.post(
  "/api/feeding-schedule",
  authenticateToken,
  authorizeStaff,
  (req, res) => controller.create(req, res)
);
router.get(
  "/api/feeding-schedule",
  authenticateToken,
  authorizeStaff,
  (req, res) => controller.getAll(req, res)
);
router.get(
  "/api/feeding-schedule/:id",
  authenticateToken,
  authorizeStaff,
  (req, res) => controller.getById(req, res)
);
router.put(
  "/api/feeding-schedule/:id",
  authenticateToken,
  authorizeStaff,
  (req, res) => controller.update(req, res)
);
router.delete(
  "/api/feeding-schedule/:id",
  authenticateToken,
  authorizeAdmin,
  (req, res) => controller.delete(req, res)
);

export default router;

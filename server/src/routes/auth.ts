import { Router } from "express";
import { login, register } from "../controllers/auth";
import { authenticateToken, authorizeAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../validation/auth";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  authenticateToken,
  authorizeAdmin,
  register
);
router.post("/login", validate(loginSchema), login);

export default router;

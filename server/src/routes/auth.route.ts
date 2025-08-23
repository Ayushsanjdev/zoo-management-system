import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authenticateToken, authorizeAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../validation/auth";

const router = Router();
const controller = new AuthController();

router.post(
  "/register",
  validate(registerSchema),
  authenticateToken,
  authorizeAdmin,
  controller.register
);
router.post("/login", validate(loginSchema), controller.login);

export default router;

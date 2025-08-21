import { Router } from "express";
import {
  deleteUser,
  listUser,
  listUsers,
  login,
  register,
  updateUser,
} from "../controllers/auth";
import { authenticateToken, authorizeAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema, updateSchema } from "../validation/auth";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  authenticateToken,
  authorizeAdmin,
  register
);
router.post("/login", validate(loginSchema), login);

router.post(
  "/users",
  validate(registerSchema),
  authenticateToken,
  authorizeAdmin,
  register
);
router.get("/users", authenticateToken, authorizeAdmin, listUsers);
router.get("/users/:id", authenticateToken, authorizeAdmin, listUser);
router.patch(
  "/users/:id",
  validate(updateSchema),
  authenticateToken,
  authorizeAdmin,
  updateUser
);
router.delete("/users/:id", authenticateToken, authorizeAdmin, deleteUser);

export default router;

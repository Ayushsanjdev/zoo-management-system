import { Router } from "express";
import {
  deleteUser,
  listUser,
  listUsers,
  updateUser,
} from "../controllers/user";
import { authenticateToken, authorizeAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { updateSchema } from "../validation/auth";

const router = Router();
router.use(authenticateToken, authorizeAdmin);

router.get("/", listUsers);
router.get("/:id", listUser);
router.patch("/:id", validate(updateSchema), updateUser);
router.delete("/:id", deleteUser);

export default router;

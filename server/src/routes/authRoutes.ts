import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { registerUser, getMe } from "../controllers/authController";

const router = Router();

router.post("/register", verifyToken, registerUser);
router.get("/me", verifyToken, getMe);

export default router;
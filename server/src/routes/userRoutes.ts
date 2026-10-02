import { Router, Response } from "express";
import { verifyToken, AuthRequest } from "../middleware/auth";
import { isAdmin } from "../middleware/roles";
import { listUsers } from "../models/User";

const router = Router();

router.get("/", verifyToken, isAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const users = await listUsers();
    res.json({ users });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Fetch failed" });
  }
});

export default router;
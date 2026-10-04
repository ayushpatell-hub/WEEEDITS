import { Router, Request, Response, NextFunction } from "express";
import * as authMw from "../middleware/auth";
import {
  getStats,
  getClients,
  getContacts,
} from "../controllers/adminController";

const router = Router();

const verifyToken = (authMw as any).verifyToken ?? (authMw as any).default;

const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

router.use(verifyToken, adminOnly);

router.get("/stats", getStats);
router.get("/clients", getClients);
router.get("/contacts", getContacts);

export default router;
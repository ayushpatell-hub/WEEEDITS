import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import {
  addRequest,
  getMyRequests,
  getRequest,
  changeStatus,
} from "../controllers/requestController";

const router = Router();

router.post("/", verifyToken, addRequest);
router.get("/", verifyToken, getMyRequests);
router.get("/:id", verifyToken, getRequest);
router.patch("/:id/status", verifyToken, changeStatus);

export default router;
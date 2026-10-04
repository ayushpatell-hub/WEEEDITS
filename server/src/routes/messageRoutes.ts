import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { getMessages, sendMessage } from "../controllers/messageController";

const router = Router();

router.get("/:requestId", verifyToken, getMessages);
router.post("/:requestId", verifyToken, sendMessage);

export default router;
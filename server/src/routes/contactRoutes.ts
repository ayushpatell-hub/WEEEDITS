import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { isAdmin } from "../middleware/roles";
import { submitContact, getContacts } from "../controllers/contactController";

const router = Router();

router.post("/", submitContact);
router.get("/", verifyToken, isAdmin, getContacts);

export default router;
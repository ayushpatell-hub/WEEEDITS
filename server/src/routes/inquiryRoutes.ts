import { Router } from "express";
import { createInquiry } from "../controllers/inquiryController";

const router = Router();

router.post("/", createInquiry);

export default router;
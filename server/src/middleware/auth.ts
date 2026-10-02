import { Request, Response, NextFunction } from "express";
import { firebaseAuth } from "../config/firebase";
import { findUserByUid, User } from "../models/User";

export interface AuthRequest extends Request {
  firebaseUid?: string;
  firebaseEmail?: string;
  user?: User | null;
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const token = header.split(" ")[1];
    const decoded = await firebaseAuth().verifyIdToken(token);

    req.firebaseUid = decoded.uid;
    req.firebaseEmail = decoded.email;
    req.user = await findUserByUid(decoded.uid);

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
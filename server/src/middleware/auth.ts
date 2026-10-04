import { Request, Response, NextFunction } from "express";
import { getSupabase } from "../config/db";

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string;
    role: string;
  };
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const { data, error } = await getSupabase().auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = {
      uid: data.user.id,
      email: data.user.email || "",
      role: (data.user.app_metadata?.role as string) || "client",
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
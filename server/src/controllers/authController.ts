import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { createUser, findUserByAuthId } from "../models/User";

export const registerUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existing = await findUserByAuthId(req.user.uid);
    if (existing) {
      return res.status(200).json({ user: existing });
    }

    const user = await createUser({
      auth_id: req.user.uid,
      email: req.user.email,
      name: req.body?.name,
      role: req.user.role === "admin" ? "admin" : "client",
    });

    return res.status(201).json({ user });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Register failed" });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await findUserByAuthId(req.user.uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Failed to get user" });
  }
};
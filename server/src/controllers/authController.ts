import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { createUser, findUserByUid } from "../models/User";

export const registerUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const uid = req.firebaseUid!;
    const email = req.firebaseEmail || req.body.email;
    const name = req.body.name || "";

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const existing = await findUserByUid(uid);
    if (existing) {
      res.json({ user: existing });
      return;
    }

    const user = await createUser({
      firebase_uid: uid,
      email,
      name,
      role: "client",
    });

    res.status(201).json({ user });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Register failed" });
  }
};

export const getMe = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(404).json({ message: "User profile not found" });
    return;
  }

  res.json({ user: req.user });
};
import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { findUserByAuthId } from "../models/User";
import {
  createRequest,
  findRequestById,
  listAllRequests,
  listRequestsByUser,
  updateRequestStatus,
  IRequest,
} from "../models/Request";

const STATUSES = ["pending", "in_progress", "review", "completed", "cancelled"];

export const addRequest = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const user = await findUserByAuthId(req.user.uid);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { title, service, description, budget, deadline } = req.body || {};
    if (!title || !service || !description) {
      return res
        .status(400)
        .json({ message: "Title, service and description are required" });
    }

    const request = await createRequest({
      user_id: user.id,
      title,
      service,
      description,
      budget,
      deadline,
    });

    return res.status(201).json({ request });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Create failed" });
  }
};

export const getMyRequests = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const user = await findUserByAuthId(req.user.uid);
    if (!user) return res.status(404).json({ message: "User not found" });

    const requests: IRequest[] =
      user.role === "admin"
        ? await listAllRequests()
        : await listRequestsByUser(user.id);

    return res.status(200).json({ requests });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Fetch failed" });
  }
};

export const getRequest = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const user = await findUserByAuthId(req.user.uid);
    if (!user) return res.status(404).json({ message: "User not found" });

    const request = await findRequestById(req.params.id as string);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (user.role !== "admin" && request.user_id !== user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    return res.status(200).json({ request });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Fetch failed" });
  }
};

export const changeStatus = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const user = await findUserByAuthId(req.user.uid);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const { status } = req.body || {};
    if (!STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await updateRequestStatus(
      req.params.id as string,
      status as IRequest["status"]
    );

    return res.status(200).json({ request });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Update failed" });
  }
};
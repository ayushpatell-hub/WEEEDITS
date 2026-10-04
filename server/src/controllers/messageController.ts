import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { findUserByAuthId } from "../models/User";
import { findRequestById } from "../models/Request";
import { createMessage, listMessagesByRequest } from "../models/Message";

const checkAccess = async (req: AuthRequest) => {
  if (!req.user) return { error: { code: 401, message: "Unauthorized" } };

  const user = await findUserByAuthId(req.user.uid);
  if (!user) return { error: { code: 404, message: "User not found" } };

  const request = await findRequestById(req.params.requestId as string);
  if (!request) return { error: { code: 404, message: "Request not found" } };

  if (user.role !== "admin" && request.user_id !== user.id) {
    return { error: { code: 403, message: "Not allowed" } };
  }

  return { user, request };
};

export const getMessages = async (req: AuthRequest, res: Response) => {
  try {
    const result = await checkAccess(req);
    if ("error" in result && result.error) {
      return res.status(result.error.code).json({ message: result.error.message });
    }

    const messages = await listMessagesByRequest(req.params.requestId as string);
    return res.status(200).json({ messages });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Fetch failed" });
  }
};

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const result = await checkAccess(req);
    if ("error" in result && result.error) {
      return res.status(result.error.code).json({ message: result.error.message });
    }

    const content = (req.body?.content || "").trim();
    if (!content) {
      return res.status(400).json({ message: "Message is empty" });
    }

    const message = await createMessage({
      request_id: req.params.requestId as string,
      sender_id: (result as any).user.id,
      content,
    });

    return res.status(201).json({ message });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Send failed" });
  }
};
import { Request, Response } from "express";
import { createContact, listContacts } from "../models/Contact";

export const submitContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, service, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ message: "Name, email and message are required" });
      return;
    }

    const contact = await createContact({ name, email, service, message });
    res.status(201).json({ contact });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Contact failed" });
  }
};

export const getContacts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const contacts = await listContacts();
    res.json({ contacts });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Fetch failed" });
  }
};
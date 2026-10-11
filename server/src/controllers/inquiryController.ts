import { Request, Response } from "express";
import { z } from "zod";
import { getSupabase } from "../config/db";

const text = (max: number) => z.string().trim().max(max).optional().default("");

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(150),
  phone: text(30),
  brand: text(100),
  clientType: text(40),
  service: z.string().trim().min(1).max(150),
  category: text(60),
  title: z.string().trim().min(1).max(150),
  location: text(150),
  deadline: text(30),
  budget: text(60),
  description: z.string().trim().min(10).max(3000),
  links: text(500),
  eventDate: text(30),
  eventType: text(100),
  duration: text(60),
  coverage: text(150),
  businessType: text(100),
  videoCount: text(30),
  platforms: text(150),
  sourceFootage: text(60),
  targetPlatform: text(100),
  style: text(100),
  audience: text(150),
  objective: text(150),
  adPlatform: text(100),
  adSpend: text(60),
});

export const createInquiry = async (req: Request, res: Response) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Please check the form fields." });
  }

  const d = parsed.data;
  const details = {
    eventDate: d.eventDate,
    eventType: d.eventType,
    duration: d.duration,
    coverage: d.coverage,
    businessType: d.businessType,
    videoCount: d.videoCount,
    platforms: d.platforms,
    sourceFootage: d.sourceFootage,
    targetPlatform: d.targetPlatform,
    style: d.style,
    audience: d.audience,
    objective: d.objective,
    adPlatform: d.adPlatform,
    adSpend: d.adSpend,
  };

  const { error } = await getSupabase().from("inquiries").insert({
    name: d.name,
    email: d.email,
    phone: d.phone,
    brand: d.brand,
    client_type: d.clientType,
    service: d.service,
    category: d.category,
    title: d.title,
    location: d.location,
    deadline: d.deadline,
    budget: d.budget,
    description: d.description,
    links: d.links,
    details,
  });

  if (error) {
    return res.status(500).json({ message: "Could not save your request." });
  }

  return res.status(201).json({ message: "Request received" });
};
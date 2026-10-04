import { Request, Response, NextFunction } from "express";
import { getSupabase } from "../config/db";

export const getStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const supabase = getSupabase();

    const [requestsRes, clientsRes, contactsRes] = await Promise.all([
      supabase.from("requests").select("id, service, status, created_at"),
      supabase.from("users").select("id", { count: "exact", head: true }).eq("role", "client"),
      supabase.from("contacts").select("id", { count: "exact", head: true }),
    ]);

    if (requestsRes.error) throw requestsRes.error;

    const requests = requestsRes.data || [];

    const byStatus: Record<string, number> = {
      pending: 0,
      in_progress: 0,
      review: 0,
      completed: 0,
      cancelled: 0,
    };
    const byService: Record<string, number> = {};
    const byMonth: Record<string, number> = {};

    for (const r of requests) {
      byStatus[r.status] = (byStatus[r.status] || 0) + 1;
      byService[r.service] = (byService[r.service] || 0) + 1;
      const month = String(r.created_at).slice(0, 7);
      byMonth[month] = (byMonth[month] || 0) + 1;
    }

    const perMonth = Object.keys(byMonth)
      .sort()
      .map((month) => ({ month, count: byMonth[month] }));

    res.json({
      totalRequests: requests.length,
      totalClients: clientsRes.count || 0,
      totalContacts: contactsRes.count || 0,
      byStatus,
      byService,
      perMonth,
    });
  } catch (err) {
    next(err);
  }
};

export const getClients = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await getSupabase()
      .from("users")
      .select("id, email, name, role, created_at")
      .eq("role", "client")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    next(err);
  }
};

export const getContacts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await getSupabase()
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    next(err);
  }
};
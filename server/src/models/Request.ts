import { getSupabase } from "../config/db";

/*
Run in Supabase SQL Editor:

create table if not exists requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  service text not null,
  description text not null,
  budget text,
  deadline date,
  status text not null default 'pending'
    check (status in ('pending','in_progress','review','completed','cancelled')),
  created_at timestamptz default now()
);
*/

export interface IRequest {
  id: string;
  user_id: string;
  title: string;
  service: string;
  description: string;
  budget: string | null;
  deadline: string | null;
  status: "pending" | "in_progress" | "review" | "completed" | "cancelled";
  created_at: string;
}

export const createRequest = async (input: {
  user_id: string;
  title: string;
  service: string;
  description: string;
  budget?: string;
  deadline?: string;
}): Promise<IRequest> => {
  const { data, error } = await getSupabase()
    .from("requests")
    .insert({
      user_id: input.user_id,
      title: input.title,
      service: input.service,
      description: input.description,
      budget: input.budget || null,
      deadline: input.deadline || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as IRequest;
};

export const listRequestsByUser = async (userId: string): Promise<IRequest[]> => {
  const { data, error } = await getSupabase()
    .from("requests")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []) as IRequest[];
};

export const listAllRequests = async (): Promise<IRequest[]> => {
  const { data, error } = await getSupabase()
    .from("requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []) as IRequest[];
};

export const findRequestById = async (id: string): Promise<IRequest | null> => {
  const { data, error } = await getSupabase()
    .from("requests")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data as IRequest | null;
};

export const updateRequestStatus = async (
  id: string,
  status: IRequest["status"]
): Promise<IRequest> => {
  const { data, error } = await getSupabase()
    .from("requests")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as IRequest;
};
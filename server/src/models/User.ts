import { getSupabase } from "../config/db";

/*
Run in Supabase SQL Editor.

New table:
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  auth_id text unique not null,
  email text unique not null,
  name text,
  role text not null default 'client' check (role in ('client','admin')),
  created_at timestamptz default now()
);

If the users table already exists:
alter table users rename column firebase_uid to auth_id;
*/

export interface IUser {
  id: string;
  auth_id: string;
  email: string;
  name: string | null;
  role: "client" | "admin";
  created_at: string;
}

export const findUserByAuthId = async (authId: string): Promise<IUser | null> => {
  const { data, error } = await getSupabase()
    .from("users")
    .select("*")
    .eq("auth_id", authId)
    .maybeSingle();

  if (error) throw error;
  return data as IUser | null;
};

export const createUser = async (input: {
  auth_id: string;
  email: string;
  name?: string;
  role?: "client" | "admin";
}): Promise<IUser> => {
  const { data, error } = await getSupabase()
    .from("users")
    .insert({
      auth_id: input.auth_id,
      email: input.email,
      name: input.name || null,
      role: input.role || "client",
    })
    .select()
    .single();

  if (error) throw error;
  return data as IUser;
};

export const listUsers = async (): Promise<IUser[]> => {
  const { data, error } = await getSupabase()
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []) as IUser[];
};
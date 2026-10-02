import { getSupabase } from "../config/db";

/*
Run this SQL once in Supabase (SQL Editor):

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  firebase_uid text unique not null,
  email text unique not null,
  name text not null default '',
  role text not null default 'client' check (role in ('client', 'admin')),
  created_at timestamptz not null default now()
);
*/

export type UserRole = "client" | "admin";

export interface User {
  id: string;
  firebase_uid: string;
  email: string;
  name: string;
  role: UserRole;
  created_at: string;
}

export const findUserByUid = async (uid: string): Promise<User | null> => {
  const { data, error } = await getSupabase()
    .from("users")
    .select("*")
    .eq("firebase_uid", uid)
    .maybeSingle();

  if (error) throw error;
  return data as User | null;
};

export const createUser = async (input: {
  firebase_uid: string;
  email: string;
  name?: string;
  role?: UserRole;
}): Promise<User> => {
  const { data, error } = await getSupabase()
    .from("users")
    .insert({
      firebase_uid: input.firebase_uid,
      email: input.email,
      name: input.name || "",
      role: input.role || "client",
    })
    .select()
    .single();

  if (error) throw error;
  return data as User;
};

export const listUsers = async (): Promise<User[]> => {
  const { data, error } = await getSupabase()
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []) as User[];
};
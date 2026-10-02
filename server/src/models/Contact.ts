import { getSupabase } from "../config/db";

/*
Run this SQL once in Supabase (SQL Editor):

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  service text not null default '',
  message text not null,
  created_at timestamptz not null default now()
);
*/

export interface Contact {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  created_at: string;
}

export const createContact = async (input: {
  name: string;
  email: string;
  service?: string;
  message: string;
}): Promise<Contact> => {
  const { data, error } = await getSupabase()
    .from("contacts")
    .insert({
      name: input.name,
      email: input.email,
      service: input.service || "",
      message: input.message,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Contact;
};

export const listContacts = async (): Promise<Contact[]> => {
  const { data, error } = await getSupabase()
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []) as Contact[];
};
import { getSupabase } from "../config/db";

export type Message = {
  id: string;
  request_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

type NewMessage = {
  request_id: string;
  sender_id: string;
  content: string;
};

export async function createMessage(data: NewMessage): Promise<Message>;
export async function createMessage(
  request_id: string,
  sender_id: string,
  content: string
): Promise<Message>;
export async function createMessage(
  a: NewMessage | string,
  b?: string,
  c?: string
): Promise<Message> {
  const payload: NewMessage =
    typeof a === "string"
      ? { request_id: a, sender_id: b as string, content: c as string }
      : a;

  const { data, error } = await getSupabase()
    .from("messages")
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Message;
}

export async function listMessagesByRequest(
  requestId: string
): Promise<Message[]> {
  const { data, error } = await getSupabase()
    .from("messages")
    .select("*")
    .eq("request_id", requestId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data || []) as Message[];
}